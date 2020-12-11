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
import { Row, Col,Modal,Button, Tabs,Typography,Popover} from 'antd'
import {Status} from 'Components/mycomponents.js'
import { Search} from 'react-bootstrap-icons'
import AppContainer from 'Templates/AppContainer'
import FormUser from 'Components/FormUser'
import FormUserExisting from 'Components/FormUserExisting'
import Icon from '@mdi/react'
import {mdiDotsVertical} from '@mdi/js'
import { bindPromiseCreators } from 'redux-saga-routines';
import { createUserRoutinePromise,listUsersRoutinePromise} from 'State/routines/user';
import UserController from 'Library/controllers/UserController';

const PageListUser = props => {

    const userController = new UserController(props)
    
    const {auth,createUser,listUsers,router} = props
    
    const [items,setItems] = React.useState([])

    console.log(items)

    const {TabPane} = Tabs
    
 
    const pagename=""
	const links = [['Manage',`/${auth.account.uniqueURL}/manage/users`,''],['Users',`/${auth.account.uniqueURL}/manage/users`,'active']]

    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'

    const [addVisible,setAddVisible] = React.useState(false)

    
    React.useEffect(()=>{

        userController._list({
            accountId:auth.account.id,
            role:"Admin",
            orderBy:"createdAt",
            direction:"desc",from:0,size:20
        }).then(resp=>{
            setItems(listUsers.list.items)
            console.log(resp)
        }).catch(error=>console.log(error))
    
    },[])

    const showForm = props =>{
        setAddVisible(true)
    }

    const onSuccessAdd = user =>{
        console.log(user)
        userController._updateList("add",[{item:user.data}])
        setAddVisible(false)
    }


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

                    <Modal
                        title={`Tambah Pengguna ${auth.account.name}`}
                        centered
                        footer={null}
                        bodyStyle={{padding:0}}
                        onCancel={()=>setAddVisible(false)} 
                        visible={addVisible}
                        keyboard={false}
                        mask={false}
                        maskClosable={false}
                        width={500}>

                        {/* <Tabs className="formTab" defaultActiveKey="1">
                            <TabPane tab="Pengguna baru" key="1"> */}
                                <Row>
                                    <Col md={24}>
                                        <FormUser 
                                            accountId={auth.account.id}
                                            onSuccess={onSuccessAdd}
                                            onCancel={()=>setAddVisible(false)} 
                                            onOk={()=>setAddVisible(false)}/>

                                    </Col>
                                </Row>
                            {/* </TabPane>
                            <TabPane tab="Pengguna lama" key="2">
                                <Row>
                                    <Col md={24}>
                                        <FormUserExisting></FormUserExisting>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs> */}
                    </Modal>
                    
                    <Row className="mb-2">
                        <Col md={12}>
                            <VuroxFormSearch border='rounded-pill border-0' placeholder='Search...' icon={<Search />} className="mr-2"/>
                        </Col>
                        <Col md={12}>
                            <div className="fright">
                                <ul className="vurox-horizontal-links vurox-standard-ul pt-3">
                                    {/* <li className="p-0"><Button onClick={showForm} className="link" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp; Tambah pengguna</Button></li> */}
                                    <li className="p-0"><Link href={{pathname:`/${auth.account.uniqueURL}/manage/users/add`}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah pengguna</a></Link></li>
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
                                                <th width="30%">Pengguna</th>
                                                <th width="25%">Email</th>
                                                <th width="20%">Role</th>
                                                <th className="fright">Status</th>
                                                {/* <th className="fright"></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {   items ?
                                                    items.map(item=>{
                                                        
                                                        let i=0,found=false, role={}
                                                        for(i=0;i<item.roles.length;i++){
                                                            if(item.roles[i].accountId===auth.account.id){
                                                                found=true
                                                                break
                                                            }
                                                        }

                                                        if(found) role = item.roles[i]

                                                        return(
                                                            <tr key={item.id}>
                                                                <td valign="middle"><Link href={{pathname:`/[account_url]/manage/users/[id]`,query:{account_url:auth.account.uniqueURL,id:item.id}}} shallow><a>{item.name}</a></Link></td>
                                                                <td valign="middle">{item.emailAddress}</td>
                                                                <td valign="middle">{role.role}</td>
                                                                <td valign="middle" className="fright">
                                                                    {
                                                                        role.status===2 ? <Status text="Pending" state="warning" position="right" blinking/> :
                                                                        role.status===3 ? <Status text="Active" state="success" position="right"/> :
                                                                        role.status===4 ? <Status text="Suspended" state="fail" position="right"/> :
                                                                        <></>
                                                                    }
                                                                </td>
                                                                {/* <td className="fright">
																	<Popover placement="left" content={menuContent} trigger="click">
																		<Button type="link" icon={<Icon size="1.3em" path={mdiDotsVertical} />}/>
																	</Popover>
																</td> */}
                                                            </tr>
                                                        )
                                                    })
                                                    :
                                                    <></>
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
export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            createUserRoutinePromise,
            listUsersRoutinePromise
        },dispatch),dispatch
    })
)(PageListUser)