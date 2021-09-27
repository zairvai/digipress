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

    const router = useRouter()
   
    React.useEffect(async()=>{

        //console.log(props)

        router.prefetch('/[account_url]/auth/login',`/${auth.account.uniqueURL}/auth/login`)
        router.prefetch('/[account_url]/report/dashboard',`/${auth.account.uniqueURL}/report/dashboard`)

        try{

            await authController._get()

            if(!auth.user.access) setShouldSignOut(true)


        }catch(error){
            console.log(error)
            setShouldSignOut(true)
        }


    },[])

    //making sure user dont access to other unique url account directly
    React.useEffect(()=>{

		// if(router.query.account_url && auth.account){
        //     if(auth.account.uniqueURL != router.query.account_url) setShouldSignOut(true)
        //     else setVisible(true)
		// }

        setVisible(true)

	},[router,auth])

    React.useEffect(()=>{

        // async function doLogout(){
        //     if(shouldSignOut){
        //         await authController._signOut()
                
        //         if(auth && auth.account && auth.account.uniqueURL){
        //             router.push(`/${auth.account.uniqueURL}/auth/login`)
        //         }else{
        //             router.push(`/app/auth/login`)
        //         }
        //     }
        // }
        // doLogout()
    },[shouldSignOut,auth,authController])

   
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