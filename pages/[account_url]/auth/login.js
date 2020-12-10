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

import AuthController from 'Library/controllers/AuthController'

import AppContainer from 'Templates/AppContainer'

const {Title} = Typography

const PageLogin = props =>{

	const {router,auth} = props

	const {isLoggedIn ,setLoginStatus,setCurrentUser} = React.useContext(appContext)

	const authController = new AuthController(props)

	const [visible,setVisible] = React.useState(true)

	React.useEffect(()=>{
		router.prefetch('/[account_url]/report/dashboard',`/${auth.account.uniqueURL}/report/dashboard`)
	},[])

	React.useEffect(()=>{
	
		if(auth.isLoggedIn) router.push(`/${auth.account.uniqueURL}/report/dashboard`)
		else setVisible(true)

	},[])


	const onBacktoLogin = () => {
		authController._signOut()
			.then(()=>authController._initSignIn())
	}

	const handleAuthorization = progress => {
		console.log(progress)
		setLoadStatus(progress.status === "processed" ? true : false)
	}

	const onSuccess = resp =>{

		setLoginStatus(true)
		setCurrentUser(props.auth.user)
		
		router.push(`/${auth.account.uniqueURL}/report/dashboard`)
	}

	return(
		<AppContainer>
			<Header/>
			<VuroxLayout>
				<ContentLayout width='100%' className='p-3 vurox-scroll-y'>

					<div className={visible ? 'd-block':'d-none'}>
						<Row className="justify-content-center fullHeight">
							<Col md={8} sm={24} xs={24} className="fullHeight">
								<Row>
									<Col md={24} sm={24} xs={24}>
										<Title level={1} className="text-center my-3 mb-0">{auth.account.name}</Title>
									</Col>
								</Row>
								<Row className="align-items-center fullHeight">
									<Col md={24} sm={24} xs={24}>
										{props.auth.newPasswordRequired ? 
											<FormCompleteNewPasword onBack={onBacktoLogin}/>
											:
											<FormLogin onSuccess={onSuccess} accountId={auth.account.id}/>
										}
									</Col>
								</Row>	
							</Col>
						</Row>
					</div>


				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
	)
	
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
			
        },dispatch),dispatch
    })
)(withRouter(PageLogin))