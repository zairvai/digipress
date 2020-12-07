import {
    createAccountRoutine,customCreateAccountRoutine,
    updateAccountRoutine,customUpdateAccountRoutine,
    deleteAccountRoutine,customDeleteAccountRoutine,
    getAccountRoutine,customGetAccountRoutine,
    listAccountsRoutine,customListAccountsRoutine
} from '../routines/account'


export const createAccount = payload => ({
    type : createAccountRoutine.TRIGGER,
    payload : payload
})

export const createAccountInit = () => ({
    type : customCreateAccountRoutine.INIT
})


export const updateAccount = (id,payload) => ({
    type : updateAccountRoutine.TRIGGER,
    id,
    payload
})
export const updateAccountInit = () => ({
    type : customUpdateAccountRoutine.INIT
})

export const deleteAccount = payload => ({
    type : deleteAccountRoutine.TRIGGER,
    payload
})

export const deleteAccountInit = () => ({
    type : customDeleteAccountRoutine.INIT
})


export const listAccounts = payload => ({
    type : listAccountsRoutine.TRIGGER,
    payload
})

export const getAccount = payload => ({
    type : getAccountRoutine.TRIGGER,
    payload
})

export const getAccountInit = () => ({
    type : customGetAccountRoutine.INIT
})


//update list setelah create atau remove
export const updateList = (method,items) => {
    
    // return new(dispatch,getState)=>{
    //     dispatch({
    //         type:customListAccountsRoutine.UPDATELIST,
    //         method,
    //         items
    //     })
    // }
    return (dispatch,getState)=>{
        
        dispatch({
            type:customListAccountsRoutine.UPDATELIST,
            method,
            items
        })

        return new Promise((resolve,reject)=>{
            if(getState().listAccounts.isSuccessFull) resolve(true)
            if(getState().listAccounts.isError) reject(getState().listAccounts.error)
        })
    }
    
}
