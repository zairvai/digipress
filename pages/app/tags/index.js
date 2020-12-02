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
import { Search} from 'react-bootstrap-icons'
import { DownOutlined } from '@ant-design/icons';


class index extends React.Component {

	static contextType = vuroxContext

	state = {
		checkboxSelected:true,
	}

    pagename="Tags"
	links = [['App','/app/classrooms',''],['Tags','/app/tags','active']]
	
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
			<React.Fragment>
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
                                        <li className="p-0"><Link href={{pathname:'/app/articles/add'}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah tag</a></Link></li>
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
													<th>Tag</th>
												</tr>
											</thead>
											<tbody>
												{
													this.props.tags.list.map(item=>(
														<tr key={item.id}>
															<td><Checkbox/></td>
															<td valign="middle">{item.name}</td>
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
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(index)