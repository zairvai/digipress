import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { vuroxContext } from 'Context'
import LayoutClassroom from 'Templates/Layout.classroom'
import FormClassroom from 'Components/FormClassroom'

import CategoryController from 'Library/controllers/CategoryController'
import TagController from 'Library/controllers/TagController'
import {Row,Col,PageHeader} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listCategoriesRoutinePromise } from 'State/routines/category';
import { listTagsRoutinePromise } from 'State/routines/tag';
import {NextSeo} from 'next-seo'

const PageClassroomAdd = props => {

	const {auth,listTags,listCategories,router} = props
	
	const categoryController = new CategoryController(props)
	const tagController = new TagController(props)

    const pagename=""
	const links = [['Kontent',`/${auth.account.uniqueURL}/content/classrooms`,''],['Ruang belajar',`/${auth.account.uniqueURL}/content/classrooms`,''],['Penambahan ruang belajar',`/${auth.account.uniqueURL}/content/classrooms/add`,'active']]
	
	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

	React.useEffect(()=>{
		
		//get category
		categoryController._list({accountId:auth.account.id})
		//get tag
		tagController._list({accountId:auth.account.id})

	},[])


	const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/classrooms`)	
    }
    
    const onSuccess = classroom =>{
        router.push(`/${auth.account.uniqueURL}/content/classrooms/${classroom.id}`)	
	}
	
	return (
		<LayoutClassroom>
			<NextSeo title="Konten - Tambah ruang belajar"/>
			<Row>
				<Col md={24}>
					<PageHeader title="Tambah ruang Belajar" ghost={false}
						onBack={()=>router.push(`/[account_ur]/content/classrooms`,`/${auth.account.uniqueURL}/content/classrooms`,{shallow:true})}
					/>
				</Col>
			</Row>
			<Row>
				<Col md={24} className="mt-2">
					<FormClassroom onSuccess={onSuccess} onCancel={onCancel} accountId={auth.account.id} categories={listCategories.list.items} tags={listTags.list.items}/>
				</Col>
			</Row>
		</LayoutClassroom>
	);
	
}

export default withRouter(connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
				listCategoriesRoutinePromise,
				listTagsRoutinePromise
        },dispatch),dispatch
    })
)(PageClassroomAdd))