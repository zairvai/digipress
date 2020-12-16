import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

var customRoutine = createRoutineCreator(["INIT"])

//add lesson
export const createLessonRoutine = createRoutine("create_lesson")
export const createLessonRoutinePromise = promisifyRoutine(createLessonRoutine)

//delete lesson
export const deleteLessonRoutine = createRoutine("delete_lesson")
export const deleteLessonRoutinePromise = promisifyRoutine(deleteLessonRoutine)

//update lesson
export const updateLessonRoutine = createRoutine("update_lesson")
export const updateLessonRoutinePromise = promisifyRoutine(updateLessonRoutine)

//list lesson
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListLessonsRoutine = customRoutine("list_lesson_custom")
export const listLessonsRoutine = createRoutine("list_lessons")
export const listLessonsRoutinePromise = promisifyRoutine(listLessonsRoutine)

//get lesson
export const getLessonRoutine = createRoutine("get_lesson")
export const getLessonRoutinePromise = promisifyRoutine(getLessonRoutine)