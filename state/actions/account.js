import {
    createAccountRoutine,customCreateAccountRoutine,
    updateAccountRoutine,customUpdateAccountRoutine,
    deleteAccountRoutine,
    getAccountRoutine,customGetAccountRoutine,
    listAccountsRoutine
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
