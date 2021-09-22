import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,delay} from 'redux-saga/effects'

import {
    createQnaRoutine,
    updateQnaRoutine,
    deleteQnaRoutine,
    getQnaRoutine,
    listPostQnasRoutine,
    listUserQnasRoutine
} from '../routines/qna'

// create qna
function* createQna(action){

    try{

        yield put(createQnaRoutine.request())

        const {values} = action.payload

        const inputParams = {
            accountId:values.accountId.trim(),
            postId:values.postId.trim(),
            lessonId:values.lessonId.trim(),
            content:values.content.trim(),
            qnaType:values.qnaType.trim()
        }

        if(values.status) inputParams.status = values.status
        if(values.replyToId) inputParams.replyToId = values.replyToId
        if(values.replyToUserId) inputParams.replyToUserId = values.replyToUserId
        if(values.createdById) inputParams.createdById = values.createdById
        if(values.updatedById) inputParams.updatedById = values.updatedById
        
        // console.log(inputParams)

        const response = yield API.graphql(graphqlOperation(mutations.createQna,{input:inputParams}))

        yield delay(2000)

        yield put(createQnaRoutine.success({data:response.data.createQna}))


    }catch(error){
        yield put(createQnaRoutine.failure({error}))
    }finally{
        yield put(createQnaRoutine.fulfill())
    }

}

export function* createQnaWatcher(){
    yield takeLatest(createQnaRoutine.TRIGGER,createQna)
}

function* listPostQnas(action){

    try{

        const {accountId,postId,lessonId,qnaType,replyToId,createdById,orderBy,direction,from,size,statuses} = action.payload

        const listParams={size}

        if(accountId) listParams.accountId = accountId
        if(postId) listParams.postId = postId
        if(lessonId) listParams.lessonId = lessonId
        if(qnaType) listParams.qnaType = qnaType
        if(statuses) listParams.statuses = statuses
        if(replyToId) listParams.replyToId = replyToId
        if(createdById) listParams.createdById = createdById
        if(from) listParams.from = from
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }

        yield put(listPostQnasRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listPostQnas,{input:listParams}))

        yield put(listPostQnasRoutine.success({data:response.data.listPostQnas}))

                    
    }catch(error){
        yield put(listPostQnasRoutine.failure({error}))
    }finally{
        yield put(listPostQnasRoutine.fulfill())
    }

}

export function* listPostQnasWatcher(){
    yield takeLatest(listPostQnasRoutine.TRIGGER,listPostQnas)
}

function* listUserQnas(action){

    try{

        const {accountId,postId,lessonId,replyToId,replyToUserId,createdById,orderBy,direction,from,size,statuses} = action.payload

        const listParams={size}

        if(accountId) listParams.accountId = accountId
        if(createdById) listParams.createdById = createdById
        if(statuses) listParams.statuses = statuses
        if(replyToUserId) listParams.replyToUserId = replyToUserId
        if(from) listParams.from = from
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }

        yield put(listUserQnasRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listUserQnas,{input:listParams}))

        yield put(listUserQnasRoutine.success({data:response.data.listUserQnas}))

                    
    }catch(error){
        yield put(listUserQnasRoutine.failure({error}))
    }finally{
        yield put(listUserQnasRoutine.fulfill())
    }

}

export function* listUserQnasWatcher(){
    yield takeLatest(listUserQnasRoutine.TRIGGER,listUserQnas)
}

function* getQna(action){

    try{

        yield put(getQnaRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(queries.getQna,{input:{id}}))
        
        if(!response.data.getQna) yield put(getQnaRoutine.failure({error:{code:404,message:"not found"}}))

        yield put(getQnaRoutine.success({data:response.data.getQna}))
                    
    }catch(error){
        yield put(getQnaRoutine.failure({error}))
    }finally{
        yield put(getQnaRoutine.fulfill())
    }

}

export function* getQnaWatcher(){
    yield takeLatest(getQnaRoutine.TRIGGER,getQna)
}

function* deleteQna(action){

    try{

        yield put(deleteQnaRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(mutations.deleteQna,{input:{id}}))

        yield put(deleteQnaRoutine.success({data:response.data.deleteQna}))
                    
    }catch(error){
        yield put(deleteQnaRoutine.failure({error}))
    }finally{
        yield put(deleteQnaRoutine.fulfill())
    }

}

export function* deleteQnaWatcher(){
    yield takeLatest(deleteQnaRoutine.TRIGGER,deleteQna)
}


function* updateQna(action){

    try{

        yield put(updateQnaRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            accountId : values.accountId,
            postId : values.postId,
            expectedVersion : values.version
        }
    
        if(values.lessonId) updateParams.lessonId = values.lessonId
        if(values.content) updateParams.content = values.content
        if(values.status) updateParams.status = values.status
        if(values.updatedById) updateParams.updatedById = values.updatedById

        const response = yield API.graphql(graphqlOperation(mutations.updateQna,{input:updateParams}))

        yield put(updateQnaRoutine.success({data:response.data.updateQna}))

                    
    }catch(error){

        yield put(updateQnaRoutine.failure({error}))

    }finally{

        yield put(updateQnaRoutine.fulfill())

    }

}

export function* updateQnaWatcher(){
    yield takeLatest(updateQnaRoutine.TRIGGER,updateQna)
}