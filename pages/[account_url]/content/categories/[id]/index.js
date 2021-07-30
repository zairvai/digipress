import React from 'react'
import {withRouter} from 'next/router'
import {connect} from 'react-redux'


const AppIndex = props => {

    const {auth,router} = props

    router.push(`/${auth.account.uniqueURL}/content/categories`)
    

    return(
        <></>
    )
}

export default connect(state=>state)(withRouter(AppIndex))