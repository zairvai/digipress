import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {appContext} from 'Context/app'
import AuthController from 'Library/controllers/AuthController'

const Page = props => {

    const {router,auth} = props
    const {setLoginStatus,setCurrentUser} = React.useContext(appContext)
    const authController = new AuthController(props)

    React.useEffect(()=>{
        if(auth.isLoggedIn){
            authController._signOut()
            setLoginStatus(false)
            setCurrentUser(false)
            router.push("/auth/login")
        }
    },[auth.isLoggedIn])
    

    return <></>

}

export default connect(state=>state)(withRouter(Page))