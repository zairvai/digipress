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

import {Status} from 'Components/mycomponents.js'
import Layout from 'Templates/Layout.account.id'
import AppContainer from 'Templates/AppContainer'
import AccountController from 'Library/controllers/AccountController'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { bindPromiseCreators } from 'redux-saga-routines';
import { deleteAccountRoutinePromise,getAccountRoutinePromise} from 'State/routines/account';


const {Text} = Typography
const {confirm} = Modal

const PageAccountId = props => {

    const accountController = new AccountController(props)

    const {auth,router,deleteAccount,getAccount} = props

	const [item,setItem] = React.useState({})

    const {id} = React.useMemo(()=>router.query,[])

    let tableItemCounter = 1

    React.useEffect(async ()=>{
        const account = await accountController._get(id)
        setItem(account.data)
    },[])
    
    const links = [['Manage',`/${auth.account.uniqueURL}/manage/accounts`,''],['Accounts',`/${auth.account.uniqueURL}/manage/accounts`,''],[item.name,`/${auth.account.uniqueURL}/manage/accounts/${item.id}`,'active']]
    
    const showConfirm = item => {
        confirm({
          title: 'Apakah kamu ingin menghapus data ini ?',
          icon: <ExclamationCircleOutlined />,
          content: item.name,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {
            accountController._delete(item.id)
                .then(account=>{
                    accountController._updateList("remove",[{id:account.data.id}]).then(success=>router.push(`/${auth.account.uniqueURL}/manage/accounts`)	)
                }).catch(error=>console.log(error))
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
                                            <li className="p-0 mr-3"><Link href={{pathname:`/${auth.account.uniqueURL}/manage/accounts/[id]/edit`,query:{id:item.id}}} shallow><a><i className="ti-pencil"></i>&nbsp;Edit akun</a></Link></li>
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
                                            <li className="p-0"><Link href={{pathname:`/${auth.account.uniqueURL}/manage/accounts/[id]/users/add`,query:{id:item.id}}}shallow><a><i className="ti-plus"></i>&nbsp;Tambah pengguna</a></Link></li>
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
													<th width="20"></th>
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
															<td>{tableItemCounter++}</td>
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

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            deleteAccountRoutinePromise,
            getAccountRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageAccountId))
