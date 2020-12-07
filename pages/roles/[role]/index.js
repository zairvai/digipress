import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
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
import {getRole} from 'Helper'

const RoleIndex = props => {

    const{router} = props
    const {role} = router.query
    
    const roleItem = getRole(role)

    const pagename=""
	const links = [['Roles','/roles/',''],[roleItem.name,`/roles/${roleItem.path}`,'active']]

    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'

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
                            <VuroxFormSearch border='rounded-pill border-0' placeholder='Search...' icon={<Search />} className="mr-2"/>
                        </Col>
                        <Col md={12}>
                            <div className="fright">
                                <ul className="vurox-horizontal-links vurox-standard-ul pt-3">
                                <li className="p-0"><Link href={{pathname:'/manage/users/add'}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah pengguna</a></Link></li>
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
                                
                            </VuroxComponentsContainer>	
                        </Col>
                    </Row>
                    
                </ContentLayout>
            </VuroxLayout>
        </AppContainer>
    );

}
export default connect(state=>state)(withRouter(RoleIndex))