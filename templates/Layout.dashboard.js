import React from 'react'
import {connect} from 'react-redux'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
} from 'Components/layout'
import {Row,Col,Typography} from 'antd'
import { vuroxContext } from 'Context'
import HeaderDark from 'Templates/HeaderDark';
import Summery from 'Templates/Summery';
import Sidebar from 'Templates/HeaderSidebar';
import AppContainer from 'Templates/AppContainer'
import AppController from 'Library/controllers/AppController'

const Layout = props => {

	const {app,pagename,links} = props

    const {Text} = Typography
    const appController = new AppController(props)

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

    React.useEffect(()=>{

        appController._setCurrentPage("dashboard")

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
					<Summery/>
                    <Row className="mb-2">
                        <Col md={12}>
                            <div className="vurox-tabs-underlined vurox-dark vurox-tabs-underlined-left mt-3 mb-1">
                                <ul className="nav nav-pills vurox-dropdown-list" id="vurox-tab" role="tablist">
                                    <li className="nav-item">
                                        <Text>Overview</Text>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div className="fright">
                                <ul className="vurox-horizontal-links vurox-standard-ul pt-3">
                                    <li><a href=""><i className="ti-save"></i> Download report</a></li>
                                    <li><a href=""><i className="ti-email"></i> Send to email</a></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
					{props.children}
				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
	);
	
}


export default connect(state=>({app:state.app,auth:state.auth}))(Layout)