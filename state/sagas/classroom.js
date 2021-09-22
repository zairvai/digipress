import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,delay} from 'redux-saga/effects'

import {
    createClassroomRoutine,
    updateClassroomRoutine,
    deleteClassroomRoutine,
    getClassroomRoutine,
    listClassroomsRoutine
} from '../routines/classroom'

// create classroom
function* createClassroom(action){

    try{

        yield put(createClassroomRoutine.request())

        const {values} = action.payload

        const inputParams = {
            accountId:values.accountId.trim(),
            title:values.title.trim(),
            content:values.content,
            // allowComment:values.allowComment,
            access:values.readAccess
        }

        if(values.categoryId) inputParams.categoryId = values.categoryId
        if(values.tags) inputParams.tags = values.tags

        if(values.createdById) inputParams.createdById = values.createdById
        if(values.updatedById) inputParams.updatedById = values.updatedById


        const response = yield API.graphql(graphqlOperation(mutations.createClassroom,{input:inputParams}))

        yield delay(2000)

        yield put(createClassroomRoutine.success({data:response.data.createClassroom}))


    }catch(error){
        yield put(createClassroomRoutine.failure({error}))
    }finally{
        yield put(createClassroomRoutine.fulfill())
    }

}

export function* createClassroomWatcher(){
    yield takeLatest(createClassroomRoutine.TRIGGER,createClassroom)
}

function* listClassrooms(action){

    try{

        const {ids,accountId,name,orderBy,direction,from,size,statuses} = action.payload

        const listParams={from,size}

        if(ids) listParams.ids = ids
        if(accountId) listParams.accountId = accountId
        if(name) listParams.name = name
        if(statuses) listParams.statuses = statuses
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }

        yield put(listClassroomsRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listClassrooms,{input:listParams}))

        yield put(listClassroomsRoutine.success({data:response.data.listClassrooms}))

                    
    }catch(error){
        yield put(listClassroomsRoutine.failure({error}))
    }finally{
        yield put(listClassroomsRoutine.fulfill())
    }

}

export function* listClassroomsWatcher(){
    yield takeLatest(listClassroomsRoutine.TRIGGER,listClassrooms)
}

function* getClassroom(action){

    try{

        yield put(getClassroomRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(queries.getClassroom,{input:{id}}))
        
        if(!response.data.getClassroom) yield put(getClassroomRoutine.failure({error:{code:404,message:"not found"}}))

        yield put(getClassroomRoutine.success({data:response.data.getClassroom}))
                    
    }catch(error){
        yield put(getClassroomRoutine.failure({error}))
    }finally{
        yield put(getClassroomRoutine.fulfill())
    }

}

export function* getClassroomWatcher(){
    yield takeLatest(getClassroomRoutine.TRIGGER,getClassroom)
}

function* deleteClassroom(action){

    try{

        yield put(deleteClassroomRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(mutations.deleteClassroom,{input:{id}}))

        yield put(deleteClassroomRoutine.success({data:response.data.deleteClassroom}))
                    
    }catch(error){
        yield put(deleteClassroomRoutine.failure({error}))
    }finally{
        yield put(deleteClassroomRoutine.fulfill())
    }

}

export function* deleteClassroomWatcher(){
    yield takeLatest(deleteClassroomRoutine.TRIGGER,deleteClassroom)
}


function* updateClassroom(action){

    try{

        // console.log(action)

        yield put(updateClassroomRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            accountId: values.accountId.trim(),
            expectedVersion : values.version
        }

        if(values.title) updateParams.title = values.title.trim()
        if(values.categoryId) updateParams.categoryId = values.categoryId.trim()
        if(values.tags) updateParams.tags = values.tags
        if(values.content) updateParams.content = values.content
        if(values.access) updateParams.access = values.readAccess.trim()   
        if(values.status) updateParams.status = values.status
        if(values.updatedById) updateParams.updatedById = values.updatedById
        
        const response = yield API.graphql(graphqlOperation(mutations.updateClassroom,{input:updateParams}))

        yield put(updateClassroomRoutine.success({data:response.data.updateClassroom}))

                    
    }catch(error){

        yield put(updateClassroomRoutine.failure({error}))

    }finally{

        yield put(updateClassroomRoutine.fulfill())

    }

}

export function* updateClassroomWatcher(){
    yield takeLatest(updateClassroomRoutine.TRIGGER,updateClassroom)
}