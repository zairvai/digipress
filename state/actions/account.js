import {
    createAccountRoutine,customCreateAccountRoutine,
    updateAccountRoutine,customUpdateAccountRoutine,
    deleteAccountRoutine,customDeleteAccountRoutine,
    getAccountRoutine,customGetAccountRoutine,
    getAccountByUniqueUrlRoutine,
    listAccountsRoutine,customListAccountsRoutine
} from '../routines/account'


export const createAccount = payload => ({
    type : createAccountRoutine.TRIGGER,
    payload : payload
})

export const createAccountInit = () => ({
    type : customCreateAccountRoutine.INIT
})


export const updateAccount = (payload) => ({
    type : updateAccountRoutine.TRIGGER,
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

export const getAccountByUniqueUrl = payload => ({
    type : getAccountByUniqueUrlRoutine.TRIGGER,
    payload
})