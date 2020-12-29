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
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout
} from 'Components/layout'
import HeaderDark from 'Templates/HeaderDark';
import { vuroxContext } from 'Context'
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import LessonController from 'Library/controllers/LessonController'
import FormLesson from 'Components/FormLesson'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getLessonRoutinePromise} from 'State/routines/lesson'
import {NextSeo} from 'next-seo'

const PageLessonEdit = props => {

    const {Text} = Typography
    const {confirm} = Modal

    const {auth,router} = props

    const lessonController = new LessonController(props)
    
    const [item,setItem] = React.useState({})

    const {lid} = React.useMemo(()=>router.query,[])

    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'
    
    React.useEffect(async ()=>{
       
        try{
            const lesson = await lessonController._get(lid)
            setItem(lesson.data)

        }catch(error){
            router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.classroom && item.classroom.id}`)
            console.log(error)
        }
        
    },[])

    const pagename=""
    const links = [
                    ['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],
                    ['Ruang belajar',`/${auth.account.uniqueURL}/content/classrooms`,''],
                    [item.classroom && item.classroom.title,`/${auth.account.uniqueURL}/content/classrooms/${item.classroom && item.classroom.id}`,''],
                    ['Materi',`/${auth.account.uniqueURL}/content/classrooms/${item.classroom && item.classroom.id}`,''],
                    [item.title,`/${auth.account.uniqueURL}/content/classrooms/${item.classroom && item.classroom.id}/lessons/${item.id}`,''],
                    ['Ubah',`/${auth.account.uniqueURL}/content/classrooms/${item.id}/edit`,'active']
                ]

    const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.classroom.id}/lessons/${item.id}`)	
    }
    
    const onSuccess = classroom =>{
        console.log(classroom)
        //userController._updateList("add",user,0)
        router.push(`/${auth.account.uniqueURL}/content/classrooms/${item.classroom.id}/lessons/${item.id}`)	
    }
    

    return(
        <AppContainer>
            <NextSeo title={`Konten - Ubah materi - ${item.title}`}/>
			<HeaderLayout className="sticky-top">
				<HeaderDark />
			</HeaderLayout>
			<VuroxLayout>
				<VuroxSidebar width={240} className={`sidebar-container  ${toggleClass}`} >
					<Sidebar className={toggleClass} />
				</VuroxSidebar>
				<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
					<Summery2 pagename={pagename} links={links}/>
					<FormLesson item={item} onSuccess={onSuccess} onCancel={onCancel}/>
				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
    )

    

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                getLessonRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageLessonEdit))