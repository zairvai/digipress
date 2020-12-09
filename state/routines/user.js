import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

//add user
export const createUserRoutine = createRoutine("create_user")
export const createUserRoutinePromise = promisifyRoutine(createUserRoutine)

//delete user
export const deleteUserRoutine = createRoutine("delete_user")
export const deleteUserRoutinePromise = promisifyRoutine(deleteUserRoutine)

//update user
export const updateUserRoutine = createRoutine("update_user")
export const updateUserRoutinePromise = promisifyRoutine(updateUserRoutine)

//list usert
export const listUsersRoutine = createRoutine("list_users")
export const listUserRoutinePromise = promisifyRoutine(listUsersRoutine)

//get user
export const getUserRoutine = createRoutine("get_user")
export const getUserRoutinePromise = promisifyRoutine(getUserRoutine)