import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Link from 'next/link'
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


import { bindPromiseCreators } from 'redux-saga-routines';
import { listAccountsRoutinePromise } from 'State/routines/account';

const PageAccounts = props => {

	const {auth,router,listAccounts} = props

	const [items,setItems] = React.useState([])
	const [foundItem,setFoundItem] = React.useState(0)

	const accountController = new AccountController(props)

	React.useEffect(async ()=>{
		await accountController._list({
			orderBy:"createdAt",
			direction:"asc",
			from:0,size:50})
	},[])

    const pagename=""
	const links = [['Manage',`/${auth.account.uniqueURL}/manage/accounts`,''],['Accounts',`/${auth.account.uniqueURL}/manage/accounts`,'active']]

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

	const text = <span>Title</span>;

	const menuContent = props =>{

		console.log(props)

		return(
			<div>
				<p>Content</p>
				<p>Content</p>
			</div>
		)
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
					<Row className="mb-2">
						<Col md={12} sm={24} xs={24}>
							<VuroxFormSearch border='rounded-pill border-0' placeholder='Search...' icon={<Search />}/>
						</Col>
						<Col md={12}>
							<div className="fright">
								<ul className="vurox-horizontal-links vurox-standard-ul pt-3">
									<li className="p-0"><Link href={{pathname:`/${auth.account.uniqueURL}/manage/accounts/add`}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah akun</a></Link></li>
								</ul>
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={24}>
							<VuroxComponentsContainer>
								<ListAccounts items={listAccounts.list.items} foundDoc={listAccounts.list.foundDocs}/>
							</VuroxComponentsContainer>	
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