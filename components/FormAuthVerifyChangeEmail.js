import React from 'react'
import {connect} from 'react-redux'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { MailOutlined} from '@ant-design/icons';
import { Row, Col,Button, Alert,Form,Input,Typography} from 'antd'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { bindPromiseCreators } from 'redux-saga-routines';
import { getUserByEmailRoutinePromise,updateUserRoutinePromise } from 'State/routines/user';
import AuthController from 'Library/controllers/AuthController'
import UserController from 'Library/controllers/UserController'

import {validateEmail} from 'Helper'

const {Text} = Typography

const schema = yup.object().shape({
    newEmailAddress:yup.string().required("Mohon masukkan alamat email.").email("Masukan alamat email dengan benar").min(5,"Minimal 5 karakter").max(64,"Maksimal 64 karakter."),
})

const FormAuth = ({item,...props}) => {    

    const [isSubmitting, setSubmitting] = React.useState(false)
    const [isValidating,setValidating] = React.useState(false)

    const [isErrorEmailAddress,setErrorEmaillAddress] = React.useState(false)
    
    const [error,setError] = React.useState()

    const authController = new AuthController(props)
    const userController = new UserController(props)
    
    const {
        handleSubmit,
        reset,
        control,
        formState:{errors},
        getValues,
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                newEmailAddress: ""
            }
    })


    const onSubmit = values =>{

        const newEmailAddress = getValues("newEmailAddress")

        setSubmitting(true)

        checkEmailAvailability(newEmailAddress)
            .then( async ()=>{

                setSubmitting(false)

                try{
                    const user = await userController._update(item,{emailAddress:newEmailAddress})

                    authController._setUser({email:newEmailAddress,email_verified:false})

                    if(props.onSuccess) props.onSuccess(user.data)
                }
                catch(error){
                    console.log(error)
                }

            })
            .catch(error=>{
                setSubmitting(false)
                setErrorEmaillAddress(error)
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


    const handleEmailChange = () =>{
        setValidating(false)
        setErrorEmaillAddress(false)
    }


    let validateEmailTimeout

    const checkEmailAvailability = emailAddress =>{

        return new Promise((resolve,reject)=>{

            if(item.emailAddress == emailAddress){
                reject("Alamat email baru tidak boleh sama dengan yang digunakan sekarang.")
            }
            else if(!validateEmail(emailAddress)) {
                reject("Masukan alamat email dengan benar.")
            }
            else{

                if(validateEmailTimeout) {
                    clearTimeout(validateEmailTimeout)
                }

                setValidating(true)

                validateEmailTimeout = setTimeout(()=>{
                    userController._getUserByEmail({emailAddress:emailAddress})
                        .then(user=>{
                            if(user.data) {
                                reject("Alamat email sudah digunakan sebelumnya.")
                            }else{
                                resolve(true)
                            }
                        })
                        .catch(error=>console.log(error))
                        .finally(()=>{
                            setValidating(false)
                        })
                },2000)
            }

        })  
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
                            description={`Kode verifikasi perubahan akan dikirimkan ke alamat email yang baru.`}
                            type="info"
                            showIcon
                        />
                    </Col>
                </Row>


                <ShowError/>
                
                <Row>
                    <Col md={24} xs={24}>
                        <Controller
                            name="newEmailAddress"
                            defaultValue=""
                            control={control}
                            render={props=>
                                <Form.Item>
                                    <Input.Search
                                        loading={isValidating}
                                        disabled={isValidating || isSubmitting}
                                        size="large"  
                                        prefix={<MailOutlined/>} 
                                        placeholder="contoh : email@digipress.id"
                                        autoComplete="off"
                                        value={props.field.value} 
                                        onChange={e=>{
                                            props.field.onChange(e);
                                            handleEmailChange(e);
                                        }} />
                                    {errors && errors.newEmailAddress && <Text type="danger">{errors.newEmailAddress.message}</Text>}
                                    {isErrorEmailAddress && <Text type="danger">{isErrorEmailAddress}</Text>}
                                </Form.Item>
                            }
                        />
                    </Col>
                </Row>
                
                <Row>
                    <Col md={24} sm={24} xs={24}>
                        
                        <Row className="justify-content-end">
                            <Col md={6} sm={8} xs={12}  >
                                <Button tabIndex="7" disabled={ isValidating || isSubmitting} onClick={props.onCancel} danger type="link" block>Batal</Button>
                            </Col>
                            <Col md={6} sm={8} xs={12} className="fright">
                                <Button tabIndex="8" type="primary" htmlType="submit" loading={isValidating || isSubmitting} block>Kirim</Button>
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
                getUserByEmailRoutinePromise,
                updateUserRoutinePromise
        },dispatch),dispatch
    })
)(FormAuth)