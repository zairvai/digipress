import {API,graphqlOperation} from 'aws-amplify'
import * as mutations from 'Src/graphql/mutations'
import * as queries from 'Src/graphql/queries'
import {put,takeLatest,call,delay} from 'redux-saga/effects'

import {
    createCategoryRoutine,
    updateCategoryRoutine,
    deleteCategoryRoutine,
    getCategoryRoutine,
    listCategoriesRoutine
} from '../routines/category'

// create category
function* createCategory(action){

    try{

        yield put(createCategoryRoutine.request())

        const {values} = action.payload

        const inputParams = {
            accountId:values.accountId.trim(),
            name : values.name.trim()
        }

        if(values.desc) inputParams.desc = values.desc.trim()

        if(values.createdById) inputParams.createdById = values.createdById
        if(values.updatedById) inputParams.updatedById = values.updatedById

        const response = yield API.graphql(graphqlOperation(mutations.createCategory,{input:inputParams}))

        yield delay(2000)
        
        yield put(createCategoryRoutine.success({data:response.data.createCategory}))


    }catch(error){
        yield put(createCategoryRoutine.failure({error}))
    }finally{
        yield put(createCategoryRoutine.fulfill())
    }

}

export function* createCategoryWatcher(){
    yield takeLatest(createCategoryRoutine.TRIGGER,createCategory)
}

function* listCategories(action){

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

        yield put(listCategoriesRoutine.request())
                
        const response = yield API.graphql(graphqlOperation(queries.listCategories,{input:listParams}))

        yield put(listCategoriesRoutine.success({data:response.data.listCategories}))

                    
    }catch(error){
        yield put(listCategoriesRoutine.failure({error}))
    }finally{
        yield put(listCategoriesRoutine.fulfill())
    }

}

export function* listCategoriesWatcher(){
    yield takeLatest(listCategoriesRoutine.TRIGGER,listCategories)
}

function* getCategory(action){

    try{

        yield put(getCategoryRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(queries.getCategory,{input:{id}}))
        
        if(!response.data.getCategory) yield put(getCategoryRoutine.failure({error:{code:404,message:"not found"}}))

        yield put(getCategoryRoutine.success({data:response.data.getCategory}))
                    
    }catch(error){
        yield put(getCategoryRoutine.failure({error}))
    }finally{
        yield put(getCategoryRoutine.fulfill())
    }

}

export function* getCategoryWatcher(){
    yield takeLatest(getCategoryRoutine.TRIGGER,getCategory)
}

function* deleteCategory(action){

    try{

        yield put(deleteCategoryRoutine.request())

        const {id} = action.payload
        
        const response = yield API.graphql(graphqlOperation(mutations.deleteCategory,{input:{id}}))

        yield put(deleteCategoryRoutine.success({data:response.data.deleteCategory}))
                    
    }catch(error){
        yield put(deleteCategoryRoutine.failure({error}))
    }finally{
        yield put(deleteCategoryRoutine.fulfill())
    }

}

export function* deleteCategoryWatcher(){
    yield takeLatest(deleteCategoryRoutine.TRIGGER,deleteCategory)
}


function* updateCategory(action){

    try{

        yield put(updateCategoryRoutine.request())

        const {values} = action.payload

        const updateParams = {
            id : values.id.replace(/\s/g,""),
            expectedVersion : values.version
        }

        if(values.name) updateParams.name = values.name.trim()
        if(values.desc) updateParams.desc = values.desc.trim()
        if(values.updatedById) updateParams.updatedById = values.updatedById

        const response = yield API.graphql(graphqlOperation(mutations.updateCategory,{input:updateParams}))

        yield put(updateCategoryRoutine.success({data:response.data.updateCategory}))

                    
    }catch(error){

        yield put(updateCategoryRoutine.failure({error}))

    }finally{

        yield put(updateCategoryRoutine.fulfill())

    }

}

export function* updateCategoryWatcher(){
    yield takeLatest(updateCategoryRoutine.TRIGGER,updateCategory)
}