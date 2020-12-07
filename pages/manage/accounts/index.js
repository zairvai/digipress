import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {	
	VuroxTableDark
} from 'Components/tables'
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
import {Status} from 'Components/mycomponents.js'
import { Search} from 'react-bootstrap-icons'
import { DownOutlined } from '@ant-design/icons';
import AppContainer from 'Templates/AppContainer'
import AccountController from 'Library/controllers/AccountController'
import {mdiDotsVertical} from '@mdi/js'
import Icon from '@mdi/react'

const PageAccounts = props => {

	const {router,listAccounts} = props

	const [items,setItems] = React.useState([])
	const [foundItem,setFoundItem] = React.useState(0)

	const accountController = new AccountController(props)

	React.useEffect(()=>{
		accountController._list({orderBy:"createdAt",direction:"asc",from:0,size:50})
	},[])

	React.useEffect(()=>{
		if(listAccounts.isSuccessFull){
			
			setItems(listAccounts.list.items)
			setFoundItem(listAccounts.list.foundDocs)

			console.log("loading complete")
		}else{
			console.log("still loading")
		}
		
	},[listAccounts.isSuccessFull,listAccounts.list])

    const pagename=""
	const links = [['Manage','/manage/accounts',''],['Accounts','/manage/accounts','active']]

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

	// const tableAction = (
	// 	<Menu>
	// 	  <Menu.Item key="1">
	// 		Enable
	// 	  </Menu.Item>
	// 	  <Menu.Item key="2">
	// 		Disable
	// 	  </Menu.Item>
	// 	  <Menu.Item key="3">
	// 		Delete
	// 	  </Menu.Item>
	// 	</Menu>
	//   );

	// const[checkboxAllSelected,setCheckbokAllSelected] = React.useState(true)

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
							{/* <div className="d-flex">

								<VuroxFormSearch border='rounded-pill border-0' placeholder='Search...' icon={<Search />} className="mr-2"/>

								{checkboxAllSelected ? 
									<Dropdown overlay={tableAction} trigger={["click"]}>
										<Button shape="round">
											Action <DownOutlined />
										</Button>
									</Dropdown>
									:
									<></>
								}
							</div> */}
						</Col>
						<Col md={12}>
							<div className="fright">
								<ul className="vurox-horizontal-links vurox-standard-ul pt-3">
									<li className="p-0"><Link href={{pathname:'/manage/accounts/add'}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah akun</a></Link></li>
								</ul>
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={24}>
							<VuroxComponentsContainer>
								<VuroxTableDark>
									<table className="table table-borderless">
										<thead>
											<tr>
												{/* <th width="20"><Checkbox/></th> */}
												<th>Akun</th>
												<th width="30%">Alamat</th>
												<th width="15%">Telpon</th>
												<th width="20%">Contact Person</th>
												<th className="fright">Status</th>
												{/* <th className="fright"></th> */}
											</tr>
										</thead>
										<tbody>
											{
												items.map(item=>{

													if(item){

														return(
															<tr key={item.id}>
																{/* <td><Checkbox/></td> */}
																<td valign="middle"><Link href={{pathname:'/manage/accounts/[id]',query:{id:item.id}}} shallow><a>{item.name}</a></Link></td>
																<td valign="middle">{item.address}</td>
																<td valign="middle">{item.phoneNumber}</td>
																<td valign="middle">{item.contactPerson}</td>
																<td valign="middle" className="fright">
																	{
																		item.status===3 ? <Status text="Active" state="success" position="right"/> :
																		item.status===2 ? <Status text="Pending" state="warning" position="right" blinking/> :
																		<></>
																	}
																</td>
																{/* <td>
																	<Popover placement="left" title={text} content={menuContent} trigger="click">
																		<Button type="link" icon={<Icon size="1.3em" path={mdiDotsVertical} />}/>
																	</Popover>
																</td> */}
															</tr>
														)
													}
												})
												
											}
										</tbody>
									</table>
									
								</VuroxTableDark>
								
							</VuroxComponentsContainer>	
						</Col>
					</Row>
					
				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
	);
	
}
export default connect(state=>state)(PageAccounts)