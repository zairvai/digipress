import {createCommentRoutine,updateCommentRoutine,getCommentRoutine,
    listPostCommentsRoutine,listUserCommentsRoutine,deleteCommentRoutine} from '../routines/comment'


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

export const listPostComments = payload => ({
    type : listPostCommentsRoutine.TRIGGER,
    payload
})

export const listUserComments = payload => ({
    type : listUserCommentsRoutine.TRIGGER,
    payload
})

export const updateComment = (payload) => ({
    type : updateCommentRoutine.TRIGGER,
    payload
})
