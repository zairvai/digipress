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

    const pagename=""
	const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Ruang belajar',`/${auth.account.uniqueURL}/content/classrooms`,''],[item.title,`/${auth.account.uniqueURL}/content/classrooms/${item.id}/`,''],['Penambahan materi',`/${auth.account.uniqueURL}/content/lessons/add`,'active']]
	
	const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'
    

	const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.id}`)	
    }
    
    const onSuccess = lesson =>{
		console.log(lesson)
        //userController._updateList("add",user,0)
        router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.id}`)	
	}
	
	return (
		<AppContainer>
			<NextSeo title="Konten - Tambah materi"/>
			<HeaderLayout className="sticky-top">
				<HeaderDark />
			</HeaderLayout>
			<VuroxLayout>
				<VuroxSidebar width={240} className={`sidebar-container  ${toggleClass}`} >
					<Sidebar className={toggleClass} />
				</VuroxSidebar>
				<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
					<Summery2 pagename={pagename} links={links}/>
					<FormLesson 
						onSuccess={onSuccess} onCancel={onCancel} 
						accountId={auth.account.id} postId={item.id}/>
				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
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