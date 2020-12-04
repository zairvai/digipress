import React from 'react'
import {connect} from 'react-redux'
import Header from 'Templates/Head'
import {
	VuroxLayout,
	ContentLayout,
} from 'Components/layout'

import { vuroxContext } from 'Context'
import { Row, Col,Button, Checkbox,Form,Menu} from 'antd'
import FormForgotPassword from 'Components/FormAuthForgotPassword'
import FormResetPassword from 'Components/FormAuthResetPassword'

class index extends React.Component {

	render() {
		

		return (
			<React.Fragment>
				<Header/>
				<VuroxLayout>
					
					<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
						
						<Row className="justify-content-center fullHeight">
							<Col md={8} sm={24} xs={24} className="fullHeight">
								<Row className="align-items-center fullHeight">
									<Col md={24} sm={24} xs={24}>
                                        
										{this.props.auth.onResetPassword ? 
											<FormResetPassword/>
											:
											<FormForgotPassword/>
										}

									</Col>
								</Row>
								
							</Col>
						</Row>
                        
					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(index)