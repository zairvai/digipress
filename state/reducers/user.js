import {
    createUserRoutine,
    updateUserRoutine,
    deleteUserRoutine,
    getUserRoutine,
    listUsersRoutine,
    customListUsersRoutine
} from '../routines/user'

const initialState = {
    error:false,
    isRequesting:false,
    isSuccessFull:false,
    isError:false
}


export const createUser = (state={item:{},...initialState},action) => {

    switch(action.type){

        case createUserRoutine.REQUEST  : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })

        }
        case createUserRoutine.SUCCESS : {

            const {data} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }
        case createUserRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }
        case createUserRoutine.FULFILL : {

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

export const getUser = (state={item:{},...initialState},action) => {

    switch(action.type){

        case getUserRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case getUserRoutine.SUCCESS : {

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

        case getUserRoutine.FAILURE : {

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

export const listUsers = (state={list:[],...initialState},action) => {

    switch(action.type){

        case listUsersRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                list:[]
            })
        }

        case listUsersRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                list:data
            })     

        }

        case listUsersRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                list:[]
            })
        }

        case listUsersRoutine.FULFILL : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false
            })
        }

        case customListUsersRoutine.UPDATELIST : {

            const {method,items}  = action
            
            if(method==="add") state.list.items.unshift(items)
            else if(method==="remove"){
                items.forEach(item=>{
                    const index = state.list.items.findIndex((itemList) => itemList.id === item.id)
                    state.list.items.splice(index,1)
                })
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