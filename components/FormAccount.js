import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Form,Input,Button, Checkbox,Dropdown,Menu,Select,Space,Radio,Typography} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import RichTextEditor from 'Components/RichTextEditor'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const {Text} = Typography

//validation schema
const schema = yup.object().shape({
    name:yup.string().required("Mohon masukkan nama akun.").max(100,"Nama akun tidak boleh lebih dari 100 karakter."),
    address:yup.string().required("Mohon masukkan alamat akun.").max(200),
    phoneCode:yup.number().typeError("Kode telpon terdiri dari angka saja.").required("Mohon masukkan kode telpon.").max(4),
    phoneNumber:yup.number().typeError("Nomer telpon terdiri dari angka saja.").required("Mohon masukkan nomer telp.").max(15),
    contactPerson:yup.string().required("Mohon masukkan nama kontak person.").max(64)
})

const FormAccount = ({item,...props}) => {

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
                name: item ? item.name : "",
                address:item ? item.address : "",
                phoneCode:item ? item.phoneCode : "",
                phoneNumber:item ? item.phoneNumber : "",
                contactPerson:item ? item.contactPerson:""
            }
    })

    const onSubmit = (values,e) => {

        console.log(values,e)

    }

    const onError = (errors,e) => {

        console.log(errors,e)

    }


    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}
        >
            <Row>
                <Col md={14}>
                    <VuroxComponentsContainer className="p-4">
                        <Row>
                            <Col md={24} sm={24} xs={24}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Nama akun">
                                            <Input size="large" placeholder="..." value={props.value} onChange={props.onChange} />
                                            {errors && errors.name && <Text type="danger">{errors.name.message}</Text>}
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
                                            <Input.TextArea style={{height:"150px",width:"100%"}} placeholder="..." value={props.value} onChange={props.onChange}/>
                                            {errors && errors.address && <Text type="danger">{errors.address.message}</Text>}
                                        </Form.Item>
                                    }
                                />
                                
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} sm={24} xs={24}>
                                <Controller
                                    name="contactPerson"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Kontak person">
                                            <Input size="large" placeholder="..." value={props.value} onChange={props.onChange} />
                                            {errors && errors.contactPerson && <Text type="danger">{errors.contactPerson.message}</Text>}
                                        </Form.Item>
                                    }
                                />
                                
                            </Col>

                            <Col md={4} sm={24} xs={24}>
                                <Controller
                                    name="phoneCode"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Kode telpon" className="ml-0 ml-md-3">
                                            <Input size="large" placeholder="xxxx" value={props.value} onChange={props.onChange} />
                                            {errors && errors.phoneCode && <Text type="danger">{errors.phoneCode.message}</Text>}
                                        </Form.Item>
                                    }
                                />
                                
                            </Col>

                            <Col md={8} sm={24} xs={24}>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Nomer telpon" className="ml-0 ml-md-3">
                                            <Input size="large" placeholder="xxxxxxxx" value={props.value} onChange={props.onChange} />
                                            {errors && errors.phoneNumber && <Text type="danger">{errors.phoneNumber.message}</Text>}
                                        </Form.Item>
                                    }
                                />
                                
                            </Col>

                        </Row>
                        
                        <Row>
                            <Col md={3} sm={24} xs={24}>
                                <Button className="mt-md-0 mt-3" size="large" type="primary" htmlType="submit" block>Kirim</Button>
                            </Col>
                            <Col md={3} sm={24} xs={24}>
                                <Link href="/manage/accounts" shallow><Button size="large" danger type="link" className="ml-0 ml-md-3 mt-3 mt-md-0" block>Batal</Button></Link>
                            </Col>
                        </Row>
                        

                    </VuroxComponentsContainer>
                </Col>
            </Row>
        </Form>
    )


}

export default connect(state=>state)(FormAccount)