import React from 'react'
import {useRouter} from 'next/router'
import {connect} from 'react-redux'
import {getRedirectToUserDefaultPath} from 'Helper'

const Index = props =>{

    const {auth} = props
    const router = useRouter()
    const {asPath,pathname} = router

    console.log(router)

    React.useEffect(()=>{
        
        if(asPath!=pathname){
            // console.log(router)    
            if(auth.isLoggedIn) router.push(getRedirectToUserDefaultPath(asPath,auth.user.access.role))
            else router.push(`${asPath}/auth/login`)
        }
    },[auth,asPath,pathname])

    return (<></>)

}


export default connect(state=>({auth:state.auth}))(Index)