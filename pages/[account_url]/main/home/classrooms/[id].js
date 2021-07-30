import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.home'
import { Row, Col,Modal,Typography,PageHeader,Button} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'

import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListLessons from 'Components/ListLessons'
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import ClassroomController from 'Library/controllers/ClassroomController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { getClassroomRoutinePromise,updateClassroomRoutinePromise} from 'State/routines/classroom';
import Reader from 'Components/ReaderClassroom'

import {NextSeo} from 'next-seo'

const PageClassroomId = props => {

    const {Text} = Typography
    const {confirm} = Modal

    const {auth,getClassroom,listLessons,router} = props

    const classroomController = new ClassroomController(props)
    
    const [item,setItem] = React.useState({})

    const {id} = React.useMemo(()=>router.query,[])

    React.useEffect(async ()=>{
       
        try{
            const classroom = await classroomController._get(id)
            //console.log(classroom)
            setItem(classroom.data)

        }catch(error){
            router.push(`/${auth.account.uniqueURL}/main/home/classrooms`)
            console.log(error)
        }
        
    },[])


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
                    setTimeout(()=>router.push(`/${auth.account.uniqueURL}/main/home/classrooms`),1000)
                }).catch(error=>console.log(error))
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    return(
        <Layout>
            <NextSeo title={`${item.title} - Ruang belajar`}/>
            <Row>
				<Col md={24}>
                    <PageHeader title={item.title} subTitle={item.category && item.category.name} ghost={false}
                        onBack={()=>window.history.back()}
						extra={[
							<div className="d-inline" key="1">
                                {Permission.UPDATE_CLASSROOM({auth}) 
                                    && <Link href={{pathname:`/${auth.account.uniqueURL}/content/articles/[id]/edit`,query:{id:item.id}}} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Ubah artikel</Button></Link>}
                            </div>,
                            <div className="d-inline" key="2">
                                {Permission.DELETE_CLASSROOM({auth}) 
                                    && <Button  type="primary" onClick={()=>showDeleteConfirm(item)}><i className="ti-trash"></i>&nbsp;Hapus artikel</Button>}
                            </div>
						]}
					/>
					
				</Col>
			</Row>
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
                                        {Permission.ADD_LESSON({auth}) && <li className="p-0"><Link href={{pathname:`/${auth.account.uniqueURL}/content/classrooms/[id]/lessons/add`,query:{id:item.id}}}shallow><a><i className="ti-plus"></i>&nbsp;Tambah materi</a></Link></li>}
                                    </ul>
                                </div>
                                
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={24}>
                                <ListLessons postId={id} destinationPath={`/${auth.account.uniqueURL}/content/lessons/[id]`}/>
                            </Col>
                        </Row>
                    </VuroxComponentsContainer>
                </Col>
            </Row>
        </Layout>
     
    )

    

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                getClassroomRoutinePromise,
                updateClassroomRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageClassroomId))