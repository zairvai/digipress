import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

var customRoutine = createRoutineCreator(["INIT"])

//add user
export const createUserRoutine = createRoutine("create_user")
export const createUserRoutinePromise = promisifyRoutine(createUserRoutine)

//delete user
export const deleteUserRoutine = createRoutine("delete_user")
export const deleteUserRoutinePromise = promisifyRoutine(deleteUserRoutine)

//update user
export const updateUserRoutine = createRoutine("update_user")
export const updateUserRoutinePromise = promisifyRoutine(updateUserRoutine)

//list user
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListUsersRoutine = customRoutine("list_user_custom")
export const listUsersRoutine = createRoutine("list_users")
export const listUsersRoutinePromise = promisifyRoutine(listUsersRoutine)

//get user
export const getUserRoutine = createRoutine("get_user")
export const getUserRoutinePromise = promisifyRoutine(getUserRoutine)

export const getUserByEmailRoutine = createRoutine("get_user_by_email")
export const getUserByEmailRoutinePromise = promisifyRoutine(getUserByEmailRoutine)
