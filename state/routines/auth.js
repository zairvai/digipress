import {
    createRoutine,createRoutineCreator,
} from 'redux-saga-routines'

//signin
var customRoutine = createRoutineCreator(["INIT","USERNOTCONFIRMED","USERNOTFOUND","NEWPASSWORDREQUIRED"])
export const customSignInRoutine = customRoutine("signin_custom")
export const signInRoutine = createRoutine("signin")

//signout
export const signOutRoutine = createRoutine("logout")

//complete complete new password after add user via cognito
export const completeNewPasswordRoutine = createRoutine("complete_new_password")

//send forgot password code
customRoutine = createRoutineCreator(["INIT","USERNOTFOUND","LIMITEXCEEDED"])
export const customForgotPasswordRoutine = customRoutine("forgot_password_custom")
export const forgotPasswordRoutine = createRoutine("forgot_password")

//reset password
export const resetPasswordRoutine = createRoutine("reset_password")