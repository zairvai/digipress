import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row, Col,Tag,Modal,Button,Typography} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'

import Layout from 'Templates/Layout.account.id'
import ListUsers from 'Components/ListUsers'
import AppContainer from 'Templates/AppContainer'
import AuthController from 'Library/controllers/AuthController'
import AccountController from 'Library/controllers/AccountController'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { bindPromiseCreators } from 'redux-saga-routines';
import { signOutRoutinePromise } from 'State/routines/auth'
import { deleteAccountRoutinePromise,getAccountRoutinePromise } from 'State/routines/account';

import {NextSeo} from 'next-seo'

const {Text} = Typography
const {confirm} = Modal

const PageAccountId = props => {

    const authController = new AuthController(props)
    const accountController = new AccountController(props)

    const [url,setUrl] = React.useState(window.location) 

    const {auth,listUsers,router} = props

    const [item,setItem] = React.useState({})

    const {id} = React.useMemo(()=>router.query,[])

    React.useEffect(async ()=>{
       
        try{
            const account = await accountController._get(id)
            setItem(account.data)

        }catch(error){
            router.push(`/${auth.account.uniqueURL}/manage/accounts`)
            console.log(error)
        }
        
    },[])
    
    const links = [['Kelola',`/${auth.account.uniqueURL}/manage/accounts`,''],['Akun',`/${auth.account.uniqueURL}/manage/accounts`,''],[item.name,`/${auth.account.uniqueURL}/manage/accounts/${item.id}`,'active']]
    
    const showDeleteConfirm = item => {
        confirm({
          title: 'Apakah kamu ingin menghapus akun ini ?',
          icon: <ExclamationCircleOutlined />,
          content: item.name,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {
            accountController._delete(item)
                .then(account=>{
                    router.push(`/${auth.account.uniqueURL}/manage/accounts`)
                }).catch(error=>console.log(error))
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const showOpenAccountDashboardConfirm = item => {
        confirm({
          title: 'Apakah kamu ingin melanjutkan ?',
          icon: <ExclamationCircleOutlined />,
          content: <Text>Saat membuka tautan dashboard akun lain, sesi login kamu pada akun saat ini akan terputus otomatis.</Text>,
          okText:"Lanjutkan",
          cancelText:"Tidak",
          onOk() {
            authController._signOut()
                .then(()=>router.push(`${url.origin}/${item.uniqueURL}/auth/login`))
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const getRoleListInput = () =>{

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)){
            return ["owner","admin","tutor","student","member"]
        }

        return []
    }

    return(
        <AppContainer>
            <NextSeo title={`Kelola - Akun - ${item.name}`}/>
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
                                            <li className="p-0"><Button onClick={()=>showDeleteConfirm(item)} className="link" type="link" size="small" icon={<i className="ti-trash"></i>}>&nbsp;Hapus akun</Button></li>
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}>
                                    <Text>Dashboard : </Text> <Button onClick={()=>showOpenAccountDashboardConfirm(item)} type="link">{`${url.origin}/${item.uniqueURL}/auth/login`}</Button>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col md={24}>
                                    <Text>Alamat : {item.address}</Text>
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
                                    <ListUsers currentAccount={item} roleListInput={getRoleListInput()}/>
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
            signOutRoutinePromise,
            deleteAccountRoutinePromise,
            getAccountRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageAccountId))
