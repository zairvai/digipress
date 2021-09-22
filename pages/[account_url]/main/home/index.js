import React from 'react'
import {withRouter} from 'next/router'
import {connect} from 'react-redux'


const Redirector = props => {

    const {auth,router} = props

    router.push(`/${auth.account.uniqueURL}/main/home/all`)

    return(
        <></>
    )
}

export default withRouter(connect(state=>state)(Redirector))