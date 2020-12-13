import { combineReducers } from 'redux'
import { signIn,signOut,completeNewPassword,forgotPassword,resetPassword,authData,getAuthUser} from './auth'
import { createAccount,listAccounts,getAccount,updateAccount,deleteAccount,getAccountByUniqueUrl } from './account'
import { createUser,getUser,listUsers, updateUser } from './user'
import { listTags,deleteTag,createTag } from './tag'
import { listCategories,getCategory,deleteCategory,createCategory,updateCategory } from './category'

import { accounts } from './accounts'
import { articles } from './articles'
import { classrooms } from './classrooms'
import { categories } from './categories'
import { tags } from './tags'
import { lessons } from './lessons'
import { questions } from './questions'
import { comments } from './comments'

import { campaigns } from './campaigns'
import { users } from './users'
import { vuroxCompanyInfo } from './company'
import { vuroxCompanyCalendar } from './calendar'
import { vuroxMail } from './mail'
import { vuroxChatMessages } from './message'

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

	accounts,
	users,
	articles,
	classrooms,
	categories,
	tags,
	lessons,
	questions,
	comments,

	campaigns: campaigns,
	company: vuroxCompanyInfo,
	// calendar: vuroxCompanyCalendar,
	// mail: vuroxMail,
	// message: vuroxChatMessages,
})


export default rootReducer;