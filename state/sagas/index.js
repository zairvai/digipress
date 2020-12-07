import {signInWatcher, signOutWatcher,completeNewPasswordWatcher,forgotPasswordWatcher,resetPasswordWatcher} from './auth'
import {createAccountWatcher,listAccountsWatcher,getAccountWatcher} from './account'

const sagas = [
    signInWatcher,signOutWatcher,completeNewPasswordWatcher,forgotPasswordWatcher,resetPasswordWatcher,
    createAccountWatcher,listAccountsWatcher,getAccountWatcher
]

export default [
    ...sagas
]