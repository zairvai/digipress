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
import { Row, Col,Button, Checkbox,Dropdown,Menu,Tag} from 'antd'
import {Status} from 'Components/mycomponents.js'
import { Search} from 'react-bootstrap-icons'
import { DownOutlined } from '@ant-design/icons';
import AppContainer from 'Templates/AppContainer'

class index extends React.Component {

	static contextType = vuroxContext

	state = {
		checkboxSelected:true,
	}

    pagename="Classrooms"
	links = [['App','/app/classrooms',''],['Classrooms','/app/classrooms','active']]
	
	componentDidMount(){
		
    }

	render() {
		const { menuState } = this.context
		const toggleClass = menuState ? 'menu-closed' : 'menu-open'

		const tableAction = (
			<Menu>
			  <Menu.Item key="1">
				Enable
			  </Menu.Item>
			  <Menu.Item key="2">
				Disable
			  </Menu.Item>
			  <Menu.Item key="3">
				Delete
			  </Menu.Item>
			</Menu>
		  );

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
                        <Summery2 pagename={this.pagename} links={this.links}/>
                        <Row className="mb-2">
                            <Col md={12}>
								<div className="d-flex">

									<VuroxFormSearch border='rounded-pill border-0' placeholder='Search...' icon={<Search />} className="mr-2"/>

									{this.state.checkboxSelected ? 
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
										<li className="p-0"><Link href={{pathname:'/app/classrooms/add'}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah classroom</a></Link></li>
										{/* <li className="p-0"><Link href={{pathname:'/app/classrooms/add'}} shallow><Button className="link" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp;Tambah classroom</Button></Link></li> */}
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
													<th className="fleft">Classroom</th>
													<th>Pelajaran</th>
													<th>Quiz</th>
													<th>Tags</th>
													<th>Akses</th>
													<th>Penulis</th>
													<th className="fright">Status</th>
												</tr>
											</thead>
											<tbody>
												{
													this.props.classrooms.list.map(item=>(
														<tr key={item.id}>
															<td><Checkbox/></td>
															<td valign="middle"><Link href={{pathname:'/app/classrooms/[id]',query:{id:item.id}}} shallow><a>{item.name}</a></Link></td>
															<td valign="middle">{item.noOfModules}</td>
															<td valign="middle">{item.noOfQuizes}</td>
															<td valign="middle">
																{
																	item.tags.map(tag=>
																		<Tag key={tag.id}>
																			<Link href={{pathname:'/app/tags/[name]',query:{name:tag.name}}} shallow><a>{tag.name}</a></Link>
																		</Tag>	
																	)
																}
															</td>
															<td valign="middle">{item.readAccess}</td>
															<td valign="middle"><Link href={{pathname:'/access/user/[id]',query:{id:item.author.id}}} shallow><a>{item.author.name}</a></Link></td>
															<td valign="middle" className="fright">
																{
																	item.status===1 ? <Status text="Published" state="success" position="right"/> :
																	item.status===2 ? <Status text="Draft" state="warning" position="right"/> :
																	// campaign.status===2 ? <Status text="On Approval" state="warning" position="right"/> :
																	// campaign.status===3 ? <Status text="Running" state="success" position="right" blinking/> :
																	// campaign.status===4 ? <Status text="Finished" state="default" position="right"/> :
																	// campaign.status===5 ? <Status text="Canceled" state="fail" position="right"/> :
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
}
export default connect(state=>state)(index)