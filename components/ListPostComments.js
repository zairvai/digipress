import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Button,Input,List,Avatar,Tooltip } from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostCommentsRoutinePromise,getCommentRoutinePromise,updateCommentRoutinePromise } from 'State/routines/comment';
import { UpOutlined,DownOutlined} from '@ant-design/icons'
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

    const [isFormVisible,setFormVisible] = React.useState(false)
    
    const isMounted = React.useRef()


    React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){
            
            if(post.account){
                
                setPostItem(post)

                if(commentId){
                    getItem(commentId) 
                }
                else{
                    fetchItems({
                        accountId:post.account.id,
                        postId:post.id,
                        maxDate,
                        size:2
                    })
                }
            }
        }

        return ()=>isMounted.current = false

    },[post,commentId])

    const getItem = async (id)=>{

        try{
            
            const response = await commentController._get(id)

            if(response.data){

                let isReplyTo = true
                
                let comment = _.cloneDeep(response.data)
                
                if(comment.replyTo){
                    
                    let parentComment 

                    do{
                        if(comment.replyTo){
                            parentComment = _.cloneDeep(comment.replyTo)
                            parentComment.replies = [comment]
                            comment = _.cloneDeep(parentComment)
                        }else{
                            isReplyTo = false
                        }

                    }while(isReplyTo)

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

            if(response.data && response.data.items) {
                
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

    const onSuccessAdd = addedItem =>{
        setItems([...items,addedItem])
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

        const cloneItems = [...items]

        const index = cloneItems.findIndex(obj=>obj.id==deletedItem.id)

        if(index > -1){
            cloneItems.splice(index,1)

            setItems(cloneItems)
            
            if(props.onPostSuccessDeleteComment) props.onPostSuccessDeleteComment(deletedItem)
        }

    }

    const openForm = () => {
        setFormVisible(true)
    }
    const closeForm = () =>{
        console.log("close")
        setFormVisible(false)
    }

    
    return (
        <>
            {prevCommentVisible && 
                <Row>
                    <Col md={24}>
                        {/* <Tooltip title="Lihat komentar sebelumnya">
                            <Button type="primary" icon={<UpOutlined/>} shape="circle" onClick={()=>viewPreviousComment(4)}/>
                        </Tooltip>
                         */}
                         <Button type="link" onClick={()=>viewPreviousComment(4)}>Lihat komentar sebelumnya</Button>
                    </Col>
                </Row>
            }
            {items ? 
                <Row>
                    <Col md={16} sm={24} xs={24}>
                    
                        {items.map(row=>(
                            <CommentItem 
                                level={1}
                                key={row.id}
                                comment={row} post={postItem}
                                onSuccessUpdate={onSuccessUpdate} onSuccessDelete={onSuccessDelete}
                                onPostSuccessAddComment={props.onPostSuccessAddComment}
                                onPostSuccessDeleteComment={props.onPostSuccessDeleteComment}
                                />
                        ))}
                        

                    </Col>
                </Row>
                :
                <></>
            }
            {nextCommentVisible && 
                <Row>
                    <Col md={24} className="mb-3">
                        {/* <Tooltip title="Lihat komentar lainnya">
                            <Button type="primary" icon={<DownOutlined/>} shape="circle" onClick={()=>viewNextComment(4)}/>
                        </Tooltip> */}
                        <Button type="link" onClick={()=>viewNextComment(4)}>Lihat komentar selanjutnya</Button>
                    </Col>
                </Row>
            }
            {postItem && 
                <Row>
                    <Col md={14} sm={24} xs={24} className="mt-2">
                        {isFormVisible ?
                            <FormComment formId={`${postItem.id}PostComment`} 
                                post={postItem} 
                                onFocusOut={closeForm}
                                onSuccess={onSuccessAdd}/>   
                        
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
