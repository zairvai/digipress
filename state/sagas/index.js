import {signInWatcher, signOutWatcher,completeNewPasswordWatcher,forgotPasswordWatcher,resetPasswordWatcher} from './auth'
import {createAccountWatcher,listAccountsWatcher,getAccountWatcher, updateAccountWatcher,deleteAccountWatcher} from './account'

const sagas = [
    signInWatcher,signOutWatcher,completeNewPasswordWatcher,forgotPasswordWatcher,resetPasswordWatcher,
    createAccountWatcher,listAccountsWatcher,getAccountWatcher,updateAccountWatcher,deleteAccountWatcher
]

export default [
    ...sagas
]