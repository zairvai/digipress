import React from 'react'
import {connect} from 'react-redux'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { Row, Col,Button,Form,Tooltip,Typography} from 'antd'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {EditTwoTone} from '@ant-design/icons'
import { bindPromiseCreators } from 'redux-saga-routines';
import { verifyEmailRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import {authError} from 'Helper/errors'

const schema = yup.object().shape({
    email:yup.string().required("Mohon ketik email kamu")
})

const FormAuth = ({item,...props}) => {    
    
    const authController = new AuthController(props)

    const [error,setError] = React.useState()
    const [isSubmitting, setSubmitting] = React.useState(false)

    const {Title} = Typography

    React.useEffect(()=>{

        if(item){
            setValue("email",item.emailAddress)
        }
        
    },[item])

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
            .catch(errors=>{
                console.log(errors)
                setSubmitting(false)
                const error = authError(errors.error)
                setError(error)
            })
    }

    const onError = (errors,e) => {
        console.log(errors,e)
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

                <Controller
                    name="email"
                    defaultValue=""
                    control={control}
                    render={props=><input type="hidden" value={props.value}/>}
                />
                <Row className="justify-content-center">
                    <Col md={24} className="text-center">
                        <Title level={5} className="d-inline mr-2">{item && item.emailAddress}</Title> 
                        <Tooltip title="Ubah alamat email">
                            <EditTwoTone onClick={()=>props.onChangeEmail()}/>
                        </Tooltip>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={10} sm={24} xs={24}>
                        <div className="mt-4">
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