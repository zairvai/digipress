import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.classroom.id'
import { Row, Col,Tag,Modal,Input,Button, Checkbox,Dropdown,Menu,Select,Space,Radio,Typography} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import {	
	VuroxTableDark
} from 'Components/tables'
import HTMLRenderer from 'react-html-renderer'
import {Status} from 'Components/mycomponents.js'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import LessonController from 'Library/controllers/LessonController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getLessonRoutinePromise, updateLessonRoutinePromise} from 'State/routines/lesson'
import FormQna from 'Components/FormQna'

import {NextSeo} from 'next-seo'

const PageLessonId = props => {

    const {Text} = Typography
    const {confirm} = Modal

    const {auth,router} = props

    const lessonController = new LessonController(props)
    
    const [item,setItem] = React.useState({})

    const {lid} = React.useMemo(()=>router.query,[])

    React.useEffect(async ()=>{
       
        try{

            const lesson = await lessonController._get(lid)
            setItem(lesson.data)

        }catch(error){
            router.push(`/${auth.account.uniqueURL}/main/home/classrooms/${item && item.post.id}`)
            console.log(error)
        }
        
    },[])

    const links = [
                    ['Main',`/${auth.account.uniqueURL}/main/home/all`,''],
                    ['Ruang belajar',`/${auth.account.uniqueURL}/main/home/classrooms`,''],
                    [item.post && item.post.title,`/${auth.account.uniqueURL}/main/home/classrooms/${item.post && item.post.id}`,''],
                    ['Materi',`/${auth.account.uniqueURL}/main/home/classrooms/${item.post && item.post.id}`,''],
                    [item.title,`/${auth.account.uniqueURL}/main//homeclassrooms/${item.post && item.post.id}/lessons/${item.id}`,'active']]

    const showDeleteConfirm = item => {
        confirm({
          title: 'Apakah kamu ingin menghapus materi ini ?',
          icon: <ExclamationCircleOutlined />,
          content: item.title,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {
            lessonController._delete(item)
                .then(classroom=>{
                    //classroomController._updateList("remove",[{id:article.data.id}])
                    setTimeout(()=>router.push(`/${auth.account.uniqueURL}/main/home/classrooms/${item.post && item.post.id}`),1000)
                }).catch(error=>console.log(error))
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const onSuccessAddQestion = addedItem => {

        console.log(addedItem)

    } 

    return(
        <AppContainer>
            <NextSeo title={`${item.title} - Materi`}/>
            <Layout item={item} links={links}>
                
                <VuroxComponentsContainer className="p-4">
                    <Row>
                        <Col md={12}>{item.post && item.post.title}</Col>
                        <Col md={12}>
                            <div className="fright">
                                <ul className="vurox-horizontal-links vurox-standard-ul">
                                    {Permission.UPDATE_LESSON({auth,item}) && <li className="p-0 mr-3"><Link href={{pathname:`/${auth.account.uniqueURL}/content/classrooms/[id]/lessons/[lid]/edit`,query:{id:item.post && item.post.id,lid:item.id}}} shallow><a><i className="ti-pencil"></i>&nbsp;Ubah materi</a></Link></li>}
                                    {Permission.DELETE_LESSON({auth,item}) && <li className="p-0"><Button onClick={()=>showDeleteConfirm(item)} className="link" type="link" size="small" icon={<i className="ti-trash"></i>}>&nbsp;Hapus materi</Button></li>}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <h4 className="mb-0 mt-2">{item.title}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}><h4>{item.name}</h4></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={24}>
                            <HTMLRenderer html={item.content ? item.content : ""}/>
                        </Col>
                    </Row>
                </VuroxComponentsContainer>
                 
                <VuroxComponentsContainer className="p-4 mt-2">
                    <Row>
                        <Col md={24} sm={24} xs={24}>
                            <FormQna formId="qnaForm" lesson={item} qnaType="ques" onSuccess={onSuccessAddQestion}/>
                        </Col>
                    </Row>
                </VuroxComponentsContainer>

                <VuroxComponentsContainer className="p-4 mt-2">
                    <Row>
                        <Col md={24} sm={24} xs={24}>
                            {/* <ListTutorQnas accountId={item.accountId} postId={item.postId} lessonId={item.id} qnaType="ques"/> */}
                        </Col>
                    </Row>
                </VuroxComponentsContainer>

            </Layout>
        </AppContainer> 
    )

    

}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
                getLessonRoutinePromise,
                updateLessonRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageLessonId))