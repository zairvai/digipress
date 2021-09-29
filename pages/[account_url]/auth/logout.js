import React from 'react'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import { bindPromiseCreators } from 'redux-saga-routines';
import { signOutRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import {NextSeo} from 'next-seo'  

const PageLogout = props => {

    const {auth} = props
    const router = useRouter()
    const propsRef = React.useRef(props)
    const authController = React.useMemo(()=> new AuthController(propsRef.current),[propsRef])

    React.useEffect(()=>{
		router.prefetch('/[account_url]/auth/login',`/${auth.account.uniqueURL}/auth/login`)
    },[])

    const {account} = auth
    const {uniqueURL} = account
    
    React.useEffect(()=>{

        async function doSignOut(){
            try{

                await authController._signOut()
                
                // router.push("/")
                if(uniqueURL){
                    router.push({pathname:`/${uniqueURL}`})
                }else{
                    router.push({pathname:`/app`})
                }
                
    
            }catch(error){
                console.log(error)
            }
        }

        doSignOut()

    },[uniqueURL,authController])
    

    return <>
        <NextSeo title="Logout"/>
    </>

}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
            signOutRoutinePromise
        },dispatch),dispatch
    })
)(PageLogout)
