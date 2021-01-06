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

const {Text} = Typography

const schema = yup.object().shape({
    code:yup.string().required("Mohon ketik kode verifikasi")
})

const FormAuth = ({item,...props}) => {    

    const [isSubmitting, setSubmitting] = React.useState(false)
    const [error,setError] = React.useState()
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
                code: ""
            }
    })


    const onSubmit = values =>{

        setSubmitting(true)

        // setTimeout(()=>{
        //     if(props.onSuccess) props.onSuccess()
        // },3000)
        

        authController._verifySubmitCode(values.code)
            .then(()=>{
                
                if(props.onSuccess) props.onSuccess()

                authController._setUser({email:item.emailAddress,email_verified:true})
            })
            .catch(errors=>{
               console.log(errors)
            })
    }

    const onError = (errors,e) => {
        console.log(errors,e)
    }

    const ShowError = () => {

        let message = ""

        if(error){

            if(error && error.message){
                message = error.message
            }
            
        }

        
        if(message.length>0){
            
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

        else return <></>

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


                <ShowError/>
                
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
                                        value={props.value} 
                                        onChange={props.onChange} />
                                    {errors && errors.code && <Text type="danger">{errors.code.message}</Text>}
                                </Form.Item>
                            }
                        />
                    </Col>
                </Row>
                
                <Row>
                    <Col md={24} sm={24} xs={24}>
                        <div className="fright">
                            <Button className="mt-md-0 mt-3" size="large" type="primary" htmlType="submit" disabled={isSubmitting}>Kirim</Button>
                        </div>
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