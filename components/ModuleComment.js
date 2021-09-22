import React from 'react'
import {connect} from 'react-redux'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { Row, Col,Form,Input,List,Comment,Avatar,Button, Typography,Tooltip} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { createCommentRoutinePromise,updateCommentRoutinePromise,listCommentsRoutinePromise} from 'State/routines/comment';
import CommentController from 'Library/controllers/CommentController';
import moment from 'moment'

moment.locale("id");

const {Text} = Typography

const schema = yup.object().shape({
    content:yup.string().required("Isi komentar kamu").max(200,"Maksimal 200 karakter")
})

const FormComment = ({item,...props}) => {

    const {auth,post,createComment,updateComment} = props

    const commentController = new CommentController(props)

    // React.useEffect(()=>{

    // },[])

    const { 
        handleSubmit,
        control,
        errors,
        reset
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                content:""
            }
        }) 

    const onSubmit = (values) => {

        values.accountId = post.account.id
        values.postId = post.id

        commentController._create(values)
            .then(comment=>{
                reset()
                props.onSuccess(comment.data)
            })
            .catch(error=>console.log(error))

    }

    const onError = (errors,e) => {
        console.log(errors)
    }

    return (
        <Form 
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}>

            <Row>
                <Col md={24} sm={24} xs={24}>
                    
                    <Row className="justify-content-end">
                        <Col md={1} sm={2} xs={2}>
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt={auth.user.name}/>
                        </Col>
                        <Col md={20} sm={22} xs={22}>
                            <Controller
                                name="content"
                                control={control}
                                render={props=>
                                    <Form.Item className="mb-0 ml-2">
                                        <Input.TextArea
                                            tabIndex="1"
                                            rows={1} autoSize
                                            disabled={createComment.isRequesting || updateComment.isRequesting}
                                            allowClear
                                            placeholder="Ketik komentar" value={props.value} onChange={props.onChange} />

                                    </Form.Item>
                                }
                            />
                        </Col>
                        <Col md={3} sm={6} xs={6}>
                            <Button 
                                tabIndex="2" type="primary" htmlType="submit"
                                className="ml-0 ml-md-2 mt-md-0 mt-3"
                                loading={createComment.isRequesting || updateComment.isRequesting} block>Kirim</Button>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>

        </Form>
    )
}

const ListComments = props =>  {

    const {auth,post,listComments} = props

    const commentController = new CommentController(props)

    const [items,setItems] = React.useState([])

    const [frm,setFrm] = React.useState(0)
    const [sze,setSze] = React.useState(5)
    
    const [prevCommentVisible, setPrevCommentVisible] = React.useState(false)

    React.useEffect(()=>{
        
        if(post.account){

            
            let size = 3
            let from = post.noOfAllComment - size
            
            if(from<=0){
                from = 0
                size = post.noOfAllComment
            }

            setSze(size)
            setFrm(from)

            listItems({
                accountId:post.account.id,
                postId:post.id,
                from,
                size
            })
        }

    },[post,listItems])


    React.useEffect(()=>{

        //console.log(`from : ${frm} - size : ${sze}`)

        if(frm<=0) setPrevCommentVisible(false)
        else setPrevCommentVisible(true)

    },[frm,sze])

    const viewPreviousPost = (size) =>{

        let from = frm - size

        if(from <= 0){
            size=frm //set size to the last position of from
            from=0
        }

        setFrm(from)
        setSze(size)

        listItems({
            accountId:post.account.id,
            postId:post.id,
            from:from,
            size:size
        })
    }

    const onReply = (item,index) => {
        console.log(item)
    }

    const renderData = (item,index) =>{

        const rendered = {
            actions : [<span key={`comment-list-reply-to-${index}`} onClick={()=>onReply(item,index)}>Reply</span>],
            author  : item.createdBy.name,
            avatar  : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content : item.content,
            datetime: (
                <Tooltip title={moment(item.createdAt).format("dddd, Do MMMM YYYY [jam] hh:mm")}>
                    <span>{moment(item.createdAt).fromNow()}</span>
                </Tooltip>
            ) 
        }

        return rendered

    }

    const listItems = async ({accountId,postId,orderBy="createdAt",direction="asc",from,size,statuses=[3]}) =>{ 

        try{
            const response = await commentController._list({
                accountId,postId,orderBy,direction,from,size,statuses
            })

            if(response.data.items){
                
                const recordData = []

                response.data.items.forEach((item,index)=>{

                    const rowData = renderData(item,index)
                    recordData.push(rowData)
                })
                
                setItems([...recordData,...(items || [])])
            }
           
        }
        catch(error){
            console.log(error)
        }

    }

    const onSuccess = comment =>{
        
        const rowData = renderData(comment,items.length)
        setItems([...items,rowData])

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
                    <List
                        loading={listComments.isRequesting}
                        className="comment-list"
                        itemLayout="horizontal"
                        dataSource={items}
                        renderItem={item => (
                        <li>
                            <Comment
                                actions={item.actions}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                            />
                        </li>
                        )}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={16} sm={24} xs={24}>
                    <FormComment onSuccess={onSuccess} {...props}/>   
                </Col>
            </Row>
        </>
    )

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            createCommentRoutinePromise,
            updateCommentRoutinePromise,
            listCommentsRoutinePromise
        },dispatch),dispatch
    })
)(ListComments)
