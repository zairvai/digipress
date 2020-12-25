import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

var customRoutine = createRoutineCreator(["INIT"])

//add comment
export const createCommentRoutine = createRoutine("create_comment")
export const createCommentRoutinePromise = promisifyRoutine(createCommentRoutine)

//delete comment
export const deleteCommentRoutine = createRoutine("delete_comment")
export const deleteCommentRoutinePromise = promisifyRoutine(deleteCommentRoutine)

//update comment
export const updateCommentRoutine = createRoutine("update_comment")
export const updateCommentRoutinePromise = promisifyRoutine(updateCommentRoutine)

//list comment
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListCommentsRoutine = customRoutine("list_comment_custom")
export const listPostCommentsRoutine = createRoutine("list_post_comments")
export const listPostCommentsRoutinePromise = promisifyRoutine(listPostCommentsRoutine)
export const listUserCommentsRoutine = createRoutine("list_user_comments")
export const listUserCommentsRoutinePromise = promisifyRoutine(listUserCommentsRoutine)

//get comment
export const getCommentRoutine = createRoutine("get_comment")
export const getCommentRoutinePromise = promisifyRoutine(getCommentRoutine)