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
import ListLessons from 'Components/ListLessons'
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import AuthController from 'Library/controllers/AuthController'
import ClassroomController from 'Library/controllers/ClassroomController'
import LessonController from 'Library/controllers/LessonController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getClassroomRoutinePromise,updateClassroomRoutinePromise} from 'State/routines/classroom';
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

            lessonController._list({accountId,postId:id,orderBy:lessonOrderBy,direction:lessonDirection})

        }catch(error){
            router.push(`/${auth.account.uniqueURL}/content/classrooms`)
            console.log(error)
        }
        
    },[])

    

    const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Ruang belajar',`/${auth.account.uniqueURL}/content/classrooms`,''],[item.title,`/${auth.account.uniqueURL}/content/classrooms/${item.id}`,'active']]

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
                                <Col md={12}>
                                    {/* <div className="fright ml-3">
                                        <ul className="vurox-horizontal-links vurox-standard-ul">
                                            <li className="p-0"><Link href={{pathname:'/content/classrooms/[id]/quizes/add',query:{id:item.id}}}shallow><Button className="link" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp;Tambah quiz</Button></Link></li>
                                        </ul>
                                    </div> */}
                                    <div className="fright">
                                        <ul className="vurox-horizontal-links vurox-standard-ul">
                                            <li className="p-0"><Link href={{pathname:`/${auth.account.uniqueURL}/content/classrooms/[id]/lessons/add`,query:{id:item.id}}}shallow><a><i className="ti-plus"></i>&nbsp;Tambah materi</a></Link></li>
                                        </ul>
                                    </div>
                                    
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}>
                                    <ListLessons items={listLessons.list.items} classroomId={item.id} />
                                </Col>
                            </Row>
                        </VuroxComponentsContainer>
                    </Col>
                </Row>

                {/* <Row>
                    <Col md={24}>
                        <VuroxComponentsContainer className="p-4 mt-2">
                            <Row>
                                <Col md={12}><h6>Tanya &amp; Jawab</h6></Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}>
                                    <VuroxTableDark>
                                        <table className="table table-borderless mb-0">
                                            <thead>
                                                <tr>
                                                    <th width="20"><Checkbox/></th>
                                                    <th width="40%">Topik</th>
                                                    <th width="20%">Tanggal</th>
                                                    <th>Penanya</th>
                                                    <th className="fright">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                props.questions.list.map(item=>(
                                                    <tr key={item.id}>
                                                        <td><Checkbox/></td>
                                                        <td valign="middle"><Link href={{pathname:'/content/classrooms/[id]/questions/[qid]',query:{id:item.id,qid:item.id}}} shallow><a>{item.name}</a></Link></td>
                                                        <td valign="middle">{item.datetime}</td>
                                                        <td valign="middle"><Link href={{pathname:'/access/user/[id]',query:{id:item.author.id}}} shallow><a>{item.author.name}</a></Link></td>
                                                        <td valign="middle" className="fright">
                                                            {
                                                                item.status===2 ? <Status text="Belum terjawab" state="warning" position="right" blinking/> :
                                                                item.status===3 ? <Status text="Terjawab" state="success" position="right"/> :
                                                                // campaign.status===2 ? <Status text="On Approval" state="warning" position="right"/> :
                                                                // campaign.status===3 ? <Status text="Running" state="success" position="right" blinking/> :
                                                                // campaign.status===4 ? <Status text="Finished" state="default" position="right"/> :
                                                                // campaign.status===5 ? <Status text="Canceled" state="fail" position="right"/> :
                                                                <></>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </VuroxTableDark>
                                </Col>
                            </Row>
                        </VuroxComponentsContainer>
                    </Col>
                </Row> */}

            </Layout>
        </AppContainer> 
    )

    

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                getClassroomRoutinePromise,
                updateClassroomRoutinePromise,
                listLessonsRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageClassroomId))