import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,delay} from 'redux-saga/effects'

import {
    createArticleRoutine,
    updateArticleRoutine,
    deleteArticleRoutine,
    getArticleRoutine,
    listArticlesRoutine
} from '../routines/article'

// create article
function* createArticle(action){

    try{

        yield put(createArticleRoutine.request())

        const {values} = action.payload 

        const inputParams = {
            accountId:values.accountId.trim(),
            title:values.title.trim(),
            categoryId:values.category.id,
            tags:values.tags,
            content:values.content,
            allowComment:values.allowComment,
            access:values.readAccess
        }

        const response = yield API.graphql(graphqlOperation(mutations.createArticle,{input:inputParams}))

        yield delay(2000)

        yield put(createArticleRoutine.success({data:response.data.createArticle}))


    }catch(error){
        yield put(createArticleRoutine.failure({error}))
    }finally{
        yield put(createArticleRoutine.fulfill())
    }

}

export function* createArticleWatcher(){
    yield takeLatest(createArticleRoutine.TRIGGER,createArticle)
}

function* listArticles(action){

    try{

        const {accountId,name,orderBy,direction,from,size} = action.payload

        const listParams={from,size}

        if(accountId) listParams.accountId = accountId
        if(name) listParams.name = name
        if(orderBy) {
            listParams.orderBy = orderBy
            listParams.direction = direction
        }

        console.log(listParams)

        yield put(listArticlesRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listArticles,{input:listParams}))

        yield put(listArticlesRoutine.success({data:response.data.listArticles}))

                    
    }catch(error){
        yield put(listArticlesRoutine.failure({error}))
    }finally{
        yield put(listArticlesRoutine.fulfill())
    }

}

export function* listArticlesWatcher(){
    yield takeLatest(listArticlesRoutine.TRIGGER,listArticles)
}

function* getArticle(action){

    try{

        yield put(getArticleRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(queries.getArticle,{input:{id}}))
        
        if(!response.data.getArticle) yield put(getArticleRoutine.failure({error:{code:404,message:"not found"}}))

        yield put(getArticleRoutine.success({data:response.data.getArticle}))
                    
    }catch(error){
        yield put(getArticleRoutine.failure({error}))
    }finally{
        yield put(getArticleRoutine.fulfill())
    }

}

export function* getArticleWatcher(){
    yield takeLatest(getArticleRoutine.TRIGGER,getArticle)
}

function* deleteArticle(action){

    try{

        yield put(deleteArticleRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(mutations.deleteArticle,{input:{id}}))

        yield put(deleteArticleRoutine.success({data:response.data.deleteArticle}))
                    
    }catch(error){
        yield put(deleteArticleRoutine.failure({error}))
    }finally{
        yield put(deleteArticleRoutine.fulfill())
    }

}

export function* deleteArticleWatcher(){
    yield takeLatest(deleteArticleRoutine.TRIGGER,deleteArticle)
}


function* updateArticle(action){

    
    try{
        console.log(action)

        yield put(updateArticleRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            expectedVersion : values.version
        }

        if(values.accountId) updateParams.accountId = values.accountId.trim()
        if(values.title) updateParams.title = values.title.trim()
        if(values.categoryId) updateParams.categoryId = values.categoryId.trim()
        if(values.tags) updateParams.tags = values.tags
        if(values.content) updateParams.content = values.content
        if(values.allowComment) updateParams.allowComment = values.allowComment
        if(values.access) updateParams.access = values.readAccess.trim()        

        const response = yield API.graphql(graphqlOperation(mutations.updateArticle,{input:updateParams}))

        yield put(updateArticleRoutine.success({data:response.data.updateArticle}))

                    
    }catch(error){

        yield put(updateArticleRoutine.failure({error}))

    }finally{

        yield put(updateArticleRoutine.fulfill())

    }

}

export function* updateArticleWatcher(){
    yield takeLatest(updateArticleRoutine.TRIGGER,updateArticle)
}