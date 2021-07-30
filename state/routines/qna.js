import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

var customRoutine = createRoutineCreator(["INIT"])

//add qna
export const createQnaRoutine = createRoutine("create_qna")
export const createQnaRoutinePromise = promisifyRoutine(createQnaRoutine)

//delete qna
export const deleteQnaRoutine = createRoutine("delete_qna")
export const deleteQnaRoutinePromise = promisifyRoutine(deleteQnaRoutine)

//update qna
export const updateQnaRoutine = createRoutine("update_qna")
export const updateQnaRoutinePromise = promisifyRoutine(updateQnaRoutine)

//list qna
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListQnasRoutine = customRoutine("list_qna_custom")
export const listPostQnasRoutine = createRoutine("list_post_qnas")
export const listPostQnasRoutinePromise = promisifyRoutine(listPostQnasRoutine)
export const listUserQnasRoutine = createRoutine("list_user_qnas")
export const listUserQnasRoutinePromise = promisifyRoutine(listUserQnasRoutine)

//get qna
export const getQnaRoutine = createRoutine("get_qna")
export const getQnaRoutinePromise = promisifyRoutine(getQnaRoutine)