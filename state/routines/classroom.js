import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

var customRoutine = createRoutineCreator(["INIT"])

//add classroom
export const createClassroomRoutine = createRoutine("create_classroom")
export const createClassroomRoutinePromise = promisifyRoutine(createClassroomRoutine)

//delete classroom
export const deleteClassroomRoutine = createRoutine("delete_classroom")
export const deleteClassroomRoutinePromise = promisifyRoutine(deleteClassroomRoutine)

//update classroom
export const updateClassroomRoutine = createRoutine("update_classroom")
export const updateClassroomRoutinePromise = promisifyRoutine(updateClassroomRoutine)

//list classroom
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListClassroomsRoutine = customRoutine("list_classroom_custom")
export const listClassroomsRoutine = createRoutine("list_classrooms")
export const listClassroomsRoutinePromise = promisifyRoutine(listClassroomsRoutine)

//get classroom
export const getClassroomRoutine = createRoutine("get_classroom")
export const getClassroomRoutinePromise = promisifyRoutine(getClassroomRoutine)