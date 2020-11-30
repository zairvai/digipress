import { combineReducers } from 'redux'
import { accounts } from './accounts'
import { articles } from './articles'
import { classrooms } from './classrooms'
import { campaigns } from './campaigns'
import { vuroxUsers } from './users'
import { vuroxCompanyInfo } from './company'
import { vuroxCompanyCalendar } from './calendar'
import { vuroxMail } from './mail'
import { vuroxChatMessages } from './message'

const rootReducer = combineReducers({
	accounts: accounts,
	users: vuroxUsers,
	articles: articles,
	classrooms: classrooms,
	campaigns: campaigns,
	company: vuroxCompanyInfo,
	calendar: vuroxCompanyCalendar,
	mail: vuroxMail,
	message: vuroxChatMessages,
})


export default rootReducer;