import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout
} from 'Components/layout'
import { vuroxContext } from 'Context'
import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';
import AppContainer from 'Templates/AppContainer'
import FormClassroom from 'Components/FormClassroom'

import CategoryController from 'Library/controllers/CategoryController'
import TagController from 'Library/controllers/TagController'
import ClassroomController from 'Library/controllers/ClassroomController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listCategoriesRoutinePromise } from 'State/routines/category';
import { listTagsRoutinePromise } from 'State/routines/tag';

import { getClassroomRoutinePromise} from 'State/routines/classroom';


const PageClassroomEdit = props => {

	const {auth,listTags,listCategories,router} = props
	
	const classroomController = new ClassroomController(props)
	const categoryController = new CategoryController(props)
	const tagController = new TagController(props)

	const [item,setItem] = React.useState(false)

	const {id} = React.useMemo(()=>router.query,[])
	
    const pagename=""
	const links = [['Content',`/${auth.account.uniqueURL}/content/classrooms`,''],['Classrooms',`/${auth.account.uniqueURL}/content/classrooms`,''],[item.title,`/${auth.account.uniqueURL}/content/classrooms/${item.id}`,''],["Edit",`/${auth.account.uniqueURL}/content/classrooms/${item.id}/edit`,'active']]
	
	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

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
        router.push(`/${auth.account.uniqueURL}/content/classrooms`)	
    }
    
    const onSuccess = classroom =>{
		console.log(classroom)
        //userController._updateList("add",user,0)
        router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.id}`)	
	}
	
	return (
		<AppContainer>
			<HeaderLayout className="sticky-top">
				<HeaderDark />
			</HeaderLayout>
			<VuroxLayout>
				<VuroxSidebar width={240} className={`sidebar-container  ${toggleClass}`} >
					<Sidebar className={toggleClass} />
				</VuroxSidebar>
				<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
					<Summery2 pagename={pagename} links={links}/>
					<FormClassroom item={item} onSuccess={onSuccess} onCancel={onCancel} accountId={auth.account.id} categories={listCategories.list.items} tags={listTags.list.items}/>
				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
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