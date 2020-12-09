import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,call} from 'redux-saga/effects'

import {
    getUserRoutine
} from '../routines/user'

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
