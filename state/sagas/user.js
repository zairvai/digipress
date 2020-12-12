import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,call} from 'redux-saga/effects'

import {
    createUserRoutine,
    getUserRoutine,
    listUsersRoutine,
    updateUserRoutine
} from '../routines/user'


function* createUser(action){

    try{

        yield put(createUserRoutine.request())

        const {values} = action.payload

        const name = values.name.trim()
        const emailAddress = values.emailAddress.trim()
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


function* listUsers(action){

    try{
        
        const {accountId,roles,orderBy,direction,from,size} = action.payload.values

        yield put(listUsersRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listUsers,{input:{accountId,roles,orderBy,direction,from,size}}))

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

        console.log(action)

        yield put(updateUserRoutine.request())

        const {values} = action.payload

        console.log(values)

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            expectedVersion : values.version
        }

        if(values.name) updateParams.name = values.name.trim()
        if(values.emailAddress) updateParams.emailAddress = values.emailAddress.trim()
        if(values.phoneCode) updateParams.phoneCode =  values.phoneCode.trim()
        if(values.phoneNumber) updateParams.phoneNumber =  values.phoneNumber.trim()
        if(values.status) updateParams.status = values.status.trim()
        if(values.roles) updateParams.roles =  values.roles        

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