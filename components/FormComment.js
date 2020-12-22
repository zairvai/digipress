import React from 'react'
import {connect} from 'react-redux'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { Row, Col,Form,Input,List,Comment,Avatar,Button, Typography} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { createCommentRoutinePromise,updateCommentRoutinePromise} from 'State/routines/comment';
import CommentController from 'Library/controllers/CommentController';
 
const {Text} = Typography

const schema = yup.object().shape({
    content:yup.string().required("Isi komentar kamu").max(500,"Maksimal 600 karakter")
})

const FormComment = ({item,...props}) => {

    const {auth,post,replyTo,createComment,updateComment} = props

    const commentController = new CommentController(props)
    const [replyToUser,setReplyToUser] = React.useState()
    const [isSubmiting,setSubmiting] = React.useState(false)

    const contentRef = React.useRef()

    React.useEffect(()=>{
        contentRef.current.focus()
    },[])

    React.useEffect(()=>{

       setReplyToUser(props.replyToUser)

    },[props.replyToUser])

    React.useEffect(()=>{

        if(item){
            setValue("content",item.content)
        }

    },[item])

    const { 
        handleSubmit,
        control,
        errors,
        setValue,
        reset
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                content:""
            }
        }) 

    const onSubmit = (values) => {

        setSubmiting(true)

        if(item){

            commentController._update(item,values)
                .then(comment=>{
                    props.onSuccess(comment.data)
                    setSubmiting(false)
                })
                .catch(error=>console.log(error))

        }
        else{

            values.accountId = post.account.id
            values.postId = post.id
            
            if(replyTo) values.replyToId = replyTo.id
            if(replyToUser) values.replyToUserId = replyToUser.id

            commentController._create(values)
                .then(comment=>{
                    reset()
                    props.onSuccess(comment.data)
                    setSubmiting(false)
                })
                .catch(error=>console.log(error))

        }
    }

    const onError = (errors,e) => {
        console.log(errors)
    }

    return (
        <Form 
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}>

            <Row>
                <Col md={24} sm={24} xs={24} className={props.className}>
                    
                    {/* {errors && errors.content && 
                    <Row>
                        <Col md={22} offset={2}><Text type="danger">{errors.content.message}</Text></Col>
                    </Row>
                    } */}
                    <Row className="justify-content-end">
                        <Col md={1} sm={4} xs={4}>
                            <Avatar
                                src="/image/default_user.jpg"
                                alt={auth.user.name}/>
                        </Col>
                        <Col md={19} sm={20} xs={20}>
                            <Controller
                                name="content"
                                control={control}
                                render={props=>
                                    <Form.Item className="mb-0 ml-2">
                                        
                                        <Input.TextArea
                                            ref={contentRef}
                                            tabIndex="1"
                                            rows={1} autoSize
                                            disabled={isSubmiting}
                                            allowClear
                                            placeholder="Ketik komentar" value={props.value} onChange={props.onChange} />
                                        
                                        {errors && errors.content && <Text type="danger">{errors.content.message}</Text>}
                                    </Form.Item>
                                }
                            />
                        </Col>
                        <Col md={4} sm={7} xs={7}>
                            <Button 
                                tabIndex="2" type="primary" htmlType="submit"
                                className="ml-0 ml-md-2 mt-md-0 mt-2"
                                loading={isSubmiting} block>Kirim</Button>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>

        </Form>
    )
}


export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            createCommentRoutinePromise,
            updateCommentRoutinePromise
        },dispatch),dispatch
    })
)(FormComment)
