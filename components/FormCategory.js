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
import { createCategoryRoutinePromise,updateCategoryRoutinePromise} from 'State/routines/category';
import CategoryController from 'Library/controllers/CategoryController';

const {Text} = Typography

//validation schema
const schema = yup.object().shape({
    name:yup.string().required("Mohon masukkan nama category.").max(20,"Nama category tidak boleh lebih dari 20 karakter."),
    desc:yup.string().max(100,"Deskripsi tidak boleh lebih dari 100 karakter.")
})

const FormCategory = ({item,...props}) => {

    const {auth,createCategory,updateCategory} = props

    const categoryController = new CategoryController(props)

    const {
        handleSubmit,
        reset,
        control,
        errors,
        formState:{errors},
        setValue
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                name:"",
                desc:""
            }
    })

    React.useEffect(()=>{

        if(item){
            setValue("name",item.name)
            setValue("desc",item.desc)
        }

    },[item])

    const onSubmit = (values) => {

        if(item) {

            values = {id:item.id,version:item.version,...values}
            
            categoryController._update(values)
                .then(category=>props.onSuccess(category.data))
                .catch(error=>console.log(error))

        }else{
            if(props.accountId) values.accountId = props.accountId

            categoryController._create(values)
                .then(category=>props.onSuccess(category.data))
                .catch(error=>console.log(error))
        }
            
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
                        

                        <Row>
                            <Col md={24} sm={24} xs={24}>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Nama category">
                                            <Input 
                                                disabled={createCategory.isRequesting || updateCategory.isRequesting}
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
                            <Col md={24} sm={24} xs={24}>
                                <Controller
                                    name="desc"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Deskripsi">
                                            <Input.TextArea 
                                                disabled={createCategory.isRequesting || updateCategory.isRequesting}
                                                tabIndex="3"
                                                allowClear
                                                autoSize={{ minRows: 3, maxRows: 5 }}
                                                placeholder="..." 
                                                value={props.field.value} 
                                                onChange={props.field.onChange} />
                                            {errors && errors.desc && <Text type="danger">{errors.desc.message}</Text>}
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
                                <Button tabIndex="7" disabled={createCategory.isRequesting || updateCategory.isRequesting} onClick={props.onCancel} danger type="link" block>Batal</Button>
                            </Col>
                            <Col md={6} sm={8} xs={12} className="fright">
                                <Button tabIndex="8" type="primary" htmlType="submit" loading={createCategory.isRequesting || updateCategory.isRequesting} block>Kirim</Button>
                            </Col>
                        </Row>

                    </VuroxComponentsContainer>

                </Col>
            </Row>
        </Form>
    )
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            createCategoryRoutinePromise,
            updateCategoryRoutinePromise
        },dispatch),dispatch
    })
)(FormCategory)