import {
    createCategoryRoutine,
    updateCategoryRoutine,
    deleteCategoryRoutine,
    getCategoryRoutine,
    listCategoriesRoutine,
    customListCategoriesRoutine
} from '../routines/category'

const initialState = {
    error:false,
    isRequesting:false,
    isSuccessFull:false,
    isError:false
}

export const createCategory = (state={item:{},...initialState},action) => {

    switch(action.type){

        case createCategoryRoutine.REQUEST  : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })

        }
        case createCategoryRoutine.SUCCESS : {

            const {data} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }
        case createCategoryRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }
        case createCategoryRoutine.FULFILL : {

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:false,
                error:false
            })
        }
    }

    return state
}

export const getCategory = (state={item:{},...initialState},action) => {

    switch(action.type){

        case getCategoryRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case getCategoryRoutine.SUCCESS : {

            const {data} = action.payload
            // data["roles"] = JSON.parse(data["roles"])
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case getCategoryRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }

        case getCategoryRoutine.FULFILL : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false
            })
        }

    }

    return state
}

export const listCategories = (state={list:[],...initialState},action) => {

    switch(action.type){

        case listCategoriesRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                list:state.list
            })
        }

        case listCategoriesRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                list:data
            })     

        }

        case listCategoriesRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                list:[]
            })
        }

        case listCategoriesRoutine.FULFILL : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false
            })
        }

        case customListCategoriesRoutine.UPDATELIST : {

            const {method,items,index}  = action
            
            if(method==="add") state.list.items.unshift(items)
            else if(method==="remove"){
                //hapus items dari index sepanjang items.length
                state.list.items.splice(index,items.length)
            }
            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:true,
                isError:false,
                error:false
            })

        }

    }

    return state
}


export const updateCategory = (state={item:{},...initialState},action) => {

    switch(action.type){


        case updateCategoryRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case updateCategoryRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case updateCategoryRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }

        case updateCategoryRoutine.FULFILL : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false
            })
        }

    }

    return state
}

export const deleteCategory = (state={item:{},...initialState},action) => {

    switch(action.type){

        case deleteCategoryRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case deleteCategoryRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case deleteCategoryRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }

    }

    return state
}