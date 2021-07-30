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
import { signInRoutinePromise,signOutRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import {authError} from 'Helper/errors'

const {Text} = Typography

const schema = yup.object().shape({
    email:yup.string().required("Mohon ketik email kamu"),
    password:yup.string().required("mohon ketik password kamu"),
})

const FormAuth = props => {

    const authController = new AuthController(props)

    const {auth} = props

    const [error,setError] = React.useState()
    const [isSubmitting,setSubmitting] = React.useState(false)

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
    
    const onSubmit = async(values) =>{
        try{
            setSubmitting(true)

            const resp = await authController._signIn(values.email,values.password,auth.account.id)
            const cognitoUser = resp.data

            if(cognitoUser.challengeName === "NEW_PASSWORD_REQUIRED"){
                if(props.onNewPasswordRequired) props.onNewPasswordRequired(cognitoUser)
            }
            else if(cognitoUser.signInUserSession.idToken.payload.access==="false"){
                setSubmitting(false)
                await authController._signOut()
                const error = authError({code:"NoAccessToAccountException"})
                setError(error)
            }
            else{
                const attributes = cognitoUser.attributes
                const signInUserSession = cognitoUser.signInUserSession
                const access = JSON.parse(signInUserSession.idToken.payload.access)
                
                const user = {
                    id:attributes.sub,
                    name:attributes.name,
                    phoneNumber:attributes.phone_number,
                    email:attributes.email,
                    email_verified: attributes.email_verified ? true : false,
                    access
                }

                authController._setUser(user)

                authController._setLoggedIn(true)

                if(props.onSuccess) props.onSuccess(user)
            }
            
        }catch(errors){
            console.log(errors)
            setSubmitting(false)

            const error = authError(errors.error)
            setError(error)
        }

    }

    const onError = (errors,e) => {
        //console.log(errors,e)
    }

    return (
        <Form 
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}>
           
            <VuroxComponentsContainer className="p-4">
                
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
                                        placeholder="Email address"
                                        autoComplete="off"
                                        type="email"
                                        disabled={isSubmitting}
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
                                        disabled={isSubmitting}
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
                        <Button  onClick={props.onForgotPassword} type="link" className="p-0" disabled={isSubmitting}>Lupa password ?</Button>
                    </Col>
                    <Col md={8} sm={24} xs={24} className="fright">
                        <Button className="mt-md-0 mt-3" size="large" type="primary" loading={isSubmitting} htmlType="submit" block>Login</Button>
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
            signInRoutinePromise,
            signOutRoutinePromise
        },dispatch),dispatch
    })
)(FormAuth)