import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Form,Input,InputNumber,Divider,Button, Checkbox,Dropdown,Menu,Select,Space,Radio,Typography} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { bindPromiseCreators } from 'redux-saga-routines';
import { createTagRoutinePromise} from 'State/routines/tag';
import TagController from 'Library/controllers/TagController';

const {Text} = Typography

//validation schema
const schema = yup.object().shape({
    name:yup.string().required("Mohon masukkan nama tag.").max(20,"Nama tag tidak boleh lebih dari 20 karakter.")
})

const FormTag = ({item,...props}) => {

    const {auth,createTag} = props

    const tagController = new TagController(props)

    const {
        handleSubmit,
        reset,
        control,
        formState:{errors},
        setValue
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                name:""
            }
    })

    React.useEffect(()=>{

        if(item){
            setValue("name",item.name)
        }

    },[item])

    const onSubmit = (values) => {

        if(props.accountId) values.accountId = props.accountId
        
        values.createdById = auth.user.id
        values.updatedByid = auth.user.id

        tagController._create(values)
            .then(tag=>props.onSuccess(tag.data))
            .catch(error=>console.log(error))
            
    }

    const onError = (errors,e) => {

        console.log(errors)

    }

    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}>
            <Row>
                <Col md={24}>
                    <VuroxComponentsContainer className="p-4">
                        <Row>
                            <Col md={24} sm={24} xs={24}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Nama tag">
                                            <Input 
                                                disabled={createTag.isRequesting}
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
                    </VuroxComponentsContainer>
                    
                    <Divider className="m-0" />

                    <VuroxComponentsContainer className="px-4 py-3">
                        <Row className="justify-content-end">
                            <Col md={6} sm={8} xs={12}  >
                                <Button tabIndex="7"  onClick={props.onCancel} danger type="link" disabled={createTag.isRequesting} block>Batal</Button>
                            </Col>
                            <Col md={6} sm={8} xs={12} className="fright">
                                <Button tabIndex="8" type="primary" htmlType="submit" loading={createTag.isRequesting} block>Kirim</Button>
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
            createTagRoutinePromise
        },dispatch),dispatch
    })
)(FormTag)