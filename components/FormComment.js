import React from 'react'
import {connect} from 'react-redux'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { Row, Col,Form,Input,Comment,Avatar,Button, Typography} from 'antd'

const {Text} = Typography

const schema = yup.object().shape({
    content:yup.string().required("Isi komentar kamu").max(200,"Maksimal 200 karakter")
})

const FormComment = ({auth,...props}) => {

    const {createComment,updateComment} = props

    React.useEffect(()=>{

    },[])

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
        console.log(values)
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
                    <VuroxComponentsContainer className="p-4">
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
                    </VuroxComponentsContainer>
                </Col>
            </Row>

        </Form>
    )

    // return(
    //     <>  
    //         <Comment
                // avatar={
                //     <Avatar
                //         src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                //         alt={auth.user.name}/>
                // }

    //             content={
    //                 <Editor/>
    //             }
    //         />
    //     </>
    // )
}

export default connect(state=>state)(FormComment)