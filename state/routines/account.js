import {
    createRoutine,createRoutineCreator
} from 'redux-saga-routines'

//add account
var customRoutine = createRoutineCreator(["INIT","CANCEL"])
export const customCreateAccountRoutine = customRoutine("create_account_custom")
export const createAccountRoutine = createRoutine("create_account")

//delete account
export const deleteAccountRoutine = createRoutine("delete_account")

//update account
export const updateAccountRoutine = createRoutine("update_account")

//list accounts
export const listAccountsRoutine = createRoutine("list_accounts")

//get account
customRoutine = createRoutineCreator(["INIT"])
export const customGetAccountRoutine = customRoutine("get_account_custom")
export const getAccountRoutine = createRoutine("get_account")
