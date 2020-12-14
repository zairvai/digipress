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

const PageClassroomAdd = props => {

	const {auth,router} = props
    
    const pagename=""
	const links = [['Content',`/${auth.account.uniqueURL}/content/classrooms`,''],['Classrooms',`/${auth.account.uniqueURL}/content/classrooms`,''],['Add new classroom',`/${auth.account.uniqueURL}/content/classrooms/add`,'active']]
	
	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

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
					<FormClassroom/>
				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
	);
	
}
export default connect(state=>state)(withRouter(PageClassroomAdd))