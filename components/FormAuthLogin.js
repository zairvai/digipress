import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { MailOutlined, LockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';

import { Row, Col,Button, Alert,Form,Input,Typography} from 'antd'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { bindPromiseCreators } from 'redux-saga-routines';
import { signInRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'

const {Text} = Typography

const schema = yup.object().shape({
    email:yup.string().required("Mohon ketik email kamu"),
    password:yup.string().required("mohon ketik password kamu"),
})

const FormAuth = props => {

    const authController = new AuthController(props)

    const {
        handleSubmit,
        reset,
        control,
        errors,
        formState,
        
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                email: "",
                password:""
            }
    })

    const onSubmit = values =>{

        authController._signIn(values.email,values.password,props.accountId)
            .then(auth=>{
                // console.log(auth)
                if(props.onAuthorized) props.onAuthorized(auth)
            })
            .catch(error=>console.log(error))
    }

    const onError = (errors,e) => {
        console.log(errors,e)
    }

    const ShowError = () => {

        let message = ""

        if(props.auth.isError){
            if(props.auth.userNotFound) message="Email yang kamu gunakan belum terdaftar"        
            else if(props.auth.error.code==="NotAuthorizedException") message = "Email atau password yang kamu masukan tidak sesuai"

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
                
                <ShowError/>
                
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
                                        placeholder="Email address"
                                        autoComplete="off"
                                        type="email"
                                        value={props.value} 
                                        onChange={props.onChange} />
                                    {errors && errors.email && <Text type="danger">{errors.email.message}</Text>}
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
                    <Col md={16} sm={24} xs={24} className="pt-2">
                        <Link href={{pathname:'/auth/password-recovery'}}shallow><a>Lupa password?</a></Link>
                    </Col>
                    <Col md={8} sm={24} xs={24} className="fright">
                        <Button className="mt-md-0 mt-3" size="large" type="primary" htmlType="submit" block>Login</Button>
                    </Col>
                </Row>
            </VuroxComponentsContainer>
             
        </Form>   
    );
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            signInRoutinePromise
        },dispatch),dispatch
    })
)(FormAuth)