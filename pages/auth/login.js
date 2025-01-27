import React from 'react'
import {withRouter} from 'next/router'
import {connect} from 'react-redux'


const Redirector = props => {

    const {auth,router} = props

    React.useEffect(()=>{
        if(auth && auth.account && auth.account.uniqueURL) router.push(`/${auth.account.uniqueURL}/auth/login`)
        else router.push('/app/auth/login')
    },[])

    return (<></>)
}

export default withRouter(connect(state=>({auth:state.auth}))(Redirector))