import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Form,Input,InputNumber,Button,Divider,Typography} from 'antd'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { bindPromiseCreators } from 'redux-saga-routines';
import { createAccountRoutinePromise,updateAccountRoutinePromise,getAccountByUniqueUrlRoutinePromise} from 'State/routines/account';
import AccountController from 'Library/controllers/AccountController'

const {Text} = Typography

//validation schema
const schema = yup.object().shape({
    uniqueURL: yup.string()
                    .required("Silahkan pilih URL untuk nama akun pesantren.")
                    .min(5, "Minimal 5 karakter.")
                    .test("test-name","Masukan url dengan benar. Hanya huruf kecil angka 0-9 dan _ -",
                        value=>{
                            return /^([a-z0-9])+([-_a-z0-9_-])*([a-z0-9])+$/.test(value)
                        }
                    )
                    .max(30,"Maksimal 30 karakter."),
    name:yup.string().required("Mohon masukkan nama akun pesantren.").max(100,"Nama akun tidak boleh lebih dari 100 karakter."),
    address:yup.string().required("Mohon masukkan alamat akun.").max(300,"Maksimal 300 karakter."),
    contactPerson:yup.string().required("Mohon masukkan nama kontak person.").max(64,"Maksimal 64 karakter."),
    phoneNumber:yup.string().required("Mohon masukkan nomer telp.").max(15,"Maksimal 15 angka."),
    emailAddress:yup.string().required("Mohon masukkan alamat email.").email("Masukan alamat email dengan benar.").max(64,"Maksimal 64 karakter.")
})

const FormAccount = ({item,...props}) => {

    const [isSubmitting,setSubmitting] = React.useState(false)

    const [isErrorUniqueURL,setErrorUniqueURL] = React.useState(false)

    const accountController = new AccountController(props)
    
    const {
        handleSubmit,
        reset,
        control,
        errors,
        setError,
        clearErrors,
        getValues,
        setValue
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                uniqueURL:"",
                name:"",
                address:"",
                phoneCode:"+62",
                phoneNumber:"",
                emailAddress:"",
                contactPerson:""
            }
    })

    React.useEffect(()=>{
        if(item){
            setValue("uniqueURL",item.uniqueURL)
            setValue("name",item.name)
            setValue("address",item.address)
            setValue("emailAddress",item.emailAddress)
            setValue("contactPerson",item.contactPerson)
            setValue("phoneCode","+62")
            if(item.phoneNumber){
                const phoneNumber = item.phoneNumber.substring(4,item.phoneNumber.length)
                setValue("phoneNumber",phoneNumber)
            }
            
        }
    },[item])

    const onSubmit = (values) => {


        if(isErrorUniqueURL) return

        setSubmitting(true)

        if(item) {
            
            accountController._update(item,values)
                .then(account=>props.onSuccess(account.data))
                .catch(error=>console.log(error))
        }
        else accountController._create(values)
                .then(account=>props.onSuccess(account.data))
                .catch(error=>console.log(error))

    }

    const onError = (errors,e) => {

        console.log(errors)

    }

    const handleURLChange = e =>{
        
        if(errors && !errors.uniqueURL){

            const uniqueURLValue = getValues('uniqueURL')

            if(item && item.uniqueURL !== uniqueURLValue.trim()){

                if(uniqueURLValue.length >= 5){

                    setTimeout(()=>{
                        accountController._getAccountByUniqueUrl({url:uniqueURLValue})
                            .then(account=>{
                                if(account.data) {
                                    setErrorUniqueURL("URL sudah digunakan sebelumnya, silahkan ketik URL yang lain")
                                }else{
                                    setErrorUniqueURL(false)
                                    clearErrors("uniqueURL")
                                }
                            })
                            .catch(error=>console.log(error))
                    },2000)
                }
            }else{
                setErrorUniqueURL(false)
            }
        }
    }

    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}
        >
           
                <VuroxComponentsContainer className="p-4">
                    
                    <Row>
                        <Col md={24} sm={24} xs={24}>
                            <Controller
                                name="name"
                                control={control}
                                render={props=>
                                    <Form.Item label="Nama akun pesantren">
                                        <Input 
                                            disabled={isSubmitting}
                                            tabIndex="2"
                                            allowClear
                                            size="large" placeholder="..." value={props.value} onChange={props.onChange} {...props} />
                                        {errors && errors.name && <Text type="danger">{errors.name.message}</Text>}
                                    </Form.Item>
                                }
                            />
                            
                        </Col>
                    </Row>
                
                    <Row>
                        <Col md={24} sm={24} xs={24}>
                            <Controller
                                name="uniqueURL"
                                control={control}
                                render={props=>
                                    <Form.Item label="Public URL untuk akses ke akun pesantren">
                                        <Input.Search 
                                            disabled={isSubmitting}
                                            size="large"
                                            tabIndex="1"
                                            allowClear
                                            addonBefore="https://digipress.id/"
                                            placeholder="Contoh : pesantren,pesantren123, akun-pesantren" 
                                            onChange={e=>{
                                                props.onChange(e);
                                                handleURLChange(e);
                                            }}
                                            value={props.value} 
                                            />
                                        {/* <Text className="d-block" style={{width:"100%"}} type="secondary">hanya karakter a-z 0-9 dan _ - </Text> */}
                                        {errors && errors.uniqueURL && <Text type="danger">{errors.uniqueURL.message}</Text>}
                                        {isErrorUniqueURL && <Text type="danger">{isErrorUniqueURL}</Text>}
                                    </Form.Item>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24} sm={24} xs={24}>
                            <Controller
                                name="address"
                                control={control}
                                render={props=>
                                    <Form.Item label="Alamat">
                                        <Input.TextArea 
                                            disabled={isSubmitting}
                                            tabIndex="3"
                                            allowClear
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                            placeholder="..." value={props.value} onChange={props.onChange}/>
                                        {errors && errors.address && <Text type="danger">{errors.address.message}</Text>}
                                    </Form.Item>
                                }
                            />
                            
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8} sm={24} xs={24}>
                            <Controller
                                name="contactPerson"
                                control={control}
                                render={props=>
                                    <Form.Item label="Kontak person">
                                        <Input
                                            disabled={isSubmitting}
                                            tabIndex="4" 
                                            allowClear
                                            size="large" placeholder="contoh: Muhammad " value={props.value} onChange={props.onChange} />
                                        {errors && errors.contactPerson && <Text type="danger">{errors.contactPerson.message}</Text>}
                                    </Form.Item>
                                }
                            />
                            
                        </Col>

                        <Col md={8} sm={24} xs={24}>
                            
                            <Form.Item label="Nomer telpon" className="ml-0 ml-md-3">
                                <Input.Group compact>
                                    <Controller
                                        name="phoneCode"
                                        control={control}
                                        render={props=>
                                            <Input 
                                                disabled={isSubmitting}
                                                size="large" 
                                                style={{width:"30%"}}
                                                value={props.value} readOnly/>
                                        }
                                    />
                                    <Controller
                                        name="phoneNumber"
                                        control={control}
                                        render={props=>
                                            <InputNumber
                                                disabled={isSubmitting}
                                                tabIndex="5"
                                                size="large"
                                                style={{ width: '70%' }} value={props.value} placeholder="8xx" onChange={props.onChange}/>
                                        
                                        }
                                    />
                                    {errors && errors.phoneNumber && <Text type="danger">{errors.phoneNumber.message}</Text>}
                                </Input.Group>
                            </Form.Item>
                        
                        </Col>

                        <Col md={8} sm={24} xs={24}>
                            <Controller
                                name="emailAddress"
                                control={control}
                                render={props=>
                                    <Form.Item label="Email" className="ml-0 ml-md-3">
                                        <Input
                                            disabled={isSubmitting}
                                            tabIndex="6" 
                                            allowClear
                                            size="large" placeholder="xxxx@gmail.com " value={props.value} onChange={props.onChange} />
                                        {errors && errors.emailAddress && <Text type="danger">{errors.emailAddress.message}</Text>}
                                    </Form.Item>
                                }
                            />
                            
                        </Col>

                    </Row>

                    </VuroxComponentsContainer>
                    
                    <Divider className="m-0" />

                    <VuroxComponentsContainer className="px-4 py-3">
                        <Row className="justify-content-end">
                            <Col md={6} sm={8} xs={12}  >
                                <Button tabIndex="7" disabled={isSubmitting} onClick={props.onCancel} danger type="link" block>Batal</Button>
                            </Col>
                            <Col md={6} sm={8} xs={12} className="fright">
                                <Button tabIndex="8" type="primary" htmlType="submit" loading={isSubmitting} block>Kirim</Button>
                            </Col>
                        </Row>

                    </VuroxComponentsContainer>
            
        </Form>
    )


}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
            createAccountRoutinePromise,
            updateAccountRoutinePromise,
            getAccountByUniqueUrlRoutinePromise
        },dispatch),dispatch
    })
)(FormAccount)