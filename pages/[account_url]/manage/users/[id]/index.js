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
import Layout from 'Templates/Layout.user.id'
import AppContainer from 'Templates/AppContainer'
import AuthController from 'Library/controllers/AuthController'
import UserController from 'Library/controllers/UserController'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { bindPromiseCreators } from 'redux-saga-routines';
import { updateUserRoutinePromise,getUserRoutinePromise } from 'State/routines/user';


const {Text} = Typography
const {confirm} = Modal

const PageUserId = props => {

    const {auth,getUser,deleteUser,router} = props

    const {id} = React.useMemo(()=>router.query,[])

    const userController = new UserController(props)

	const [item,setItem] = React.useState({})

    const [editRoleVisible,setEditRoleVisible] = React.useState(false)

    React.useState(()=>router.prefetch("/[account_url]/manage/users/",`/${auth.account.uniqueURL}/manage/users/`))

    React.useEffect(async()=>{
        
        try{
            const user = await userController._get(id)
            
            const index = user.data.roles.findIndex((role) => role.accountId === auth.account.id)
            if(index==-1) router.push(`/${auth.account.uniqueURL}/manage/users/`)

            setItem(user.data)
            console.log(user.data)
            
        }catch(error){
            router.push(`/${auth.account.uniqueURL}/manage/users`)
        }

        
    },[id])

    
    const links = [['Manage',`/${auth.account.uniqueURL}/manage/users`,''],['Users',`/${auth.account.uniqueURL}/manage/users`,''],[item.name,`/${auth.account.uniqueURL}/manage/users/${item.id}`,'active']]
    
    const showRevokeAccess = ({item,account}) => {

        confirm({
          title: `Apakah kamu ingin menghapus akses pengguna ini dari akun ${account.name} ?`,
          icon: <ExclamationCircleOutlined />,
          content: item.name,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

            let roles = item.roles.map((x)=>x)//copy array
            const index = roles.findIndex((role) => role.accountId === account.id)
            roles.splice(index,1)//remove from array
            
            const values = {id:item.id,version:item.version,roles:roles}

            userController._update(values)
                .then(resp=>{
                    console.log(resp)
                    userController._updateList("remove",[{id:item.id}])
                    router.push(`/${auth.account.uniqueURL}/manage/users/`)
                })
                .catch(error=>console.log(error))


          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const FormAkses = props => {

        const {item, visible,onCancel} = props

        return(
            <Modal
            title={`Ubah role`}
            centered
            footer={null}
            bodyStyle={{padding:0}}
            onCancel={onCancel} 
            visible={visible}
            keyboard={false}
            mask={false}
            maskClosable={false}
            width={500}>
            
                <Row>
                    <Col md={24}>
                        test
                    </Col>
                </Row>

            </Modal>
        )

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
                                </Col>
                                <Col md={12}>
                                    <div className="fright">
                                        <ul className="vurox-horizontal-links vurox-standard-ul">
                                            {/* <li className="p-0 mr-3"><Link href={{pathname:`/${auth.account.uniqueURL}/manage/users/[id]/edit`,query:{id:item.id}}} shallow><a><i className="ti-pencil"></i>&nbsp;Edit akses</a></Link></li> */}
                                            {/* <li className="p-0 mr-3"><Button onClick={()=>setEditRoleVisible(true)} className="link" type="link" size="small" icon={<i className="ti-pencil"></i>}>&nbsp; Ubah role</Button></li> */}
                                            <li className="p-0"><Button onClick={()=>showRevokeAccess({item,account:auth.account})} className="link" type="link" size="small" icon={<i className="ti-trash"></i>}>&nbsp;Hapus akses</Button></li>
                                        </ul>
                                    </div>
                                    <FormAkses visible={editRoleVisible} item={item} onCancel={()=>setEditRoleVisible(false)}/>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}>
                                    <Text>{item.address}</Text>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}><Text>Role&nbsp;:&nbsp;{AuthController.getRole({user:item,account:auth.account}).role}</Text></Col>
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
            </Layout>
        </AppContainer>
    )

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            updateUserRoutinePromise,
            getUserRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageUserId))
