import React from 'react'
import {withRouter} from 'next/router'
import {connect} from 'react-redux'
import {getRedirectToUserDefaultPath} from 'Helper'

const Index = props =>{

    const {auth,router} = props
    const {asPath,pathname} = router

    React.useEffect(()=>{
        
        if(asPath!=pathname){
            // console.log(router)    
            if(auth.isLoggedIn) router.push(getRedirectToUserDefaultPath(asPath,auth.user.access.role))
            else router.push(`${asPath}auth/login`)
        }
    },[asPath])

    return (<></>)

}

export default withRouter(connect(state=>({auth:state.auth}))(Index))