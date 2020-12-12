import {createTagRoutine,getTagRoutine,listTagsRoutine,customListTagsRoutine,deleteTagRoutine} from '../routines/tag'


export const createTag = payload => ({
    type : createTagRoutine.TRIGGER,
    payload
})

export const deleteTag = payload => ({
    type : deleteTagRoutine.TRIGGER,
    payload
})

export const getTag = payload => ({
    type : getTagRoutine.TRIGGER,
    payload
})

export const listTags = payload => ({
    type : listTagsRoutine.TRIGGER,
    payload
})

//update list setelah create atau remove, methods: add, remove
export const updateList = (method,items,index) =>({
    type:customListTagsRoutine.UPDATELIST,
    method,
    items,
    index
})