import { routinePromiseWatcherSaga } from 'redux-saga-routines';
import {signInWatcher, signOutWatcher,completeNewPasswordWatcher,forgotPasswordWatcher,resetPasswordWatcher,getAuthUserWatcher,verifyEmailWatcher,verifySubmitCodeWatcher} from './auth'
import {createAccountWatcher,listAccountsWatcher,getAccountWatcher, updateAccountWatcher,deleteAccountWatcher,getAccountByUniqueUrlWatcher} from './account'
import {createUserWatcher,getUserWatcher,listUsersWatcher,updateUserWatcher,getUserByEmailWatcher} from "./user"
import {listTagsWatcher,deleteTagWatcher,createTagWatcher} from './tag'
import {listCategoriesWatcher,deleteCategoryWatcher,createCategoryWatcher,updateCategoryWatcher,getCategoryWatcher} from './category'

import {getPostWatcher,listPostsWatcher} from './post'
import {createArticleWatcher,deleteArticleWatcher,updateArticleWatcher,getArticleWatcher,listArticlesWatcher} from './article'
import {createClassroomWatcher,deleteClassroomWatcher,updateClassroomWatcher,getClassroomWatcher,listClassroomsWatcher} from './classroom'
import {createLessonWatcher,deleteLessonWatcher,updateLessonWatcher,getLessonWatcher,listLessonsWatcher} from './lesson'

import {createQnaWatcher,deleteQnaWatcher,
    updateQnaWatcher,getQnaWatcher,
    listPostQnasWatcher,listUserQnasWatcher} from './qna'

import {createCommentWatcher,deleteCommentWatcher,
    updateCommentWatcher,getCommentWatcher,
    listPostCommentsWatcher,listUserCommentsWatcher} from './comment'

import {putObjectWatcher,getObjectWatcher, listObjectsWatcher,removeObjectWatcher} from './storage'

const sagas = [
    
    //auth
    signInWatcher,
    signOutWatcher,
    completeNewPasswordWatcher,
    forgotPasswordWatcher,
    resetPasswordWatcher,
    getAuthUserWatcher,
    verifyEmailWatcher,
    verifySubmitCodeWatcher,
    
    //account
    createAccountWatcher,
    listAccountsWatcher,
    getAccountWatcher,
    getAccountByUniqueUrlWatcher,
    updateAccountWatcher,
    deleteAccountWatcher,

    //user
    createUserWatcher,
    getUserWatcher,
    listUsersWatcher,
    updateUserWatcher,
    getUserByEmailWatcher,
    
    //tag
    listTagsWatcher,
    deleteTagWatcher,
    createTagWatcher,

    //category
    listCategoriesWatcher,
    deleteCategoryWatcher,
    createCategoryWatcher,
    updateCategoryWatcher,
    getCategoryWatcher,

    // post
    listPostsWatcher,
    getPostWatcher,

    //article
    listArticlesWatcher,
    deleteArticleWatcher,
    createArticleWatcher,
    updateArticleWatcher,
    getArticleWatcher,

    //classroom
    listClassroomsWatcher,
    deleteClassroomWatcher,
    createClassroomWatcher,
    updateClassroomWatcher,
    getClassroomWatcher,

    //lesson
    listLessonsWatcher,
    deleteLessonWatcher,
    createLessonWatcher,
    updateLessonWatcher,
    getLessonWatcher,    

    //qna
    listPostQnasWatcher,
    listUserQnasWatcher,
    deleteQnaWatcher,
    createQnaWatcher,
    updateQnaWatcher,
    getQnaWatcher,


    //comment
    listPostCommentsWatcher,
    listUserCommentsWatcher,
    deleteCommentWatcher,
    createCommentWatcher,
    updateCommentWatcher,
    getCommentWatcher,

    //storage
    putObjectWatcher,
    getObjectWatcher,
    listObjectsWatcher,
    removeObjectWatcher,

    routinePromiseWatcherSaga
]

export default [
    ...sagas
]