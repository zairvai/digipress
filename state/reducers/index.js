import { combineReducers } from 'redux'
import { appReducer } from './app'
import { signIn,signOut,completeNewPassword,forgotPassword,resetPassword,authData,getAuthUser} from './auth'
import { createAccount,listAccounts,getAccount,updateAccount,deleteAccount,getAccountByUniqueUrl } from './account'
import { createUser,getUser,listUsers, updateUser } from './user'
import { listTags,deleteTag,createTag } from './tag'
import { listCategories,getCategory,deleteCategory,createCategory,updateCategory } from './category'
import { createArticle,deleteArticle,updateArticle,listArticles,getArticle } from './article'
import { createClassroom,deleteClassroom,updateClassroom,listClassrooms,getClassroom } from './classroom'
import { createLesson, deleteLesson,updateLesson,listLessons,getLesson} from './lesson'
import { createQna,deleteQna,updateQna,listPostQnas,listUserQnas,getQna} from './qna'
import { createComment,deleteComment,updateComment,listPostComments,listUserComments,getComment} from './comment'
import { getPost,listPosts } from './post'

import { lessons } from './unused/lessons'
import { questions } from './unused/questions'
import { comments } from './unused/comments'
import { campaigns } from './campaigns'
import { vuroxCompanyInfo } from './company'

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

const authReducers = reduceReducers(signIn,signOut,completeNewPassword,forgotPassword,resetPassword,authData,getAuthUser)

const rootReducer = combineReducers({
	//app
	app:persistReducer({key:"app",storage},appReducer),
	//auth
	auth:persistReducer(authPersistConfig,authReducers),
	//account
	createAccount:persistReducer({key:"createAccount",storage},createAccount),
	listAccounts:persistReducer({key:"listAccounts",storage},listAccounts),
	getAccount:persistReducer({key:"getAccount",storage},getAccount),
	getAccountByUniqueUrl:persistReducer({key:"getAccountByUniqueUrl",storage},getAccountByUniqueUrl),
	updateAccount:persistReducer({key:"updateAccount",storage},updateAccount),
	deleteAccount:persistReducer({key:"deleteAccount",storage},deleteAccount),
	//user
	createUser:persistReducer({key:"createUser",storage},createUser),
	getUser:persistReducer({key:"getUser",storage},getUser),
	listUsers:persistReducer({key:"listUsers",storage},listUsers),
	updateUser:persistReducer({key:"updateUser",storage},updateUser),
	//tag
	listTags:persistReducer({key:"listTags",storage},listTags),
	deleteTag:persistReducer({key:"deleteTag",storage},deleteTag),
	createTag:persistReducer({key:"createTag",storage},createTag),
	//category
	createCategory:persistReducer({key:"createCategory",storage},createCategory),
	getCategory:persistReducer({key:"getCategory",storage},getCategory),
	listCategories:persistReducer({key:"listCategories",storage},listCategories),
	updateCategory:persistReducer({key:"updateCategory",storage},updateCategory),
	deleteCategory:persistReducer({key:"deleteCategory",storage},deleteCategory),

	//post
	getPost:persistReducer({key:"getPost",storage},getPost),
	listPosts:persistReducer({key:"listPosts",storage},listPosts),

	//article
	createArticle:persistReducer({key:"createArticle",storage},createArticle),
	getArticle:persistReducer({key:"getArticle",storage},getArticle),
	listArticles:persistReducer({key:"listArticles",storage},listArticles),
	updateArticle:persistReducer({key:"updateArticle",storage},updateArticle),
	deleteArticle:persistReducer({key:"deleteArticle",storage},deleteArticle),
	//classroom
	createClassroom:persistReducer({key:"createClassroom",storage},createClassroom),
	getClassroom:persistReducer({key:"getClassroom",storage},getClassroom),
	listClassrooms:persistReducer({key:"listClassrooms",storage},listClassrooms),
	updateClassroom:persistReducer({key:"updateClassroom",storage},updateClassroom),
	deleteClassroom:persistReducer({key:"deleteClassroom",storage},deleteClassroom),

	//lesson
	createLesson:persistReducer({key:"createLesson",storage},createLesson),
	getLesson:persistReducer({key:"getLesson",storage},getLesson),
	listLessons:persistReducer({key:"listLessons",storage},listLessons),
	updateLesson:persistReducer({key:"updateLesson",storage},updateLesson),
	deleteLesson:persistReducer({key:"deleteLesson",storage},deleteLesson),
	//qna
	createQna:persistReducer({key:"createQna",storage},createQna),
	getQna:persistReducer({key:"getQna",storage},getQna),
	listPostQnas:persistReducer({key:"listPostQnas",storage},listPostQnas),
	listUserQnas:persistReducer({key:"listUserQnas",storage},listUserQnas),
	updateQna:persistReducer({key:"updateQna",storage},updateQna),
	deleteQna:persistReducer({key:"deleteQna",storage},deleteQna),
	//comment
	createComment:persistReducer({key:"createComment",storage},createComment),
	getComment:persistReducer({key:"getComment",storage},getComment),
	listPostComments:persistReducer({key:"listPostComments",storage},listPostComments),
	listUserComments:persistReducer({key:"listUserComments",storage},listUserComments),
	updateComment:persistReducer({key:"updateComment",storage},updateComment),
	deleteComment:persistReducer({key:"deleteComment",storage},deleteComment),



	// lessons,
	// questions,
	// comments,

	campaigns: campaigns,
	company: vuroxCompanyInfo,
})


export default rootReducer;