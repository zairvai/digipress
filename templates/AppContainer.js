import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getAuthUserRoutinePromise,signOutRoutinePromise} from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import AccountController from 'Library/controllers/AccountController'
const Container = props => {

    const authController = new AuthController(props)

    const {router,auth} = props
   
    React.useEffect(async()=>{

        router.prefetch('/[account_url]/auth/login',`/${auth.account.uniqueURL}/auth/login`)
        router.prefetch('/[account_url]/report/dashboard',`/${auth.account.uniqueURL}/report/dashboard`)

        let shouldSignOut = false

        if(auth.account.uniqueURL != router.query.account_url) router.push(`/${auth.account.uniqueURL}/report/dashboard`)

        try{
            await authController._get()
            //if(!auth.user.access) shouldSignOut = true
                
        }catch(error){
            shouldSignOut = true
            console.log(error)
        }

        if(shouldSignOut){
            await authController._signOut()
            router.push(`/${auth.account.uniqueURL}/auth/login`)
        }

    },[])

    // React.useEffect(()=>{
	// 	if(props.query !== auth.account.uniqueURL) router.push(`/${auth.account.uniqueURL}/report/dashboard`)
    // },[props.query])
    

    return(
        <>
            {props.children}
        </>
    )

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                getAuthUserRoutinePromise,
                signOutRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(Container))