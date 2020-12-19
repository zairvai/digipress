import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

var customRoutine = createRoutineCreator(["INIT"])

//list post
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListPostsRoutine = customRoutine("list_post_custom")
export const listPostsRoutine = createRoutine("list_posts")
export const listPostsRoutinePromise = promisifyRoutine(listPostsRoutine)

//get post
export const getPostRoutine = createRoutine("get_post")
export const getPostRoutinePromise = promisifyRoutine(getPostRoutine)