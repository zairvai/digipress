import React from 'react'
import {connect} from 'react-redux'

import { Row, Col,Button } from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostCommentsRoutinePromise,getCommentRoutinePromise } from 'State/routines/comment';
import CommentController from 'Library/controllers/CommentController';
import FormComment from 'Components/FormComment'
import CommentItem from 'Components/CommentItem'
import moment from 'moment'
import _ from 'lodash'

const PostComment = props =>  {

    const {auth,post,commentId,listComments} = props

    const commentController = new CommentController(props)

    const [items,setItems] = React.useState([])
    
    const [prevCommentVisible, setPrevCommentVisible] = React.useState(false)
    const [nextCommentVisible, setNextCommentVisible] = React.useState(false)

    const [maxDate,setMaxDate] = React.useState(moment().toISOString())
    const [minDate,setMinDate] = React.useState()

    React.useEffect(()=>{

        if(commentId){
            getItem(commentId) 
        }
        else if(post.account){

            fetchItems({
                accountId:post.account.id,
                postId:post.id,
                maxDate,
                size:2
            })
        }

    },[post])

    const getItem = async (id)=>{

        try{
            
            const response = await commentController._get(id)

            if(response.data){

                let comment = _.cloneDeep(response.data)
                
                if(comment.replyTo){
                    let parentComment = _.cloneDeep(comment.replyTo)
                    parentComment.replies = [comment]
                    setMinDate(parentComment.createdAt)
                    setMaxDate(parentComment.createdAt)
                    setItems([parentComment,...(items || [])])
                }else{
                    setMinDate(comment.createdAt)
                    setMaxDate(comment.createdAt)
                    setItems([comment,...(items || [])])
                }
                setPrevCommentVisible(true)
                setNextCommentVisible(true)
            }else{
                setPrevCommentVisible(false)
                setNextCommentVisible(false)
            }

        }catch(error){
            console.warn(error)
        }
    }

    const fetchItems = async ({accountId,postId,orderBy="createdAt",direction="desc",minDate,maxDate,size,statuses=[3]}) =>{ 


        try{

            const response = await commentController._listPostComments({
                accountId,postId,orderBy,direction,minDate,maxDate,size,statuses
            })

            if(response.data.items) {
                
                const length = response.data.items.length

                if(maxDate) {
                    
                    setMaxDate(response.data.items[length-1].createdAt)
                    setPrevCommentVisible(true)

                    response.data.items.reverse()
                    
                    setItems([...response.data.items,...(items || [])])

                }else if(minDate){
                    console.log("setMinDate")
                    
                    setMinDate(response.data.items[length-1].createdAt)
                    setNextCommentVisible(true)

                    setItems([...(items || []),...response.data.items])
                }

            }else{
                console.log("No data found")
                if(maxDate){
                    setPrevCommentVisible(false)
                }else if(minDate){
                    setNextCommentVisible(false)
                }
            }
           
        }
        catch(error){
            console.warn(error)
        }

    }

    const viewPreviousComment = size => {
        fetchItems({
            accountId:post.account.id,
            postId:post.id,
            maxDate,
            size
        })
    }

    const viewNextComment = size => {

        fetchItems({
            accountId:post.account.id,
            postId:post.id,
            minDate,
            direction:"asc",
            size
        })

    }


    const onSuccessAdd = comment =>{
        setItems([...items,comment])
        if(props.onPostSuccessAddComment) props.onPostSuccessAddComment(comment)
    }

    const onSuccessDelete = (comment,index) => {
        // console.log(items)
        // console.log(index)
        // console.log(comment)

        const cloneItems = [...items]

        cloneItems.splice(index,1)

        setItems(cloneItems)
        
        if(props.onPostSuccessDeleteComment) props.onPostSuccessDeleteComment(comment)

    }

    return (
        <>
            {prevCommentVisible && 
            <Row>
                <Col md={24}>
                    <Button type="link" onClick={()=>viewPreviousComment(4)}>Lihat komentar sebelumnya</Button>
                </Col>
            </Row>
            }
            <Row>
                <Col md={16} sm={24} xs={24}>
                {items && items.map((rowItem,index)=>{
                    return <CommentItem 
                                key={`${rowItem.id}-${index}`} 
                                post={post} 
                                comment={rowItem} 
                                index={index} 
                                onPostSuccessAddComment={props.onPostSuccessAddComment}
                                onPostSuccessDeleteComment={props.onPostSuccessDeleteComment}
                                onSuccessDelete={onSuccessDelete}
                                />
                })}
                </Col>
            </Row>
            {nextCommentVisible && 
            <Row>
                <Col md={24} className="mb-3">
                    <Button type="link" onClick={()=>viewNextComment(4)}>Lihat komentar lainnya</Button>
                </Col>
            </Row>
            }
            <Row>
                <Col md={16} sm={24} xs={24} className="mt-2">
                    <FormComment post={post} onSuccess={onSuccessAdd}/>   
                </Col>
            </Row>
        </>
    )

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            listPostCommentsRoutinePromise,
            getCommentRoutinePromise
        },dispatch),dispatch
    })
)(PostComment)
