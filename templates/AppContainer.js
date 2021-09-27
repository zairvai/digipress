import React from 'react'
import {connect} from 'react-redux'
import {withRouter,useRouter} from 'next/router'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getAuthUserRoutinePromise,signOutRoutinePromise} from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'

const Container = props => {

    
    const property = React.useRef(props)
    const authController = React.useMemo(()=>new AuthController(property.current),[property])
    const [visible,setVisible] = React.useState(false)//testing
    const [shouldSignOut,setShouldSignOut] = React.useState(false)
    const {auth} = props
    const authUser = auth.user
    const authAccount = auth.account
    
    const router = useRouter()
    const accountUrl = router.query.account_url

   
    React.useEffect(()=>{

        //console.log(props)

        async function checkLogin(){

            if(authAccount && authUser){
   
                router.prefetch('/[account_url]/auth/login',`/${authAccount.uniqueURL}/auth/login`)
                router.prefetch('/[account_url]/report/dashboard',`/${authAccount.uniqueURL}/report/dashboard`)

                try{

                    await authController._get()

                    if(!authUser.access) {
                        setVisible(false)
                        setShouldSignOut(true)
                    }


                }catch(error){
                    console.log(error)
                    setShouldSignOut(true)
                }
            }
        }

        checkLogin()

    },[authUser,authAccount])

    //making sure user dont access to other unique url account directly
    React.useEffect(()=>{

		if(accountUrl && authAccount){
            if(authAccount.uniqueURL != accountUrl) {
                setVisible(false)
                setShouldSignOut(true)
            }
            else setVisible(true)
		}

        setVisible(true)

	},[accountUrl,authAccount])

    React.useEffect(()=>{

        async function doLogout(){
            if(shouldSignOut){
                
                setVisible(false)

                await authController._signOut()
                
                if(authAccount && authAccount.uniqueURL){
                    router.push(`/${authAccount.uniqueURL}/auth/login`)
                }else{
                    router.push(`/app/auth/login`)
                }
            }
        }
        doLogout()
    },[shouldSignOut,authAccount])

   
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