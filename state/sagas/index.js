import {signInWatcher, signOutWatcher,completeNewPasswordWatcher,forgotPasswordWatcher,resetPasswordWatcher} from './auth'
import {createAccountWatcher,listAccountsWatcher,getAccountWatcher, updateAccountWatcher} from './account'

const sagas = [
    signInWatcher,signOutWatcher,completeNewPasswordWatcher,forgotPasswordWatcher,resetPasswordWatcher,
    createAccountWatcher,listAccountsWatcher,getAccountWatcher,updateAccountWatcher
]

export default [
    ...sagas
]