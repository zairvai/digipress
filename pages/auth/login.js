import React from 'react'
import {withRouter} from 'next/router'
import {connect} from 'react-redux'


const Redirector = props => {

    const {router} = props

    router.push("/app/auth/login")

    return(
        <></>
    )
}

export default connect(state=>state)(withRouter(Redirector))