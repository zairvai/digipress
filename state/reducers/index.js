import { combineReducers } from 'redux'
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

const rootReducer = combineReducers({
	accounts: accounts,
	users: users,
	articles: articles,
	classrooms: classrooms,
	categories: categories,
	tags: tags,
	lessons: lessons,
	questions: questions,
	comments: comments,

	campaigns: campaigns,
	company: vuroxCompanyInfo,
	calendar: vuroxCompanyCalendar,
	mail: vuroxMail,
	message: vuroxChatMessages,
})


export default rootReducer;