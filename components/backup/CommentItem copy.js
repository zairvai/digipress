import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Modal,Comment,Avatar,Button, Typography,Tooltip} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostCommentsRoutinePromise,updateCommentRoutinePromise} from 'State/routines/comment';
import Permission from 'Library/controllers/Permission'
import CommentController from 'Library/controllers/CommentController';
import FormComment from 'Components/FormComment'
import moment from 'moment'
import { DeleteFilled, EditFilled, CloseCircleFilled,ExclamationCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import HTML from 'Components/HTML'
import _ from 'lodash'

const CommentItem = ({comment,index,...props}) => {

    const {Text,Paragraph} = Typography
    const {confirm} = Modal

    const {auth,post} = props

    const commentController = new CommentController(props)

    const [postItem,setPostItem] = React.useState()
    const [item,setItem] = React.useState()
    const [items,setItems] = React.useState([])

    const [prevCommentVisible, setPrevCommentVisible] = React.useState(false)
    const [nextCommentVisible, setNextCommentVisible] = React.useState(false)

    const [maxDate,setMaxDate] = React.useState()
    const [minDate,setMinDate] = React.useState()
    const [replyVisible,setReplyVisible] = React.useState(false)
    const [replyToUser,setReplyToUser] = React.useState()

    const [itemReplyName,setItemReplyName] = React.useState()
    const [isUpdating,setUpdating] = React.useState(false)


    const isMounted = React.useRef(null)

    React.useEffect(()=>{
        
        isMounted.current = true

        if(comment && isMounted.current){
             
            setItem(comment)
            
            if(comment.replyToUser){

                let replyName = ""
                if(auth.user.id==comment.replyToUser.id) replyName = "kamu"
                else replyName = comment.replyToUser.name

                setItemReplyName(<Text className="comment-action d-block"><RollbackOutlined rotate={180} /> mengomentari {replyName}</Text>)
            }
        
            if(comment.replies){
                const length = comment.replies.length
                setPrevCommentVisible(true)
                setNextCommentVisible(true)

                setMinDate(comment.replies[length-1].createdAt)
                setMaxDate(comment.replies[length-1].createdAt)
                setItems(comment.replies)
            }

        }

        return () => isMounted.current = false

    },[comment])

    React.useEffect(()=>{
        if(post) setPostItem(post)
    },[post])


    const fetchItems = React.useCallback(async ({accountId,postId,replyToId,orderBy="createdAt",direction="desc",minDate,maxDate,size,statuses=[3]}) =>{ 

        try{

            const response = await commentController._listPostComments({
                accountId,postId,replyToId,orderBy,direction,minDate,maxDate,size,statuses
            })

            if(response.data.items) {
                
                const dataItems = _.cloneDeep(response.data.items)
                const length = dataItems.length

                if(maxDate) {
                    
                    setMaxDate(dataItems[length-1].createdAt)
                    setPrevCommentVisible(true)

                    dataItems.reverse()
                    
                    setItems([...dataItems,...(items || [])])

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
            console.log(error)
        }

    },[])


    const viewPreviousComment = size => {
        fetchItems({
            accountId:postItem.account.id,
            postId:postItem.id,
            replyToId:item.id,
            maxDate,
            size
        })
    }

    const viewNextComment = size => {

        fetchItems({
            accountId:postItem.account.id,
            postId:postItem.id,
            replyToId:item.id,
            minDate,
            direction:"asc",
            size
        })

    }

    const setSecondLevelReply = (secondLevelItem,index) => {
        const secondLevelUser = _.cloneDeep(secondLevelItem.createdBy)
        setReplyToUser(secondLevelUser)
        
        setReplyVisible(true)
    }

    const toggleReply = (repliedItem,index) => {
        
        if(props.onSecondLevelReply){
            props.onSecondLevelReply(repliedItem,index)
        }
        else{     
            setReplyToUser(null)
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
    }

    const cancelUpdate = (updatedItem,index) => {
        setUpdating(false)
    }

    const onSuccessAdd = comment =>{
        setItems([...items,comment])
        if(props.onPostSuccessAddComment) props.onPostSuccessAddComment(comment)
    }


    const onSuccessUpdate = updatedComment => {
        setUpdating(false)
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
                    (item && Permission.REPLY_COMMENT({auth,item})) && 
                    <span key={`comment-list-reply-to-${index}`} onClick={(e)=>toggleReply(item,index)}>Balas</span>
                }
                </>,
                
                <>
                {
                    (item && Permission.DELETE_COMMENT({auth,item})) && 
                    <Tooltip key="comment-delete" title="Hapus">
                        <span onClick={()=>showDeleteConfirm(item,index)}>
                            {React.createElement(DeleteFilled)}
                        </span>
                    </Tooltip>
                }
                </>,
                <>
                {
                    (item && Permission.UPDATE_COMMENT({auth,item}) && isUpdating) ? 
                    <Tooltip key="comment-edit" title="Tutup">
                        <span onClick={()=>cancelUpdate(item,index)}>
                            {React.createElement(CloseCircleFilled)}
                        </span>
                    </Tooltip>
                    :
                    (item && Permission.UPDATE_COMMENT({auth,item}) && !isUpdating) && 
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
                    src="/image/default_user.jpg"
                    alt={item && item.createdBy.name}
                    />
            }
            content={(
                <>
                    <Row>
                        <Col md={24}>
                            {itemReplyName}

                            {item && 
                                <>
                                    <div className={isUpdating ? 'd-block':'d-none'}>
                                        <FormComment formId={`${item.id}CommentUpdate`} className="mt-2" item={item} onSuccess={onSuccessUpdate}/>
                                    </div>
                                    <div className={isUpdating ? 'd-none':'d-block'}>
                                        <HTML
                                            html={item && item.content}
                                            componentOverrides={{
                                                p:Component=>props=><Component ellipsis={{ rows: 3, expandable: true, symbol: 'Buka' }} {...props}/>
                                            }}
                                        />
                                    </div>
                                </>
                            }
                        </Col>
                    </Row>
                </>
            )}
            datetime={
                <Tooltip title={item && moment(item.createdAt).format("dddd, Do MMMM YYYY [jam] hh:mm")}>
                    <span>{item && moment(item.createdAt).fromNow()}</span>
                </Tooltip>
            }
        >

            {/* {prevCommentVisible && 
            <Row>
                <Col md={24}>
                    <Button type="link" onClick={()=>viewPreviousComment(4)}>Lihat balasan sebelumnya</Button>
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
                                post={postItem} 
                                comment={rowItem}
                                index={index}
                                onPostSuccessAddComment={props.onPostSuccessAddComment}
                                onPostSuccessDeleteComment={props.onPostSuccessDeleteComment}
                                onSuccessDelete={onSuccessDelete}
                                onSecondLevelReply={setSecondLevelReply}/>
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
                {item &&
                    <Row>
                        <Col md={24} sm={24} xs={24} className="mt-1 mb-3">
                            <FormComment formId={`${item.id}CommentReply`}  post={postItem} replyTo={item} replyToUser={replyToUser} onSuccess={onSuccessAdd}/>
                        </Col>
                    </Row>
                }
            </span>

            {nextCommentVisible && 
            <Row>
                <Col md={24} className="mb-3">
                    <Button type="link" onClick={()=>viewNextComment(4)}>Lihat balasan lainnya</Button>
                </Col>
            </Row>
            } */}
        </Comment>
    )
}

const MemoComment = React.memo(props=><CommentItem {...props}/>)

export default connect(
    (dispatch)=>({
            ...bindPromiseCreators({
            listPostCommentsRoutinePromise,
            updateCommentRoutinePromise
        },dispatch),dispatch
    })
)(MemoComment)
