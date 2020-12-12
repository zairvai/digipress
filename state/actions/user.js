import {createUserRoutine,getUserRoutine,listUsersRoutine,customListUsersRoutine} from '../routines/user'


export const createUser = payload => ({
    type : createUserRoutine.TRIGGER,
    payload
})

export const getUser = payload => ({
    type : getUserRoutine.TRIGGER,
    payload
})

export const listUsers = payload => ({
    type : listUsersRoutine.TRIGGER,
    payload
})

//update list setelah create atau remove, methods: add, remove
export const updateList = (method,items,index) =>({
    type:customListUsersRoutine.UPDATELIST,
    method,
    items,
    index
})