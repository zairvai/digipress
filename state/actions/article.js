import {createArticleRoutine,updateArticleRoutine,getArticleRoutine,listArticlesRoutine,customListArticlesRoutine,deleteArticleRoutine} from '../routines/article'


export const createArticle = payload => ({
    type : createArticleRoutine.TRIGGER,
    payload
})

export const deleteArticle = payload => ({
    type : deleteArticleRoutine.TRIGGER,
    payload
})

export const getArticle = payload => ({
    type : getArticleRoutine.TRIGGER,
    payload
})

export const listArticles = payload => ({
    type : listArticlesRoutine.TRIGGER,
    payload
})

export const updateArticle = (payload) => ({
    type : updateArticleRoutine.TRIGGER,
    payload
})


//update list setelah create atau remove, methods: add, remove
export const updateList = (method,items,index) =>({
    type:customListArticlesRoutine.UPDATELIST,
    method,
    items,
    index
})