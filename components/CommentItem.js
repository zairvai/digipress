import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Button,Modal,Typography,Tooltip,Input,Comment,Avatar } from 'antd'
import Permission from 'Library/controllers/Permission'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostCommentsRoutinePromise,updateCommentRoutinePromise } from 'State/routines/comment';
import CommentController from 'Library/controllers/CommentController';
import { DeleteFilled, EditFilled, CloseCircleFilled,ExclamationCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import Icon from '@mdi/react'
import {mdiDotsHorizontal} from '@mdi/js'
import HTML from 'Components/HTML'
import FormComment from 'Components/FormComment'
import moment from 'moment'

const CommentItem = props =>{ 

    const {auth,comment,post} = props

    const commentController = new CommentController(props)

    const limitNested = 2

    const {Text,Paragraph} = Typography
    const {confirm} = Modal

    const [replyToUser,setReplyToUser] = React.useState()
    const [itemReplyName,setItemReplyName] = React.useState()

    const [postItem,setPostItem] = React.useState()
    const [item,setItem] = React.useState()
    const [items,setItems] = React.useState([])

    const [viewReplyVisible,setViewReplyVisible] = React.useState(true)
    const [prevCommentVisible, setPrevCommentVisible] = React.useState(false)
    const [nextCommentVisible, setNextCommentVisible] = React.useState(false)

    const [maxDate,setMaxDate] = React.useState(moment().toISOString())
    const [minDate,setMinDate] = React.useState()

    // const [isFormVisible,setFormVisible] = React.useState(false)
   
    const [isUpdating,setUpdating] = React.useState(false)
    const [isReplying,setReplying] = React.useState(false)

    const [level,setLevel] = React.useState()

    const isMounted = React.useRef()

    React.useEffect(()=>{
        isMounted.current = true

        if(isMounted.current){
            
            if(comment){

                setItem(comment)

                if(comment.replyToUser && level > 2){

                    let replyName = ""
                    if(auth.user.id==comment.replyToUser.id) replyName = "kamu"
                    else replyName = comment.replyToUser.name

                    setItemReplyName(<Text className="comment-action d-block"><RollbackOutlined rotate={180} /> mengomentari {replyName}</Text>)
                }
                

                if(comment.replies){
                    const length = comment.replies.length
                    
                    setPrevCommentVisible(true)
                    setNextCommentVisible(true)

                    setMaxDate(comment.replies[0].createdAt)
                    setMinDate(comment.replies[length-1].createdAt)
                    
                    setItems(comment.replies)
                }
            }
        }

        return ()=>isMounted.current = false

    },[comment])

    React.useEffect(()=>{
        if(props.level){
            setLevel(props.level)
            // console.log("current level : " + props.level)
        }
    },[props.level])

    React.useEffect(()=>{
        
        isMounted.current=true

        if(isMounted.current){
            if(post) setPostItem(post)
        }

        return ()=>isMounted.current=false

    },[post])


    const fetchItems = async ({accountId,postId,replyToId,orderBy="createdAt",direction="desc",minDate,maxDate,size,statuses=[3]}) =>{ 

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
            console.warn(error)
        }

    }

    const viewReplies = (repliedItem,size) => {

        fetchItems({
            accountId:postItem.account.id,
            postId:postItem.id,
            replyToId:repliedItem.id,
            maxDate,
            size
        })

        setViewReplyVisible(false)

    }

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

    const setParentReply = parentItem =>{
        const parentReplyUser = _.cloneDeep(parentItem.createdBy)
        setReplyToUser(parentReplyUser)
        setReplying(true)
    }

    const replyComment = repliedItem => { 
        
        if(props.onParentReply){
            props.onParentReply(repliedItem)
        }
        else{
            setReplyToUser(null)
            setReplying(true)
        }
    }

    const cancelReply = repliedItem => { 
        
        setReplying(false)
    }
    const updateComment = updatedItem =>{
        
        console.log(items)

        setUpdating(true)
    }

    const cancelUpdate = updatedItem => {
        setUpdating(false)
    }

    const onSuccessAdd = addedItem =>{
        setItems([...items,addedItem])
        setReplying(false)
        if(props.onPostSuccessAddComment) props.onPostSuccessAddComment(addedItem)
    }

    const onSuccessUpdate = updatedItem => {

        const clonedtems = [...items]

        const index = clonedtems.findIndex(obj=>obj.id==updatedItem.id)
        
        if(index > -1){
            clonedtems.splice(index,1,updatedItem)
            setItems(clonedtems)
        }
    }

    const onSuccessDelete = deletedItem => {

        const clonedtems = [...items]

        const index = clonedtems.findIndex(obj=>obj.id==deletedItem.id)

        if(index > -1){
            clonedtems.splice(index,1)

            setItems(clonedtems)
            
            if(props.onPostSuccessDeleteComment) props.onPostSuccessDeleteComment(deletedItem)
        }

    }

    const showDeleteConfirm = deletedItem => {

        confirm({
          title: `Apa kamu ingin menghapus komentar ini ?`,
          icon: <ExclamationCircleOutlined />,
          content: <HTML
                        html={item && item.content}
                        componentOverrides={{
                            p:Component=>props=><Component ellipsis={{ rows: 3, expandable: true, symbol: 'Buka' }} {...props}/>
                        }}
                    />,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

			commentController._delete(deletedItem)
				.then(resp=>{
                    if(props.onSuccessDelete) props.onSuccessDelete(deletedItem)
                })
            	.catch(error=>console.log(error))
            
            // if(props.onSuccessDelete) props.onSuccessDelete(deletedItem)

          },
          onCancel() {}
        });
    }

    return(
        <>
        <Comment
            
            actions={[
                <>
                
                {
                    isReplying ?
                    <Tooltip key={`comment-reply-cancel-${item.id}`} title="Tutup">
                        <span onClick={()=>cancelReply(item)}>
                            {React.createElement(CloseCircleFilled)}
                        </span>
                    </Tooltip>
                    :
                    (item && Permission.REPLY_COMMENT({auth,item}) && !isReplying) && 
                    <span key={`comment-reply-to-${item.id}`} onClick={(e)=>replyComment(item)}>Balas</span>
                }
                
                </>,
                
                <>
                {
                    (item && Permission.DELETE_COMMENT({auth,item})) && 
                    <Tooltip key={`comment-delete-${item.id}`} title="Hapus">
                        <span onClick={()=>showDeleteConfirm(item)}>
                            {React.createElement(DeleteFilled)}
                        </span>
                    </Tooltip>
                }
                </>,
                <>
                {
                    isUpdating ? 
                    <Tooltip key={`comment-update-cancel-${item.id}`} title="Tutup">
                        <span onClick={()=>cancelUpdate(item)}>
                            {React.createElement(CloseCircleFilled)}
                        </span>
                    </Tooltip>
                    :
                    (item && Permission.UPDATE_COMMENT({auth,item}) && !isUpdating) && 
                    <Tooltip key={`comment-update-${item.id}`} title="Ubah">
                        <span onClick={()=>updateComment(item)}>
                            {React.createElement(EditFilled)}
                        </span>
                    </Tooltip>
                
                }
                </>,
                
                <>

                    {( viewReplyVisible && item && !item.replies && item.noOfReply && item.noOfReply > 0 ) ? 
                    <span className="ml-3" key={`comment-list-replyno-${item.id}`} onClick={(e)=>viewReplies(item,2)}>Lihat {item.noOfReply} balasan</span>
                    :<></>
                    }
                </>
                
                 
            ]}
            author={item && item.createdBy && item.createdBy.name}
            avatar={
                <Avatar
                    src="/image/default_user.jpg"
                    alt={item && item.createdBy && item.createdBy.name}
                    />
            }
            content={(
                <>
                    <Row>
                        <Col md={24}>
                            {itemReplyName}

                            {item && 
                                <>
                                    {isUpdating ? 
                                    <div>
                                        <FormComment auth={auth} formId={`${item.id}CommentUpdate`} className="my-2" 
                                            noAvatar={true} item={item} 
                                            onSuccess={updatedItem => {
                                                props.onSuccessUpdate(updatedItem)
                                                setUpdating(false)
                                            }}/>
                                    </div>
                                    :
                                    
                                        <HTML
                                            html={item && item.content}
                                            componentOverrides={{
                                                p:Component=>props=><Component ellipsis={{ rows: 3, expandable: true, symbol: 'Buka' }} {...props}/>
                                            }}
                                        />
                                   }
                                </>
                            }
                        </Col>
                    </Row>
                </>
            )}
            datetime={(
                <Tooltip title={item && moment(item.createdAt).format("dddd, Do MMMM YYYY [jam] hh:mm")}>
                    <span>{item && moment(item.createdAt).fromNow()}</span>
                </Tooltip>
            )}>


            {prevCommentVisible && 
                <Row>
                    <Col md={24}>
                        <Tooltip title="Lihat balasan sebelumnya">
                            <Button type="link" onClick={()=>viewPreviousComment(4)}><Icon size="1.3em" path={mdiDotsHorizontal}/></Button>
                        </Tooltip>
                    </Col>
                </Row>
            }
            
            {items? 
                <Row>
                    <Col md={20} sm={24} xs={24}>
                        {items.map(row=>(
                            <div key={row.id}>
                         
                            { (level+1) <= limitNested ?
                                <CommentItem 
                                    level={(level+1)}
                                    comment={row} post={postItem}
                                    auth={auth}
                                    listPostCommentsRoutinePromise={props.listPostCommentsRoutinePromise}
                                    updateCommentRoutinePromise={props.updateCommentRoutinePromise}
                                    onSuccessUpdate={onSuccessUpdate} onSuccessDelete={onSuccessDelete}
                                    onPostSuccessAddComment={props.onPostSuccessAddComment}
                                    onPostSuccessDeleteComment={props.onPostSuccessDeleteComment}
                                    />
                                :
                                <CommentItem 
                                    level={(level+1)}
                                    comment={row} post={postItem}
                                    auth={auth}
                                    listPostCommentsRoutinePromise={props.listPostCommentsRoutinePromise}
                                    updateCommentRoutinePromise={props.updateCommentRoutinePromise}
                                    onSuccessUpdate={onSuccessUpdate} onSuccessDelete={onSuccessDelete}
                                    onPostSuccessAddComment={props.onPostSuccessAddComment}
                                    onPostSuccessDeleteComment={props.onPostSuccessDeleteComment}
                                    onParentReply={setParentReply}
                                    />
                            }
                            </div>

                        ))}
                                

                    </Col>
                </Row>
                :
                <></>
            }

            {isReplying && 
                <>
                
                <Row>
                    <Col md={1}></Col>
                    <Col md={10} sm={24} xs={24} offset={1}>
                        <Text className="comment-action">Membalas komentar {replyToUser ? replyToUser.name : item.createdBy.name} </Text>
                    </Col>
                </Row>
                
                {item &&
                    <Row>
                        <Col md={24} sm={24} xs={24} className="mt-1 mb-3">
                            <FormComment auth={auth} formId={`${item.id}CommentReply`} 
                                level={level} 
                                post={postItem} replyTo={item} 
                                replyToUser={replyToUser ? replyToUser : item.createdBy} 
                                onSuccess={onSuccessAdd} />
                        </Col>
                    </Row>
                }
                </>
            }

            {nextCommentVisible && 
            <Row>
                <Col md={24} className="mb-3">
                    <Tooltip title="Lihat balasan selanjutnya">
                        <Button type="link" onClick={()=>viewNextComment(4)}><Icon size="1.3em" path={mdiDotsHorizontal}/></Button>
                    </Tooltip>
                </Col>
            </Row>
            }

        </Comment>

        </>
    )

}


// const MemoComment = React.memo(props=><CommentItem {...props}/>)
// export default MemoComment

export default connect(
    state=>({
        auth:state.auth,
        dispatch:state.dispatch
    }),
    (dispatch)=>({
            ...bindPromiseCreators({
            listPostCommentsRoutinePromise,
            updateCommentRoutinePromise
        },dispatch),dispatch
    })
)(CommentItem)
