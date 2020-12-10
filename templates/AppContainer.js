import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {vuroxContext} from 'Context'
import {appContext} from 'Context/app'
import {Auth} from 'aws-amplify'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getAuthUserRoutinePromise,signOutRoutinePromise} from 'State/routines/auth';
import { getAccountByUniqueUrlRoutinePromise } from 'State/routines/account';
import AuthController from 'Library/controllers/AuthController'
import AccountController from 'Library/controllers/AccountController'
const Container = props => {

    const authController = new AuthController(props)
    const accountController = new AccountController(props)

    const {router,auth} = props
	const {setLoginStatus,setCurrentUser,setCurrentAccount} = React.useContext(appContext)
    const accountUrl = React.useMemo(()=>router.query.account_url,[router.query])

    //get account id by unique URL
    React.useEffect(()=>{
        console.log(accountUrl)
		accountController._getAccountByUniqueUrl({url:accountUrl})
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

        authController._get()
            .then(resp=>{
                //console.log(resp)
                const{user,account} = props.auth
                setLoginStatus(true)
                setCurrentUser(user)
                setCurrentAccount(account)

            })
            .catch(error=>{
                console.log(error)
                authController._signOut()
                    .then(()=>{
                        setLoginStatus(false)
                        setCurrentUser(false)
                        setCurrentAccount(false)
                        router.push(`/${accountUrl}/auth/login`)
                    })

            })

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
                getAuthUserRoutinePromise,
                signOutRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(Container))