import { combineReducers } from 'redux'
import { appReducer } from './app'
import { signIn,signOut,completeNewPassword,forgotPassword,resetPassword,authData,getAuthUser,verifyEmail,verifySubmitCode} from './auth'
import { createAccount,listAccounts,getAccount,updateAccount,deleteAccount,getAccountByUniqueUrl } from './account'
import { createUser,getUser,listUsers, updateUser,getUserByEmail } from './user'
import { listTags,deleteTag,createTag } from './tag'
import { listCategories,getCategory,deleteCategory,createCategory,updateCategory } from './category'
import { createArticle,deleteArticle,updateArticle,listArticles,getArticle } from './article'
import { createClassroom,deleteClassroom,updateClassroom,listClassrooms,getClassroom } from './classroom'
import { createLesson, deleteLesson,updateLesson,listLessons,getLesson} from './lesson'
import { createQna,deleteQna,updateQna,listPostQnas,listUserQnas,getQna} from './qna'
import { createComment,deleteComment,updateComment,listPostComments,listUserComments,getComment} from './comment'
import { getPost,listPosts } from './post'

import {putObject,getObject,listObjects} from './storage'

import {reduceReducers} from 'Helper'
import {persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
const storage = require('redux-persist/lib/storage').default

const authPersistConfig = {
    key:"auth",
	storage,
	// blacklist:['error','isError']
    // blacklist:['_persist',
    //     "temp",
    //     "newPasswordRequired",
    //     "userNotConfirmed",
    //     "usernamExists"]
}

const authReducers = reduceReducers(signIn,signOut,completeNewPassword,forgotPassword,resetPassword,authData,getAuthUser,verifyEmail,verifySubmitCode)

const rootReducer = combineReducers({
	//app
	app:persistReducer({key:"app",storage},appReducer),
	//auth
	auth:persistReducer(authPersistConfig,authReducers),
	//account
	createAccount,
	listAccounts,
	getAccount,
	getAccountByUniqueUrl,
	updateAccount,
	deleteAccount,
	//user
	createUser,
	getUser,
	getUserByEmail,
	listUsers,
	updateUser,
	//tag
	listTags,
	deleteTag,
	createTag,
	//category
	createCategory,
	getCategory,
	listCategories,
	updateCategory,
	deleteCategory,
	//post
	getPost,
	listPosts,
	//article
	createArticle,
	getArticle,
	listArticles,
	updateArticle,
	deleteArticle,
	//classroom
	createClassroom,
	getClassroom,
	listClassrooms,
	updateClassroom,
	deleteClassroom,
	//lesson
	createLesson,
	getLesson,
	listLessons,
	updateLesson,
	deleteLesson,
	//qna
	createQna,
	getQna,
	listPostQnas,
	listUserQnas,
	updateQna,
	deleteQna,
	//comment
	createComment,
	getComment,
	listPostComments,
	listUserComments,
	updateComment,
	deleteComment,
	//storage
	putObject,
	getObject,
	listObjects
})


export default rootReducer;