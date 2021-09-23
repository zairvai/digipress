import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,call,delay} from 'redux-saga/effects'

import {
    createAccountRoutine,
    updateAccountRoutine,
    deleteAccountRoutine,
    getAccountRoutine,getAccountByUniqueUrlRoutine,
    listAccountsRoutine
} from '../routines/account'

// create account
function* createAccount(action){

    try{

        yield put(createAccountRoutine.request())

        const {values} = action.payload

        const inputParams = {
            name:values.name.trim(),
            address:values.address.trim(),
            contactPerson:values.contactPerson.trim(),
            uniqueURL:values.uniqueURL.trim().toLowerCase(),
            phoneNumber:values.phoneCode.trim() +"-"+ values.phoneNumber.trim(),
            emailAddress:values.emailAddress.trim()
        }

        if(values.createdById) inputParams.createdById = values.createdById
        if(values.updatedById) inputParams.updatedById = values.updatedById

        const response = yield API.graphql(graphqlOperation(mutations.createAccount,{input:inputParams}))

        yield delay(2000)
        yield put(createAccountRoutine.success({data:response.data.createAccount}))


    }catch(error){
        yield put(createAccountRoutine.failure({error}))
    }finally{
        yield put(createAccountRoutine.fulfill())
    }

}

export function* createAccountWatcher(){
    yield takeLatest(createAccountRoutine.TRIGGER,createAccount)
}

function* listAccounts(action){

    try{

        const {name,orderBy,direction,from,size,statuses} = action.payload

        const listParams={from,size}

        if(name) listParams.name = name
        if(statuses) listParams.statuses = statuses
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }

        yield put(listAccountsRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listAccounts,{input:listParams}))

        yield put(listAccountsRoutine.success({data:response.data.listAccounts}))

                    
    }catch(error){
        yield put(listAccountsRoutine.failure({error}))
    }finally{
        yield put(listAccountsRoutine.fulfill())
    }

}

export function* listAccountsWatcher(){
    yield takeLatest(listAccountsRoutine.TRIGGER,listAccounts)
}

function* getAccount(action){

    try{

        yield put(getAccountRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(queries.getAccount,{input:{id}}))
        
        if(!response.data.getAccount) yield put(getAccountRoutine.failure({error:{code:404,message:"not found"}}))

        yield put(getAccountRoutine.success({data:response.data.getAccount}))
                    
    }catch(error){
        yield put(getAccountRoutine.failure({error}))
    }finally{
        yield put(getAccountRoutine.fulfill())
    }

}

export function* getAccountWatcher(){
    yield takeLatest(getAccountRoutine.TRIGGER,getAccount)
}


function* getAccountByUniqueUrl(action){

    try{

        yield put(getAccountByUniqueUrlRoutine.request())

        const {url} = action.payload

        //const response = yield call([API,"graphql"],graphqlOperation(queries.getAccountByUniqueUrl,{url}))

        const response = yield API.graphql({
            query:queries.getAccountByUniqueUrl,
            variables:{url},
            authMode:"AWS_IAM"
            //authMode:"AMAZON_COGNITO_USER_POOLS"
        })

        yield put(getAccountByUniqueUrlRoutine.success({data:response.data.getAccountByUniqueUrl}))
                    
    }catch(error){
        yield put(getAccountByUniqueUrlRoutine.failure({error}))
    }finally{
        yield put(getAccountByUniqueUrlRoutine.fulfill())
    }

}

export function* getAccountByUniqueUrlWatcher(){
    yield takeLatest(getAccountByUniqueUrlRoutine.TRIGGER,getAccountByUniqueUrl)
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
    yield takeLatest(deleteAccountRoutine.TRIGGER,deleteAccount)
}


function* updateAccount(action){

    try{

        yield put(updateAccountRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            expectedVersion : values.version
        }

        if(values.name) updateParams.name = values.name.trim()
        if(values.address) updateParams.address = values.address.trim()
        if(values.contactPerson) updateParams.contactPerson = values.contactPerson.trim()
        if(values.uniqueURL) updateParams.uniqueURL = values.uniqueURL.trim().toLowerCase()
        if(values.phoneNumber) updateParams.phoneNumber = values.phoneCode.trim() +"-"+ values.phoneNumber.trim()
        if(values.emailAddress) updateParams.emailAddress = values.emailAddress.trim()
        if(values.status) updateParams.status = values.status
        if(values.updatedById) updateParams.updatedById = values.updatedById
        

        const response = yield API.graphql(graphqlOperation(mutations.updateAccount,{input:updateParams}))

        yield put(updateAccountRoutine.success({data:response.data.updateAccount}))

                    
    }catch(error){

        yield put(updateAccountRoutine.failure({error}))

    }finally{

        yield put(updateAccountRoutine.fulfill())

    }

}

export function* updateAccountWatcher(){
    yield takeLatest(updateAccountRoutine.TRIGGER,updateAccount)
}