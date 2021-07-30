import {
    createRoutine,createRoutineCreator,promisifyRoutine
} from 'redux-saga-routines'

var customRoutine = createRoutineCreator(["INIT"])

//add category
export const createCategoryRoutine = createRoutine("create_category")
export const createCategoryRoutinePromise = promisifyRoutine(createCategoryRoutine)

//delete category
export const deleteCategoryRoutine = createRoutine("delete_category")
export const deleteCategoryRoutinePromise = promisifyRoutine(deleteCategoryRoutine)

//update category
export const updateCategoryRoutine = createRoutine("update_category")
export const updateCategoryRoutinePromise = promisifyRoutine(updateCategoryRoutine)

//list category
customRoutine = createRoutineCreator(["INIT","UPDATELIST"])
export const customListCategoriesRoutine = customRoutine("list_category_custom")
export const listCategoriesRoutine = createRoutine("list_categories")
export const listCategoriesRoutinePromise = promisifyRoutine(listCategoriesRoutine)

//get category
export const getCategoryRoutine = createRoutine("get_category")
export const getCategoryRoutinePromise = promisifyRoutine(getCategoryRoutine)