import {
    createRoutine,promisifyRoutine,createRoutineCreator
} from 'redux-saga-routines'

const customRoutine = createRoutineCreator(["RESET","PROGRESS"])
export const customPutRoutine = customRoutine("custom_put_object")
export const putRoutine = createRoutine("put_object")
export const putRoutinePromise = promisifyRoutine(putRoutine)

export const customGetRoutine = customRoutine("custom_get_object")
export const getRoutine = createRoutine("get_object")
export const getRoutinePromise = promisifyRoutine(getRoutine)

export const customListRoutine = customRoutine("custom_list_object")
export const listRoutine = createRoutine("list_object")
export const listRoutinePromise = promisifyRoutine(listRoutine)

export const removeRoutine = createRoutine("remove_object")
export const removeRoutinePromise = promisifyRoutine(removeRoutine)
