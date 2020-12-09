import {
    signInRoutine,customSignInRoutine,
    completeNewPasswordRoutine,
    forgotPasswordRoutine,customForgotPasswordRoutine,
    resetPasswordRoutine,
    signOutRoutine,
    customSetDataRoutine
} from '../routines/auth'

const initialState = {
    error:false,
    isLoggedIn:false,
    isRequesting:false,
    isError:false,
    data:false,
    user:false,
    account:false
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
                isLoggedIn:false,
                data:false
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

        case signInRoutine.SUCCESS : {

            const {data} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                userNotConfirmed:false,
                userNotFound:false,
                newPasswordRequired:false,
                isLoggedIn:true,
                data
            })     

        }

        case signInRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error,
                isLoggedIn:false
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
                account:false
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

export const authData = (state=initialState,action) => {

    switch(action.type){
        case customSetDataRoutine.SETUSER : {
            
            const {user} = action
            return Object.assign({},state,{
                user
            })  
        }
        case customSetDataRoutine.SETACCOUNT : {
            
            const {account} = action
            return Object.assign({},state,{
                account
            })  
        }
    }

    return state
}