import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

//add account
var customRoutine = createRoutineCreator(["INIT"])
export const customCreateAccountRoutine = customRoutine("create_account_custom")
export const createAccountRoutine = createRoutine("create_account")
export const createAccountRoutinePromise = promisifyRoutine(createAccountRoutine)

//delete account
customRoutine = createRoutineCreator(["INIT"])
export const customDeleteAccountRoutine = customRoutine("delete_account_custom")
export const deleteAccountRoutine = createRoutine("delete_account")
export const deleteAccountRoutinePromise = promisifyRoutine(deleteAccountRoutine)

//update account
customRoutine = createRoutineCreator(["INIT"])
export const customUpdateAccountRoutine = customRoutine("update_account_custom")
export const updateAccountRoutine = createRoutine("update_account")
export const updateAccountRoutinePromise = promisifyRoutine(updateAccountRoutine)
//list accounts
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListAccountsRoutine = customRoutine("list_account_custom")
export const listAccountsRoutine = createRoutine("list_accounts")

//get account
customRoutine = createRoutineCreator(["INIT"])
export const customGetAccountRoutine = customRoutine("get_account_custom")
export const getAccountRoutine = createRoutine("get_account")
export const getAccountRoutinePromise = promisifyRoutine(getAccountRoutine)


customRoutine = createRoutineCreator(["INIT"])
export const customGetAccountByUniqueUrlRoutine = customRoutine("get_account_byuniqueurl_custom")
export const getAccountByUniqueUrlRoutine = createRoutine("get_account_byuniqueurl")
export const getAccountByUniqueUrlRoutinePromise = promisifyRoutine(getAccountByUniqueUrlRoutine)
