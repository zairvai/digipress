import {
    createCommentRoutine,
    updateCommentRoutine,
    deleteCommentRoutine,
    getCommentRoutine,
    listPostCommentsRoutine,
    listUserCommentsRoutine,
    customListCommentsRoutine
} from '../routines/comment'

const initialState = {
    error:false,
    isRequesting:false,
    isSuccessFull:false,
    isError:false
}


export const createComment = (state={item:{},...initialState},action) => {

    switch(action.type){

        case createCommentRoutine.REQUEST  : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })

        }
        case createCommentRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }
        case createCommentRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }
        case createCommentRoutine.FULFILL : {

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

export const getComment = (state={item:{},...initialState},action) => {

    switch(action.type){

        case getCommentRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case getCommentRoutine.SUCCESS : {

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

        case getCommentRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }

        case getCommentRoutine.FULFILL : {

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

export const listPostComments = (state={list:[],...initialState},action) => {

    switch(action.type){

        case listPostCommentsRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                list:state.list
            })
        }

        case listPostCommentsRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                list:data
            })     

        }

        case listPostCommentsRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                list:[]
            })
        }

        case listPostCommentsRoutine.FULFILL : {

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

export const listUserComments = (state={list:[],...initialState},action) => {

    switch(action.type){

        case listUserCommentsRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                list:state.list
            })
        }

        case listUserCommentsRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                list:data
            })     

        }

        case listUserCommentsRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                list:[]
            })
        }

        case listUserCommentsRoutine.FULFILL : {

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


export const updateComment = (state={item:{},...initialState},action) => {

    switch(action.type){


        case updateCommentRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case updateCommentRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case updateCommentRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }

        case updateCommentRoutine.FULFILL : {

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

export const deleteComment = (state={item:{},...initialState},action) => {

    switch(action.type){

        case deleteCommentRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case deleteCommentRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case deleteCommentRoutine.FAILURE : {

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