import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,call,delay} from 'redux-saga/effects'

import {
    createUserRoutine,
    getUserRoutine,
    listUsersRoutine,
    updateUserRoutine,
    getUserByEmailRoutine
} from '../routines/user'


function* createUser(action){

    try{

        yield put(createUserRoutine.request())

        const {values} = action.payload

        const name = values.name.trim()
        const emailAddress = values.emailAddress.trim().toLowerCase()
        const phoneCode = values.phoneCode.trim()
        const phoneNumber =  values.phoneNumber.trim()
        const password = values.password.trim()
        const role = {
            accountId:values.accountId.trim(),
            role:values.role.trim()
        }

        const response = yield API.graphql(graphqlOperation(mutations.createUser,{
            input:{
                name,
                phoneCode,
                phoneNumber,
                emailAddress,
                password,
                role
            }}))

        yield delay(2000)
        yield put(createUserRoutine.success({data:response.data.createUser}))


    }catch(error){
        yield put(createUserRoutine.failure({error}))
    }finally{
        yield put(createUserRoutine.fulfill())
    }

}

export function* createUserWatcher(){
    yield takeLatest(createUserRoutine.TRIGGER,createUser)
}

function* getUser(action){

    try{

        yield put(getUserRoutine.request())

        const {id} = action.payload
        
        const response = yield call([API,"graphql"],graphqlOperation(queries.getUser,{input:{id}}))

        if(!response.data.getUser) yield put(getUserRoutine.failure({error:{code:404,message:"not found"}}))

        yield put(getUserRoutine.success({data:response.data.getUser}))
                    
    }catch(error){
        yield put(getUserRoutine.failure({error}))
    }finally{
        yield put(getUserRoutine.fulfill())
    }

}

export function* getUserWatcher(){
    yield takeLatest(getUserRoutine.TRIGGER,getUser)
}


function* getUserByEmail(action){

    try{

        yield put(getUserByEmailRoutine.request())

        const {emailAddress} = action.payload

        const response = yield API.graphql({
            query:queries.getUserByEmailAddress,
            variables:{emailAddress},
            authMode:"AWS_IAM"
        })

        yield put(getUserByEmailRoutine.success({data:response.data.getUserByEmailAddress}))
                    
    }catch(error){
        yield put(getUserByEmailRoutine.failure({error}))
    }finally{
        yield put(getUserByEmailRoutine.fulfill())
    }

}

export function* getUserByEmailWatcher(){
    yield takeLatest(getUserByEmailRoutine.TRIGGER,getUserByEmail)
}


function* listUsers(action){

    try{
        
        const {accountId,name,roles,orderBy,direction,from,size,statuses} = action.payload

        const listParams={from,size,roles}

        if(accountId) listParams.accountId = accountId
        if(name) listParams.name = name
        if(statuses) listParams.statuses = statuses
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }

        yield put(listUsersRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listUsers,{input:listParams}))

        yield put(listUsersRoutine.success({data:response.data.listUsers}))

                    
    }catch(error){
        yield put(listUsersRoutine.failure({error}))
    }finally{
        yield put(listUsersRoutine.fulfill())
    }

}

export function* listUsersWatcher(){
    yield takeLatest(listUsersRoutine.TRIGGER,listUsers)
}


function* updateUser(action){

    try{

        yield put(updateUserRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            expectedVersion : values.version
        }

        if(values.name) updateParams.name = values.name.trim()
        if(values.emailAddress) updateParams.emailAddress = values.emailAddress.trim().toLowerCase()
        if(values.phoneCode) updateParams.phoneCode =  values.phoneCode.trim()
        if(values.phoneNumber) updateParams.phoneNumber =  values.phoneNumber.trim()
        if(values.status) updateParams.status = values.status.trim()
        if(values.roles) updateParams.roles =  values.roles        

        // console.log(updateParams) 
        // return

        const response = yield API.graphql(graphqlOperation(mutations.updateUser,{
            input:updateParams}))

        yield put(updateUserRoutine.success({data:response.data.updateUser}))

                    
    }catch(error){

        yield put(updateUserRoutine.failure({error}))

    }finally{

        yield put(updateUserRoutine.fulfill())

    }

}

export function* updateUserWatcher(){
    yield takeLatest(updateUserRoutine.TRIGGER,updateUser)
}