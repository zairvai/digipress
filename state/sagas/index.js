import {signInWatcher, signOutWatcher,completeNewPasswordWatcher,forgotPasswordWatcher,resetPasswordWatcher} from './auth'

const sagas = [
    signInWatcher,signOutWatcher,completeNewPasswordWatcher,forgotPasswordWatcher,resetPasswordWatcher
]

export default [
    ...sagas
]