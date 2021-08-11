import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Header from 'Templates/Head'
import {
	VuroxLayout,
	ContentLayout,
} from 'Components/layout'
import { Row, Col} from 'antd'
import FormForgotPassword from 'Components/FormAuthForgotPassword'
import FormResetPassword from 'Components/FormAuthResetPassword'

const Page = props => {

	const {auth,router} = props

	const [isCodeSent,setCodeSent] = React.useState(false)
	const [visible,setVisible] = React.useState(true)

 	const handleSuccessResetPassword = () =>{
		router.push("/")
	}

	const handleCancel = () =>{
		
		if(auth.account){
			router.replace(`/${auth.account.uniqueURL}/auth/login`)
		}else{
			router.replace("/")
		}

		router.replace("/")
	}

	return (
		<React.Fragment>
			<Header/>
			<VuroxLayout>
				
				<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
					<div style={visible ? {visibility:"visible"} : {visibility:"hidden"}}>	
						<Row className="justify-content-center fullHeight">
							<Col md={8} sm={24} xs={24} className="fullHeight">
								<Row className="align-items-center fullHeight">
									<Col md={24} sm={24} xs={24}>
										
										{isCodeSent ? 
											<FormResetPassword onSuccess={handleSuccessResetPassword} onCancel={handleCancel}/>
											:
											<FormForgotPassword onSuccess={()=>setCodeSent(true)} onCancel={handleCancel}/>
										}

									</Col>
								</Row>
								
							</Col>
						</Row>
					</div>
				</ContentLayout>
			</VuroxLayout>
		</React.Fragment>
	);
	
}
export default connect(state=>({auth:state.auth}))(withRouter(Page))