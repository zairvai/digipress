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

import AuthController from 'Library/controllers/AuthController'

const {Text} = Typography

const schema = yup.object().shape({
    code:yup.number().typeError("Kode konfirmasi terdiri dari angka saja.").required("Mohon ketik kode keamanan yang telah dikirim ke email.").positive("Mohon masukan kode keamanan dengan benar."),
    password:yup.string().required("Mohon ketik password kamu yang baru."),
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
                code:null,
                password:"",
                confirm_password:""
            }
    })

    const authController = new AuthController(props)
    

    const onSubmit = values =>{
        const{email,password,code} = values
        authController._resetPassword(email,password,code)
    }

    const onError = (errors,e) => {
        console.log(errors,e)
    }

    const ShowError = () => {

        let message = ""

        if(props.auth.isError){
            if(props.auth.userNotFound) message="Email yang kamu gunakan belum terdaftar."        
            else if(props.auth.limitExceeded) message="Kamu telah mencoba beberapa kali. Silahkan coba lagi dalam beberapa menit."        

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
                            message="Kode keamanan"
                            description={`Kode keamanan untuk mengubah password kamu telah dikirim melalui ${props.auth.data.CodeDeliveryDetails.AttributeName} ${props.auth.data.CodeDeliveryDetails.Destination} . Silahkan ketik kode tersebut pada kolom kode di bawah.`}
                            type="info"
                            showIcon
                        />
                    </Col>
                </Row>


                <ShowError/>
                
                <Row>
                    <Col md={24} xs={24}>
                        <Form.Item hidden ><Input name="email" autoComplete="username" value={props.auth.data.username}/></Form.Item>
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
                    <Col md={10} xs={24}>
                        <Controller
                            name="code"
                            control={control}
                            render={props=>
                                <Form.Item label="Kode keamanan">
                                    <Input 
                                        size="large"  
                                        prefix={<LockTwoTone className="site-form-item-icon" />} 
                                        placeholder="Kode"
                                        autoComplete="off"
                                        type="number"
                                        value={props.value} 
                                        onChange={props.onChange} />
                                    {/* {errors && errors.code && <Text type="danger">{errors.code.message}</Text>} */}
                                </Form.Item>
                            }
                        />
                    </Col>
                </Row>
                
                <Row>
                    <Col md={16} sm={24} xs={24} className="pt-2">
                        <Link href={{pathname:'/auth/login'}}shallow><a>Kembali ke halaman Login</a></Link>
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