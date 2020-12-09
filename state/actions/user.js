import {createUserRoutine,getUserRoutine} from '../routines/user'


export const createUser = payload => ({
    type : createUserRoutine.TRIGGER,
    payload
})

export const getUser = payload => ({
    type : getUserRoutine.TRIGGER,
    payload
})

