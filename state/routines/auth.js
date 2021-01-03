import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

//signin
var customRoutine = createRoutineCreator(["INIT","USERNOTCONFIRMED","USERNOTFOUND","NEWPASSWORDREQUIRED","NOACCESSTOACCOUNT"])
export const customSignInRoutine = customRoutine("signin_custom")
export const signInRoutine = createRoutine("signin")
export const signInRoutinePromise = promisifyRoutine(signInRoutine)

//signout
export const signOutRoutine = createRoutine("logout")
export const signOutRoutinePromise = promisifyRoutine(signOutRoutine)

//complete complete new password after add user via cognito
export const completeNewPasswordRoutine = createRoutine("complete_new_password")

//send forgot password code
customRoutine = createRoutineCreator(["INIT","USERNOTFOUND","LIMITEXCEEDED"])
export const customForgotPasswordRoutine = customRoutine("forgot_password_custom")
export const customForgotPasswordRoutinePromise = promisifyRoutine(customForgotPasswordRoutine)

export const forgotPasswordRoutine = createRoutine("forgot_password")
export const forgotPasswordRoutinePromise = promisifyRoutine(forgotPasswordRoutine)

//reset password
export const resetPasswordRoutine = createRoutine("reset_password")
export const resetPasswordRoutinePromise = promisifyRoutine(resetPasswordRoutine)

customRoutine = createRoutineCreator(["SETACCOUNT"])
export const customSetDataRoutine = customRoutine("set_data_custom")

export const getAuthUserRoutine = createRoutine("get_auth_user")
export const getAuthUserRoutinePromise = promisifyRoutine(getAuthUserRoutine)

export const verifyEmailRoutine = createRoutine("verifiy_email")
export const verifyEmailRoutinePromise = promisifyRoutine(verifyEmailRoutine)

export const verifySubmitCodeRoutine = createRoutine("verifiy_code")
export const verifySubmitCodeRoutinePromise = promisifyRoutine(verifySubmitCodeRoutine)