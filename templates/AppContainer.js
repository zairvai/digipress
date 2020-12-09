import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {vuroxContext} from 'Context'
import {appContext} from 'Context/app'
import {Auth} from 'aws-amplify'

const Container = props => {

    const {router,auth} = props
	const {setLoginStatus,setCurrentUser,setCurrentAccount,setBaseUrl} = React.useContext(appContext)

    const {account_url} = router.query

    React.useEffect(()=>{

        if(auth.isLoggedIn){
            const user = auth.user
            const account = auth.account

            setCurrentUser(user)
            setCurrentAccount(account)

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

export default connect(state=>state)(withRouter(Container))