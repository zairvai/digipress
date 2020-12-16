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
import { Row, Col,Modal,Button, Tabs,Typography,Popover} from 'antd'
import { Search} from 'react-bootstrap-icons'
import ListUsers from 'Components/ListUsers'
import AppContainer from 'Templates/AppContainer'
import FormUser from 'Components/FormUser'
import FormUserExisting from 'Components/FormUserExisting'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { bindPromiseCreators } from 'redux-saga-routines';
import { createUserRoutinePromise,listUsersRoutinePromise,updateUserRoutinePromise} from 'State/routines/user';
import AuthController from 'Library/controllers/AuthController';
import UserController from 'Library/controllers/UserController';

const PageListUser = props => {

    const {auth,createUser,listUsers,router} = props

    const userController = new UserController(props)
    
    const [orderBy,setOrderBy]	= React.useState("createdAt")
    const [direction,setDirection] = React.useState("desc")
    
    const {confirm} = Modal

    const pagename=""
	const links = [['Kelola',`/${auth.account.uniqueURL}/manage/users`,''],['Anggota saya',`/${auth.account.uniqueURL}/manage/users`,'active']]

    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'

    const [addVisible,setAddVisible] = React.useState(false)

    React.useEffect(async()=>{

            userController._list({accountId:auth.account.id,roles:getRoleListInputs(),orderBy,direction})

    },[])

    const getRoleListInputs = () =>{

        if(AuthController.isAppAdmin(auth)) return []// donot allow app admin to manage current account user

        if(AuthController.isAppOwner(auth)){
            return ["admin"]
        }else if(AuthController.isOwner(auth)){
            return ["admin","tutor","student","member"]
        }
        else if(AuthController.isAdmin(auth)){
            return ["tutor","student","member"]
        }

        return []
    }

    const onDeleteItem = (item,index) => {
        showRevokeAccessConfirm(item,auth.account,index)
    }

    const showRevokeAccessConfirm = (item,account,index) => {

        confirm({
          title: `Apakah kamu ingin menghapus akses pengguna ini dari akun ${account.name} ?`,
          icon: <ExclamationCircleOutlined />,
          content: item.name,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

            let roles = item.roles.map((x)=>x)//copy array
            const indexRole = roles.findIndex((role) => role.accountId === account.id)
            roles.splice(indexRole,1)//remove from array

            userController._update({
                id:item.id,
                version:item.version,
                roles:roles})
                .then(resp=>{
                    userController._updateList("remove",[{id:item.id}],index)
                })
                .catch(error=>console.log(error))


          },
          onCancel() {
            console.log('Cancel');
          },
        });
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
                                            //onSuccess={onSuccessAdd}
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
                                    <li className="p-0"><Link href={{pathname:`/${auth.account.uniqueURL}/manage/users/add`}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah anggota</a></Link></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <VuroxComponentsContainer>
                                <ListUsers accountId={auth.account.id} items={listUsers.list.items} onDelete={onDeleteItem}/>
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
            listUsersRoutinePromise,
            updateUserRoutinePromise
        },dispatch),dispatch
    })
)(PageListUser)