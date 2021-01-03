import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { MailOutlined} from '@ant-design/icons';
import { Row, Col,Button, Alert,Form,Input,Typography} from 'antd'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { bindPromiseCreators } from 'redux-saga-routines';
import { verifyEmailRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'


const schema = yup.object().shape({
    email:yup.string().required("Mohon ketik email kamu")
})

const FormAuth = ({emailAddress,...props}) => {    
    
    const authController = new AuthController(props)

    const [isSubmitting, setSubmitting] = React.useState(false)

    const {Title} = Typography

    React.useEffect(()=>{
        setValue("email",emailAddress)
    },[])

    const {
        handleSubmit,
        setValue,
        control
        
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                email: ""
            }
    })


    const onSubmit = values =>{

        setSubmitting(true)
        authController._verifyEmail(values.email)
            .then(verify=>{
                if(props.onSuccess) props.onSuccess(verify.data)
            })
            .catch(errors=>console.log(errors))
    }

    const onError = (errors,e) => {
        console.log(errors,e)
    }

    return (
        <Form 
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}>
           
            <VuroxComponentsContainer className="p-4">
                <Controller
                            name="email"
                            defaultValue=""
                            control={control}
                            render={props=>
                                
                                <input type="hidden" value={emailAddress}/>
                                
                            }
                        />
                <Row className="justify-content-center">
                    <Col md={24} className="text-center">
                        <Title level={5}>{emailAddress}</Title>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={10} sm={24} xs={24}>
                        <div className="mt-2">
                            <Button className="mt-md-0 mt-3" size="large" type="primary" htmlType="submit" disabled={isSubmitting} block>Verifikasi Email</Button>
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
            verifyEmailRoutinePromise
        },dispatch),dispatch
    })
)(FormAuth)