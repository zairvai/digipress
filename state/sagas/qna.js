import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,delay} from 'redux-saga/effects'

import {
    createQnaRoutine,
    updateQnaRoutine,
    deleteQnaRoutine,
    getQnaRoutine,
    listQnasRoutine
} from '../routines/qna'

// create qna
function* createQna(action){

    try{

        yield put(createQnaRoutine.request())

        const {values} = action.payload

        const inputParams = {
            accountId:values.accountId.trim(),
            title:values.title.trim(),
            categoryId:values.categoryId.trim(),
            tags:values.tags,
            content:values.content,
            allowComment:values.allowComment,
            access:values.readAccess
        }

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

function* listQnas(action){

    try{

        const {accountId,classroomId,lessonId,name,orderBy,direction,from,size,statuses} = action.payload

        const listParams={from,size}

        if(accountId) listParams.accountId = accountId
        if(classroomId) listParams.classroomId = classroomId
        if(lessonId) listParams.lessonId = lessonId
        if(statuses) listParams.statuses = statuses
        if(name) listParams.name = name
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }

        console.log(listParams)

        yield put(listQnasRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listQnas,{input:listParams}))

        yield put(listQnasRoutine.success({data:response.data.listQnas}))

                    
    }catch(error){
        yield put(listQnasRoutine.failure({error}))
    }finally{
        yield put(listQnasRoutine.fulfill())
    }

}

export function* listQnasWatcher(){
    yield takeLatest(listQnasRoutine.TRIGGER,listQnas)
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

        console.log(action)

        yield put(updateQnaRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            expectedVersion : values.version
        }

        if(accountId) inputParams.accountId = values.accountId.trim()
        if(title) inputParams.title = values.title.trim()
        if(categoryId) inputParams.categoryId = values.categoryId.trim()
        if(tags) inputParams.tags = values.tags
        if(content) inputParams.content = values.content
        if(allowComment) inputParams.allowComment = values.allowComment
        if(access) inputParams.readAccess = values.readAccess.trim()
        if(values.status) updateParams.status = values.status
        
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