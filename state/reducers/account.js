import {
    createAccountRoutine,customCreateAccountRoutine,
    updateAccountRoutine,customUpdateAccountRoutine,
    deleteAccountRoutine,customDeleteAccountRoutine,
    getAccountRoutine,customGetAccountRoutine,getAccountByUniqueUrlRoutine,
    listAccountsRoutine,customListAccountsRoutine
} from '../routines/account'

const initialState = {
    error:false,
    isRequesting:false,
    isSuccessFull:false,
    isError:false
}

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

export const getAccountByUniqueUrl = (state={item:{},...initialState},action) => {

    switch(action.type){

        case getAccountByUniqueUrlRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case getAccountByUniqueUrlRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case getAccountByUniqueUrlRoutine.FAILURE : {

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

        case updateAccountRoutine.FULFILL : {

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