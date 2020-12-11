import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

const Summery = props =>{

	const {auth} = props

	return (
		<div className="vurox-admin-summery">
			<Row>
				<Col lg={12} md={10} xs={24}>
					<Row>
						
						<Col xs={24}>
							<div className="vurox-admin-welcome">
								<h5>Hi {auth.user.name}, Selamat datang !</h5>
								{/* <p>Terakhir masuk {this.props.users.lastloggedin}</p> */}
							</div>
						</Col>
						
						{/* <Col xs={8} className='d-block d-sm-none'>
							<button className='btn btn-sm bg-green-5 fright slideHidden'>Info</button>
						</Col> */}
					</Row>
				</Col>
				
			</Row>
			
		</div>
	);
	
}
export default connect( state=>state )(Summery)