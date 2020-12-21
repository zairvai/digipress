import React from 'react'
import {connect} from 'react-redux'

import { Row, Col,Form,Input,List,Comment,Avatar,Button, Typography,Tooltip} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listCommentsRoutinePromise} from 'State/routines/comment';
import CommentController from 'Library/controllers/CommentController';
import FormComment from 'Components/FormComment'
import CommentItem from 'Components/CommentItem'
import moment from 'moment'

const PostComment = props =>  {

    const {auth,post,listComments} = props

    const commentController = new CommentController(props)

    const [items,setItems] = React.useState([])
    
    const [prevCommentVisible, setPrevCommentVisible] = React.useState(false)
    const [prevLoadedNumber,setPrevLoadedNumber] = React.useState(0)
    const [prevCommentTotal,setPrevCommentTotal] = React.useState(0)
    const [maxDate,setMaxDate] = React.useState(moment().toISOString())

    React.useEffect(()=>{
        
        if(post.account){
            
            setPrevCommentTotal(post.noOfNoReplyComment)

            getItems({
                accountId:post.account.id,
                postId:post.id,
                maxDate,
                size:1
            })
        }

    },[post])

    React.useEffect(()=>{

        console.log(`${prevCommentTotal} - ${prevLoadedNumber}`)

        if(prevCommentTotal > prevLoadedNumber) setPrevCommentVisible(true)
        else setPrevCommentVisible(false)

    },[prevCommentTotal,prevLoadedNumber])

    const getItems = async ({accountId,postId,orderBy="createdAt",direction="desc",maxDate,size,statuses=[3]}) =>{ 

        try{

            const response = await commentController._list({
                accountId,postId,orderBy,direction,maxDate,size,statuses
            })

            if(response.data.items) {
                const length = response.data.items.length
                
                setPrevLoadedNumber(prevLoadedNumber + length)

                setMaxDate(response.data.items[length-1].createdAt)

                setItems([...response.data.items,...(items || [])])
            }
           
        }
        catch(error){
            console.log(error)
        }

    }

    const viewPreviousPost = size => {
        getItems({
            accountId:post.account.id,
            postId:post.id,
            maxDate,
            size
        })
    }

    const onSuccessAdd = comment =>{
        setItems([...items,comment])
        if(props.onSuccessAddComment) props.onSuccessAddComment(comment)
    }

    return (
        <>
            {prevCommentVisible && 
            <Row>
                <Col md={24}>
                    <Button type="link" onClick={()=>viewPreviousPost(4)}>Lihat komentar sebelumnya</Button>
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
                                onSuccessAddComment={props.onSuccessAddComment}
                                onSuccessDeleteComment={props.onSuccessDeleteComment}
                                />
                })}
                </Col>
            </Row>
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
            listCommentsRoutinePromise
        },dispatch),dispatch
    })
)(PostComment)
