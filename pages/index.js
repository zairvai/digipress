import React from 'react'
import {useRouter} from 'next/router'
import {connect} from 'react-redux'


const AppIndex = props => {

    const {auth} = props
    const router = useRouter()
    const {asPath} = router

    React.useEffect(()=>{
        if(asPath==="/") {
            if(auth && auth.account && auth.account.uniqueURL) router.push(`/${auth.account.uniqueURL}/auth/login`)
            else router.push("/app/auth/login")
        }
        else router.push(asPath)
        
    },[asPath])
    
    return(
        <></>
    )
}

export default connect(state=>({auth:state.auth}))(AppIndex)