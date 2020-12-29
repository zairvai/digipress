import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'

import LayoutClassroom from 'Templates/Layout.classroom'
import FormClassroom from 'Components/FormClassroom'
import {Row,Col,PageHeader} from 'antd'
import CategoryController from 'Library/controllers/CategoryController'
import TagController from 'Library/controllers/TagController'
import ClassroomController from 'Library/controllers/ClassroomController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listCategoriesRoutinePromise } from 'State/routines/category';
import { listTagsRoutinePromise } from 'State/routines/tag';

import { getClassroomRoutinePromise} from 'State/routines/classroom';

import {NextSeo} from 'next-seo'

const PageClassroomEdit = props => {

	const {auth,listTags,listCategories,router} = props
	
	const classroomController = new ClassroomController(props)
	const categoryController = new CategoryController(props)
	const tagController = new TagController(props)

	const [item,setItem] = React.useState(false)

	const {id} = React.useMemo(()=>router.query,[])
	
    const pagename=""
	const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Ruang belajar',`/${auth.account.uniqueURL}/content/classrooms`,''],[item.title,`/${auth.account.uniqueURL}/content/classrooms/${item.id}`,''],["Ubah",`/${auth.account.uniqueURL}/content/classrooms/${item.id}/edit`,'active']]

	React.useEffect(async()=>{
		
		//get category
		categoryController._list({accountId:auth.account.id})
		//get tag
		tagController._list({accountId:auth.account.id})

		try{
			const classroom = await classroomController._get(id)
			setItem(classroom.data)
		}catch(error){
			router.push(`/${auth.account.uniqueURL}/content/classrooms`)
		}
			

	},[])


	const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.id}`)	
    }
    
    const onSuccess = classroom =>{
		console.log(classroom)
        router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.id}`)	
	}
	
	return (
		<LayoutClassroom>
			<NextSeo title={`Konten - Ubah ruang belajar - ${item.title}`}/>
			<Row>
				<Col md={24}>
					<PageHeader title="Ubah ruang belajar" subTitle={item.title} ghost={false}
						onBack={()=>router.push(`/[account_ur]/content/classrooms/[id]`,`/${auth.account.uniqueURL}/content/classrooms/${item.id}`,{shallow:true})}
					/>
				</Col>
			</Row>
			<Row>
				<Col md={24} className="mt-2">
					<FormClassroom item={item} onSuccess={onSuccess} onCancel={onCancel} 
						accountId={auth.account.id} 
						categories={listCategories.list.items} 
						tags={listTags.list.items}/>
				</Col>
			</Row>
		</LayoutClassroom>
	);
	
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
				getClassroomRoutinePromise,
				listCategoriesRoutinePromise,
				listTagsRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageClassroomEdit))