import {
    signInRoutine,customSignInRoutine,
    signOutRoutine,
    completeNewPasswordRoutine,
    forgotPasswordRoutine,
    customForgotPasswordRoutine,
    resetPasswordRoutine
} from '../routines/auth'

export const initSignIn = () => ({
    type : customSignInRoutine.INIT
})

export const signIn = payload => ({
    type : signInRoutine.TRIGGER,
    payload : payload
})

export const signOut = () => ({
    type:signOutRoutine.TRIGGER
})

export const completeNewPassword = payload => ({
    type : completeNewPasswordRoutine.TRIGGER,
    payload : payload
})

export const initForgotPassword = () => ({
    type : customForgotPasswordRoutine.INIT
})

export const forgotPassword = payload => ({
    type:forgotPasswordRoutine.TRIGGER,
    payload
})

export const resetPassword = payload => ({
    type:resetPasswordRoutine.TRIGGER,
    payload
})
