import React from 'react'
import {connect} from 'react-redux'
import Header from 'Templates/Head'
import {
	VuroxLayout,
	ContentLayout,
} from 'Components/layout'
import {withRouter} from 'next/router'
import { appContext } from 'Context/app'

import { Row, Col,Button, Checkbox,Form,Menu,Typography} from 'antd'
import FormLogin from 'Components/FormAuthLogin'
import FormCompleteNewPasword from 'Components/FormAuthCompleteNewPassword'

import { bindPromiseCreators } from 'redux-saga-routines';
import { getAccountByUniqueUrlRoutinePromise } from 'State/routines/account';
import { getUserRoutinePromise } from 'State/routines/user';

import AuthController from 'Library/controllers/AuthController'
import AccountController from 'Library/controllers/AccountController'
import UserController from 'Library/controllers/UserController'

import AppContainer from 'Templates/AppContainer'

const {Title} = Typography

const PageLogin = props =>{

	const authController = new AuthController(props)
	const accountController = new AccountController(props)
	const userController = new UserController(props)

	const {router} = props
	const {auth,setLoginStatus,setCurrentUser,setCurrentAccount} = React.useContext(appContext)
	const {account_url} = router.query

	React.useEffect(()=>{
		authController._initSignIn()
		accountController._getAccountByUniqueUrl({url:account_url})
			.then(account=>{
				authController._setAccount(account.data)
				//add to context
				setCurrentAccount(account.data)
			})
			.catch(error=>console.log(error))
	},[])

	const onAuthorized = (auth) =>{
		
		userController._get(auth.data.attributes.sub)
			.then(user=>{
				authController._setUser(user.data)
				//add to context
				setCurrentUser(user.data)
				setLoginStatus(auth.isLoggedIn)
				//redirect
				router.push(`/${account_url}/report/dashboard`)
			})
			.catch(error=>console.log(error))
		
	}

	return(
		<AppContainer>
			<Header/>
			<VuroxLayout>
				<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
					<Row className="justify-content-center fullHeight">
						<Col md={8} sm={24} xs={24} className="fullHeight">
							<Row>
								<Col md={24} sm={24} xs={24}>
									<Title level={1} className="text-center mb-0">{auth.account.name}</Title>
								</Col>
							</Row>
							<Row className="align-items-center fullHeight">
								<Col md={24} sm={24} xs={24}>
									{props.auth.newPasswordRequired ? 
										<FormCompleteNewPasword/>
										:
										<FormLogin onAuthorized={onAuthorized}/>
									}
								</Col>
							</Row>	
						</Col>
					</Row>
				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
	)
	
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
			getAccountByUniqueUrlRoutinePromise,
			getUserRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageLogin))