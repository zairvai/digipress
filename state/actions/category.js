import {createCategoryRoutine,getCategoryRoutine,listCategoriesRoutine,customListCategoriesRoutine,deleteCategoryRoutine} from '../routines/category'


export const createCategory = payload => ({
    type : createCategoryRoutine.TRIGGER,
    payload
})

export const deleteCategory = payload => ({
    type : deleteCategoryRoutine.TRIGGER,
    payload
})

export const getCategory = payload => ({
    type : getCategoryRoutine.TRIGGER,
    payload
})

export const listCategories = payload => ({
    type : listCategoriesRoutine.TRIGGER,
    payload
})

//update list setelah create atau remove, methods: add, remove
export const updateList = (method,items,index) =>({
    type:customListCategoriesRoutine.UPDATELIST,
    method,
    items,
    index
})