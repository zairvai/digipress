import {createLessonRoutine,updateLessonRoutine,getLessonRoutine,listLessonsRoutine,customListLessonsRoutine,deleteLessonRoutine} from '../routines/lesson'


export const createLesson = payload => ({
    type : createLessonRoutine.TRIGGER,
    payload
})

export const deleteLesson = payload => ({
    type : deleteLessonRoutine.TRIGGER,
    payload
})

export const getLesson = payload => ({
    type : getLessonRoutine.TRIGGER,
    payload
})

export const listLessons = payload => ({
    type : listLessonsRoutine.TRIGGER,
    payload
})

export const updateLesson = (payload) => ({
    type : updateLessonRoutine.TRIGGER,
    payload
})

//update list setelah create atau remove, methods: add, remove
export const updateList = (method,items,index) =>({
    type:customListLessonsRoutine.UPDATELIST,
    method,
    items,
    index
})