import {getPostRoutine,customListPostsRoutine,listPostsRoutine} from '../routines/post'


export const getPost = payload => ({
    type : getPostRoutine.TRIGGER,
    payload
})

export const listPosts = payload => ({
    type : listPostsRoutine.TRIGGER,
    payload
})
