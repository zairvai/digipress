import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {vuroxContext} from 'Context'
import {appContext} from 'Context/app'
import {Auth} from 'aws-amplify'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getAuthUserRoutinePromise } from 'State/routines/auth';
import { getAccountByUniqueUrlRoutinePromise } from 'State/routines/account';
import AuthController from 'Library/controllers/AuthController'
import AccountController from 'Library/controllers/AccountController'
const Container = props => {

    const authController = new AuthController(props)
    const accountController = new AccountController(props)

    const {router,auth} = props
	const {setLoginStatus,setCurrentUser,setCurrentAccount,setBaseUrl} = React.useContext(appContext)

    const {account_url} = router.query

    //get account id by unique URL
    React.useEffect(()=>{
		accountController._getAccountByUniqueUrl({url:account_url})
			.then(account=>{
				authController._setAccount(account.data)
				setCurrentAccount(account.data)
			})
			.catch(error=>{
                console.log(error)
                router.push("/not-found")
            })
    },[])
    
    React.useEffect(()=>{

        //getCurrentAuthenticatedUser
        if(props.onAuthorizing) props.onAuthorizing({status:"processing"})

        console.log("process")

        authController._get()
            .then(auth=>{
                // if(props.onAuthorizing) props.onAuthorizing({status:"processed"})
                console.log(auth)
            })
            .catch(error=>{
                if(props.onAuthorizing) props.onAuthorizing({status:"processed"})
                console.log(error)
            })
        
    },[])

    React.useEffect(()=>{

        if(auth.isLoggedIn){

            console.log("Login")
            
            const{user,account} = auth

            setCurrentUser(user)
            setCurrentAccount(account)

            router.push(`/${account_url}/report/dashboard`)

        }else{

            setCurrentUser(false)
            setCurrentAccount(false)
            setLoginStatus(false)
            
            router.push(`/${account_url}/auth/login`)
        }

    },[auth.isLoggedIn])

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
                getAccountByUniqueUrlRoutinePromise,
			    getAuthUserRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(Container))