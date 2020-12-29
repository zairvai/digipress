import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row, Col, PageHeader} from 'antd'
import LayoutLesson from 'Templates/Layout.lesson'
import FormLesson from 'Components/FormLesson'

import ClassroomController from 'Library/controllers/ClassroomController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { getClassroomRoutinePromise } from 'State/routines/classroom';

import {NextSeo} from 'next-seo'

const PageLessonAdd = props => {

	const {auth,router} = props
	
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

    // const pagename=""
	// const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Ruang belajar',`/${auth.account.uniqueURL}/content/classrooms`,''],[item.title,`/${auth.account.uniqueURL}/content/classrooms/${item.id}/`,''],['Penambahan materi',`/${auth.account.uniqueURL}/content/lessons/add`,'active']]
	

	const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.id}`)	
    }
    
    const onSuccess = lesson =>{
		console.log(lesson)
        //userController._updateList("add",user,0)
        router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.id}`)	
	}
	
	return (
		<LayoutLesson>
			<NextSeo title="Konten - Tambah materi"/>
			<Row>
				<Col md={18} sm={24} xs={24}>
					<PageHeader title="Tambah materi" subTitle={item.title} ghost={false}
						onBack={()=>router.push(`/[account_ur]/content/classrooms/[id]`,`/${auth.account.uniqueURL}/content/classrooms/${item.id}`,{shallow:true})}
					/>
				</Col>
			</Row>
			<Row>
				<Col md={18} sm={24} xs={24} className="mt-2">
					<FormLesson 
						onSuccess={onSuccess} onCancel={onCancel} 
						accountId={auth.account.id} postId={item.id}/>
				</Col>
			</Row>
			
		</LayoutLesson>
	);
	
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
				getClassroomRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageLessonAdd))