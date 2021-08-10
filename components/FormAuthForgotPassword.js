import React from 'react'
import {connect} from 'react-redux'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { MailOutlined} from '@ant-design/icons';
import { Row, Col,Button, Alert,Form,Input,Typography} from 'antd'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { bindPromiseCreators } from 'redux-saga-routines';
import { forgotPasswordRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import {authError} from 'Helper/errors'

const {Text} = Typography

const schema = yup.object().shape({
    email:yup.string().required("Mohon ketik email kamu")
})

const FormAuth = props => {    
    
    const {auth} = props
    const [isSubmitting,setSubmitting] = React.useState(false)
    const [error,setError] = React.useState()

    const authController = new AuthController(props)

    const {
        handleSubmit,
        reset,
        control,
        formState:{errors}
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                email: ""
            }
    })


    const onSubmit = values =>{

        setSubmitting(true)

        authController._forgotPassword(values.email)
            .then((data)=>{
                if(props.onSuccess) props.onSuccess()
            })
            .catch(errors=>{
                
                console.log(errors)
                setSubmitting(false)

                const error = authError(errors.error)
                setError(error)
                
            })
    }

    const onError = (errors,e) => {
        
    }


    return (
        <Form 
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}>
           
            <VuroxComponentsContainer className="p-4">

                <Row>
                    <Col md={24}>
                        <Alert
                            className="mb-3"
                            message="Perubahan password"
                            description="Untuk mengubah password anda, mohon ketik email yang sudah diverifikasi."
                            type="info"
                            showIcon
                        />
                    </Col>
                </Row>


                {error  &&   <Row>
                                <Col md={24} xs={24}>
                                    <Alert className="mb-3"
                                        message="Error"
                                        description={error.message}
                                        type="error"
                                        showIcon
                                        />
                                </Col>
                            </Row>
                }
                
                
                <Row>
                    <Col md={24} xs={24}>
                        <Controller
                            name="email"
                            defaultValue=""
                            control={control}
                            render={props=>
                                <Form.Item label="Email">
                                    <Input 
                                        size="large"  
                                        prefix={<MailOutlined className="site-form-item-icon" />} 
                                        disabled={isSubmitting}
                                        placeholder="Email address"
                                        autoComplete="off"
                                        type="email"
                                        value={props.field.value} 
                                        onChange={props.field.onChange} />
                                    {errors && errors.email && <Text type="danger">{errors.email.message}</Text>}
                                </Form.Item>
                            }
                        />
                    </Col>
                </Row>
                
                <Row>
                    <Col md={12} sm={24} xs={24} className="pt-2">
                        <Button  onClick={props.onCancel} type="link" className="p-0" disabled={isSubmitting}>Kembali ke halaman login</Button>
                    </Col>
                    <Col md={12} sm={24} xs={24} className="fright">
                        <Button className="mt-md-0 mt-3" size="large" type="primary" htmlType="submit" block loading={isSubmitting}>Ganti Password</Button>
                    </Col>
                </Row>
            </VuroxComponentsContainer>
             
        </Form>   
    );
}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
            forgotPasswordRoutinePromise
        },dispatch),dispatch
    })
)(FormAuth)