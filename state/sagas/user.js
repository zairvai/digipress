import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,call} from 'redux-saga/effects'

import {
    createUserRoutine,
    getUserRoutine,
    listUsersRoutine
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
        const accountId = values.accountId.trim()
        const role = values.role.trim()

        const response = yield API.graphql(graphqlOperation(mutations.createUser,{
            input:{
                name,
                phoneCode,
                phoneNumber,
                emailAddress,
                password,
                accountId,
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
        
        const {accountId,role,orderBy,direction,from,size} = action.payload.values

        yield put(listUsersRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listUsers,{input:{accountId,role,orderBy,direction,from,size}}))

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