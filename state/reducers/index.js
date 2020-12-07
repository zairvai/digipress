import { combineReducers } from 'redux'
import { signIn,signOut,completeNewPassword,forgotPassword,resetPassword } from './auth'
import { createAccount,listAccounts,getAccount } from './account'


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

const authReducers = reduceReducers(signIn,signOut,completeNewPassword,forgotPassword,resetPassword)

const rootReducer = combineReducers({
	//auth
	auth:persistReducer(authPersistConfig,authReducers),
	//account
	createAccount:persistReducer({key:"createAccount",storage},createAccount),
	listAccounts:persistReducer({key:"listAccounts",storage},listAccounts),
	getAccount:persistReducer({key:"getAccount",storage},getAccount),

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