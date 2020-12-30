import React from 'react'
import {connect} from 'react-redux'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Row, Col,Form,Avatar,Button, Typography} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { createCommentRoutinePromise,updateCommentRoutinePromise} from 'State/routines/comment';
import CommentController from 'Library/controllers/CommentController';
import CommentEditor from 'Components/TinyMce'

const {Text} = Typography

const schema = yup.object().shape({
    hiddenContent:yup.string().required("Isi komentar kamu").max(500,"Maksimal 500 karakter")
})

const FormComment = ({formId,item,...props}) => {

    console.log(props)
    
    const {auth,post,replyTo} = props
    
    const commentController = new CommentController(props)
    const [replyToUser,setReplyToUser] = React.useState()
    const [isSubmiting,setSubmiting] = React.useState(false)
    const [content,setContent] = React.useState("")
    const isMounted = React.useRef()

    React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current) {
            if(props.replyToUser){
                
                setReplyToUser(props.replyToUser)
                if(props.level > 1){
                    setValue("content",props.replyToUser.name)
                    setContent(`@${props.replyToUser.name}...`)
                }

                //console.log(replyToUser)
            }
        }

        return ()=>isMounted.current = false

    },[props.replyToUser])

    React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){

            if(item){
                //console.log(item.content)
                
                setContent(item.content)
                setValue("content",item.content)
            }
        }
        return ()=>isMounted.current = false

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
                content:"",
                hiddenContent:""
            }
        }) 

    

    const onSubmit = (submitValues) => {

        //remove hiddencontent to submit to db
        const  {hiddenContent,...rest} = submitValues

        const values = rest

        setSubmiting(true)

        //setTimeout(()=>setSubmiting(false),5000)

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

    const handleEditorFocusOut = () => {
        if(props.onFocusOut) props.onFocusOut()
    }
    const handleEditorChange = editor =>{
        setValue("content",editor.getContent().replace(/\r?\n|\r/g,""))
        setValue("hiddenContent",editor.getContent({format:'text'}).replace(/\r?\n|\r/g,""))
    }
    return (
        <Form 
            layout="vertical">

            <Row>
                <Col md={24} sm={24} xs={24} className={props.className}>
                    
                    <Row>
                        {!props.noAvatar && 
                            <Col md={2} sm={4} xs={4}>
                                <Avatar
                                    className="mr-2"
                                    src="/image/default_user.jpg"
                                    alt={auth && auth.user.name}/>
                            </Col>
                        }
                        <Col md={18} sm={20} xs={20}>
                            <Controller
                                name="content"
                                control={control}
                                render={props=>
                                    <Form.Item className="mb-0">
                                        
                                        <CommentEditor 
                                            mode="basic"
                                            id={formId}
                                            className="editor"
                                            height={80}
                                            bottomMargin={1}
                                            content={content}
                                            value={props.value} 
                                            placeholder={auth && auth.user.name}
                                            isSubmitting={isSubmiting}
                                            onChange={handleEditorChange} 
                                            onFocusOut={handleEditorFocusOut}
                                            onPressEnter={handleSubmit(onSubmit,onError)}
                                            />


                                        {errors && errors.hiddenContent && <Text type="danger">{errors.hiddenContent.message}</Text>}
                                    </Form.Item>
                                }
                            />

                            <Controller
                                name="hiddenContent"
                                control={control}
                                render={props=><input type="hidden" value={props.value}/>}/>
                        </Col>
                        {/* <Col md={4} sm={7} xs={7}>
                            <Button 
                                tabIndex="2" type="primary" htmlType="submit"
                                className="ml-0 ml-md-2 mt-md-0 mt-2"
                                loading={isSubmiting} block>Kirim</Button>
                        </Col> */}
                    </Row>
                    
                </Col>
            </Row>

        </Form>
    )
}

const MemoForm = React.memo(props=><FormComment {...props}/>)

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
            createCommentRoutinePromise,
            updateCommentRoutinePromise
        },dispatch),dispatch
    })
)(MemoForm)
