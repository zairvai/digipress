import React from 'react'
import {connect} from 'react-redux'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Row, Col,Form,Avatar,Button, Typography,Divider} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { createQnaRoutinePromise,updateQnaRoutinePromise} from 'State/routines/qna';
import QnaController from 'Library/controllers/QnaController';
import QnaEditor from 'Components/TinyMce'

const {Text} = Typography


const FormQna = ({formId,item,...props}) => {

    const schema = yup.object().shape({
        hiddenContent:yup.string()
                .required(props.qnaType== 'ques' ? "Silahkan isi pertanyaan kamu." : "Silahkan isi jawaban kamu.")
                .max(500,"Maksimal 500 karakter")
    })
    
    const {auth,lesson,replyTo} = props
    
    const qnaController = new QnaController(props)
    const [replyToUser,setReplyToUser] = React.useState()
    const [isSubmiting,setSubmiting] = React.useState(false)

    const [editor,setEditor] = React.useState()
    const isMounted = React.useRef()

    React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current) {
            if(props.replyToUser) setReplyToUser(props.replyToUser)
        }

        return ()=>isMounted.current = false

    },[props.replyToUser])

    React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){

            if(item){
                //console.log(item.content)

                if(editor) editor.setContent(item.content)
                
                // setContent(item.content)
                setValue("content",item.content)
            }

        }

        return ()=>{
            isMounted.current=false
            setValue("content","")
            if(editor) editor.setContent("")
        }
        

    },[item,editor])

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

        if(item){
            // console.log("qnaType : " + props.qnaType)
            if(props.qnaType=="ques"){
                qnaController._update(item,values)
                    .then(question=>{
                        props.onSuccess(question.data)
                        setSubmiting(false)
                    })
                    .catch(error=>console.log(error))
            }
            else if(props.qnaType=="ans"){

                qnaController._update(item,values)
                    .then(answer=>{
                        const question = answer.data.replyTo
                        props.onSuccess(question)
                        setSubmiting(false)
                    })
                    .catch(error=>console.log(error))
            }
        }
        else{

            values.accountId = lesson.account.id
            values.postId = lesson.post.id
            values.lessonId = lesson.id

            values.qnaType = props.qnaType

            if(props.qnaType=="ans") values.status = 3 
            else values.status = 2 //set status to pending / unanswered
            
            if(replyTo) values.replyToId = replyTo.id
            if(replyToUser) values.replyToUserId = replyToUser.id

            if(props.qnaType=="ques"){

                // console.log(values)
                // setSubmiting(false)
                qnaController._create(values)
                    .then(question=>{
                        reset()
                        props.onSuccess(question.data)
                        setSubmiting(false)
                    })
                    .catch(error=>console.log(error))
            }
            else if(props.qnaType=="ans"){
                qnaController._create(values)
                    .then(answer=>{
                        //update pertanyaan jadi terjawab status = 3
                        return qnaController._update(replyTo,{status:3,lessonId:lesson.id})
                    })
                    .then(replyTo=>{
                        reset()
                        props.onSuccess(replyTo.data)  
                        setSubmiting(false)      
                    })
                    .catch(error=>console.log(error))
            }
        }

    }

    const onError = (errors,e) => {
        // console.log(errors)
    }

    const handleEditorSetup = editor =>{
        setEditor(editor)
    }

    const handleEditorFocusOut = () => {
        if(props.onFocusOut) props.onFocusOut()
    }

    const handleEditorChange = editor =>{
        setValue("content",editor.getContent().replace(/\r?\n|\r/g,""))
        setValue("hiddenContent",editor.getContent({format:'text'}).replace(/\r?\n|\r/g,""))
    }
    
    return (
        <Form layout="vertical" onFinish={handleSubmit(onSubmit,onError)}>
            <Row>
                {!props.noAvatar && 
                    <Col md={1} sm={4} xs={4}>
                        <Avatar
                            className="mr-2"
                            src="/image/default_user.jpg"
                            alt={auth && auth.user.name}/>
                    </Col>
                }
                <Col md={23} sm={20} xs={20}>
                    <Controller
                        name="content"
                        control={control}
                        render={props=>
                            <Form.Item className="mb-0">
                                
                                <QnaEditor 
                                    mode="basic"
                                    id={formId}
                                    className="editor"
                                    height={80}
                                    bottomMargin={1}
                                    value={props.value} 
                                    placeholder={auth && auth.user.name}
                                    isSubmitting={isSubmiting}
                                    onFinishSetup={handleEditorSetup} 
                                    onChange={handleEditorChange} 
                                    onFocusOut={handleEditorFocusOut}
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
            </Row>


            <Row className="justify-content-end mt-3">
                {props.onCancel && 
                    <Col md={6} sm={8} xs={12}  >
                        <Button tabIndex="7" disabled={isSubmiting} onClick={props.onCancel} danger type="link" block>Batal</Button>
                    </Col> 
                }
                <Col md={4} sm={8} xs={12} className="fright">
                    <Button tabIndex="8" type="primary" htmlType="submit" loading={isSubmiting} block>Kirim</Button>
                </Col>
            </Row>

        </Form>
    )
}

const MemoForm = React.memo(props=><FormQna {...props}/>)

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
            createQnaRoutinePromise,
            updateQnaRoutinePromise
        },dispatch),dispatch
    })
)(MemoForm)
