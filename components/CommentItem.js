import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Form,Input,List,Comment,Avatar,Button, Typography,Tooltip} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listCommentsRoutinePromise} from 'State/routines/comment';
import Permission from 'Library/controllers/Permission'
import CommentController from 'Library/controllers/CommentController';
import FormComment from 'Components/FormComment'
import moment from 'moment'
import { DeleteFilled, EditFilled } from '@ant-design/icons';

moment.locale("id");

const CommentItem = ({comment,index,...props}) => {

    const {Text} = Typography

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

    React.useEffect(()=>{
        
        if(comment){
            
            setItem(comment)

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
            replyToId:item.id,
            maxDate,
            size
        })
    }

    const setSecondLevelReply = (secondLevelItem,index) => {
        // console.log(item)
        // console.log(secondLevelItem.createdBy)
        
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

    const deleteComment = (deletedItem,index) => {
        alert(deletedItem.content)
    }

    const updateComment = (updatedItem,index) => {
        alert(updatedItem.content)
    }


    const onSuccessAdd = comment =>{
        setItems([...items,comment])
        if(props.onSuccessAddComment) props.onSuccessAddComment(comment)
    }

    const onSuccessDelete = comment => {

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
                        <span onClick={()=>deleteComment(item,index)}>
                            {React.createElement(DeleteFilled)}
                        </span>
                    </Tooltip>
                }
                </>,
                <>
                {
                    Permission.UPDATE_COMMENT({auth,item}) && 
                    <Tooltip key="comment-edit" title="Ubah">
                        <span onClick={()=>updateComment(item,index)}>
                            {React.createElement(EditFilled)}
                        </span>
                    </Tooltip>
                }
                </>
                
            ]}
            author={item && item.createdBy.name}
            avatar={
                <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt={item && item.createdBy.name}
                    />
            }
            content={(
                <>
                    <Row>
                        <Col md={24}>{item && item.content}</Col>
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
                <Col md={16} sm={24} xs={24}>
                {items && items.map((rowItem,index)=>{
                    return <CommentItem 
                                auth={auth}
                                key={`${rowItem.id}-${index}`} 
                                post={post} 
                                comment={rowItem}
                                index={index}
                                onSuccessAddComment={props.onSuccessAddComment}
                                onSuccessDeleteComment={props.onSuccessDeleteComment}
                                onSecondLevelReply={setSecondLevelReply}
                                />
                })}
                </Col>
            </Row>      
            
            <span className={replyVisible ? 'd-block':'d-none'}>

                {replyToUser && 
                    <Row>
                        <Col md={18} sm={24} xs={24} offset={1} className="mt-1">
                            <Text className="comment-action">Membalas komentar {replyToUser.name} </Text>
                        </Col>
                    </Row>
                }

                <Row>
                    <Col md={18} sm={24} xs={24} className="mt-1 mb-3">
                        <FormComment post={post} replyTo={item} replyToUser={replyToUser} onSuccess={onSuccessAdd}/>
                    </Col>
                </Row>
                {/* <Row>
                    <Col md={18}>
                        <ul className="ant-comment-actions mt-0">
                            <li>
                                <span onClick={(e)=>toggleReply(item,index)}>Tutup</span>
                            </li>
                        </ul>
                    </Col>
                </Row> */}
            </span>

        </Comment>
    )
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            listCommentsRoutinePromise
        },dispatch),dispatch
    })
)(CommentItem)
