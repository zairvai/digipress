import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import LayoutAccount from 'Templates/Layout.account'
import { Row, Col,Tag,Modal,Button,Typography,PageHeader} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import ListUsers from 'Components/ListUsers'
import AuthController from 'Library/controllers/AuthController'
import AccountController from 'Library/controllers/AccountController'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { bindPromiseCreators } from 'redux-saga-routines';
import { signOutRoutinePromise } from 'State/routines/auth'
import { deleteAccountRoutinePromise,getAccountRoutinePromise,updateAccountRoutinePromise } from 'State/routines/account';

import {NextSeo} from 'next-seo'

const {Text} = Typography
const {confirm} = Modal

const PageAccountId = props => {

    const authController = new AuthController(props)
    const accountController = new AccountController(props)

    const [url,setUrl] = React.useState(window.location) 

    const {auth,router} = props

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
        <LayoutAccount>
            <NextSeo title={`Kelola - Akun - ${item.name}`}/>

            <Row>
				<Col md={24}>
                    <PageHeader title={item.name} ghost={false}
                        subTitle={                                
                                item.status===2 ? <Tag color="orange">Unverified</Tag> :
                                item.status===3 && <Tag color="#87d068">Verified</Tag>
                            }
                        onBack={()=>router.push(`/[account_ur]/manage/accounts`,`/${auth.account.uniqueURL}/manage/accounts`,{shallow:true})}
						extra={[
							<div className="d-inline" key="1">
                                <Link href={{pathname:`/${auth.account.uniqueURL}/manage/accounts/[id]/edit`,query:{id:item.id}}} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Ubah akun</Button></Link>
                            </div>,
                            <div className="d-inline" key="2">
                                <Button  type="primary" onClick={()=>showDeleteConfirm(item)}><i className="ti-trash"></i>&nbsp;Hapus akun</Button>
                            </div>
						]}
					/>
					
				</Col>
			</Row>

            <Row>
                <Col md={24}>
                    <VuroxComponentsContainer className="p-4">
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
                    <Row>
                        <Col md={24} className="mt-2">
                            <PageHeader title="Pengguna akun" ghost={false}
                                extra={[
                                    <div className="d-inline" key="1">
                                       <Link href={`/${auth.account.uniqueURL}/manage/users/add?id=${item.id}`} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Tambah pengguna</Button></Link>
                                    </div>
                                ]}
                            />
                        </Col>
                    </Row>
                    <VuroxComponentsContainer>
                        <Row className="mt-3">
                            <Col md={24}>
                                <ListUsers currentAccount={item} roleListInput={getRoleListInput()}/>
                            </Col>
                        </Row>
                    </VuroxComponentsContainer>
                </Col>
            </Row>

            
        </LayoutAccount>
    )

    

}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
            updateAccountRoutinePromise,
            signOutRoutinePromise,
            deleteAccountRoutinePromise,
            getAccountRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageAccountId))
