import {createClassroomRoutine,updateClassroomRoutine,getClassroomRoutine,listClassroomsRoutine,customListClassroomsRoutine,deleteClassroomRoutine} from '../routines/classroom'


export const createClassroom = payload => ({
    type : createClassroomRoutine.TRIGGER,
    payload
})

export const deleteClassroom = payload => ({
    type : deleteClassroomRoutine.TRIGGER,
    payload
})

export const getClassroom = payload => ({
    type : getClassroomRoutine.TRIGGER,
    payload
})

export const listClassrooms = payload => ({
    type : listClassroomsRoutine.TRIGGER,
    payload
})

export const updateClassroom = (payload) => ({
    type : updateClassroomRoutine.TRIGGER,
    payload
})


//update list setelah create atau remove, methods: add, remove
export const updateList = (method,items,index) =>({
    type:customListClassroomsRoutine.UPDATELIST,
    method,
    items,
    index
})