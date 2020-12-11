import { routinePromiseWatcherSaga } from 'redux-saga-routines';
import {signInWatcher, signOutWatcher,completeNewPasswordWatcher,forgotPasswordWatcher,resetPasswordWatcher,getAuthUserWatcher} from './auth'
import {createAccountWatcher,listAccountsWatcher,getAccountWatcher, updateAccountWatcher,deleteAccountWatcher,getAccountByUniqueUrlWatcher} from './account'
import {createUserWatcher,getUserWatcher,listUsersWatcher,updateUserWatcher} from "./user"
const sagas = [
    
    //auth
    signInWatcher,
    signOutWatcher,
    completeNewPasswordWatcher,
    forgotPasswordWatcher,
    resetPasswordWatcher,
    getAuthUserWatcher,
    
    //account
    createAccountWatcher,
    listAccountsWatcher,
    getAccountWatcher,
    getAccountByUniqueUrlWatcher,
    updateAccountWatcher,
    deleteAccountWatcher,

    //user
    createUserWatcher,
    getUserWatcher,
    listUsersWatcher,
    updateUserWatcher,
    
    routinePromiseWatcherSaga
]

export default [
    ...sagas
]