import {createQnaRoutine,updateQnaRoutine,getQnaRoutine,
    listPostQnasRoutine,listUserQnasRoutine,deleteQnaRoutine} from '../routines/qna'


export const createQna = payload => ({
    type : createQnaRoutine.TRIGGER,
    payload
})

export const deleteQna = payload => ({
    type : deleteQnaRoutine.TRIGGER,
    payload
})

export const getQna = payload => ({
    type : getQnaRoutine.TRIGGER,
    payload
})

export const listPostQnas = payload => ({
    type : listPostQnasRoutine.TRIGGER,
    payload
})

export const listUserQnas = payload => ({
    type : listUserQnasRoutine.TRIGGER,
    payload
})

export const updateQna = (payload) => ({
    type : updateQnaRoutine.TRIGGER,
    payload
})
