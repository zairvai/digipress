import React from 'react'
import {connect} from 'react-redux'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
} from 'Components/layout'
import { vuroxContext } from 'Context'
import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';
import AppContainer from 'Templates/AppContainer'
import AppController from 'Library/controllers/AppController'

const Layout = props => {

	const {app,pagename,links} = props

    const appController = new AppController(props)

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

    React.useEffect(()=>{

        appController._setCurrentPage("lessons")

    },[])


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
					{props.children}
				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
	);
	
}


export default connect(state=>({app:state.app}))(Layout)