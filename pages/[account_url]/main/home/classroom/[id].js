import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.classroom.id'
import { Row, Col,Modal,Typography} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListLessons from 'Components/ListLessons'
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import AuthController from 'Library/controllers/AuthController'
import ClassroomController from 'Library/controllers/ClassroomController'
import LessonController from 'Library/controllers/LessonController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getClassroomRoutinePromise,deleteClassroomRoutinePromise} from 'State/routines/classroom';
import { listLessonsRoutinePromise} from 'State/routines/lesson'
import Reader from 'Components/ReaderClassroom'

const PageClassroomId = props => {

    const {Text} = Typography
    const {confirm} = Modal

    const {auth,getClassroom,listLessons,router} = props

    const classroomController = new ClassroomController(props)
    const lessonController = new LessonController(props)

    const [lessonOrderBy,setLessonOrderBy]	= React.useState("seq.keyword")
    const [lessonDirection,setLessonDirection] = React.useState("asc")
    
    const [item,setItem] = React.useState({})

    const {id} = React.useMemo(()=>router.query,[])

    React.useEffect(async ()=>{
       
        try{
            const classroom = await classroomController._get(id)
            //console.log(classroom)
            setItem(classroom.data)

            let accountId = null

            if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
                accountId = auth.account.id
            }

            lessonController._list({accountId,classroomId:id,orderBy:lessonOrderBy,direction:lessonDirection})

        }catch(error){
            router.push(`/${auth.account.uniqueURL}/content/classrooms`)
            console.log(error)
        }
        
    },[])

    const links = [['Main',`/${auth.account.uniqueURL}/main/home/all`,''],['Ruang belajar',`/${auth.account.uniqueURL}/main/home/classrooms`,''],[item.title,`/${auth.account.uniqueURL}/main/home/classroom/${item.id}`,'active']]

    const showDeleteConfirm = item => {
        confirm({
          title: 'Apakah kamu ingin menghapus ruang belajar ini ?',
          icon: <ExclamationCircleOutlined />,
          content: item.title,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {
            classroomController._delete(item)
                .then(classroom=>{
                    setTimeout(()=>router.push(`/${auth.account.uniqueURL}/content/classrooms`),1000)
                }).catch(error=>console.log(error))
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    return(
        <AppContainer>
            <Layout item={item} links={links}>
                <Row>
                    <Col md={24}>
                        <VuroxComponentsContainer className="p-4">
                            <Reader item={getClassroom.item} onDelete={showDeleteConfirm}/>
                        </VuroxComponentsContainer>
                    </Col>
                </Row>
                <Row>
                    <Col md={24}>
                        <VuroxComponentsContainer className="p-4 mt-2">
                            <Row>
                                <Col md={12}><h6>Materi</h6></Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}>
                                    <ListLessons items={listLessons.list.items} classroomId={item.id} />
                                </Col>
                            </Row>
                        </VuroxComponentsContainer>
                    </Col>
                </Row>

            </Layout>
        </AppContainer> 
    )

    

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                getClassroomRoutinePromise,
                deleteClassroomRoutinePromise,
                listLessonsRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageClassroomId))