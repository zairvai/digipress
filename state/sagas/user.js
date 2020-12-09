import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,call} from 'redux-saga/effects'

import {
    createUserRoutine,
    getUserRoutine
} from '../routines/user'


function* createUser(action){

    try{

        yield put(createUserRoutine.request())

        const {values} = action.payload

        const name = values.name.trim()
        const emailAddress = values.emailAddress.trim()
        const phoneNumber = values.phoneCode.trim() + values.phoneNumber.trim()
        const password = values.password.trim()
        const accountId = values.accountId.trim()
        const role = values.role.trim()

        console.log(phoneNumber)

        const response = yield API.graphql(graphqlOperation(mutations.createUser,{
            input:{
                name,
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
