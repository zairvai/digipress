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
import Media from 'Components/Media'
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

    const {auth,tags,categories} = props

    const articleController = new ArticleController(props)

    const [isSubmitting,setSubmitting] = React.useState(false)
    const [editor,setEditor] = React.useState()
    const [content,setContent] = React.useState("")
    const [isOpenMedia,setOpenMedia] = React.useState(false)

    const isMounted = React.useRef()
    
    React.useEffect(()=>{

        document.addEventListener("openTinymceMedia",function(e){
            const {editor} = e.detail
            setOpenMedia(true)
        },false)
        return()=>{
            document.removeEventListener("openTinymceMedia",function(e){
                setOpenMedia(true)
            },false)
        }
    },[])

    React.useEffect(()=>{
        
        isMounted.current = true

        if(isMounted.current){

            if(item){

                setContent(item.content)
                setValue("title",item.title)
                setValue("content",item.content)
                
                if(item.category){
                    setValue("category",{
                        id:item.category.id,
                        value:item.category.id.toString(),
                        label:item.category.name
                    })
                }
                
                let selectedTags = []

                if(item.tags){
                    item.tags.forEach(tag=>tag && selectedTags.push({
                        id:tag.id,
                        value:tag.id.toString(),
                        label:tag.name}))
                }
                
                setValue("tags",selectedTags)

                setValue("allowComment",item.allowComment)
                setValue("readAccess",item.access)
        
            }
        }

        return ()=>{
            isMounted.current=false
        }
        
    },[item])

    React.useEffect(()=>{

        if(content && editor){
            editor.setContent(content)
        }
    },[content,editor])

    const {
        handleSubmit,
        reset,
        control,
        formState:{errors},
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

        setSubmitting(true)

        if(item) {
            
            values.updatedByid = auth.user.id

            articleController._update(item,values)
                .then(article=>props.onSuccess(article.data))
                .catch(error=>console.log(error))
        }else{
            
            values.createdById = auth.user.id
            values.updatedByid = auth.user.id

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

    const handleEditorSetup = editor =>{
        setEditor(editor)
    }

    const handleEditorChange = editor =>{
        setValue("content",editor.getContent().replace(/\r?\n|\r/g,""))
    }

    const handleSelectedMedia = selectedMedias => {
        setOpenMedia(false)
        
        const mediaWith = 400
        const videoHeight = 0.7*mediaWith
        if(selectedMedias.length > 0){
            let mediaDom = ""
            selectedMedias.forEach((media,index)=>{
                if(media.type=="image") {
                    const url = encodeURI(`${media.baseURL}/${media.key}?w=${mediaWith}`)
                    mediaDom += `<img width="${mediaWith}" src="${url}" class="media-${index} content-align-left"/>`
                }else if(media.type=="youtube"){
                    const url = `https://www.youtube.com/embed/${media.youtubeId}?rel=0&modestbranding=1`
                    mediaDom += `<iframe width="${mediaWith}" height="${videoHeight}" src="${url}" frameboder="0" allowfullscreen="allowfullscreen"></iframe>`
                }
            })
            
            editor.execCommand('mceInsertContent', false,mediaDom);
        }
    }


    return (

        <>
            <Media editor={editor} visible={isOpenMedia} onCancel={()=>setOpenMedia(false)} onOK={handleSelectedMedia}/>
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
                                                    disabled={isSubmitting}
                                                    size="large" placeholder="Judul artikel" 
                                                    value={props.field.value} 
                                                    onChange={props.field.onChange} />
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
                                                    id="articleEditor" 
                                                    isSubmitting={isSubmitting}
                                                    minHeight={400}
                                                    onFinishSetup={handleEditorSetup}
                                                    onChange={handleEditorChange} 
                                                    value={props.field.value} placeholder="Ketik isi tulisan..."/>
                                                {errors && errors.content && <Text type="danger">{errors.content.message}</Text>}
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
                                                    disabled={isSubmitting}
                                                    items={categories} 
                                                    value={props.field.value}
                                                    onChange={onSelectCategoryChange}
                                                    />
                                                {errors && errors.category && <Text type="danger">{errors.category.message}</Text>}
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
                                                    disabled={isSubmitting}
                                                    items={tags}
                                                    value={props.field.value}
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
                                        render={props=><Checkbox  disabled={isSubmitting} onChange={onAllowCommentChange.bind(this)} checked={props.field.value} className="mt-3">Izinkan komentar</Checkbox>}
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
                                                <Radio.Group disabled={isSubmitting} 
                                                    onChange={onReadAccessChange} value={props.field.value}>
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
                                            <Button onClick={props.onCancel} size="medium" type="link" danger disabled={isSubmitting} block>Batal</Button>
                                        </Col>

                                        <Col md={11} className="ml-0 ml-md-2">
                                            <Button size="medium" type="primary" htmlType="submit" loading={isSubmitting} block>Publikasi</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </VuroxComponentsContainer>
                    </Col>
                </Row>
            </Form>
        </>
    )


}

export default connect(
    state=>({
        auth:state.auth,
        dispatch:state.dispatch,
    }),
    (dispatch)=>({
            ...bindPromiseCreators({
            createArticleRoutinePromise,
            updateArticleRoutinePromise
        },dispatch),dispatch
    })
)(FormArticle)