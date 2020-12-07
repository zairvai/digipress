import {
    createRoutine,createRoutineCreator
} from 'redux-saga-routines'

//add account
var customRoutine = createRoutineCreator(["INIT"])
export const customCreateAccountRoutine = customRoutine("create_account_custom")
export const createAccountRoutine = createRoutine("create_account")

//delete account
customRoutine = createRoutineCreator(["INIT"])
export const customDeleteAccountRoutine = customRoutine("delete_account_custom")
export const deleteAccountRoutine = createRoutine("delete_account")

//update account
customRoutine = createRoutineCreator(["INIT"])
export const customUpdateAccountRoutine = customRoutine("update_account_custom")
export const updateAccountRoutine = createRoutine("update_account")

//list accounts
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListAccountsRoutine = customRoutine("list_account_custom")
export const listAccountsRoutine = createRoutine("list_accounts")

//get account
customRoutine = createRoutineCreator(["INIT"])
export const customGetAccountRoutine = customRoutine("get_account_custom")
export const getAccountRoutine = createRoutine("get_account")
