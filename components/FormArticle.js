import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,Form,Input,Button, Checkbox,Dropdown,Menu,Select,Space,Radio,Typography} from 'antd'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import TinyMce from 'Components/TinyMce'

const {Text} = Typography

//validation schema
const schema = yup.object().shape({
    title:yup.string().required("Mohon ketik judul artikel").max(100,"Judul tidak melebihi 100 karakter"),
    //summary:yup.string(),
    content:yup.string(),
    category:yup.object(),
    tags:yup.object().nullable(),
    allowComment:yup.string(),
    readAccess:yup.string()
})

const FormArticle = ({item,...props}) => {

    const categoryOptions = props.categories
    const tagOptions = props.tags

    React.useEffect(()=>{
        if(item){

            setValue("category",{
                id:item.category.id,
                value:item.category.id.toString(),
                label:item.category.name
            })
            
            let selectedTags = []
            item.tags.forEach(tag=>selectedTags.push({
                id:tag.id,
                value:tag.id.toString(),
                label:tag.name}))
            
            setValue("tags",selectedTags)

            setValue("allowComment",item.allowComment)
            setValue("readAccess",item.readAccess)
    
        }
        else return
    },[])

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
                title:item ? item.name : "",
                content:item ? item.content : "",
                category:{id:null,value:null},
                tags:[],
                allowComment:item ? item.allowComment:false,
                readAccess:item ? item.readAccess : "private"
            }
    })

    const onSubmit = (values,e) => {

        console.log(values,e)

    }

    const onError = (errors,e) => {

        console.log(errors,e)

    }
    

    const onSelectCategoryChange = selected =>{

        console.log(selected)
        
        setValue("category",{
            id:selected.value,
            value:selected.value,
            label:selected.label
        })
    }

    const onSelectTagsChange = selecteds =>{

        let selectedTags=[]

        selecteds.forEach((item)=>{
            selectedTags.push({
                id:item.value,
                value:item.value,
                label:item.label})
        })

        setValue("tags",selectedTags)

    }

    const onAllowCommentChange = e =>{
        setValue("allowComment",e.target.checked)
    }

    const onReadAccessChange = e => {
        setValue("readAccess",e.target.value)
    }

    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit,onError)}
        >
            <Row>
                <Col md={18}>
                    <VuroxComponentsContainer className="p-4">
                        <Row>
                            <Col md={24}>
                                <Controller
                                    name="title"
                                    defaultValue=""
                                    control={control}
                                    // rules={{required:true,message:"isi ini"}}
                                    render={props=>
                                        <Form.Item label="Title">
                                            <Input size="large" placeholder="Artikel" value={props.value} onChange={props.onChange} />
                                            {errors && errors.title && <Text type="danger">{errors.title.message}</Text>}
                                        </Form.Item>
                                    }
                                />
                                
                            </Col>
                        </Row>
                    
                        <Row>
                            <Col md={24}>
                                
                                <Controller
                                    name="content"
                                    defaultValue=""
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Content">
                                           
                                            <TinyMce id="articleEditor" onChange={props.onChange} value={props.value}/>
                                            
                                        </Form.Item>
                                    }
                                />
                                
                            </Col>
                        </Row>
                    </VuroxComponentsContainer>
                </Col>
                <Col md={6}>
                    <VuroxComponentsContainer className="p-4 ml-2">
                        <Row>
                            <Col md={24}>
                                <Controller
                                    name="category"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Category" className="mb-0">
                                            <Select
                                                labelInValue
                                                value={props.value}
                                                showSearch
                                                size="large"
                                                placeholder="Select a category"
                                                optionFilterProp="children"
                                                optionLabelProp="label"
                                                onChange={onSelectCategoryChange.bind(this)}
                                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                                
                                                {categoryOptions.list.map(item=>
                                                    <Select.Option key={item.id} value={item.id} label={item.name}>{item.name}</Select.Option>
                                                )}

                                            </Select>
                                        </Form.Item>
                                    }
                                />
                                <div className="d-flex justify-content-end">
                                    <Button className="link mt-2" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp;Add new category</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Controller
                                    name="tags"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Tags" className="mb-0">
                                            <Select
                                                labelInValue
                                                value={props.value}
                                                showSearch
                                                size="large"
                                                mode="multiple"
                                                placeholder="Select tags"
                                                optionFilterProp="children"
                                                optionLabelProp="label"
                                                onChange={onSelectTagsChange.bind(this)}
                                                // onFocus={onFocus}
                                                // onBlur={onBlur}
                                                // onSearch={onSearch}
                                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >

                                                {tagOptions.list.map(item=>
                                                    <Select.Option key={item.id} value={item.id} label={item.name}>{item.name}</Select.Option>
                                                )}

                                            </Select>
                                        </Form.Item>
                                    }
                                />

                                <div className="d-flex justify-content-end">
                                    <Button className="link mt-2" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp;Add new tag</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Controller
                                    name="allowComment"
                                    control={control}
                                    // onChange={onAllowCommentChange.bind(this)}
                                    render={props=>{
                                            
                                            return <Checkbox onChange={onAllowCommentChange.bind(this)} checked={props.value}>Allow comment</Checkbox>
                                        }
                                    }
                                />
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>

                                <Controller
                                    name="readAccess"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Who can read this article" className="mt-3 mb-0">
                                            <Radio.Group onChange={onReadAccessChange.bind(this)} value={props.value}>
                                                <Radio value="public">Public</Radio>
                                                <Radio value="private">Private</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    }
                                />

                            </Col>
                        </Row>
                    </VuroxComponentsContainer>
                    <VuroxComponentsContainer className="p-4 ml-2 mt-2">
                        <Row>
                            <Col md={24}>
                                <Row>
                                    {item ? 
                                        <>
                                            <Col md={11}>
                                                <Button size="medium" type="primary" htmlType="submit" block>Save</Button>
                                            </Col>
                                            <Col md={2}></Col>
                                            <Col md={11}>
                                                <Button size="medium" type="primary" danger block>Unpublish</Button>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col md={11}>
                                                <Button size="medium" type="primary" htmlType="submit" block>Publish</Button>
                                            </Col>
                                            <Col md={2}></Col>
                                            <Col md={11}>
                                                <Button size="medium" type="primary" danger block>Draft</Button>
                                            </Col>
                                        </>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </VuroxComponentsContainer>
                </Col>
            </Row>
        </Form>
    )


}

export default connect(state=>state)(FormArticle)