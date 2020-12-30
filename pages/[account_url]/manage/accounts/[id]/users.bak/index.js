import React from 'react'
import {withRouter} from 'next/router'
import {connect} from 'react-redux'


const AppIndex = props => {

    const {router} = props
    const {asPath} = router

    const redirect = asPath.substring(0,asPath.length-7)

    router.push(redirect)
    

    return(
        <></>
    )
}

export default connect(state=>state)(withRouter(AppIndex))