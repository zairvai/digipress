import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row, Col,Modal,PageHeader,Button,Typography} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import HTMLRenderer from 'react-html-renderer'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LayoutLesson from 'Templates/Layout.lesson'
import Permission from 'Library/controllers/Permission'
import LessonController from 'Library/controllers/LessonController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getLessonRoutinePromise, updateLessonRoutinePromise} from 'State/routines/lesson'
import ListTutorQnas from 'Components/ListTutorQnas'
import ListStudentQnas from 'Components/ListStudentQnas'
import HTML from 'Components/HTML'
import Truncate from 'react-truncate'
import AuthController from 'Library/controllers/AuthController'
import {NextSeo} from 'next-seo'

const PageLessonId = props => {

    const {confirm} = Modal

    const {auth,app,router} = props
    const lessonController = new LessonController(props)
    const [mode,setMode] = React.useState()
    
    const [item,setItem] = React.useState({})

    const {id,ref} = React.useMemo(()=>router.query,[])

    React.useEffect(async ()=>{

        try{

            if(app.currentPage=="classrooms" || ref=="classrooms") setMode("answer")
            else setMode("question")

            const lesson = await lessonController._get(id)
            setItem(lesson.data)

        }catch(error){
            router.push(`/${auth.account.uniqueURL}/content/classrooms/`)
            console.log(error)
        }
        
    },[])

    React.useEffect(()=>{

        if(mode=="answer"){
            if(AuthController.isStudent(auth) || AuthController.isMember(auth)){
                router.push(`/${auth.account.uniqueURL}/main/home/`)
            }
        }

    },[mode])

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
                    setTimeout(()=>router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.post && item.post.id}`),1000)
                }).catch(error=>console.log(error))
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    return(
        <LayoutLesson>
            <NextSeo title={`Konten - Materi - ${item.title}`}/>
            <Row>
				<Col md={24}>
                    <PageHeader title={item.title} subTitle={item.post && item.post.title} ghost={false}
                        onBack={()=>{window.history.back()
                            //if(window.history) window.history.back()
                            //else router.push(`/[account_ur]/main/home/classrooms/[id]`,`/${auth.account.uniqueURL}/main/home/classrooms/${item.post.id}`,{shallow:true})
                        }}

						extra={[
							<div className="d-inline" key="1">
                                {Permission.UPDATE_LESSON({auth}) 
                                    && <Link href={{pathname:`/${auth.account.uniqueURL}/content/lessons/[id]/edit`,query:{id:item.id}}} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Ubah materi</Button></Link>}
                            </div>,
                            <div className="d-inline" key="2">
                                {Permission.DELETE_LESSON({auth}) 
                                    && <Button  type="primary" onClick={()=>showDeleteConfirm(item)}><i className="ti-trash"></i>&nbsp;Hapus materi</Button>}
                            </div>
						]}
					/>
					
				</Col>
			</Row>
            <Row>
                <Col md={24}>
                    <VuroxComponentsContainer className="p-4">
                        <HTMLRenderer html={item.content ? item.content : ""}/>
                    </VuroxComponentsContainer>
                </Col>
            </Row>
            
            {mode=="answer" ? 
                <Row>
                    <Col md={24} className="mt-2">
                        <VuroxComponentsContainer>
                            <ListTutorQnas lesson={item} qnaType="ques"/>
                        </VuroxComponentsContainer>
                    </Col>
                </Row>
            :
                <Row>
                    <Col md={24} sm={24} xs={24}>
                        <VuroxComponentsContainer className="p-4 mt-2">
                        <ListStudentQnas lesson={item} qnaType="ques" createdById={auth.user.id}/>
                            {/* <FormQna formId="qnaForm" lesson={item} qnaType="ques" replyToUser={item && item.createdBy} onSuccess={onSuccessAddQestion}/> */}
                        </VuroxComponentsContainer>
                    </Col>
                </Row>
            }   
            
        </LayoutLesson> 
    )
}

export default connect(
    state=>({auth:state.auth,app:state.app}),
    (dispatch)=>({
            ...bindPromiseCreators({
                getLessonRoutinePromise,
                updateLessonRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageLessonId))