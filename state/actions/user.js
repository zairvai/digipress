import {getUserRoutine} from '../routines/user'

export const getUser = payload => ({
    type : getUserRoutine.TRIGGER,
    payload
})

