import {createCommentRoutine,updateCommentRoutine,getCommentRoutine,listCommentsRoutine,customListCommentsRoutine,deleteCommentRoutine} from '../routines/comment'


export const createComment = payload => ({
    type : createCommentRoutine.TRIGGER,
    payload
})

export const deleteComment = payload => ({
    type : deleteCommentRoutine.TRIGGER,
    payload
})

export const getComment = payload => ({
    type : getCommentRoutine.TRIGGER,
    payload
})

export const listComments = payload => ({
    type : listCommentsRoutine.TRIGGER,
    payload
})

export const updateComment = (payload) => ({
    type : updateCommentRoutine.TRIGGER,
    payload
})

//update list setelah create atau remove, methods: add, remove
export const updateList = (method,items,index) =>({
    type:customListCommentsRoutine.UPDATELIST,
    method,
    items,
    index
})