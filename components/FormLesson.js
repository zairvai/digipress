import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Form,Input,Button, Divider,InputNumber,Typography} from 'antd'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import TinyMce from 'Components/TinyMce'
import Media from 'Components/Media'
import { bindPromiseCreators } from 'redux-saga-routines';
import { createLessonRoutinePromise,updateLessonRoutinePromise} from 'State/routines/lesson';
import LessonController from 'Library/controllers/LessonController';


const {Text} = Typography

//validation schema
const schema = yup.object().shape({
    title:yup.string().required("Mohon ketik judul materi").max(100,"Judul tidak melebihi 100 karakter"),
    content:yup.string(),
    seq:yup.number().typeError("Mohon masukkan urutan materi dalam pelajaran.").required("Mohon masukkan urutan materi dalam pelajaran")
})

const FormLesson = ({item,...props}) => {

    const {auth,createLesson,updateLesson} = props

    const lessonController = new LessonController(props)

    const [isSubmitting,setSubmitting] = React.useState(false)

    const [editor,setEditor] = React.useState()
    const [content,setContent] = React.useState("")
    const [isOpenMedia,setOpenMedia] = React.useState(false)

    const isMounted = React.useRef()

    React.useEffect(()=>{

        document.addEventListener("openTinymceMedia",function(e){
            const {editor} = e.detail
            setEditor(editor)
            setOpenMedia(true)
        },false)
        return()=>{
            document.removeEventListener("openTinymceMedia",function(e){
                setOpenMedia(true)
            },false)
            setEditor(null)
        }
    },[])
    
    React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){

            if(item){                

                setValue("title",item.title)
                setValue("seq",item.seq)          
                setValue("content",item.content)

                setContent(item.content)

            }
  
        }

        return ()=>{
            isMounted.current=false
        }
        
    },[item])

    React.useEffect(()=>{

        if(content && editor){
            editor.setContent(content)
        }
    },[content,editor])

    const {
        handleSubmit,
        reset,
        control,
        formState:{errors},
        setValue
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                title: "",
                content: "",
                seq:1
            }
    })

    const onSubmit = (values,e) => {

        setSubmitting(true)

        if(item) {
            values.updatedByid = auth.user.id
            lessonController._update(item,values)
                .then(lesson=>props.onSuccess(lesson.data))
                .catch(error=>console.log(error))
        }else{
            values.accountId = props.accountId
            values.postId = props.postId
            values.createdById = auth.user.id
            values.updatedByid = auth.user.id
            lessonController._create(values)
                .then(lesson=>props.onSuccess(lesson.data))
                .catch(error=>console.log(error))
        }
    }

    const onError = (errors,e) => {
    }

    const handleEditorSetup = editor =>{
        setEditor(editor)
    }

    const handleEditorRemove = editor =>{
        console.log("removed : " + editor)
    }

    const handleEditorChange = editor =>{
        setValue("content",editor.getContent().replace(/\r?\n|\r/g,""))
    }

    const handleSelectedMedia = selectedMedias => {

        setOpenMedia(false)
        
        if(selectedMedias.length > 0){
            let mediaDom = ""
            selectedMedias.forEach((media,index)=>{
                if(media.type=="image") {
                    const url = encodeURI(`${media.baseURL}/500xauto/${media.key}`)
                    mediaDom += `<img width="400" src="${url}" class="media-${index} content-align-left"/>`
                }else if(media.type=="youtube"){
                    const url = `https://www.youtube.com/embed/${media.youtubeId}?rel=0&modestbranding=1`
                    mediaDom += `<iframe width="500" height="350" src="${url}" frameboder="0" allowfullscreen="allowfullscreen"></iframe>`
                }
            })
            
            editor.execCommand('mceInsertContent', false,mediaDom);
        }
    }


    return (
        <>
            <Media editor={editor} visible={isOpenMedia} onCancel={()=>setOpenMedia(false)} onOK={handleSelectedMedia}/>
            <Form
                layout="vertical"
                onFinish={handleSubmit(onSubmit,onError)}
            >
            
                <VuroxComponentsContainer className="p-4">
                    <Row>
                        <Col md={24}>
                            <Controller
                                name="title"
                                defaultValue=""
                                control={control}
                                render={props=>
                                    <Form.Item label="Judul materi">
                                        <Input 
                                            tabIndex="1"
                                            disabled={isSubmitting}
                                            size="large" placeholder="Pelajaran" 
                                            value={props.field.value} 
                                            onChange={props.field.onChange} />
                                        {errors && errors.title && <Text type="danger">{errors.title.message}</Text>}
                                    </Form.Item>
                                }
                            />
                            
                        </Col>
                    </Row>


                    <Row>
                        <Col md={8}>
                            <Controller
                                name="seq"
                                defaultValue=""
                                control={control}
                                render={props=>
                                    <Form.Item label="Urutan">
                                        <InputNumber
                                            tabIndex="2"
                                            min={1}
                                            max={100} 
                                            disabled={isSubmitting}
                                            size="large" placeholder="1" 
                                            value={props.field.value} 
                                            onChange={props.field.onChange} />
                                        {errors && errors.seq && <div><Text type="danger">{errors.seq.message}</Text></div>}
                                    </Form.Item>
                                }
                            />
                            
                        </Col>
                    </Row>
                
                    <Row>
                        <Col md={24}>
                            
                            <Controller
                                name="content"
                                defaultValue=""
                                control={control}
                                render={props=>
                                    <Form.Item label="Isi materi" className="mb-0">
                                        <TinyMce 
                                            id="frmLesson"
                                            className="editor"
                                            tabIndex="3"
                                            isSubmitting={isSubmitting}
                                            minHeight={300}
                                            onFinishSetup={handleEditorSetup} 
                                            onRemove={handleEditorRemove}
                                            onChange={handleEditorChange} 
                                            value={props.field.value} placeholder="Ketik isi materi..."/>
                                        
                                    </Form.Item>
                                }
                            />
                            
                        </Col>
                    </Row>
                </VuroxComponentsContainer>

                <Divider className="m-0" />

                <VuroxComponentsContainer className="px-4 py-3">
                    <Row className="justify-content-end">
                        <Col md={4} sm={8} xs={12}  >
                            <Button tabIndex="7" disabled={isSubmitting} onClick={props.onCancel} danger type="link" block>Batal</Button>
                        </Col>
                        <Col md={4} sm={8} xs={12} className="fright">
                            <Button tabIndex="8" type="primary" htmlType="submit" loading={isSubmitting} block>Kirim</Button>
                        </Col>
                    </Row>

                </VuroxComponentsContainer>
                
            </Form>
        </>
    )


}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
            createLessonRoutinePromise,
            updateLessonRoutinePromise
        },dispatch),dispatch
    })
)(FormLesson)