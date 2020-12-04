import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {vuroxContext} from 'Context'
import {appContext} from 'Context/app'
import {Auth} from 'aws-amplify'

const Container = props => {

    const {router,auth} = props
	const {setLoginStatus,setCurrentUser} = React.useContext(appContext)

    React.useEffect(async ()=>{

        if(auth.isLoggedIn){
            const user = await Auth.currentAuthenticatedUser()
            setCurrentUser(user)
        }else{
            setCurrentUser(false)
            setLoginStatus(false)
        }

    },[auth.isLoggedIn])

    return(
        <>
            {props.children}
        </>
    )

}

export default connect(state=>state)(withRouter(Container))