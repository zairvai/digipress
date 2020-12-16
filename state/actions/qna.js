import {createQnaRoutine,getQnaRoutine,updateQnaRoutine,listQnasRoutine,customListQnasRoutine,deleteQnaRoutine} from '../routines/qna'


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

export const listQnas = payload => ({
    type : listQnasRoutine.TRIGGER,
    payload
})

export const updateQna = (payload) => ({
    type : updateQnaRoutine.TRIGGER,
    payload
})


//update list setelah create atau remove, methods: add, remove
export const updateList = (method,items,index) =>({
    type:customListQnasRoutine.UPDATELIST,
    method,
    items,
    index
})