import {
    createAccountRoutine,customCreateAccountRoutine,
    updateAccountRoutine,customUpdateAccountRoutine,
    deleteAccountRoutine,customDeleteAccountRoutine,
    getAccountRoutine,customGetAccountRoutine,
    listAccountsRoutine,customListAccountsRoutine
} from '../routines/account'

const initialState = {
    error:false,
    isRequesting:false,
    isSuccessFull:false,
    isError:false
}

//signin
export const createAccount = (state={item:{},...initialState},action) => {

    switch(action.type){

        case customCreateAccountRoutine.INIT  : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })

        }

        case createAccountRoutine.REQUEST  : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })

        }
        case createAccountRoutine.SUCCESS : {

            const {data} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }
        case createAccountRoutine.FAILURE : {

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

export const listAccounts = (state={list:[],...initialState},action) => {

    switch(action.type){

        case listAccountsRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                list:[]
            })
        }

        case listAccountsRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                list:data
            })     

        }

        case listAccountsRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                list:[]
            })
        }

        case customListAccountsRoutine.UPDATELIST : {

            const {method,items}  = action
            // console.log(method)
            // console.log(items)
            
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

export const getAccount = (state={item:{},...initialState},action) => {

    switch(action.type){

        case customGetAccountRoutine.INIT : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case getAccountRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case getAccountRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case getAccountRoutine.FAILURE : {

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

export const updateAccount = (state={item:{},...initialState},action) => {

    switch(action.type){

        case customUpdateAccountRoutine.INIT : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case updateAccountRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case updateAccountRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case updateAccountRoutine.FAILURE : {

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


export const deleteAccount = (state={item:{},...initialState},action) => {

    switch(action.type){

        case customDeleteAccountRoutine.INIT : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case deleteAccountRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case deleteAccountRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case deleteAccountRoutine.FAILURE : {

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