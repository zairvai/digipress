import {createUserRoutine,getUserRoutine,listUsersRoutine,getUserByEmailRoutine} from '../routines/user'


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

export const getUserByEmail = payload => ({
    type : getUserByEmailRoutine.TRIGGER,
    payload
})