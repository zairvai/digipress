import React from 'react'
import {withRouter} from 'next/router'
import {connect} from 'react-redux'


const AppIndex = props => {

    const {router} = props

    router.push("/auth/login")

    return(
        <></>
    )
}

export default connect(state=>state)(withRouter(AppIndex))