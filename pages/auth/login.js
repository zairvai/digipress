import React from 'react'
import {connect} from 'react-redux'
import Header from 'Templates/Head'
import {
	VuroxLayout,
	ContentLayout,
} from 'Components/layout'
import {withRouter} from 'next/router'

import { vuroxContext } from 'Context'
import { appContext } from 'Context/app'

import { Row, Col,Button, Checkbox,Form,Menu} from 'antd'
import FormLogin from 'Components/FormAuthLogin'
import FormCompleteNewPasword from 'Components/FormAuthCompleteNewPassword'

const auth = props =>{

	const {router,auth} = props
	const {setLoginStatus,setCurrentUser} = React.useContext(appContext)

	React.useEffect(()=>{
		if(auth.isLoggedIn){
			setCurrentUser(auth.data)
			setLoginStatus(auth.isLoggedIn)
			router.push("/report/dashboard")
		}else{
			setCurrentUser(false)
			setLoginStatus(false)
		}
		
	},[auth.isLoggedIn,auth.data])

	return(
		<React.Fragment>
			<Header/>
			<VuroxLayout>
				
				<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
					
					<Row className="justify-content-center fullHeight">
						<Col md={8} sm={24} xs={24} className="fullHeight">
							<Row className="align-items-center fullHeight">
								<Col md={24} sm={24} xs={24}>
									{props.auth.newPasswordRequired ? 
										<FormCompleteNewPasword/>
										:
										<FormLogin/>
									}

								</Col>
							</Row>
							
						</Col>
					</Row>
					
				</ContentLayout>
			</VuroxLayout>
		</React.Fragment>
	)
	
}
export default connect(state=>state)(withRouter(auth))