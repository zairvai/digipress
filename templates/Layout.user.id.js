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
import Permission from 'Library/controllers/Permission'

const Layout = props => {

	const {auth,app,pagename,links} = props

    const appController = new AppController(props)

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

    const [isAllowed,setAllowed] = React.useState(false)

    React.useEffect(()=>{

		if(Permission.MANAGE_USERS({auth})){
			setAllowed(true)
		}

    },[])


	return (
		<AppContainer>
			{isAllowed ? 
				<>
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
				</>
			:
				<></>
			}
		</AppContainer>
	);
	
}


export default connect(state=>({auth:state.auth,app:state.app}))(Layout)