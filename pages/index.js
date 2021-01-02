import React from 'react'
import {withRouter} from 'next/router'
import {connect} from 'react-redux'


const AppIndex = props => {

    const {router} = props
    const {asPath} = router

    if(asPath==="/") router.push("/app/auth/login")
    else router.push(asPath)
    
    

    return(
        <></>
    )
}

export default connect(state=>state)(withRouter(AppIndex))