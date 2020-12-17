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
import SelectCategory from 'Components/SelectCategory'
import SelectTags from 'Components/SelectTags'

import { bindPromiseCreators } from 'redux-saga-routines';
import { createArticleRoutinePromise,updateArticleRoutinePromise} from 'State/routines/article';
import ArticleController from 'Library/controllers/ArticleController';


const {Text} = Typography

//validation schema
const schema = yup.object().shape({
    title:yup.string().required("Mohon ketik judul artikel").max(100,"Judul tidak melebihi 100 karakter"),
    //summary:yup.string(),
    content:yup.string(),
    category:yup.object().required("Silahkan pilih kategori"),
    tags:yup.array(),
    allowComment:yup.string(),
    readAccess:yup.string()
})

const FormArticle = ({item,...props}) => {

    const {tags,categories,createArticle,updateArticle} = props

    const articleController = new ArticleController(props)

    React.useEffect(()=>{
        
        console.log(item)

        if(item){

            setValue("title",item.title)
            setValue("content",item.content)
              
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
            setValue("readAccess",item.access)
    
        }
        
    },[item])

    const {
        handleSubmit,
        reset,
        control,
        errors,
        setValue
        } = useForm({
            resolver:yupResolver(schema),
            defaultValues:{
                title: "",
                content: "",
                category:{id:null,value:null},
                tags:[],
                allowComment:false,
                readAccess:"public"
            }
    })

    const onSubmit = (values,e) => {

        values.categoryId = values.category.id

        if(values.tags.length>0){
            let tags = []
            values.tags.forEach(item=>{
                tags.push(item.id)
            })
            values.tags = tags
        }

        if(item) {

            articleController._update(item,values)
                .then(article=>props.onSuccess(article.data))
                .catch(error=>console.log(error))
        }else{
            values.accountId = props.accountId
            articleController._create(values)
                .then(article=>props.onSuccess(article.data))
                .catch(error=>console.log(error))
        }
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
                                    render={props=>
                                        <Form.Item label="Judul artikel">
                                            <Input 
                                                disabled={createArticle.isRequesting || updateArticle.isRequesting}
                                                size="large" placeholder="Pelajaran" value={props.value} onChange={props.onChange} />
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
                                        <Form.Item label="Isi artikel" className="mb-0">
                                           
                                            <TinyMce 
                                                disabled={createArticle.isRequesting || updateArticle.isRequesting}
                                                minHeight={400}
                                                content={item ? item.content : ""}
                                                id="articleEditor" onChange={props.onChange} value={props.value} placeholder="Ketik isi tulisan..."/>
                                            
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
                                        <Form.Item label="Kategori" className="mb-0">
                                            <SelectCategory 
                                                disabled={createArticle.isRequesting || updateArticle.isRequesting}
                                                items={categories} 
                                                value={props.value}
                                                onChange={onSelectCategoryChange}
                                                />
                                        </Form.Item>
                                    }
                                />
                                {/* <div className="d-flex justify-content-end">
                                    <Button className="link mt-2" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp;Tambah kategory</Button>
                                </div> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Controller
                                    name="tags"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Tag" className="mb-0 mt-3">
                                            <SelectTags 
                                                disabled={createArticle.isRequesting || updateArticle.isRequesting}
                                                items={tags}
                                                value={props.value}
                                                onChange={onSelectTagsChange}
                                            />
                                        </Form.Item>
                                    }
                                />

                                {/* <div className="d-flex justify-content-end">
                                    <Button className="link mt-2" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp;Tambah tag</Button>
                                </div> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <Controller
                                    name="allowComment"
                                    control={control}
                                    // onChange={onAllowCommentChange.bind(this)}
                                    render={props=><Checkbox  disabled={createArticle.isRequesting || updateArticle.isRequesting} onChange={onAllowCommentChange.bind(this)} checked={props.value} className="mt-3">Izinkan komentar</Checkbox>}
                                />
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>

                                <Controller
                                    name="readAccess"
                                    control={control}
                                    render={props=>
                                        <Form.Item label="Siapa yang dapat membaca artikel ini" className="mt-3 mb-0">
                                            <Radio.Group disabled={createArticle.isRequesting || updateArticle.isRequesting} 
                                                onChange={onReadAccessChange} value={props.value}>
                                                <Radio value="public">Umum</Radio>
                                                <Radio value="protected">Internal</Radio>
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
                                    <Col md={11}>
                                        <Button onClick={props.onCancel} size="medium" type="link" danger disabled={createArticle.isRequesting || updateArticle.isRequesting} block>Batal</Button>
                                    </Col>

                                    <Col md={11} className="ml-0 ml-md-2">
                                        <Button size="medium" type="primary" htmlType="submit" loading={createArticle.isRequesting || updateArticle.isRequesting} block>Publikasi</Button>
                                    </Col>
                                </Row>
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
            createArticleRoutinePromise,
            updateArticleRoutinePromise
        },dispatch),dispatch
    })
)(FormArticle)