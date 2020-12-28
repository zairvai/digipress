import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Button,Modal,Typography,Tooltip,Input,Comment,Avatar } from 'antd'
import Permission from 'Library/controllers/Permission'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostCommentsRoutinePromise,updateCommentRoutinePromise } from 'State/routines/comment';
import CommentController from 'Library/controllers/CommentController';
import { DeleteFilled, EditFilled, CloseCircleFilled,ExclamationCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import HTML from 'Components/HTML'
import FormComment from 'Components/FormComment'
import moment from 'moment'

const CommentItem = props =>{ 

    const {auth,comment,post} = props

    const commentController = new CommentController(props)

    const {Text,Paragraph} = Typography
    const {confirm} = Modal

    const [replyToUser,setReplyToUser] = React.useState()
    const [itemReplyName,setItemReplyName] = React.useState()

    const [postItem,setPostItem] = React.useState()
    const [item,setItem] = React.useState()
    const [items,setItems] = React.useState([])

    const [prevCommentVisible, setPrevCommentVisible] = React.useState(false)
    const [nextCommentVisible, setNextCommentVisible] = React.useState(false)

    const [maxDate,setMaxDate] = React.useState(moment().toISOString())
    const [minDate,setMinDate] = React.useState()

    const [isFormVisible,setFormVisible] = React.useState(false)
    const [prevReplyingItem,setPrevReplyingItem] = React.useState()
    const [prevUpdatingItem,setPrevUpdatingItem] = React.useState()
    const [isUpdating,setUpdating] = React.useState(false)
    const [isReplying,setReplying] = React.useState(false)
    const [isParentUpdating,setParentUpdating] = React.useState(false)

    const isMounted = React.useRef()

    React.useEffect(()=>{
        
        isMounted.current=true

        if(isMounted.current){
            if(post) setPostItem(post)
        }

        return ()=>isMounted.current=false

    },[post])

    React.useEffect(()=>{
        isMounted.current = true
        if(isMounted.current){
            
            setItem(comment)

            if(comment.replyToUser){

                let replyName = ""
                if(auth.user.id==comment.replyToUser.id) replyName = "kamu"
                else replyName = comment.replyToUser.name

                setItemReplyName(<Text className="comment-action d-block"><RollbackOutlined rotate={180} /> mengomentari {replyName}</Text>)
            }

            // setPrevCommentVisible(true)

            // if(comment.replies){
            //     const length = comment.replies.length
            //     setPrevCommentVisible(true)
            //     setNextCommentVisible(true)

            //     setMaxDate(comment.replies[0].createdAt)
            //     setMinDate(comment.replies[length-1].createdAt)
                
            //     setItems(comment.replies)
            // }

        }
        return ()=>isMounted.current = false
    },[comment])


    // React.useEffect(()=>{

    //     console.log(isUpdating)
    //     if(isReplying || isUpdating) setParentUpdating(true)
    //     else setParentUpdating (false)

    // },[isReplying,isUpdating])

    React.useEffect(()=>{
        
        console.log(item)
        console.log("parentUpdating : " + props.isParentUpdating)

        if(props.isParentUpdating){
            handleOnCancelUpdateItem()
            handleOnCancelReplyItem()
        }

    },[props.isParentUpdating])

    React.useEffect(()=>{
        isMounted.current = true
        if(isMounted.current){
            if(item) setUpdating(item.isUpdating)
        }
        return ()=>isMounted.current = false

    },[item && item.isUpdating===true])

    React.useEffect(()=>{
        isMounted.current = true
        if(isMounted.current){
            if(item) setReplying(item.isReplying)
        }
        return ()=>isMounted.current = false

    },[item && item.isReplying===true])

    const fetchItems = async ({accountId,postId,replyToId,orderBy="createdAt",direction="desc",minDate,maxDate,size,statuses=[3]}) =>{ 


        // console.log(items)

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

    const replyComment = repliedItem => { 
        props.onReplying(repliedItem)
    }
    const updateComment = updatedItem =>{
        props.onUpdating(updatedItem)
    }

    const cancelUpdate = updatedItem => {
        props.onCancelUpdate(updatedItem)
    }

    const onSuccessAdd = addedItem =>{
        setItems([...items,addedItem])
        if(props.onPostSuccessAddComment) props.onPostSuccessAddComment(addedItem)
    }

    const onSuccessUpdate = updatedItem => {
        setUpdating(false)
    }

    // const onSuccessDelete = (comment,index) => {

    //     const cloneItems = [...items]

    //     cloneItems.splice(index,1)

    //     setItems(cloneItems)
        
    //     if(props.onPostSuccessDeleteComment) props.onPostSuccessDeleteComment(comment)

    // }

    const showDeleteConfirm = deletedItem => {

        confirm({
          title: `Apa kamu ingin menghapus komentar ini ?`,
          icon: <ExclamationCircleOutlined />,
          content: <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'Buka' }}>{item.content}</Paragraph>,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

			commentController._delete(deletedItem)
				.then(resp=>{
                    if(props.onSuccessDelete) props.onSuccessDelete(deletedItem)
                })
				.catch(error=>console.log(error))

          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const handleOnUpdatingItem = updatingItem =>{

        console.log("updating : " +  updatingItem.content)

        handleOnCancelReplyItem()
        setFormVisible(false)

        const tempItems = _.cloneDeep(items)
        console.log(tempItems)

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

        //cancel any update and reply activity in parent
        if(props.onCancelUpdate) props.onCancelUpdate()
        if(props.onCancelReply) props.onCancelReply()

    }

    

    const handleOnReplyingItem = replyingItem => {
        
        console.log("onReplying")

        handleOnCancelUpdateItem()
        setFormVisible(false)

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

    }

    const handleOnCancelUpdateItem = updatingItem => {

        console.log("canceling update")
        const tempItems = _.cloneDeep(items)

        //closePrev item which is updating
        if(prevUpdatingItem){
            console.log(prevUpdatingItem)
            const index = tempItems.findIndex(obj=>obj.id===prevUpdatingItem.id)
            const tempItem = tempItems[index]
            tempItem.isUpdating = false

            console.log(tempItems)

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

    

    const openForm = () => {
        handleOnCancelUpdateItem()
        handleOnCancelReplyItem()
        setFormVisible(true)
    }

    return(
        <>
        <Comment
            
            actions={[
                <>
                {
                    (item && Permission.REPLY_COMMENT({auth,item})) && 
                    <span key={`comment-list-reply-to-${item.id}`} onClick={(e)=>replyComment(item)}>Balas</span>
                }
                </>,
                
                <>
                {
                    (item && Permission.DELETE_COMMENT({auth,item})) && 
                    <Tooltip key="comment-delete" title="Hapus">
                        <span onClick={()=>showDeleteConfirm(item)}>
                            {React.createElement(DeleteFilled)}
                        </span>
                    </Tooltip>
                }
                </>,
                <>
                {
                    isUpdating ? 
                    <Tooltip key="comment-edit" title="Tutup">
                        <span onClick={()=>cancelUpdate(item)}>
                            {React.createElement(CloseCircleFilled)}
                        </span>
                    </Tooltip>
                    :
                    (item && Permission.UPDATE_COMMENT({auth,item}) && !isUpdating) && 
                    <Tooltip key="comment-edit" title="Ubah">
                        <span onClick={()=>updateComment(item)}>
                            {React.createElement(EditFilled)}
                        </span>
                    </Tooltip>
                
                }
                </>,
                
                <>
                    {(item && item.noOfReply && item.noOfReply > 0 ) ? 
                    <span className="ml-3" key={`comment-list-replyno-${item.id}`} onClick={(e)=>viewReplies(item,2)}>Lihat {item.noOfReply} balasan</span>
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
                        <Col md={24}>
                            {itemReplyName}

                            {item && 
                                <>
                                    {isUpdating ? 
                                    <div>
                                        <FormComment auth={auth} formId={`${item.id}CommentUpdate`} className="my-2" 
                                            noAvatar={true} item={item} 
                                            onSuccess={onSuccessUpdate}/>
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
                        <Button type="link" onClick={()=>viewPreviousComment(4)}>Lihat balasan sebelumnya</Button>
                    </Col>
                </Row>
            }
            
            {items? 
                <Row>
                    <Col md={16} sm={24} xs={24}>
                        {items.map(row=>(
                            <CommentItem 
                                key={row.id}
                                auth={auth} comment={row} post={postItem}
                                onUpdating={handleOnUpdatingItem} onReplying={handleOnReplyingItem} 
                                onCancelUpdate={handleOnCancelUpdateItem} onCancelReply={handleOnCancelReplyItem}
                                isParentUpdating={isParentUpdating}
                                isGrandChild={true}/>
                        ))}
                                

                    </Col>
                </Row>
                :
                <></>
            }

            {isReplying && 
                <>
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
                            <FormComment auth={auth} formId={`${item.id}CommentReply`}  
                                post={postItem} replyTo={item} 
                                replyToUser={replyToUser} 
                                onSuccess={onSuccessAdd} />
                        </Col>
                    </Row>
                }
                </>
            }

            {nextCommentVisible && 
            <Row>
                <Col md={24} className="mb-3">
                    <Button type="link" onClick={()=>viewNextComment(4)}>Lihat balasan lainnya</Button>
                </Col>
            </Row>
            }

        </Comment>

        </>
    )

}


const MemoComment = React.memo(props=><CommentItem {...props}/>)
export default MemoComment

// export default connect(
//     (dispatch)=>({
//             ...bindPromiseCreators({
//             listPostCommentsRoutinePromise,
//             updateCommentRoutinePromise
//         },dispatch),dispatch
//     })
// )(MemoComment)
