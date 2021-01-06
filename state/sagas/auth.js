import {Auth} from 'aws-amplify'
import {put,takeEvery,takeLatest} from 'redux-saga/effects'
import {
    signInRoutine,customSignInRoutine,
    completeNewPasswordRoutine,
    forgotPasswordRoutine,customForgotPasswordRoutine,
    resetPasswordRoutine,
    signOutRoutine,
    getAuthUserRoutine,
    verifyEmailRoutine,verifySubmitCodeRoutine
} from '../routines/auth'

//signin
function* signIn(action) {
   
    yield put(signInRoutine.request())

    const {values} = action.payload
    
    const username = values.username.replace(/\s/g,"")
    const password = values.password.replace(/\s/g,"")
    const accountId = values.accountId

    try{

        
        const user = yield Auth.signIn(username,password,{accountId})
        //const user = yield call([Auth, 'signIn'], {username,password,{test:"yes"}});
        // const user = yield call([Auth, 'signIn'], {username,password,"clientMetadata":{accountId}});
        
        if(user.challengeName === "NEW_PASSWORD_REQUIRED") yield put(customSignInRoutine.newpasswordrequired({data:user}))
        else if(user.signInUserSession.idToken.payload.access==="false") {
            yield Auth.signOut()
            yield put(customSignInRoutine.noaccesstoaccount())
        }
        else yield put(signInRoutine.success({data:user}))

    }catch(error){

        if(typeof error.code !== undefined){
            
            const {code} = error

            if(code==="UserNotConfirmedException") yield put(customSignInRoutine.usernotconfirmed({error:{username,password}}))
            else if(code==="UserNotFoundException") yield put(customSignInRoutine.usernotfound({error:{username}}))
            else yield put(signInRoutine.failure({error}))
        }
        else yield put(signInRoutine.failure({error}))

    }finally{
        yield put(signInRoutine.fulfill())

    }
}

export function* signInWatcher(){
    yield takeLatest(signInRoutine.TRIGGER,signIn)
}

//signout
function* signOut(){

    try{
        yield put(signOutRoutine.request())

        yield Auth.signOut()
        yield put(signOutRoutine.success())

    }catch(error){
        yield put(signOutRoutine.failure(error))
    }
    finally{
        yield put(signOutRoutine.fulfill())
    }
}

export function* signOutWatcher(){
    yield takeLatest(signOutRoutine.TRIGGER,signOut)
}

//completenewpassword
function* completeNewPassword(action){

    try{

        yield put(completeNewPasswordRoutine.request())

        const {values} = action.payload
        const user = values.user
        const password = values.password.replace(/\s/g,"")
        const name = values.name.trim()

        const data = yield Auth.completeNewPassword(user,password,{name})
        
        yield put(completeNewPasswordRoutine.success({data}))
        

    }catch(error){
        yield put(completeNewPasswordRoutine.failure({error}))
    }
    finally{
        yield put(completeNewPasswordRoutine.fulfill())
    }

}

export function* completeNewPasswordWatcher(){
    yield takeLatest(completeNewPasswordRoutine.TRIGGER,completeNewPassword)
}


function* forgotPassword(action){

    let username

    try{

        yield put(forgotPasswordRoutine.request())

        const {values} = action.payload
        username = values.username.replace(/\s/g,"")

        const data = yield Auth.forgotPassword(username)

        yield put(forgotPasswordRoutine.success({data:{username,...data}}))
                    
    }catch(error){

        yield put(forgotPasswordRoutine.failure({error}))

    }finally{
        yield put(forgotPasswordRoutine.fulfill())
    }

}

export function* forgotPasswordWatcher(){
    yield takeLatest(forgotPasswordRoutine.TRIGGER,forgotPassword)
}


function* resetPassword(action){

    try{

        yield put(resetPasswordRoutine.request())

        const {values} = action.payload
        const username = values.username.replace(/\s/g,"")
        const password = values.password.replace(/\s/g,"")
        const code = values.code.toString()

        const data = yield Auth.forgotPasswordSubmit(username,code,password)

        yield put(resetPasswordRoutine.success({data}))

    }catch(error){
        yield put(resetPasswordRoutine.failure({error}))
    }
    finally{
        yield put(resetPasswordRoutine.fulfill())
    }

}

export function* resetPasswordWatcher(){
    yield takeLatest( resetPasswordRoutine.TRIGGER,resetPassword)
}


function* verifyEmail(action){


    try{

        yield put(verifyEmailRoutine.request())

        const {values} = action.payload
        const username = values.username.replace(/\s/g,"")

        const data = yield Auth.verifyCurrentUserAttribute("email")

        yield put(verifyEmailRoutine.success({data:{username,...data}}))
                    
    }catch(error){

         yield put(verifyEmailRoutine.failure({error}))

    }finally{
        yield put(verifyEmailRoutine.fulfill())
    }

}

export function* verifyEmailWatcher(){
    yield takeLatest(verifyEmailRoutine.TRIGGER,verifyEmail)
}

function* verifySubmitCode(action){

    try{

        yield put(verifySubmitCodeRoutine.request())

        const {values} = action.payload
        const code = values.code

        const data = yield Auth.verifyCurrentUserAttributeSubmit("email",code)

        yield put(verifySubmitCodeRoutine.success())
                    
    }catch(error){

         yield put(verifySubmitCodeRoutine.failure({error}))

    }finally{
        yield put(verifySubmitCodeRoutine.fulfill())
    }

}

export function* verifySubmitCodeWatcher(){
    yield takeLatest(verifySubmitCodeRoutine.TRIGGER,verifySubmitCode)
}

function* getAuthUser() {
   
    yield put(getAuthUserRoutine.request())


    try{
        
        const user = yield Auth.currentAuthenticatedUser({bypassCache:false})

        yield put(getAuthUserRoutine.success({data:user}))

    }catch(error){

        yield put(getAuthUserRoutine.failure({error}))

    }finally{
        yield put(getAuthUserRoutine.fulfill())

    }
}

export function* getAuthUserWatcher(){
    yield takeLatest(getAuthUserRoutine.TRIGGER,getAuthUser)
}
