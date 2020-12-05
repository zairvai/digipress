import React,{createContext} from 'react'

export const appContext = createContext()

export const AppContextProvider = (props) =>{

    const [isLoggedIn,setIsLoggedIn] = React.useState(false)
    const [user,setUser] = React.useState(false)
    const [account,setAccount] = React.useState(false)

    const setCurrentUser = user => {
        if(user){
            const currentUser = {
                id:user.attributes.sub,
                name:user.attributes.name,
                email:user.attributes.email,
                email_verified:user.attributes.email_verified,
                cognitoGroups:user.signInUserSession.accessToken.payload["cognito:groups"]
            }
            setUser(currentUser)
        }
        else setUser(false)
       
    }

    const setLoginStatus = val => {
        setIsLoggedIn(val)
    }

    return (
        <appContext.Provider 
            value={{
                isLoggedIn,
                auth:{user,account},
                setCurrentUser,
                setLoginStatus
            }}>
            {props.children}
        </appContext.Provider>
    )
}
