import React from 'react'
import {withRouter} from 'next/router'
import {connect} from 'react-redux'


const AppIndex = props => {

    const {auth, router} = props
    const {asPath} = router

    if(asPath==="/") {
        if(auth && auth.account && auth.account.uniqueURL) router.push(`/${auth.account.uniqueURL}/auth/login`)
        else router.push("/app/auth/login")
    }
    else router.push(asPath)
    
    

    return(
        <></>
    )
}

export default connect(state=>({auth:state.auth}))(withRouter(AppIndex))