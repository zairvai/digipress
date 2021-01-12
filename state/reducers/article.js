import {
    createArticleRoutine,
    updateArticleRoutine,
    deleteArticleRoutine,
    getArticleRoutine,
    listArticlesRoutine,
    customListArticlesRoutine
} from '../routines/article'

const initialState = {
    error:false,
    isRequesting:false,
    isSuccessFull:false,
    isError:false
}


export const createArticle = (state={item:{},...initialState},action) => {

    switch(action.type){

        case createArticleRoutine.REQUEST  : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })

        }
        case createArticleRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }
        case createArticleRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }
        // case createArticleRoutine.FULFILL : {

        //     return Object.assign({},state,{
        //         isRequesting:false,
        //         isSuccessFull:false,
        //         isError:false,
        //         error:false
        //     })
        // }
    }

    return state
}

export const getArticle = (state={item:{},...initialState},action) => {

    switch(action.type){

        case getArticleRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case getArticleRoutine.SUCCESS : {

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

        case getArticleRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }

        // case getArticleRoutine.FULFILL : {

        //     return Object.assign({},state,{
        //         isRequesting:false,
        //         error:false,
        //         isError:false,
        //         isSuccessFull:false
        //     })
        // }

    }

    return state
}

export const listArticles = (state={list:[],...initialState},action) => {

    switch(action.type){

        case listArticlesRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                list:state.list
            })
        }

        case listArticlesRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                list:data
            })     

        }

        case listArticlesRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                list:[]
            })
        }

        // case listArticlesRoutine.FULFILL : {

        //     return Object.assign({},state,{
        //         isRequesting:false,
        //         error:false,
        //         isError:false,
        //         isSuccessFull:false
        //     })
        // }

    }

    return state
}


export const updateArticle = (state={item:{},...initialState},action) => {

    switch(action.type){


        case updateArticleRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case updateArticleRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case updateArticleRoutine.FAILURE : {

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

export const deleteArticle = (state={item:{},...initialState},action) => {

    switch(action.type){

        case deleteArticleRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case deleteArticleRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case deleteArticleRoutine.FAILURE : {

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