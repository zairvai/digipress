import React from 'react'
import {connect} from 'react-redux'
import {withRouter,useRouter} from 'next/router'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getAuthUserRoutinePromise,signOutRoutinePromise} from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'

const Container = props => {

    const authController = new AuthController(props)
    const [visible,setVisible] = React.useState(true)//testing
    const {auth} = props

    const router = useRouter()
   
    React.useEffect(async()=>{

        router.prefetch('/[account_url]/auth/login',`/${auth.account.uniqueURL}/auth/login`)
        router.prefetch('/[account_url]/report/dashboard',`/${auth.account.uniqueURL}/report/dashboard`)

        let shouldSignOut = false

        try{

            await authController._get()
            
            if(!auth.user.access) shouldSignOut = true
            else {
                if(auth.account.uniqueURL != router.query.account_url) shouldSignOut=true
                else setVisible(true)
            }
            

        }catch(error){
            shouldSignOut = true
        }

        if(shouldSignOut){
            await authController._signOut()
            
            if(auth && auth.account && auth.account.uniqueURL){
                router.push(`/${auth.account.uniqueURL}/auth/login`)
            }else{
                router.push(`/app/auth/login`)
            }

        }


    },[])

   
    return(
        <>
            {
                auth.isLoggedIn ? 
                <div style={visible ? {visibility:"visible"} : {visibility:"hidden"} }>
                    {props.children}
                </div>
                :<></>
            }
        </>
    )

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                getAuthUserRoutinePromise,
                signOutRoutinePromise
        },dispatch),dispatch
    })
)(Container)