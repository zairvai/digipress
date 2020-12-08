import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Form,Input,InputNumber,Divider,Button, Checkbox,Dropdown,Menu,Select,Space,Radio,Typography} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { LockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AccountController from 'Library/controllers/AccountController'

const {Text} = Typography

//validation schema
const schema = yup.object().shape({
    name:yup.string().required("Mohon masukkan nama pengguna.").max(100,"Nama tidak boleh lebih dari 100 karakter."),
    phoneCode:yup.string().required("Mohon masukkan kode.").max(5,"Maksimal 55 angka."),
    phoneNumber:yup.string().typeError("Mohon masukkan nomer telpon.").required("Mohon masukkan nomer telpon.").max(15,"Maksimal 15 angka."),
    emailAddress:yup.string().required("Mohon masukkan alamat email.").email("Masukan alamat email dengan benar").max(64,"Maksimal 64 karakter."),
    password:yup.string().required("Mohon ketik password kamu."),
    confirm_password:yup.string().oneOf([yup.ref("password"),null],"Konfirmasi tidak sesuai.")
})

const FormUser = ({item,...props}) => {

    const accountController = new AccountController(props)

    const {
        handleSubmit,
        reset,
        control,
        errors,
        formState,
        setValue
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                name:"",
                phoneCode:"+62",
                phoneNumber:"",
                emailAddress:"",
                password:"",
                confirm_password:""
            }
    })

    React.useEffect(()=>{

        if(item){
            setValue("name",item.name)
            setValue("emailAddress",item.emailAddress)
            setValue("phoneCode","+62")
            if(item.phoneNumber){
                const phoneNumber = item.phoneNumber.substring(4,item.phoneNumber.length)
                setValue("phoneNumber",phoneNumber)
            }
            
        }

    },[item])

    const onSubmit = (values) => {
        
        // if(item) {
        //     values = {version:item.version,...values}
        //     accountController._update(item.id,values)
        // }
        // else accountController._create(values)

        console.log(values)
    }

    const onError = (errors,e) => {

        console.log(errors)

    }

    const onCancel = () => {
        props.onCancel()
    }

    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}
        >
            <Row>
                <Col md={24}>
                    <VuroxComponentsContainer className="p-4">
                        <Row>
                            <Col md={24} sm={24} xs={24}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Nama">
                                            <Input 
                                                tabIndex="1"
                                                allowClear
                                                size="large" placeholder="..." value={props.value} onChange={props.onChange} />
                                            {errors && errors.name && <Text type="danger">{errors.name.message}</Text>}
                                        </Form.Item>
                                    }
                                />
                                
                            </Col>
                        </Row>

                        <Row>

                            <Col md={12} sm={24} xs={24}>
                                
                                <Form.Item label="Nomer telpon" className="ml-0">
                                    <Input.Group compact>
                                        <Controller
                                            name="phoneCode"
                                            control={control}
                                            render={props=>
                                                <Input 
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
                                                    tabIndex="2"
                                                    size="large"
                                                    style={{ width: '70%' }} 
                                                    value={props.value} placeholder="8xx" onChange={props.onChange}/>
                                           
                                            }
                                        />
                                        {errors && errors.phoneNumber && <Text type="danger">{errors.phoneNumber.message}</Text>}
                                    </Input.Group>
                                </Form.Item>
                            
                            </Col>

                            <Col md={12} sm={24} xs={24}>
                                <Controller
                                    name="emailAddress"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Email" className="ml-0 ml-md-3">
                                            <Input
                                                tabIndex="3" 
                                                allowClear
                                                size="large" placeholder="xxxx@gmail.com " value={props.value} onChange={props.onChange} />
                                            {errors && errors.emailAddress && <Text type="danger">{errors.emailAddress.message}</Text>}
                                        </Form.Item>
                                    }
                                />
                                
                            </Col>

                        </Row>
                        <Row>
                            <Col md={12} sm={24} xs={24}>
                                <Controller
                                    name="password"
                                    defaultValue=""
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Password">
                                            <Input.Password
                                                size="large"   
                                                tabIndex="4" 
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
                            <Col md={12} sm={24} xs={24}>
                                <Controller
                                    name="confirm_password"
                                    defaultValue=""
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Konfirmasi Password" className="ml-0 ml-md-3">
                                            <Input.Password
                                                size="large"   
                                                tabIndex="5" 
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

                    </VuroxComponentsContainer>
                    
                    <Divider className="m-0" />

                    <VuroxComponentsContainer className="px-4 py-3">
                        <Row className="justify-content-end">
                            <Col md={6} sm={8} xs={12}  >
                                <Button tabIndex="6"  onClick={onCancel} danger type="link" block>Batal</Button>
                            </Col>
                            <Col md={6} sm={8} xs={12} className="fright">
                                <Button tabIndex="7" type="primary" htmlType="submit" block>Kirim</Button>
                            </Col>
                        </Row>

                    </VuroxComponentsContainer>

                </Col>
            </Row>
        </Form>
    )


}

export default connect(state=>state)(FormUser)