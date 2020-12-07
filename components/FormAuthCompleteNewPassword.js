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

const {Text} = Typography

const schema = yup.object().shape({
    name:yup.string().required("Mohon ketik nama kamu."),
    password:yup.string().required("Mohon ketik password yang baru."),
    confirm_password:yup.string().oneOf([yup.ref("password"),null],"Mohon pastikan password konfirmasi sama dengan password di atas.")
})

const FormAuth = props => {


    const {
        handleSubmit,
        reset,
        control,
        errors,
        formState,
        
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                name: "",
                password:"",
                confirm_password:""
            }
    })

    const authController = new AuthController(props)
    
    const onSubmit = values =>{
        authController._completeNewPassword(values.name,values.password)
    }

    const onError = (errors,e) => {
        console.log(errors,e)
    }

    const ShowError = () => {

        let message = ""

        if(props.auth.isError){
            if(props.auth.userNotFound){
                message="Email yang anda gunakan belum terdaftar."        
            }

            return (
                <Row>
                    <Col md={24} xs={24}>
                        <Alert className="mb-3"
                            message="Error"
                            description={message}
                            type="error"
                            showIcon
                            />
                    </Col>
                </Row>
            )
        }

        return <></>

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
                            message="Login pertama kali"
                            description="Hai kamu adalah pengguna baru. Mohon ketik nama dan perbaharui password kamu untuk melanjutkan."
                            type="info"
                            showIcon
                        />
                    </Col>
                </Row>

                <ShowError/>
                
                <Row>
                    <Col md={24} xs={24}>
                        <Controller
                            name="name"
                            defaultValue=""
                            control={control}
                            render={props=>
                                <Form.Item label="Nama">
                                    <Input 
                                        size="large"  
                                        prefix={<UserOutlined className="site-form-item-icon" />} 
                                        placeholder="Nama lengkap"
                                        autoComplete="off"
                                        type="text"
                                        value={props.value} 
                                        onChange={props.onChange} />
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
                            defaultValue=""
                            control={control}
                            render={props=>
                                <Form.Item label="Password">
                                    <Input.Password
                                        size="large"   
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        value={props.value} 
                                        onChange={props.onChange} 
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
                            defaultValue=""
                            control={control}
                            render={props=>
                                <Form.Item label="Konfirmasi Password">
                                    <Input.Password
                                        size="large"   
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        autoComplete="current-password"
                                        placeholder="Konfirmasi password"
                                        value={props.value} 
                                        onChange={props.onChange} 
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
                        <Button type="link" className="p-0" onClick={()=>authController._signOut()}>Kembali ke halaman Login</Button>
                    </Col>
                    <Col md={8} sm={24} xs={24} className="fright">
                        <Button className="mt-md-0 mt-3" size="large" type="primary" htmlType="submit" block>Kirim</Button>
                    </Col>
                </Row>
            </VuroxComponentsContainer>
             
        </Form>   
    );
}

export default connect(state=>state)(FormAuth)