import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,delay} from 'redux-saga/effects'

import {
    createLessonRoutine,
    updateLessonRoutine,
    deleteLessonRoutine,
    getLessonRoutine,
    listLessonsRoutine
} from '../routines/lesson'

// create lesson
function* createLesson(action){

    try{

        yield put(createLessonRoutine.request())

        const {values} = action.payload

        const inputParams = {
            accountId:values.accountId.trim(),
            postId:values.postId.trim(),
            title:values.title.trim(),
            seq:values.seq,
            content:values.content
        }

        const response = yield API.graphql(graphqlOperation(mutations.createLesson,{input:inputParams}))

        yield delay(2000)

        yield put(createLessonRoutine.success({data:response.data.createLesson}))


    }catch(error){
        yield put(createLessonRoutine.failure({error}))
    }finally{
        yield put(createLessonRoutine.fulfill())
    }

}

export function* createLessonWatcher(){
    yield takeLatest(createLessonRoutine.TRIGGER,createLesson)
}

function* listLessons(action){

    try{

        const {accountId,postId,title,orderBy,direction,from,size,statuses} = action.payload

        const listParams={from,size}

        if(accountId) listParams.accountId = accountId
        if(postId) listParams.postId = postId
        if(title) listParams.name = title
        if(statuses) listParams.statuses = statuses
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }
       

        console.log(listParams)

        yield put(listLessonsRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listLessons,{input:listParams}))

        yield put(listLessonsRoutine.success({data:response.data.listLessons}))

                    
    }catch(error){
        yield put(listLessonsRoutine.failure({error}))
    }finally{
        yield put(listLessonsRoutine.fulfill())
    }

}

export function* listLessonsWatcher(){
    yield takeLatest(listLessonsRoutine.TRIGGER,listLessons)
}

function* getLesson(action){

    try{

        yield put(getLessonRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(queries.getLesson,{input:{id}}))
        
        if(!response.data.getLesson) yield put(getLessonRoutine.failure({error:{code:404,message:"not found"}}))

        yield put(getLessonRoutine.success({data:response.data.getLesson}))
                    
    }catch(error){
        yield put(getLessonRoutine.failure({error}))
    }finally{
        yield put(getLessonRoutine.fulfill())
    }

}

export function* getLessonWatcher(){
    yield takeLatest(getLessonRoutine.TRIGGER,getLesson)
}

function* deleteLesson(action){

    try{

        yield put(deleteLessonRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(mutations.deleteLesson,{input:{id}}))

        yield put(deleteLessonRoutine.success({data:response.data.deleteLesson}))
                    
    }catch(error){
        yield put(deleteLessonRoutine.failure({error}))
    }finally{
        yield put(deleteLessonRoutine.fulfill())
    }

}

export function* deleteLessonWatcher(){
    yield takeLatest(deleteLessonRoutine.TRIGGER,deleteLesson)
}


function* updateLesson(action){

    try{

        console.log(action)

        yield put(updateLessonRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            accountId : values.accountId.trim(),
            postId : values.postId.trim(),
            expectedVersion : values.version
        }

        if(values.title) updateParams.title = values.title.trim()
        if(values.content) updateParams.content = values.content
        if(values.seq) updateParams.seq = values.seq
        if(values.status) updateParams.status = values.status

        const response = yield API.graphql(graphqlOperation(mutations.updateLesson,{input:updateParams}))

        yield put(updateLessonRoutine.success({data:response.data.updateLesson}))

                    
    }catch(error){

        yield put(updateLessonRoutine.failure({error}))

    }finally{

        yield put(updateLessonRoutine.fulfill())

    }

}

export function* updateLessonWatcher(){
    yield takeLatest(updateLessonRoutine.TRIGGER,updateLesson)
}