import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Link from 'next/link'
import {Mylink} from 'Components/mycomponents'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import VuroxFormSearch from 'Components/search'
import { vuroxContext } from 'Context'
import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';
import { Row, Col,Button, Popover} from 'antd'
import { Search} from 'react-bootstrap-icons'
import ListAccounts from 'Components/ListAccounts'
import AppContainer from 'Templates/AppContainer'
import AccountController from 'Library/controllers/AccountController'
import AppController from 'Library/controllers/AppController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listAccountsRoutinePromise } from 'State/routines/account';

const PageAccounts = props => {

	const {auth} = props

	const appController = new AppController(props)

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'
	  
	React.useEffect(()=>{

        appController._setCurrentPage("home")

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
					
					
                    <Row className="mb-2">
                        <Col md={12}>
                            <div className="vurox-tabs-underlined vurox-dark vurox-tabs-underlined-left mt-3 mb-3">
                                <ul className="nav nav-pills vurox-dropdown-list" id="vurox-tab" role="tablist">
                                    <li className="nav-item">
                                        <Mylink href={`/${auth.account.uniqueURL}/main/home/all`} text="Semua"/>
                                    </li>
                                    <li className="nav-item">
                                        <Mylink href={`/${auth.account.uniqueURL}/main/home/articles`} text="Berita / Artikel"/>
                                    </li>
                                    <li className="nav-item">
                                        <Mylink href={`/${auth.account.uniqueURL}/main/home/classrooms`} text="Ruang belajar"/>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
					<Row>
						<Col md={24}>
							{props.children}
						</Col>
					</Row>
					
				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
	);
	
}


export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            listAccountsRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageAccounts))