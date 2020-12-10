import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {appContext} from 'Context/app'

import { bindPromiseCreators } from 'redux-saga-routines';
import { signOutRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import AppContainer from 'Templates/AppContainer'

const PageLogout = props => {

    const {setLoginStatus,setCurrentUser,setCurrentAccount} = React.useContext(appContext)
    const authController = new AuthController(props)

    React.useEffect(()=>{

        authController._signOut()
            .catch(error=>console.log(error))

    },[])
    

    return <AppContainer><></></AppContainer>

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            signOutRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageLogout))
