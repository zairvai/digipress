import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

var customRoutine = createRoutineCreator(["INIT"])

//add tag
export const createTagRoutine = createRoutine("create_tag")
export const createTagRoutinePromise = promisifyRoutine(createTagRoutine)

//delete tag
export const deleteTagRoutine = createRoutine("delete_tag")
export const deleteTagRoutinePromise = promisifyRoutine(deleteTagRoutine)

//update tag
export const updateTagRoutine = createRoutine("update_tag")
export const updateTagRoutinePromise = promisifyRoutine(updateTagRoutine)

//list tag
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListTagsRoutine = customRoutine("list_tag_custom")
export const listTagsRoutine = createRoutine("list_tags")
export const listTagsRoutinePromise = promisifyRoutine(listTagsRoutine)

//get tag
export const getTagRoutine = createRoutine("get_tag")
export const getTagRoutinePromise = promisifyRoutine(getTagRoutine)