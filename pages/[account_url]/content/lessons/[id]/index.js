import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row, Col,Modal,PageHeader,Button} from 'antd'
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
import {NextSeo} from 'next-seo'

const PageLessonId = props => {

    const {confirm} = Modal

    const {auth,router} = props
    const lessonController = new LessonController(props)
    
    const [item,setItem] = React.useState({})

    const {id} = React.useMemo(()=>router.query,[])

    React.useEffect(async ()=>{
       
        try{

            const lesson = await lessonController._get(id)
            setItem(lesson.data)

        }catch(error){
            router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.post.id}`)
            console.log(error)
        }
        
    },[])

    // const links = [
    //                 ['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],
    //                 ['Ruang belajar',`/${auth.account.uniqueURL}/content/classrooms`,''],
    //                 [item.post && item.post.title,`/${auth.account.uniqueURL}/content/classrooms/${item.post && item.post.id}`,''],
    //                 ['Materi',`/${auth.account.uniqueURL}/content/classrooms/${item.post && item.post.id}`,''],
    //                 [item.title,`/${auth.account.uniqueURL}/content/classrooms/${item.post && item.post.id}/lessons/${item.id}`,'active']]


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
                    <PageHeader title={item.title} subTitle={item.category && item.category.name} ghost={false}
                        onBack={()=>router.push(`/[account_ur]/content/classrooms/[id]`,`/${auth.account.uniqueURL}/content/classrooms/${item.post.id}`,{shallow:true})}
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
            <Row>
                <Col md={24} className="mt-2">
                    <VuroxComponentsContainer className="p-4">
                        <ListTutorQnas lesson={item} qnaType="ques"/>
                    </VuroxComponentsContainer>
                </Col>
            </Row>
        </LayoutLesson> 
    )
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                getLessonRoutinePromise,
                updateLessonRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageLessonId))