import {API,graphqlOperation} from 'aws-amplify'
import * as queries from 'Src/graphql/queries'
import {all,put,takeLatest,takeEvery} from 'redux-saga/effects'

import {
    getPostRoutine,
    listPostsRoutine
} from '../routines/post'

function* listPosts(action){

    try{

        const {ids,accountId,postTypes,name,orderBy,direction,from,size,statuses} = action.payload

        
        const listParams={from,size}
        
        if(ids) listParams.ids = ids
        if(accountId) listParams.accountId = accountId
        if(postTypes) listParams.postTypes = postTypes
        if(name) listParams.name = name
        if(statuses) listParams.statuses = statuses
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }

        yield put(listPostsRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listPosts,{input:listParams}))

        yield put(listPostsRoutine.success({data:response.data.listPosts}))
                    
    }catch(error){
        yield put(listPostsRoutine.failure({error}))
    }finally{
        yield put(listPostsRoutine.fulfill())
    }

}

// const listPostsActions = []
// function* listPostsExecute(action){
//     listPostsActions.push(action)
//     console.log(listPostsActions)
// } 

export function* listPostsWatcher(){
    yield takeEvery(listPostsRoutine.TRIGGER,listPosts)
}

function* getPost(action){

    try{

        yield put(getPostRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(queries.getPost,{input:{id}}))
        
        if(!response.data.getPost) yield put(getPostRoutine.failure({error:{code:404,message:"not found"}}))

        yield put(getPostRoutine.success({data:response.data.getPost}))
                    
    }catch(error){
        yield put(getPostRoutine.failure({error}))
    }finally{
        yield put(getPostRoutine.fulfill())
    }

}

export function* getPostWatcher(){
    yield takeLatest(getPostRoutine.TRIGGER,getPost)
}
