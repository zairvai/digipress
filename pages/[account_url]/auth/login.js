import React from 'react'
import {connect} from 'react-redux'
import Header from 'Templates/Head'
import {
	VuroxLayout,
	ContentLayout,
} from 'Components/layout'
import {withRouter} from 'next/router'
import {getRedirectToUserDefaultPath} from 'Helper'

import { Row, Col,Button, Checkbox,Form,Menu,Typography} from 'antd'
import FormLogin from 'Components/FormAuthLogin'
import FormCompleteNewPasword from 'Components/FormAuthCompleteNewPassword'

import { bindPromiseCreators } from 'redux-saga-routines';
import { getAccountByUniqueUrlRoutinePromise } from 'State/routines/account';
import { signOutRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import AccountController from 'Library/controllers/AccountController'

import {NextSeo} from 'next-seo'

const {Title} = Typography

const PageLogin = props =>{

	const {router,auth} = props

	const authController = new AuthController(props)
	const accountController = new AccountController(props)

	const [visible,setVisible] = React.useState(false)
	 
	 React.useEffect(async()=>{
		
		try{
			
			// router.prefetch('/[account_url]/report/dashboard',`/${auth.account.uniqueURL}/report/dashboard`)
			
			if(auth.isLoggedIn){
				
				if(auth.user.access.accountId != auth.account.id){
					await authController._signOut()
					setVisible(true)
				}
				else{
					// router.push(`/${auth.account.uniqueURL}/report/dashboard`)
					router.push(getRedirectToUserDefaultPath(`/${auth.account.uniqueURL}/`,auth.user.access.role))
				}
			}
			else{
				
				authController._initSignIn()
				//get account id by unique URL
				const account = await accountController._getAccountByUniqueUrl({url:router.query.account_url})

				authController._setAccount(account.data)
				
				setVisible(true)

			}
		}
		catch(error){
			console.log(error)
		}
			
	},[])

	const goToForgotPassword = () =>{
        router.push('/auth/password-recovery')
	}
	
	const onBacktoLogin = () => {
		authController._signOut()
			.then(()=>authController._initSignIn())
	}

	const onSuccess = user =>{
		const access = JSON.parse(user.signInUserSession.idToken.payload.access)
		router.push(getRedirectToUserDefaultPath(`/${auth.account.uniqueURL}/`,access.role))
	}

	return(
		<React.Fragment>
			<NextSeo title="Login"/>
			<Header/>
			<VuroxLayout>
				<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
					<div style={visible ? {visibility:"visible"} : {visibility:"hidden"}}>	
					
						<Row className="justify-content-center fullHeight">
							<Col md={8} sm={24} xs={24} className="fullHeight">
								<Row>
									<Col md={24} sm={24} xs={24}>
										<Title level={1} className="text-center my-3 mb-0">{auth.account.name}</Title>
									</Col>
								</Row>
								<Row className="align-items-center fullHeight">
									<Col md={24} sm={24} xs={24}>
										{auth.newPasswordRequired ? 
											<FormCompleteNewPasword onBack={onBacktoLogin}/>
											:
											<FormLogin onSuccess={onSuccess} accountId={auth.account.id} onForgotPassword={goToForgotPassword}/>
										}
									</Col>
								</Row>	
							</Col>
						</Row>
					</div>
				</ContentLayout>
			</VuroxLayout>
			
		</React.Fragment>
	)
	
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
				signOutRoutinePromise,
				getAccountByUniqueUrlRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageLogin))