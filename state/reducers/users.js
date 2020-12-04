import { USERS } from '../actions/constants'
const initialState = {
	id: '1002',
	username: 'masvickar',
	firstname:'Zulfikar',
	lastname:'Latief',
	email: 'masvickar19@gmail.com',
	token: '',
	loggedin: false,
	lastloggedin: '2019-11-30 22:30',
	verified: true,
	salesVolume: 500000,
	currency: 'Rp',
	item:{
		id:'1001',
		username: 'masvickar',
		firstname:'Zulfikar',
		lastname:'Latief',
		email: 'masvickar19@gmail.com',
		verified: true,
		status:3
	},
	list:[
		{
			id:'1001',
			username: 'zairvai',
			firstname:'Aljazair',
			lastname:'Lindan',
			email: 'zairvai@gmail.com',
			verified: true,
			role:'owner',
			status:2
		},
		{
			id:'1002',
			username: 'masvickar',
			firstname:'Zulfikar',
			lastname:'Latief',
			email: 'masvickar19@gmail.com',
			verified: true,
			role:'admin',
			status:3
		},
		{
			id:'1003',
			username: 'johny',
			firstname:'Rahmat',
			lastname:'Johny',
			email: 'rjo@gmail.com',
			verified: true,
			role:'tutor',
			status:4
		}
	]
}

export const users = ( state = initialState, action ) => {
	switch( action.type ){
		case 'USER_LOGGEDIN' : {
			return{
				...state,
				loggedin: action.payload
			}
		}
		case 'USER_EMAIL' : {
			return{
				...state,
				email: action.payload
			}
		}
		case 'USERS_FETCHED' : {
			return{
				...state,
				list: action.payload
			}
		}
		case 'USER_NAME' : {
			return{
				...state,
				username: action.payload
			}
		}
		case 'USER_ID' : {
			return{
				...state,
				id: action.payload
			}
		}
		case 'EXCHANGE_BUY' : {
			return{
				...state,
				tradings:{
					...state.tradings,
					buy:{
						data: action.payload
					}
				}
			}
		}
		case 'DATA_RESET' : {
			return{
				...state,
				loggedin: initialState.loggedin,
				username: initialState.username,
				id: initialState.id,
				token: initialState.token,
				email: initialState.email,
			}
		}
	}
	return state
}