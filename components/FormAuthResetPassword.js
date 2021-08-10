import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { LockOutlined, LockTwoTone,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import { Row, Col,Button, Alert,Form,Input,Typography} from 'antd'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { bindPromiseCreators } from 'redux-saga-routines';
import { resetPasswordRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import {authError} from 'Helper/errors'

const {Text} = Typography

const schema = yup.object().shape({
    email:yup.string().required().email(),
    code:yup.number().typeError("Kode konfirmasi terdiri dari angka saja.").required("Mohon ketik kode keamanan yang telah dikirim ke email.").positive("Mohon masukan kode keamanan dengan benar."),
    password:yup.string().required("Mohon ketik password kamu yang baru."),
    confirm_password:yup.string().oneOf([yup.ref("password"),null],"Mohon pastikan password konfirmasi sama dengan password di atas.")
})

const FormAuth = props => {

    const {auth} = props

    const [error,setError] = React.useState()
    const [isSubmitting,setSubmitting] = React.useState(false)

    React.useEffect(()=>{
        setValue("email",auth.data.username)
    },[])
    const {
        handleSubmit,
        reset,
        control,
        formState:{errors},
        setValue
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                code:null,
                email:"",
                password:"",
                confirm_password:""
            }
    })

    const authController = new AuthController(props)
    

    const onSubmit = values =>{
        
        const{email,password,code} = values

        setSubmitting(true)

        authController._resetPassword(email,password,code)
            .then(()=>{
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
        console.log(errors)
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
                            message="Kode keamanan"
                            description={`Kode keamanan untuk mengubah password kamu telah dikirim melalui ${auth.data.CodeDeliveryDetails.AttributeName} ${auth.data.CodeDeliveryDetails.Destination} . Silahkan ketik kode tersebut pada kolom kode di bawah.`}
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
                
                <Controller
                    name="email"
                    control={control}
                    render={props=>
                        <Form.Item hidden >
                            <Input name="email" autoComplete="username" value={props.field.value}/>
                        </Form.Item>}
                />
                    

                <Row>
                    <Col md={24} xs={24}>

                        <Controller
                            name="password"
                            control={control}
                            render={props=>
                                <Form.Item label="Password">
                                    <Input.Password
                                        size="large"   
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        disabled={isSubmitting}
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        value={props.field.value} 
                                        onChange={props.field.onChange}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                    
                                    {errors && errors.password && <Text type="danger">{errors.password.message}</Text>}
                                </Form.Item>
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={24} xs={24}>
                        <Controller
                            name="confirm_password"
                            control={control}
                            render={props=>
                                <Form.Item label="Konfirmasi Password">
                                    <Input.Password
                                        size="large"   
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        disabled={isSubmitting}
                                        autoComplete="current-password"
                                        placeholder="Konfirmasi password"
                                        value={props.field.value} 
                                        onChange={props.field.onChange}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        />
                                    
                                    {errors && errors.confirm_password && <Text type="danger">{errors.confirm_password.message}</Text>}
                                </Form.Item>
                            }
                        />
                    </Col>
                </Row>

                <Row>
                    <Col md={18} xs={24}>
                        <Controller
                            name="code"
                            control={control}
                            render={props=>
                                <Form.Item label="Kode keamanan">
                                    <Input 
                                        size="large"  
                                        prefix={<LockTwoTone className="site-form-item-icon" />} 
                                        disabled={isSubmitting}
                                        placeholder="Kode"
                                        autoComplete="off"
                                        type="number"
                                        value={props.field.value} 
                                        onChange={props.field.onChange} />
                                    {errors && errors.code && <Text type="danger">{errors.code.message}</Text>}
                                </Form.Item>
                            }
                        />
                    </Col>
                </Row>
                
                <Row>
                    <Col md={16} sm={24} xs={24} className="pt-2">
                        <Button  onClick={props.onCancel} type="link" className="p-0" disabled={isSubmitting}>Kembali ke halaman login</Button>
                    </Col>
                    <Col md={8} sm={24} xs={24} className="fright">
                        <Button className="mt-md-0 mt-3" size="large" type="primary" htmlType="submit" block loading={isSubmitting}>Kirim</Button>
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
                resetPasswordRoutinePromise
        },dispatch),dispatch
    })
)(FormAuth)