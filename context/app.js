import React,{createContext} from 'react'

export const appContext = createContext()

export const AppContextProvider = (props) =>{

    const [isLoggedIn,setIsLoggedIn] = React.useState(false)
    const [user,setUser] = React.useState(false)
    const [account,setAccount] = React.useState(false)
    const [baseUrl,setBaseUrl] = React.useState("/")

    const APP_ACCOUNT_ID = "11001"

    const setCurrentAccount = account => {
        if(account){
            setAccount(account)
            setBaseUrl(`/${account.uniqueURL}`)
        }
        else {
            setAccount(false)
            setBaseUrl("/")
        }
    }

    const setCurrentUser = user => {
        if(user)setUser(user)
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
                baseUrl,
                setCurrentAccount,
                setCurrentUser,
                setLoginStatus
            }}>
            {props.children}
        </appContext.Provider>
    )
}
