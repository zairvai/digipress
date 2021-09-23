import React from 'react'
import {connect} from 'react-redux'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { LockOutlined} from '@ant-design/icons';
import { Row, Col,Button, Alert,Form,Input,Typography} from 'antd'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { bindPromiseCreators } from 'redux-saga-routines';
import { verifySubmitCodeRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import {authError} from 'Helper/errors'

const {Text} = Typography

const schema = yup.object().shape({
    code:yup.string().required("Mohon ketik kode verifikasi")
})

const FormAuth = ({item,...props}) => {    

    const [error,setError] = React.useState()
    const [isSubmitting, setSubmitting] = React.useState(false)
    const authController = new AuthController(props)
    
    const {
        handleSubmit,
        reset,
        control,
        formState:{errors}
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                code: ""
            }
    })


    const onSubmit = values =>{

        setSubmitting(true)

        authController._verifySubmitCode(values.code)
            .then(()=>{
                
                if(props.onSuccess) props.onSuccess()

                authController._setUser({email:item.emailAddress,email_verified:true})
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
                            description={`Silahkan masukan kode verifikasi yang sudah dikirim ke email kamu ${item && item.emailAddress}`}
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
                            name="code"
                            defaultValue=""
                            control={control}
                            render={props=>
                                <Form.Item label="Kode verifikasi">
                                    <Input 
                                        disabled={isSubmitting}
                                        size="large"  
                                        prefix={<LockOutlined className="site-form-item-icon" />} 
                                        placeholder="Kode..."
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
                    <Col md={24} sm={24} xs={24}>
                        <Row className="justify-content-end">
                            <Col md={6} sm={8} xs={12}  >
                                <Button  disabled={isSubmitting} onClick={props.onCancel} danger type="link" block>Batal</Button>
                            </Col>
                            <Col md={6} sm={8} xs={12} className="fright">
                                <Button  type="primary" htmlType="submit" loading={isSubmitting} block>Kirim</Button>
                            </Col>
                        </Row>
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
                verifySubmitCodeRoutinePromise
        },dispatch),dispatch
    })
)(FormAuth)