import {putRoutine,getRoutine,listRoutine,removeRoutine,customPutRoutine,customGetRoutine,customListRoutine} from '../routines/storage'

export const putObject = payload => ({
    type:putRoutine.TRIGGER,
    payload
})

export const getObject = payload =>({
    type:getRoutine.TRIGGER,
    payload
})

export const listObject = payload =>({
    type:listRoutine.TRIGGER,
    payload
})

export const removeObject = payload =>({
    type:removeRoutine.TRIGGER,
    payload
})

export const putResetObject = () =>({
    type: customPutRoutine.RESET
})

export const getResetObject = () =>({
    type: customGetRoutine.RESET
})

export const listResetObject = () =>({
    type: customListRoutine.RESET
})