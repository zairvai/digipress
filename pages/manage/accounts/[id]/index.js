import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row, Col,Tag,Form,Input,Button, Checkbox,Dropdown,Menu,Select,Space,Radio,Typography} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import {	
	VuroxTableDark
} from 'Components/tables'

import HTMLRenderer from 'react-html-renderer'
import {Status} from 'Components/mycomponents.js'
import Layout from 'Templates/Layout.account.id'
import AppContainer from 'Templates/AppContainer'
import AccountController from 'Library/controllers/AccountController'

const {Text} = Typography

const PageAccountId = props => {

    const {router,getAccount} = props

	const [item,setItem] = React.useState({})

	const accountController = new AccountController(props)

    const {id} = router.query

    React.useEffect(()=>{
        accountController._get({id})
    },[])

    React.useEffect(()=>{

		if(getAccount.isSuccessFull){
			
			setItem(getAccount.item)

			console.log("loading complete")
		}else{
			console.log("still loading")
		}
	
    },[getAccount.isSuccessFull])

    const links = [['Manage','/manage/accounts',''],['Accounts','/manage/accounts',''],[item.name,`/manage/accounts/${item.id}`,'active']]
    
    return(
        <AppContainer>
            <Layout item={item} links={links}>
                <Row>
                    <Col md={24}>
                        <VuroxComponentsContainer className="p-4">
                            <Row>
                                <Col md={12}><h4>{item.name}</h4></Col>
                                <Col md={12}>
                                    <div className="fright">
                                        <ul className="vurox-horizontal-links vurox-standard-ul">
                                            <li className="p-0"><Link href={{pathname:'/manage/accounts/[id]/edit',query:{id:item.id}}} shallow><Button className="link" type="link" size="small" icon={<i className="ti-pencil"></i>}>&nbsp;Edit account</Button></Link></li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}>
                                    <Text>{item.address}</Text>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}><Text>Contact person&nbsp;:&nbsp;{item.contactPerson}</Text></Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}><Text>Email address&nbsp;:&nbsp;{item.emailAddress}</Text></Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}><Text>Telpon&nbsp;:&nbsp;{item.phoneNumber}</Text></Col>
                            </Row>
                        </VuroxComponentsContainer>
                    </Col>
                </Row>
                <Row>
                    <Col md={24}>
                        <VuroxComponentsContainer className="p-4 mt-2">
                            <Row>
                                <Col md={12}><h6>Pengguna Akun</h6></Col>
                                <Col md={12}>
                                    <div className="fright ml-3">
                                        <ul className="vurox-horizontal-links vurox-standard-ul">
                                            <li className="p-0"><Link href={{pathname:'/app/classrooms/[id]/quizes/add',query:{id:item.id}}}shallow><Button className="link" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp;Tambah pengguna</Button></Link></li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}>
                                    <VuroxTableDark>
                                        <table className="table table-borderless">
											<thead>
												<tr>
													<th width="20"><Checkbox/></th>
													<th>Pengguna</th>
													<th width="30%">Email</th>
													<th>Role</th>
													<th className="fright">Status</th>
												</tr>
											</thead>
											<tbody>
												{
													props.users.list.map(item=>(
														<tr key={item.id}>
															<td><Checkbox/></td>
                                                            <td valign="middle"><Link href={{pathname:'/app/users/[id]',query:{id:item.id}}} shallow><a>{item.firstname} {item.lastname}</a></Link></td>
															<td valign="middle">{item.email}</td>
															<td valign="middle">{item.role}</td>
															<td valign="middle" className="fright">
																{
                                                                    item.status===2 ? <Status text="Pending" state="warning" position="right" blinking/> :
																	item.status===3 ? <Status text="Active" state="success" position="right"/> :
                                                                    item.status===4 ? <Status text="Suspended" state="fail" position="right"/> :
																	<></>
																}
															</td>
														</tr>
													))
												}
											</tbody>
										</table>
                                    </VuroxTableDark>
                                </Col>
                            </Row>
                        </VuroxComponentsContainer>
                    </Col>
                </Row>

            </Layout>
        </AppContainer>
    )

    

}

export default connect(state=>state)(withRouter(PageAccountId))