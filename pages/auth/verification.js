import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Header from 'Templates/Head'
import {
	VuroxLayout,
	ContentLayout,
} from 'Components/layout'

import { Row, Col} from 'antd'
import FormVerify from 'Components/FormAuthVerify'
// import FormVerifySubmit from 'Components/FormAuthVerifySubmit'

const Page = props => {

	const {router} = props

    const handleVerify = data => {
        console.log(data)
    }

	return (
		<React.Fragment>
			<Header/>
			<VuroxLayout>
				
				<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
					
					<Row className="justify-content-center fullHeight">
						<Col md={8} sm={24} xs={24} className="fullHeight">
							<Row className="align-items-center fullHeight">
								<Col md={24} sm={24} xs={24}>
									
									<FormVerify onSuccess={handleVerify}/>

								</Col>
							</Row>
							
						</Col>
					</Row>
					
				</ContentLayout>
			</VuroxLayout>
		</React.Fragment>
	);
	
}
export default connect(state=>state)(withRouter(Page))