import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row, Col,Modal,Typography,PageHeader,Button} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListLessons from 'Components/ListLessons'
import LayoutClassroom from 'Templates/Layout.classroom'
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
            router.push(`/${auth.account.uniqueURL}/content/classrooms`)
            console.log(error)
        }
        
    },[])

    

    //const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Ruang belajar',`/${auth.account.uniqueURL}/content/classrooms`,''],[item.title,`/${auth.account.uniqueURL}/content/classrooms/${item.id}`,'active']]

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
        <LayoutClassroom>
            <NextSeo title={`Konten - Ruang belajar - ${item.title}`}/>
            <Row>
				<Col md={24}>
                    <PageHeader title={item.title} subTitle={item.category && item.category.name} ghost={false}
                        onBack={()=>router.push(`/[account_ur]/content/classrooms`,`/${auth.account.uniqueURL}/content/classrooms`,{shallow:true})}
						extra={[
							<div className="d-inline" key="1">
                                {Permission.UPDATE_CLASSROOM({auth}) 
                                    && <Link href={{pathname:`/${auth.account.uniqueURL}/content/classrooms/[id]/edit`,query:{id:item.id}}} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Ubah ruang belajar</Button></Link>}
                            </div>,
                            <div className="d-inline" key="2">
                                {Permission.DELETE_CLASSROOM({auth}) 
                                    && <Button  type="primary" onClick={()=>showDeleteConfirm(item)}><i className="ti-trash"></i>&nbsp;Hapus ruang belajar</Button>}
                            </div>
						]}
					/>
					
				</Col>
			</Row>
            <Row>
                <Col md={24}>
                    <VuroxComponentsContainer className="p-4">
                        <Reader item={item}/>
                    </VuroxComponentsContainer>
                </Col>
            </Row>
            <Row>
                <Col md={24} className="mt-2">
                    <Row>
                        <Col md={24}>
                            <PageHeader title="Materi" ghost={false}
                                extra={[
                                    <div className="d-inline" key="1">
                                        {Permission.ADD_LESSON({auth}) 
                                            && <Link href={`/${auth.account.uniqueURL}/content/lessons/add?id=${item.id}`} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Tambah materi</Button></Link>}
                                    </div>
                                ]}
                            />
                        </Col>
                    </Row>
                    <VuroxComponentsContainer>
                        <Row className="mt-3">
                            <Col md={24}>
                                <ListLessons postId={id}/>
                            </Col>
                        </Row>
                    </VuroxComponentsContainer>
                </Col>
            </Row>
        </LayoutClassroom>
    )
}

export default withRouter(connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                getClassroomRoutinePromise,
                updateClassroomRoutinePromise
        },dispatch),dispatch
    })
)(PageClassroomId))