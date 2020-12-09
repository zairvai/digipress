import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Form,Input,InputNumber,Divider,Button,Dropdown,Menu,Select,Space,Radio,Typography} from 'antd'
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
const {Search} = Input

const FormUser = props =>{

    return (
        <Form
            layout="vertical"
            // onFinish={handleSubmit(onSubmit,onError)}
        >

            <VuroxComponentsContainer className="p-4">
                <Row>
                    <Col md={24} sm={24} xs={24}>
                        <Search placeholder="Ketik email pengguna" enterButton="Cari" size="large" loading={false} />
                    </Col>
                </Row>
            </VuroxComponentsContainer>

        </Form>
    )

}

export default connect(state=>state)(FormUser)