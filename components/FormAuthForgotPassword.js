import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { appContext } from '../context/app'
import { MailOutlined} from '@ant-design/icons';
import { Row, Col,Button, Alert,Form,Input,Typography} from 'antd'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import AuthController from 'Library/controllers/AuthController'

const {Text} = Typography

const schema = yup.object().shape({
    email:yup.string().required("Mohon ketik email kamu")
})

const FormAuth = props => {

    const {baseUrl} = React.useContext(appContext)

    const {
        handleSubmit,
        reset,
        control,
        errors,
        formState,
        
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                email: ""
            }
    })

    const authController = new AuthController(props)
    
    React.useEffect(()=>{
        authController._initForgotPassword()
    },[])

    const onSubmit = values =>{
        authController._forgotPassword(values.email)
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
                            message="Perubahan password"
                            description="Untuk mengubah password anda, mohon ketik email yang sudah terdaftar."
                            type="info"
                            showIcon
                        />
                    </Col>
                </Row>


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
                    <Col md={16} sm={24} xs={24} className="pt-2">
                        <Link href={{pathname:`${baseUrl}/auth/login`}} shallow><a>Kembali ke halaman Login</a></Link>
                        {/* <Button className="pl-0" type="link" onClick={()=>router.back()}>Kembali ke halaman login</Button> */}
                    </Col>
                    <Col md={8} sm={24} xs={24} className="fright">
                        <Button className="mt-md-0 mt-3" size="large" type="primary" htmlType="submit" block>Ganti Password</Button>
                    </Col>
                </Row>
            </VuroxComponentsContainer>
             
        </Form>   
    );
}

export default connect(state=>state)(withRouter(FormAuth))