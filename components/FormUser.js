import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Form,Input,InputNumber,Divider,Button,Select,Alert,Typography} from 'antd'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { LockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { bindPromiseCreators } from 'redux-saga-routines';
import { createUserRoutinePromise} from 'State/routines/user';
import UserController from 'Library/controllers/UserController';

const {Text} = Typography

//validation schema
const schema = yup.object().shape({
    role:yup.string().required("Mohon pilih role untuk pengguna."),
    name:yup.string().required("Mohon masukkan nama pengguna.").max(100,"Nama tidak boleh lebih dari 100 karakter."),
    phoneCode:yup.string().required("Mohon masukkan kode.").max(5,"Maksimal 55 angka."),
    phoneNumber:yup.string().typeError("Mohon masukkan nomer telpon.").required("Mohon masukkan nomer telpon.").max(15,"Maksimal 15 angka."),
    emailAddress:yup.string().required("Mohon masukkan alamat email.").email("Masukan alamat email dengan benar").max(64,"Maksimal 64 karakter."),
    password:yup.string().required("Mohon ketik password kamu.").min(8,"Password minimal 8 karakter.").max(99,"Maksimal 99 karakter")
        .test("test-name","Masukan password kombinasi huruf besar, kecil dan angka.",
            value=>{
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)
            }
),
    confirm_password:yup.string().oneOf([yup.ref("password"),null],"Konfirmasi tidak sesuai.")
})

"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"


const FormUser = ({item,...props}) => {

    const {auth,roleInputs} = props

    const userController = React.useMemo(()=>new UserController(props),[props])

    const [isSubmitting,setSubmitting] = React.useState(false)
    const [error,setError] = React.useState()

    const {
        handleSubmit,
        reset,
        control,
        formState:{errors},
        setValue
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                role:"",
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

        setSubmitting(true)

        if(props.accountId) values.accountId = props.accountId
        
        values.createdById = auth.user.id
        values.updatedByid = auth.user.id

        userController._create(values)
            .then(user=>props.onSuccess(user.data))
            .catch(errors=>{

                setSubmitting(false)

                if(errors){
                    
                    const error = errors.error

                    if(error && error.errors[0] && error.errors[0].message=="An account with the given email already exists."){
                        setError({message:"Email yang didaftarkan sudah digunakan sebelumnya."})
                    }
                }

            })
            
    }

    const onError = (errors,e) => {

        console.log(errors)

    }



    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}
        >
            <Row>
                <Col md={24}>
                    <VuroxComponentsContainer className="p-4">
                        {error && error.message &&
                        <Row>
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
                            <Col md={8} sm={24} xs={24}>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Role">
                                            <Select 
                                                disabled={isSubmitting}
                                                size="large" 
                                                style={{ width: "100%" }} 
                                                value={props.field.value} 
                                                onChange={props.field.onChange} placeholder="...">
                                                {
                                                    roleInputs.map(input=><Select.Option key={input.value} value={input.value}>{input.name}</Select.Option>)
                                                }
                                            </Select>
                                            {errors && errors.role && <Text type="danger">{errors.role.message}</Text>}
                                        </Form.Item>
                                    }
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={24} sm={24} xs={24}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Nama">
                                            <Input 
                                                disabled={isSubmitting}
                                                tabIndex="2"
                                                allowClear
                                                size="large" placeholder="..." 
                                                value={props.field.value} 
                                                onChange={props.field.onChange} />
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
                                                    disabled={isSubmitting}
                                                    size="large" 
                                                    style={{width:"30%"}}
                                                    value={props.field.value} readOnly/>
                                            }
                                        />
                                        <Controller
                                            name="phoneNumber"
                                            control={control}
                                            render={props=>
                                                <InputNumber
                                                    disabled={isSubmitting}
                                                    tabIndex="3"
                                                    size="large"
                                                    style={{ width: '70%' }} 
                                                    placeholder="8xx"
                                                    value={props.field.value} 
                                                    onChange={props.field.onChange} />
                                           
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
                                                disabled={isSubmitting}
                                                tabIndex="4" 
                                                autoComplete="username"
                                                allowClear
                                                size="large" placeholder="xxxx@gmail.com " 
                                                value={props.field.value} 
                                                onChange={props.field.onChange} />
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
                                                disabled={isSubmitting}
                                                size="large"   
                                                tabIndex="5" 
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                autoComplete="current-password"
                                                placeholder="Password"
                                                value={props.field.value} 
                                                onChange={props.field.onChange}
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
                                                disabled={isSubmitting}
                                                size="large"   
                                                tabIndex="6" 
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                autoComplete="current-password"
                                                placeholder="Konfirmasi password"
                                                value={props.field.value} 
                                                onChange={props.field.onChange}
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
                                <Button tabIndex="7" disabled={isSubmitting} onClick={props.onCancel} danger type="link" block>Batal</Button>
                            </Col>
                            <Col md={6} sm={8} xs={12} className="fright">
                                <Button tabIndex="8" type="primary" htmlType="submit"  loading={isSubmitting} block>Kirim</Button>
                            </Col>
                        </Row>

                    </VuroxComponentsContainer>

                </Col>
            </Row>
        </Form>
    )


}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
            createUserRoutinePromise
        },dispatch),dispatch
    })
)(FormUser)