import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { bindPromiseCreators } from 'redux-saga-routines';
import { signOutRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import {NextSeo} from 'next-seo'  

const PageLogout = props => {

    const {router,auth} = props

    const authController = new AuthController(props)

    React.useEffect(()=>{
		router.prefetch('/[account_url]/auth/login',`/${auth.account.uniqueURL}/auth/login`)
    },[])
    
    React.useEffect(async ()=>{

        try{
            await authController._signOut()
            
            if(auth && auth.account && auth.account.uniqueURL){
                router.push(`/${auth.account.uniqueURL}/auth/login`)
            }else{
                router.push(`/app/auth/login`)
            }
            

        }catch(error){
            console.log(error)
        }

    },[])
    

    return <>
        <NextSeo title="Logout"/>
    </>

}

export default withRouter(connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            signOutRoutinePromise
        },dispatch),dispatch
    })
)(PageLogout))
