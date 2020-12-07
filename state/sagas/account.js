import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeEvery} from 'redux-saga/effects'

import {
    createAccountRoutine,
    customCreateAccountRoutine,
    updateAccountRoutine,
    deleteAccountRoutine,
    getAccountRoutine,
    listAccountsRoutine
} from '../routines/account'

// create account
function* createAccount(action){

    try{

        yield put(createAccountRoutine.request())

        const {values} = action.payload

        const name = values.name.trim()
        const address = values.address.trim()
        const contactPerson = values.contactPerson.trim()
        const uniqueURL = values.uniqueURL.trim().toLowerCase()
        const phoneNumber = values.phoneCode.trim() +"-"+ values.phoneNumber.trim()
        const emailAddress = values.emailAddress.trim()


        const response = yield API.graphql(graphqlOperation(mutations.createAccount,{
            input:{
                name,
                address,
                contactPerson,
                uniqueURL,
                phoneNumber,
                emailAddress}}))

        yield put(createAccountRoutine.success({data:response.data.createAccount}))


    }catch(error){
        yield put(createAccountRoutine.failure({error}))
    }finally{
        yield put(createAccountRoutine.fulfill())
    }

}

export function* createAccountWatcher(){
    yield takeEvery(createAccountRoutine.TRIGGER,createAccount)
}

function* listAccounts(action){

    try{

        const {orderBy,direction,from,size} = action.payload

        yield put(listAccountsRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listAccounts,{input:{orderBy,direction,from,size}}))

        yield put(listAccountsRoutine.success({data:response.data.listAccounts}))

                    
    }catch(error){
        yield put(listAccountsRoutine.failure({error}))
    }finally{
        yield put(listAccountsRoutine.fulfill())
    }

}

export function* listAccountsWatcher(){
    yield takeEvery(listAccountsRoutine.TRIGGER,listAccounts)
}

function* getAccount(action){

    try{

        yield put(getAccountRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(queries.getAccount,{input:{id}}))

        yield put(getAccountRoutine.success({data:response.data.getAccount}))
                    
    }catch(error){
        yield put(getAccountRoutine.failure({error}))
    }finally{
        yield put(getAccountRoutine.fulfill())
    }

}

export function* getAccountWatcher(){
    yield takeEvery(getAccountRoutine.TRIGGER,getAccount)
}

function* deleteAccount(action){

    try{

        yield put(deleteAccountRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(mutations.deleteAccount,{input:{id}}))

        yield put(deleteAccountRoutine.success({data:response.data.deleteAccount}))
                    
    }catch(error){
        yield put(deleteAccountRoutine.failure({error}))
    }finally{
        yield put(deleteAccountRoutine.fulfill())
    }

}

export function* deleteAccountWatcher(){
    yield takeEvery(deleteAccountRoutine.TRIGGER,deleteAccount)
}


function* updateAccount(action){

    try{

        console.log(action)

        yield put(updateAccountRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : action.id.replace(/\s/g,""),
            expectedVersion : values.version
        }

        if(values.name) updateParams.name = values.name.trim()
        if(values.address) updateParams.address = values.address.trim()
        if(values.contactPerson) updateParams.contactPerson = values.contactPerson.trim()
        if(values.uniqueURL) updateParams.uniqueURL = values.uniqueURL.trim().toLowerCase()
        if(values.phoneNumber) updateParams.phoneNumber = values.phoneCode.trim() +"-"+ values.phoneNumber.trim()
        if(values.emailAddress) updateParams.emailAddress = values.emailAddress.trim()
        if(values.status) updateParams.status = values.status.trim()
        

        const response = yield API.graphql(graphqlOperation(mutations.updateAccount,{
            input:updateParams}))

        yield put(updateAccountRoutine.success({data:response.data.updateAccount}))

                    
    }catch(error){

        yield put(updateAccountRoutine.failure({error}))

    }finally{

        yield put(updateAccountRoutine.fulfill())

    }

}

export function* updateAccountWatcher(){
    yield takeEvery(updateAccountRoutine.TRIGGER,updateAccount)
}