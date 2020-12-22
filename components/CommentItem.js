import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Modal,Comment,Avatar,Button, Typography,Tooltip} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listCommentsRoutinePromise,updateCommentRoutinePromise} from 'State/routines/comment';
import Permission from 'Library/controllers/Permission'
import CommentController from 'Library/controllers/CommentController';
import FormComment from 'Components/FormComment'
import moment from 'moment'
import { DeleteFilled, EditFilled, CloseCircleFilled,ExclamationCircleOutlined, RollbackOutlined } from '@ant-design/icons';

moment.locale("id");

const CommentItem = ({comment,index,...props}) => {

    const {Text,Paragraph} = Typography
    const {confirm} = Modal

    const {auth,post} = props

    const commentController = new CommentController(props)

    const [item,setItem] = React.useState()
    const [items,setItems] = React.useState([])

    const [prevCommentVisible, setPrevCommentVisible] = React.useState(false)
    const [prevLoadedNumber,setPrevLoadedNumber] = React.useState(0)
    const [prevCommentTotal,setPrevCommentTotal] = React.useState(0)
    const [maxDate,setMaxDate] = React.useState()
    const [replyVisible,setReplyVisible] = React.useState(false)
    const [replyToUser,setReplyToUser] = React.useState()

    const [itemContent,setItemContent] = React.useState()
    const [isUpdating,setUpdating] = React.useState(false)

    React.useEffect(()=>{
        
        if(comment){
            
            setItem(comment)
            setItemContent(<ItemParagraph comment={comment}/>)
            setPrevCommentTotal(comment.noOfReply)

            if(comment.replies){
                const length = comment.replies.length
                setPrevLoadedNumber(length)
                setMaxDate(comment.replies[length-1].createdAt)
                setItems(comment.replies)
            }

        }

    },[comment])

    React.useEffect(()=>{

        // console.log(`${prevCommentTotal} - ${prevLoadedNumber}`)

        if(prevCommentTotal > prevLoadedNumber) setPrevCommentVisible(true)
        else setPrevCommentVisible(false)

    },[prevCommentTotal,prevLoadedNumber])


    const getItems = async ({accountId,postId,replyToId,orderBy="createdAt",direction="desc",maxDate,size,statuses=[3]}) =>{ 

        try{

            const response = await commentController._list({
                accountId,postId,replyToId,orderBy,direction,maxDate,size,statuses
            })

            if(response.data.items) {

                const length = response.data.items.length
                
                setPrevLoadedNumber(prevLoadedNumber + length)

                setMaxDate(response.data.items[length-1].createdAt)

                response.data.items.reverse()

                setItems([...response.data.items,...(items || [])])
            }
           
        }
        catch(error){
            console.log(error)
        }

    }

    const ItemParagraph = ({comment}) => {

        let objectName
        if(comment.replyToUser){
            if(auth.user.id == comment.replyToUser.id) objectName = "kamu"
            else objectName = comment.replyToUser.name 
        }

        return (
            <>
                {comment.replyToUser && <Text className="comment-action"><RollbackOutlined rotate={180} /> mengomentari {objectName}</Text>}
                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'Buka' }}>{comment.content}</Paragraph>
            </>
        )
    }

    const ItemUpdateForm = ({comment}) => {
        return <FormComment className="mt-2" item={comment} onSuccess={onSuccessUpdate}/>
    }


    const viewPreviousPost = size => {
        getItems({
            accountId:post.account.id,
            postId:post.id,
            replyToId:item.id,
            maxDate,
            size
        })
    }

    const setSecondLevelReply = (secondLevelItem,index) => {
        setReplyToUser(secondLevelItem.createdBy)
        
        setReplyVisible(true)
    }

    const toggleReply = (repliedItem,index) => {
        
        if(props.onSecondLevelReply){
            props.onSecondLevelReply(repliedItem,index)
        }
        else{     
            setReplyToUser()
            setReplyVisible(true)
        }
        
    }

    const showDeleteConfirm = (deletedItem,index) => {

        console.log(props)

        confirm({
          title: `Apa kamu ingin menghapus komentar ini ?`,
          icon: <ExclamationCircleOutlined />,
          content: <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'Buka' }}>{item.content}</Paragraph>,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

			commentController._delete(deletedItem)
				.then(resp=>{
                    if(props.onSuccessDelete) props.onSuccessDelete(deletedItem,index)
                })
				.catch(error=>console.log(error))

          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const updateComment = (updatedItem,index) => {
        setUpdating(true)
        setItemContent(<ItemUpdateForm comment={updatedItem}/>)
    }

    const cancelUpdate = (updatedItem,index) => {
        setUpdating(false)
        setItemContent(<ItemParagraph comment={updatedItem}/>)
    }

    const onSuccessAdd = comment =>{
        setItems([...items,comment])
        if(props.onPostSuccessAddComment) props.onPostSuccessAddComment(comment)
    }


    const onSuccessUpdate = updatedComment => {
        setUpdating(false)
        setItemContent(<ItemParagraph comment={updatedComment}/>)
    }

    const onSuccessDelete = (comment,index) =>{

        // console.log(items)
        // console.log(index)
        // console.log(comment)

        const cloneItems = [...items]
        cloneItems.splice(index,1)

        setItems(cloneItems)

        if(props.onPostSuccessDeleteComment) props.onPostSuccessDeleteComment(comment)
    }


    return(
        <Comment
            actions={[
                <>
                {
                    Permission.REPLY_COMMENT({auth,item}) && 
                    <span key={`comment-list-reply-to-${index}`} onClick={(e)=>toggleReply(item,index)}>Balas</span>
                }
                </>,
                
                <>
                {
                    Permission.DELETE_COMMENT({auth,item}) && 
                    <Tooltip key="comment-delete" title="Hapus">
                        <span onClick={()=>showDeleteConfirm(item,index)}>
                            {React.createElement(DeleteFilled)}
                        </span>
                    </Tooltip>
                }
                </>,
                <>
                {
                    Permission.UPDATE_COMMENT({auth,item}) && isUpdating ? 
                    <Tooltip key="comment-edit" title="Tutup">
                        <span onClick={()=>cancelUpdate(item,index)}>
                            {React.createElement(CloseCircleFilled)}
                        </span>
                    </Tooltip>
                    :
                    Permission.UPDATE_COMMENT({auth,item}) && !isUpdating ? 
                    <Tooltip key="comment-edit" title="Ubah">
                        <span onClick={()=>updateComment(item,index)}>
                            {React.createElement(EditFilled)}
                        </span>
                    </Tooltip>
                    :<></>
                }
                </>
                
            ]}
            author={item && item.createdBy.name}
            avatar={
                <Avatar
                    src="/image/default_user.jpg"
                    alt={item && item.createdBy.name}
                    />
            }
            content={(
                <>
                    <Row>
                        <Col md={24}>{itemContent}</Col>
                    </Row>
                </>
            )}
            datetime={
                <Tooltip title={item && moment(item.createdAt).format("dddd, Do MMMM YYYY [jam] hh:mm")}>
                    <span>{item && moment(item.createdAt).fromNow()}</span>
                </Tooltip>
            }
        >

            {prevCommentVisible && 
            <Row>
                <Col md={24}>
                    <Button type="link" onClick={()=>viewPreviousPost(4)}>Lihat komentar sebelumnya</Button>
                </Col>
            </Row>
            }
            <Row>
                <Col md={24} sm={24} xs={24}>
                {items && items.map((rowItem,index)=>{
                    return <CommentItem 
                                auth={auth}
                                updateCommentRoutinePromise={props.updateCommentRoutinePromise}
                                key={`${rowItem.id}-${index}`} 
                                post={post} 
                                comment={rowItem}
                                index={index}
                                onPostSuccessAddComment={props.onPostSuccessAddComment}
                                onPostSuccessDeleteComment={props.onPostSuccessDeleteComment}
                                onSuccessDelete={onSuccessDelete}
                                onSecondLevelReply={setSecondLevelReply}

                                />
                })}
                </Col>
            </Row>      
            
            <span className={replyVisible ? 'd-block':'d-none'}>

                {replyToUser && 
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10} sm={24} xs={24} offset={2} className="ml-2">
                            <Text className="comment-action">Membalas komentar {replyToUser.name} </Text>
                        </Col>
                    </Row>
                }

                <Row>
                    <Col md={24} sm={24} xs={24} className="mt-1 mb-3">
                        <FormComment post={post} replyTo={item} replyToUser={replyToUser} onSuccess={onSuccessAdd}/>
                    </Col>
                </Row>
            </span>

        </Comment>
    )
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            listCommentsRoutinePromise,
            updateCommentRoutinePromise
        },dispatch),dispatch
    })
)(CommentItem)
