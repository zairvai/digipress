import {
    createAccountRoutine,customCreateAccountRoutine,
    updateAccountRoutine,
    deleteAccountRoutine,
    getAccountRoutine,customGetAccountRoutine,
    listAccountsRoutine
} from '../routines/account'

const initialState = {
    error:false,
    isRequesting:false,
    isSuccessFull:false,
    isError:false
}

//signin
export const createAccount = (state={...initialState},action) => {

    switch(action.type){

        case createAccountRoutine.REQUEST  : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false
            })

        }
        case createAccountRoutine.SUCCESS : {

            const {data} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                data
            })     

        }
        case createAccountRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error
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
            
            console.log(data)
            
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