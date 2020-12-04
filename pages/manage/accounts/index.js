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
import { Row, Col,Button, Checkbox,Dropdown,Menu} from 'antd'
import {Status} from 'Components/mycomponents.js'
import { Search} from 'react-bootstrap-icons'
import { DownOutlined } from '@ant-design/icons';
import AppContainer from 'Templates/AppContainer'

const Index = props => {

    const pagename="Accounts"
	const links = [['Manage','/manage/accounts',''],['Accounts','/manage/accounts','active']]

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

	const[checkboxAllSelected,setCheckbokAllSelected] = React.useState(false)

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
						<Col md={12}>
							<div className="d-flex">

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
							</div>
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
								{/* <VuroxTableHeading>
									
								</VuroxTableHeading> */}
								<VuroxTableDark>
									<table className="table table-borderless">
										<thead>
											<tr>
												<th width="20"><Checkbox/></th>
												<th>Akun</th>
												<th width="30%">Alamat</th>
												<th width="15%">Telpon</th>
												<th width="20%">Contact Person</th>
												<th className="fright">Status</th>
											</tr>
										</thead>
										<tbody>
											{
												props.accounts.list.map(item=>(
													<tr key={item.id}>
														<td><Checkbox/></td>
														<td valign="middle"><Link href={{pathname:'/app/accounts/[id]',query:{id:item.id}}} shallow><a>{item.name}</a></Link></td>
														<td valign="middle">{item.address}</td>
														<td valign="middle">{item.phone}</td>
														<td valign="middle">{item.person}</td>
														<td valign="middle" className="fright">
															{
																item.status===3 ? <Status text="Active" state="success" position="right"/> :
																item.status===2 ? <Status text="Pending" state="warning" position="right" blinking/> :
																<></>
															}
														</td>
													</tr>
												))
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
export default connect(state=>state)(Index)