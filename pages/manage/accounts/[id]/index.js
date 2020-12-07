import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row, Col,Tag,Modal,Button, Checkbox,Typography} from 'antd'
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
import { ExclamationCircleOutlined } from '@ant-design/icons';


const {Text} = Typography
const {confirm} = Modal

const PageAccountId = props => {

    const accountController = new AccountController(props)

    const {router,deleteAccount,getAccount} = props

	const [item,setItem] = React.useState({})

    const {id} = router.query


    // React.useEffect(()=>{
    //     accountController._updateList("test",[{id}])
    // },[])

    React.useEffect(()=>{
        accountController._get(id)
    },[])

    React.useEffect(()=>{

		if(getAccount.isSuccessFull){
			setItem(getAccount.item)
		}
	
    },[getAccount.isSuccessFull])


    React.useEffect(()=>{

		if(deleteAccount.isSuccessFull){
            accountController._updateList("remove",[{id}]).then(success=>{
                console.log(success)
                router.push(`/manage/accounts`)	
            }).catch(error=>console.log(error))
        }		
        
        return(()=>{
            accountController._deleteInit()
        })
        
    },[deleteAccount.isSuccessFull])
    
    const links = [['Manage','/manage/accounts',''],['Accounts','/manage/accounts',''],[item.name,`/manage/accounts/${item.id}`,'active']]
    
    const showConfirm = item => {
        confirm({
          title: 'Apakah kamu ingin menghapus data ini ?',
          icon: <ExclamationCircleOutlined />,
          content: item.name,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {
            accountController._delete(item.id)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    return(
        <AppContainer>
            <Layout item={item} links={links}>
                <Row>
                    <Col md={24}>
                        <VuroxComponentsContainer className="p-4">
                            <Row>
                                <Col md={12}>
                                    <h4 className="d-inline mb-0 mr-2">{item.name}</h4>
                                    {
                                        item.status===3 ? <Tag color="#87d068">Verified</Tag> :
                                        item.status===2 ? <Tag color="orange">Unverified</Tag> :
                                        <></>
                                    }
                                </Col>
                                <Col md={12}>
                                    <div className="fright">
                                        <ul className="vurox-horizontal-links vurox-standard-ul">
                                            <li className="p-0"><Link href={{pathname:'/manage/accounts/[id]/edit',query:{id:item.id}}} shallow><Button className="link mr-3" type="link" size="small" icon={<i className="ti-pencil"></i>}>&nbsp;Edit account</Button></Link></li>
                                            <li className="p-0"><Button onClick={()=>showConfirm(item)} className="link" type="link" size="small" icon={<i className="ti-trash"></i>}>&nbsp;Hapus akun</Button></li>
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
                                <Col md={12}><h6>Pengguna Akun {item.name}</h6></Col>
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