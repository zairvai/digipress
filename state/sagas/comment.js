import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,delay} from 'redux-saga/effects'

import {
    createCommentRoutine,
    updateCommentRoutine,
    deleteCommentRoutine,
    getCommentRoutine,
    listCommentsRoutine
} from '../routines/comment'

// create comment
function* createComment(action){

    try{

        yield put(createCommentRoutine.request())

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

        const response = yield API.graphql(graphqlOperation(mutations.createComment,{input:inputParams}))

        yield delay(2000)

        yield put(createCommentRoutine.success({data:response.data.createComment}))


    }catch(error){
        yield put(createCommentRoutine.failure({error}))
    }finally{
        yield put(createCommentRoutine.fulfill())
    }

}

export function* createCommentWatcher(){
    yield takeLatest(createCommentRoutine.TRIGGER,createComment)
}

function* listComments(action){

    try{

        const {accountId,articleId,name,orderBy,direction,from,size,statuses} = action.payload

        const listParams={from,size}

        if(accountId) listParams.accountId = accountId
        if(articleId) listParams.articleId = articleId
        if(name) listParams.name = name
        if(statuses) listParams.statuses = statuses
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }

        console.log(listParams)

        yield put(listCommentsRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listComments,{input:listParams}))

        yield put(listCommentsRoutine.success({data:response.data.listComments}))

                    
    }catch(error){
        yield put(listCommentsRoutine.failure({error}))
    }finally{
        yield put(listCommentsRoutine.fulfill())
    }

}

export function* listCommentsWatcher(){
    yield takeLatest(listCommentsRoutine.TRIGGER,listComments)
}

function* getComment(action){

    try{

        yield put(getCommentRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(queries.getComment,{input:{id}}))
        
        if(!response.data.getComment) yield put(getCommentRoutine.failure({error:{code:404,message:"not found"}}))

        yield put(getCommentRoutine.success({data:response.data.getComment}))
                    
    }catch(error){
        yield put(getCommentRoutine.failure({error}))
    }finally{
        yield put(getCommentRoutine.fulfill())
    }

}

export function* getCommentWatcher(){
    yield takeLatest(getCommentRoutine.TRIGGER,getComment)
}

function* deleteComment(action){

    try{

        yield put(deleteCommentRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(mutations.deleteComment,{input:{id}}))

        yield put(deleteCommentRoutine.success({data:response.data.deleteComment}))
                    
    }catch(error){
        yield put(deleteCommentRoutine.failure({error}))
    }finally{
        yield put(deleteCommentRoutine.fulfill())
    }

}

export function* deleteCommentWatcher(){
    yield takeLatest(deleteCommentRoutine.TRIGGER,deleteComment)
}


function* updateComment(action){

    try{

        console.log(action)

        yield put(updateCommentRoutine.request())

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

        
        const response = yield API.graphql(graphqlOperation(mutations.updateComment,{input:updateParams}))

        yield put(updateCommentRoutine.success({data:response.data.updateComment}))

                    
    }catch(error){

        yield put(updateCommentRoutine.failure({error}))

    }finally{

        yield put(updateCommentRoutine.fulfill())

    }

}

export function* updateCommentWatcher(){
    yield takeLatest(updateCommentRoutine.TRIGGER,updateComment)
}