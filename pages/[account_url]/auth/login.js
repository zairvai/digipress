import React from 'react'
import {connect} from 'react-redux'
import Header from 'Templates/Head'
import {
	VuroxLayout,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import {withRouter} from 'next/router'
import {getRedirectToUserDefaultPath} from 'Helper'

import { Row, Col,Image,Typography} from 'antd'
import FormLogin from 'Components/FormAuthLogin'
import FormCompleteNewPasword from 'Components/FormAuthCompleteNewPassword'

import { bindPromiseCreators } from 'redux-saga-routines';
import { getAccountByUniqueUrlRoutinePromise } from 'State/routines/account';
import { signOutRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'
import AccountController from 'Library/controllers/AccountController'

import {NextSeo} from 'next-seo'

const {Title,Text} = Typography

const PageLogin = props =>{

	const {router,auth} = props

	const authController = new AuthController(props)
	const accountController = new AccountController(props)

	const [user,setUser] = React.useState()
	const [isNewPasswordRequired,setNewPasswordRequired] = React.useState(false)
	const [visible,setVisible] = React.useState(false)
	 
	 React.useEffect(async()=>{

		try{

			if(auth.isLoggedIn){
				
				if(auth.user.access.accountId != auth.account.id){
					await authController._signOut()
					setVisible(true)
				}
				else{
					router.push(getRedirectToUserDefaultPath(`/${auth.account.uniqueURL}/`,auth.user.access.role))
				}
			}
			else{
				
				const uniqueURLPath = router.query.account_url
				// authController._initSignIn()
				//get account id by unique URL
				const account = await accountController._getAccountByUniqueUrl({url:uniqueURLPath})

				authController._setAccount(account.data)
				
				setVisible(true)
				
			}
		}
		catch(error){
			console.log(error)
			router.push('/not-found')
		}
			
	},[])

	const goToForgotPassword = () =>{
        router.push('/auth/password-recovery')
	}

	const handleNewPasswordRequired = user =>{
		setUser(user)
		setNewPasswordRequired(true)
	}
	
	const handleBackToLogin = () => {
		setNewPasswordRequired(false)
		authController._signOut()
	}

	const handleSuccessLogin = user =>{
		if(!user.email_verified) router.push(`/${auth.account.uniqueURL}/auth/verify`)
		else router.push(getRedirectToUserDefaultPath(`/${auth.account.uniqueURL}/`,user.access.role))
	}

	const handleSuccessNewPassword = () =>{
		setNewPasswordRequired(false)
	}

	return(
		<>
		{auth && auth.account &&
		<React.Fragment>
			<NextSeo title="Login"/>
			<Header/>
			<VuroxLayout>
				<ContentLayout width='100%' className='vurox-scroll-y'>

					<div style={visible ? {visibility:"visible"} : {visibility:"hidden"}}>	
					
						<Row className="justify-content-center fullHeight">
							
							<Col md={8} sm={24} xs={24} className="fullHeight">
								<VuroxComponentsContainer className="py-4 px-4 mt-5 mb-1 rounded-top">
									<Row>
										<Col md={24} sm={24} xs={24}>
											<Title level={4} className="mb-0">{auth.account.name}</Title>
											<Text type="secondary">Anda sedang mengakses akun {auth.account.name}.</Text>
											<Text type="secondary"> Silahkan login menggunakan email yang telah terdaftar pada akun {auth.account.name}</Text>
										</Col>
									</Row>
								</VuroxComponentsContainer>
								
								<Row className="align-items-center fullHeight">
									<Col md={24} sm={24} xs={24}>
										{isNewPasswordRequired ? 
											<FormCompleteNewPasword user={user} onSuccess={handleSuccessNewPassword} onBack={handleBackToLogin}/>
											:
											<FormLogin onSuccess={handleSuccessLogin} onNewPasswordRequired={handleNewPasswordRequired} onForgotPassword={goToForgotPassword}/>
										}
									</Col>
								</Row>
								<VuroxComponentsContainer className="p-4 mt-1 rounded-bottom">
									<Row className="justify-content-center">
										<Col md={8} sm={18} xs={18}>
											
												<Image
													src={window.location.origin+"/image/baktikominfo.jpg"}
													fallback="data:image/png;base64,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"
													/>
											
										</Col>
									</Row>
								</VuroxComponentsContainer>
							</Col>
						</Row>
					</div>
				</ContentLayout>
			</VuroxLayout>
			
		</React.Fragment>
		}
		</>
	)
	
}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
				signOutRoutinePromise,
				getAccountByUniqueUrlRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageLogin))