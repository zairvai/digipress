import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,delay} from 'redux-saga/effects'

import {
    createTagRoutine,
    updateTagRoutine,
    deleteTagRoutine,
    getTagRoutine,
    listTagsRoutine
} from '../routines/tag'

// create tag
function* createTag(action){

    try{

        yield put(createTagRoutine.request())

        const {values} = action.payload

        const name = values.name.trim().toLowerCase()
        const accountId = values.accountId.trim()

        const response = yield API.graphql(graphqlOperation(mutations.createTag,{input:{name,accountId}}))

        yield delay(2000)

        yield put(createTagRoutine.success({data:response.data.createTag}))


    }catch(error){
        yield put(createTagRoutine.failure({error}))
    }finally{
        yield put(createTagRoutine.fulfill())
    }

}

export function* createTagWatcher(){
    yield takeLatest(createTagRoutine.TRIGGER,createTag)
}

function* listTags(action){

    try{

        const {accountId,name,orderBy,direction,from,size,statuses} = action.payload

        const listParams={from,size}

        if(accountId) listParams.accountId = accountId
        if(name) listParams.name = name
        if(statuses) listParams.statuses = statuses
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }

        yield put(listTagsRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listTags,{input:listParams}))

        yield put(listTagsRoutine.success({data:response.data.listTags}))

                    
    }catch(error){
        yield put(listTagsRoutine.failure({error}))
    }finally{
        yield put(listTagsRoutine.fulfill())
    }

}

export function* listTagsWatcher(){
    yield takeLatest(listTagsRoutine.TRIGGER,listTags)
}

function* getTag(action){

    try{

        yield put(getTagRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(queries.getTag,{input:{id}}))
        
        if(!response.data.getTag) yield put(getTagRoutine.failure({error:{code:404,message:"not found"}}))

        yield put(getTagRoutine.success({data:response.data.getTag}))
                    
    }catch(error){
        yield put(getTagRoutine.failure({error}))
    }finally{
        yield put(getTagRoutine.fulfill())
    }

}

export function* getTagWatcher(){
    yield takeLatest(getTagRoutine.TRIGGER,getTag)
}

function* deleteTag(action){

    try{

        yield put(deleteTagRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(mutations.deleteTag,{input:{id}}))

        yield put(deleteTagRoutine.success({data:response.data.deleteTag}))
                    
    }catch(error){
        yield put(deleteTagRoutine.failure({error}))
    }finally{
        yield put(deleteTagRoutine.fulfill())
    }

}

export function* deleteTagWatcher(){
    yield takeLatest(deleteTagRoutine.TRIGGER,deleteTag)
}


function* updateTag(action){

    try{

        console.log(action)

        yield put(updateTagRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            expectedVersion : values.version
        }

        if(values.name) updateParams.name = values.name.trim().toLowerCase()

        const response = yield API.graphql(graphqlOperation(mutations.updateTag,{input:updateParams}))

        yield put(updateTagRoutine.success({data:response.data.updateTag}))

                    
    }catch(error){

        yield put(updateTagRoutine.failure({error}))

    }finally{

        yield put(updateTagRoutine.fulfill())

    }

}

export function* updateTagWatcher(){
    yield takeLatest(updateTagRoutine.TRIGGER,updateTag)
}