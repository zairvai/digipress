import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { UserOutlined, LockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import { Row, Col,Button, Alert,Form,Input,Typography} from 'antd'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import AuthController from 'Library/controllers/AuthController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { completeNewPasswordRoutinePromise } from 'State/routines/auth';

const {Text} = Typography

const schema = yup.object().shape({
    name:yup.string().required("Mohon ketik nama kamu."),
    password:yup.string().required("Mohon ketik password kamu.").min(8,"Password minimal 8 karakter.").max(99,"Maksimal 99 karakter")
        .test("test-name","Masukan password kombinasi huruf besar, kecil dan angka.",
            value=>{
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
            }
        ),
    confirm_password:yup.string().oneOf([yup.ref("password"),null],"Mohon pastikan password konfirmasi sama dengan password di atas.")
})

const FormAuth = ({user,...props}) => {


    const [isSubmitting,setSubmitting] = React.useState(false)

    const authController = new AuthController(props)

    const {
        handleSubmit,
        reset,
        control,
        formState:{errors},
        setValue
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                name: "",
                password:"",
                confirm_password:""
            }
    })
    
    const onSubmit = values =>{

        setSubmitting(true)
        authController._completeNewPassword(values.name,values.password,user)
            .then(()=>{
                if(props.onSuccess) props.onSuccess()
            })
            .catch(errors=>{
                console.log(errors)
                setSubmitting(false)
            })

    }

    const onError = (errors,e) => {
        // console.log(errors,e)
    }

    return (
        <Form 
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}
            autoComplete="off"
            >
           
            <VuroxComponentsContainer className="p-4">
                
                <Row>
                    <Col md={24}>
                        <Alert
                            className="mb-3"
                            message="Login pertama kali"
                            description="Hai kamu adalah pengguna baru. Mohon ketik nama dan perbaharui password kamu untuk melanjutkan."
                            type="info"
                            showIcon
                        />
                    </Col>
                </Row>
                
                <Row>
                    <Col md={24} xs={24}>
                        <Controller
                            name="name"
                            control={control}
                            render={props=>
                                <Form.Item label="Nama">
                                    <Input 
                                        disabled={isSubmitting}
                                        size="large"  
                                        autoComplete="off"
                                        prefix={<UserOutlined/>} 
                                        placeholder="Nama lengkap"
                                        autoComplete="newpassword"
                                        type="text"
                                        value={props.field.value} 
                                        onChange={props.field.onChange} />
                                    {errors && errors.name && <Text type="danger">{errors.name.message}</Text>}
                                </Form.Item>
                            }
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={24} xs={24}>
                        <Controller
                            name="password"
                            control={control}
                            render={props=>
                                <Form.Item label="Password">
                                    <Input.Password
                                        disabled={isSubmitting}
                                        size="large"   
                                        prefix={<LockOutlined/>}
                                        autoComplete="newpassword"
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
                                        disabled={isSubmitting}
                                        size="large"   
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        autoComplete="newpassword"
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
                    <Col md={16} sm={24} xs={24} className="pt-2">
                        <Button type="link" className="p-0" disabled={isSubmitting} onClick={props.onBack}>Kembali ke halaman Login</Button>
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
            completeNewPasswordRoutinePromise
        },dispatch),dispatch
    })
)(FormAuth)