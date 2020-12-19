import {getPostRoutine,customListPostsRoutine,listPostsRoutine} from '../routines/post'


export const getPost = payload => ({
    type : getPostRoutine.TRIGGER,
    payload
})

export const listPosts = payload => ({
    type : listPostsRoutine.TRIGGER,
    payload
})

//update list setelah create atau remove, methods: add, remove
export const updateList = (method,items,index) =>({
    type:customListPostsRoutine.UPDATELIST,
    method,
    items,
    index
})