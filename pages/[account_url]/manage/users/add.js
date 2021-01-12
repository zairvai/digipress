import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.user.id'
import { Row, Col,PageHeader, Alert} from 'antd'
import FormUser from 'Components/FormUser'

import { bindPromiseCreators } from 'redux-saga-routines';
import { getAccountRoutinePromise } from 'State/routines/account';
import AuthController from 'Library/controllers/AuthController';
import AccountController from 'Library/controllers/AccountController';

import {NextSeo} from 'next-seo'

const PageUserAdd = props => {

    const {auth,router} = props
	
    // const links = [['Kelola',`/${auth.account.uniqueURL}/manage/users`,''],['Anggota',`/${auth.account.uniqueURL}/manage/users`,''],['Penambahan anggota',`/${auth.account.uniqueURL}/manage/users/add`,'active']]
    
    const [error,setError] = React.useState({message:"test"})

    const [accountId,setAccountId] = React.useState()
    const [account,setAccount] = React.useState()
    const accountController = new AccountController(props)

    const {id} = React.useMemo(()=>router.query,[])//accountId

    React.useEffect(()=>{
        
        if(id){

            if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)){

                accountController._get(id)
                    .then(account=>{
                        setAccountId(id)
                        setAccount(account.data)
                    })
                    .catch(error=>{
                        router.push(`/not-found`)    
                    })

            }else{
                router.push(`/not-found`)
            }
        }else{
            setAccountId(auth.account.id)
        }

    },[])

    const getRoleInputs = (accountId) =>{

        if(accountId){
            if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)){
                return [
                    {value:"owner",name:"Owner"},
                    {value:"admin",name:"Admin"},
                    {value:"tutor",name:"Tutor"},
                    {value:"student",name:"Student"}
                ]
            }
        }
        else{
            if(AuthController.isAppAdmin(auth)) return []// donot allow app admin to manage current account user
            else if(AuthController.isAppOwner(auth)){
                return [
                    {value:"admin",name:"Admin"}
                ]
            }else if(AuthController.isOwner(auth)){
                return [
                    {value:"admin",name:"Admin"},
                    {value:"tutor",name:"Tutor"},
                    {value:"student",name:"Student"}
                ]
            }
            else if(AuthController.isAdmin(auth)){
                return [
                    {value:"tutor",name:"Tutor"},
                    {value:"student",name:"Student"}
                ]
            }
        }

        return []
    }

    const onCancel = () => {
        if(account) router.push(`/[account_ur]/manage/accounts/[id]`,`/${auth.account.uniqueURL}/manage/accounts/${account.id}`,{shallow:true})
        else router.push(`/[account_ur]/manage/users`,`/${auth.account.uniqueURL}/manage/users`,{shallow:true})
    }
    
    const onSuccess = user =>{
        if(account) router.push(`/[account_ur]/manage/accounts/[id]`,`/${auth.account.uniqueURL}/manage/accounts/${account.id}`,{shallow:true})
        else router.push(`/[account_ur]/manage/users`,`/${auth.account.uniqueURL}/manage/users`,{shallow:true})
    }

    const handleError = errors =>{
        
        if(errors && errors.errors){
            const errors = errors.errors
            if(errors[0] && errors[0].message=="An account with the given email already exists."){
                setError({message:"Email yang didaftarkan sudah digunakan sebelumnya."})
            }
        }

    }

    return (
        <Layout>
            <NextSeo title="Kelola - Tambah anggota"/>

            <Row>
				<Col md={14}>
					<PageHeader title="Tambah anggota" subTitle={account && account.name} ghost={false}
						onBack={()=>window.history.back()}
					/>
				</Col>
			</Row>

            <Row>
                <Col md={14} sm={24} xs={24} className="mt-2">
                    <FormUser accountId={accountId} roleInputs={getRoleInputs(id)} onSuccess={onSuccess} onCancel={onCancel} onError={handleError}/>
                </Col>
            </Row>
             
        </Layout>
    );
	
}
export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
            getAccountRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageUserAdd))