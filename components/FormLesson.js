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
import { bindPromiseCreators } from 'redux-saga-routines';
import { createLessonRoutinePromise,updateLessonRoutinePromise} from 'State/routines/lesson';
import LessonController from 'Library/controllers/LessonController';
import { selectInput } from 'aws-amplify'


const {Text} = Typography

//validation schema
const schema = yup.object().shape({
    title:yup.string().required("Mohon ketik judul materi").max(100,"Judul tidak melebihi 100 karakter"),
    content:yup.string(),
    seq:yup.number().typeError("Mohon masukkan urutan materi dalam pelajaran.").required("Mohon masukkan urutan materi dalam pelajaran")
})

const FormLesson = ({item,...props}) => {

    const {createLesson,updateLesson} = props

    const lessonController = new LessonController(props)

    const [editorAvail,setEditorAvail] = React.useState(false)
    React.useEffect(()=>{

        if(item){

            setValue("title",item.title)
            setValue("seq",item.seq)          
            setValue("content",item.content)
  
        }
        
    },[item])


    const {
        handleSubmit,
        reset,
        control,
        errors,
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

        if(item) {
            lessonController._update(item,values)
                .then(lesson=>props.onSuccess(lesson.data))
                .catch(error=>console.log(error))
        }else{
            values.accountId = props.accountId
            values.postId = props.postId
            lessonController._create(values)
                .then(lesson=>props.onSuccess(lesson.data))
                .catch(error=>console.log(error))
        }
    }

    const onError = (errors,e) => {

        console.log(errors,e)

    }

    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}
        >
            <Row>
                <Col md={18}>
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
                                                disabled={createLesson.isRequesting || updateLesson.isRequesting}
                                                size="large" placeholder="Pelajaran" value={props.value} onChange={props.onChange} />
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
                                                disabled={createLesson.isRequesting || updateLesson.isRequesting}
                                                size="large" placeholder="1" value={props.value} onChange={props.onChange} />
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
                                                tabIndex="3"
                                                content={item ? item.content : ""}
                                                disabled={createLesson.isRequesting || updateLesson.isRequesting}
                                                minHeight={300}
                                                id="lessonEditor" onChange={props.onChange} value={props.value} placeholder="Ketik isi materi..."/>
                                            
                                        </Form.Item>
                                    }
                                />
                                
                            </Col>
                        </Row>
                    </VuroxComponentsContainer>

                    <Divider className="m-0" />

                    <VuroxComponentsContainer className="px-4 py-3">
                        <Row className="justify-content-end">
                            <Col md={6} sm={8} xs={12}  >
                                <Button tabIndex="7" disabled={createLesson.isRequesting || updateLesson.isRequesting} onClick={props.onCancel} danger type="link" block>Batal</Button>
                            </Col>
                            <Col md={6} sm={8} xs={12} className="fright">
                                <Button tabIndex="8" type="primary" htmlType="submit" loading={createLesson.isRequesting || updateLesson.isRequesting} block>Kirim</Button>
                            </Col>
                        </Row>

                    </VuroxComponentsContainer>
                </Col>
            </Row>
        </Form>
    )


}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            createLessonRoutinePromise,
            updateLessonRoutinePromise
        },dispatch),dispatch
    })
)(FormLesson)