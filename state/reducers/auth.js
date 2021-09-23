import {
    signInRoutine,customSignInRoutine,
    completeNewPasswordRoutine,
    forgotPasswordRoutine,customForgotPasswordRoutine,
    resetPasswordRoutine,
    signOutRoutine,
    getAuthUserRoutine,
    customSetDataRoutine,
    verifyEmailRoutine,
    verifySubmitCodeRoutine
} from '../routines/auth'

const initialState = {
    error:false,
    isLoggedIn:false,
    isRequesting:false,
    isError:false
}

//signin
export const signIn = (state=initialState,action) => {

    switch(action.type){

        case customSignInRoutine.INIT : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false
            })

        }
        
        case signInRoutine.REQUEST  : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })

        
        }

        case signInRoutine.SUCCESS : {

            const {data} = action.payload
        
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false
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

            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                userNotConfirmed:false,
                userNotFound:false,
                newPasswordRequired:false,
                isLoggedIn:true,
                data:false
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

export const verifyEmail = (state=initialState,action) => {

    switch(action.type){
        case verifyEmailRoutine.TRIGGER : {
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })  
        }
        case verifyEmailRoutine.SUCCESS : {

            const {data} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                data
            })  
        }
            
        case verifyEmailRoutine.FAILURE : {

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

export const verifySubmitCode = (state=initialState,action) => {

    switch(action.type){
        case verifySubmitCodeRoutine.TRIGGER : {
            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })  
        }
        case verifySubmitCodeRoutine.SUCCESS : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false
            })  
        }
            
        case verifySubmitCodeRoutine.FAILURE : {

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

export const authData = (state=initialState,action) => {

    switch(action.type){

        case customSetDataRoutine.SETACCOUNT : {
            
            const {account} = action
            return Object.assign({},state,{
                account
            })  
        }

        case customSetDataRoutine.SETUSER :{

            const {user} = action

            const stateUser = {...state.user,...user}

            return Object.assign({},state,{
                user:stateUser
            })
            
        }

        case customSetDataRoutine.SETLOGGEDIN : {
            
            const {value} = action

            return Object.assign({},state,{
                isLoggedIn:value
            })  
        }

    }

    return state
}