import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

var customRoutine = createRoutineCreator(["INIT"])

//add article
export const createArticleRoutine = createRoutine("create_article")
export const createArticleRoutinePromise = promisifyRoutine(createArticleRoutine)

//delete article
export const deleteArticleRoutine = createRoutine("delete_article")
export const deleteArticleRoutinePromise = promisifyRoutine(deleteArticleRoutine)

//update article
export const updateArticleRoutine = createRoutine("update_article")
export const updateArticleRoutinePromise = promisifyRoutine(updateArticleRoutine)

//list article
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListArticlesRoutine = customRoutine("list_article_custom")
export const listArticlesRoutine = createRoutine("list_articles")
export const listArticlesRoutinePromise = promisifyRoutine(listArticlesRoutine)

//get article
export const getArticleRoutine = createRoutine("get_article")
export const getArticleRoutinePromise = promisifyRoutine(getArticleRoutine)