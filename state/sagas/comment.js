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
            postId:values.postId.trim(),
            content:values.content.trim()
        }

        if(values.replyToId) {
            inputParams.replyToId = values.replyToId
            inputParams.isReply = true
        }
        if(values.replyToUserId) {
            inputParams.replyToUserId = values.replyToUserId
            inputParams.isReply = true
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

        const {accountId,postId,replyToId,replyToUserId,orderBy,direction,maxDate,from,size,statuses} = action.payload

        const listParams={size}

        if(accountId) listParams.accountId = accountId
        if(postId) listParams.postId = postId
        if(statuses) listParams.statuses = statuses
        if(replyToId) listParams.replyToId = replyToId
        if(replyToUserId) listParams.replyToUserId = replyToUserId
        if(maxDate) listParams.maxDate = maxDate
        if(from) listParams.from = from
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

        yield put(updateCommentRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            accountId : values.accountId,
            postId : values.postId,
            expectedVersion : values.version
        }
    
        if(values.content) updateParams.content = values.content
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