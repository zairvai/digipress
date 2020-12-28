import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Button,Input,List,Avatar } from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostCommentsRoutinePromise,getCommentRoutinePromise,updateCommentRoutinePromise } from 'State/routines/comment';
import CommentController from 'Library/controllers/CommentController';
import FormComment from 'Components/FormComment'
import CommentItem from 'Components/CommentItem'
import moment from 'moment'
import _ from 'lodash'

const ListPostComments = props =>  {

    const {auth,post,commentId} = props

    const commentController = new CommentController(props)

    const [postItem,setPostItem] = React.useState()
    const [items,setItems] = React.useState([])
    
    const [prevCommentVisible, setPrevCommentVisible] = React.useState(false)
    const [nextCommentVisible, setNextCommentVisible] = React.useState(false)

    const [maxDate,setMaxDate] = React.useState(moment().toISOString())
    const [minDate,setMinDate] = React.useState()

    const isMounted = React.useRef()

    React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){
            if(commentId){
                getItem(commentId) 
            }
            else if(post.account){

                setPostItem(post)

                fetchItems({
                    accountId:post.account.id,
                    postId:post.id,
                    maxDate,
                    size:2
                })
            }
        }

        return ()=>isMounted.current = false

    },[post,commentId])

    const getItem = async (id)=>{

        try{
            
            const response = await commentController._get(id)

            if(response.data){

                let comment = _.cloneDeep(response.data)
                
                comment.isUpdating = false
                comment.isReplying = false

                if(comment.replyTo){
                    let parentComment = _.cloneDeep(comment.replyTo)
                    parentComment.replies = [comment]
                    parentComment.isUpdating = false
                    parentComment.isReplying = false

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
                
                const dataItems = _.cloneDeep(response.data.items)
                const length = dataItems.length

                if(maxDate) {
                    
                    setMaxDate(dataItems[length-1].createdAt)
                    setPrevCommentVisible(true)

                    setItems([...dataItems.reverse(),...(items || [])])

                }else if(minDate){
                    
                    setMinDate(dataItems[length-1].createdAt)
                    setNextCommentVisible(true)

                    setItems([...(items || []),...dataItems])
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
            accountId:postItem.account.id,
            postId:postItem.id,
            maxDate,
            size
        })
    }

    const viewNextComment = size => {

        fetchItems({
            accountId:postItem.account.id,
            postId:postItem.id,
            minDate,
            direction:"asc",
            size
        })

    }

    const onSuccessAdd = comment =>{
        setItems([...items,comment])
        if(props.onPostSuccessAddComment) props.onPostSuccessAddComment(comment)
    }


    const [prevUpdatingItem,setPrevUpdatingItem] = React.useState()

    const handleOnUpdatingItem = updatingItem =>{

        const tempItems = _.cloneDeep(items)

        //closePrev item which is updating
        if(prevUpdatingItem){
            const index = tempItems.findIndex(obj=>obj.id===prevUpdatingItem.id)
            const tempItem = tempItems[index]
            tempItem.isUpdating = false
        }

        
        const index = tempItems.findIndex(obj=>obj.id===updatingItem.id)
        const tempItem = tempItems[index]
        tempItem.isUpdating = true
        
        setPrevUpdatingItem(tempItem)

        setItems(tempItems)

        setFormVisible(false)

    }

    const handleOnCancelUpdateItem = updatingItem => {

        const tempItems = _.cloneDeep(items)

        //closePrev item which is updating
        if(prevUpdatingItem){
            const index = tempItems.findIndex(obj=>obj.id===prevUpdatingItem.id)
            const tempItem = tempItems[index]
            tempItem.isUpdating = false
            setPrevUpdatingItem(null)
            setItems(tempItems)
        }

        if(updatingItem){
            const index = tempItems.findIndex(obj=>obj.id===updatingItem.id)
            const tempItem = tempItems[index]
            tempItem.isUpdating = false

            setPrevUpdatingItem(null)
            setItems(tempItems)
        }


    }

    const [prevReplyingItem,setPrevReplyingItem] = React.useState()

    const handleOnReplyingItem = replyingItem => {
        
        const tempItems = _.cloneDeep(items)

        //closePrev item which is replying
        if(prevReplyingItem){
            const index = tempItems.findIndex(obj=>obj.id===prevReplyingItem.id)
            const tempItem = tempItems[index]
            tempItem.isReplying = false
        }

        
        const index = tempItems.findIndex(obj=>obj.id===replyingItem.id)
        const tempItem = tempItems[index]
        tempItem.isReplying = true
        
        setPrevReplyingItem(tempItem)

        setItems(tempItems)

        setFormVisible(false)

    }

    const handleOnCancelReplyItem = replyingItem => {

        const tempItems = _.cloneDeep(items)
    
        //closePrev item which is replying
        if(prevReplyingItem){
            const index = tempItems.findIndex(obj=>obj.id===prevReplyingItem.id)
            const tempItem = tempItems[index]
            tempItem.isReplying = false
            setPrevReplyingItem(null)
            setItems(tempItems)
        }
    
        if(replyingItem){
            const index = tempItems.findIndex(obj=>obj.id===replyingItem.id)
            const tempItem = tempItems[index]
            tempItem.isReplying = false
    
            setPrevReplyingItem(null)
            setItems(tempItems)
        }
    
    
    }


    const [isFormVisible,setFormVisible] = React.useState(false)

    const openForm = () => {
        handleOnCancelUpdateItem()
        handleOnCancelReplyItem()
        setFormVisible(true)
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
            {items ? 
                <Row>
                    <Col md={16} sm={24} xs={24}>
                        {/* <List
                            rowKey={record=>record.id}
                            itemLayout="horizontal"
                            dataSource={items}
                            renderItem={row=>(
                                <li id={row.id}> */}
                                {items.map(row=>(
                                    <CommentItem 
                                        key={row.id}
                                        auth={auth} comment={row} post={postItem}
                                        dispatch={props.dispatch}
                                        onUpdating={handleOnUpdatingItem} onReplying={handleOnReplyingItem} 
                                        onCancelUpdate={handleOnCancelUpdateItem}
                                        dispatch={props.dispatch}
                                        listPostCommentsRoutinePromise={props.listPostCommentsRoutinePromise}
                                        />
                                ))}
                                {/* </li>
                            )}
                        /> */}

                    </Col>
                </Row>
                :
                <></>
            }
            {nextCommentVisible && 
                <Row>
                    <Col md={24} className="mb-3">
                        <Button type="link" onClick={()=>viewNextComment(4)}>Lihat komentar lainnya</Button>
                    </Col>
                </Row>
            }
            {postItem && 
                <Row>
                    <Col md={14} sm={24} xs={24} className="mt-2">
                        {isFormVisible ?
                            <FormComment auth={auth} formId={`${postItem.id}PostComment`} 
                                post={postItem} onSuccess={onSuccessAdd}/>   
                        
                            :
                            
                            <div onClick={()=>openForm()}>
                                <Row>
                                    <Col md={2} sm={4} xs={4}>
                                        <Avatar
                                            className="mr-2"
                                            src="/image/default_user.jpg"
                                            alt={auth && auth.user.name}/>
                                    </Col>
                                    <Col md={18} sm={20} xs={20}>
                                        <Input placeholder="Kirim komentar" readOnly={true}/>
                                    </Col>
                                </Row>
                            </div>
                        }

                        
                    </Col>
                </Row>
            }
        </>

    )

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                listPostCommentsRoutinePromise,
                getCommentRoutinePromise,
                updateCommentRoutinePromise
        },dispatch),dispatch
    })
)(ListPostComments)
