import {
    signInRoutine,customSignInRoutine,
    completeNewPasswordRoutine,
    forgotPasswordRoutine,customForgotPasswordRoutine,
    resetPasswordRoutine,
    signOutRoutine,
    getAuthUserRoutine,
    customSetDataRoutine
} from '../routines/auth'

const initialState = {
    error:false,
    isLoggedIn:false,
    isRequesting:false,
    isError:false,
    data:false,
    user:false,
    account:false,
    noAccessToAccount:false
}

//signin
export const signIn = (state=initialState,action) => {

    switch(action.type){

        case customSignInRoutine.INIT : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                userNotFound:false,
                userNotConfirmed:false,
                newPasswordRequired:false,
                noAccessToAccount:false
            })

        }
        
        case signInRoutine.REQUEST  : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                userNotFound:false,
                userNotConfirmed:false,
                newPasswordRequired:false,
                isLoggedIn:false,
                noAccessToAccount:false,
                data:false
            })

        }

        case customSignInRoutine.NEWPASSWORDREQUIRED : {
            
            const {data} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                newPasswordRequired:true,
                isLoggedIn:false,
                data
            })

        }

        case customSignInRoutine.NOACCESSTOACCOUNT : {

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error:false,
                isLoggedIn:false,
                noAccessToAccount:true
            })

        }

        case signInRoutine.SUCCESS : {

            const {data} = action.payload
            const {attributes,signInUserSession} = data

            const access = JSON.parse(signInUserSession.idToken.payload.access)

            const user = {
                id:attributes.sub,
                name:attributes.name,
                phoneNumber:attributes.phone_number,
                email:attributes.email,
                access
            }

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                userNotConfirmed:false,
                userNotFound:false,
                newPasswordRequired:false,
                isLoggedIn:true,
                data:false,
                noAccessToAccount:false,
                user
            })     

        }

        case signInRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error,
                isLoggedIn:false,
                data:false,
                user:false
            })
        }

        case customSignInRoutine.USERNOTCONFIRMED : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error,
                userNotConfirmed:true,
                data:false
            })

        }

        case customSignInRoutine.USERNOTFOUND : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error,
                userNotFound:true,
                isLoggedIn:false,
                data:false
            })

        }

    }    

    return state
}

//signout
export const signOut = (state=initialState,action) => {

    switch(action.type){

        case signOutRoutine.REQUEST:{

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })  
        }

        case signOutRoutine.SUCCESS:{

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                userNotFound:false,
                userNotConfirmed:false,
                newPasswordRequired:false,
                isLoggedIn:false,
                user:false,
            })  
        }
        case signOutRoutine.FAILURE:{

            const error = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                error:error,
                isError:true
            }) 
        }

        case signOutRoutine.FULFILL:{

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false
            })  
        }
    }

    return state

}

export const completeNewPassword = (state=initialState,action) => {

    switch(action.type){
        case completeNewPasswordRoutine.TRIGGER : {
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })  
        }
        case completeNewPasswordRoutine.SUCCESS : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                userNotFound:false,
                userNotConfirmed:false,
                newPasswordRequired:false,
                isLoggedIn:false
            })  
        }
            
        case completeNewPasswordRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                error:error,
                isError:true
            }) 
        }
            
    }

    return state

}

//forgot password
export const forgotPassword = (state=initialState,action)=>{

    switch(action.type){

        case customForgotPasswordRoutine.INIT : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                data:false,
                userNotFound:false,
                limitExceeded:false,
                onResetPassword:false,
            })
        }
        
        case forgotPasswordRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                // data:false
            })
        }

        case forgotPasswordRoutine.SUCCESS : {

            const {data} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,   
                error:false,
                userNotFound:false,
                limitExceeded:false,
                onResetPassword:true,
                data
            })
        }

        case forgotPasswordRoutine.FAILURE : {
            const {error} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error:error
            })
        }

        case customForgotPasswordRoutine.USERNOTFOUND : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error,
                userNotFound:true,
                isLoggedIn:false,
                data:false
            })

        }

        case customForgotPasswordRoutine.LIMITEXCEEDED : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error,
                limitExceeded:true,
                isLoggedIn:false,
                data:false
            })

        }
    }

    return state

}

//reset password 
export const resetPassword = (state=initialState,action) => {

    switch(action.type){

        case resetPasswordRoutine.TRIGGER:

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })  
            
        case resetPasswordRoutine.SUCCESS:

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                onResetPassword:false
            })

        case resetPasswordRoutine.FAILURE:

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                error,
                isError:true
            })  

        default:
            return state
    }

}

export const getAuthUser = (state=initialState,action) => {

    switch(action.type){
        
        case getAuthUserRoutine.REQUEST  : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                userNotFound:false,
                userNotConfirmed:false,
                newPasswordRequired:false,
                data:false
            })

        }

        case getAuthUserRoutine.SUCCESS : {

            const {data} = action.payload
            const {attributes,signInUserSession} = data

            //const access = JSON.parse(signInUserSession.idToken.payload.access)

            const user = {
                id:attributes.sub,
                name:attributes.name,
                phoneNumber:attributes.phone_number,
                email:attributes.email,
                access:state.user.access
            }

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                userNotConfirmed:false,
                userNotFound:false,
                newPasswordRequired:false,
                isLoggedIn:true,
                data:false,
                user
            })     

        }

        case getAuthUserRoutine.FAILURE : {

            const {error} = action.payload
            console.log(error)
            
            return Object.assign({},state,{
                isRequesting:false,
                // isError:true,
                // error,
                isLoggedIn:false,
                data:false,
                user:false
            })
        }

    }    

    return state
}

export const authData = (state=initialState,action) => {

    switch(action.type){
        case customSetDataRoutine.SETACCOUNT : {
            
            const {account} = action
            return Object.assign({},state,{
                account
            })  
        }
    }

    return state
}