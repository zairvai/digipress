import React from 'react';
import {Space} from 'antd'
import $ from 'jquery'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import {currency} from 'Utilities/number'

class Summery extends React.Component {

	componentDidMount(){

		$('.slideHidden').on('click', () => {
			$('.slideHiddenContent').slideToggle()
		} )
	}

	render() {

		return (
			<div className="vurox-admin-summery">
				<Row>
					<Col lg={12} md={10} xs={24}>
						<Row>
							
							<Col xs={16}>
								<div className="vurox-admin-welcome">
									<h5>Hi {this.props.users.username}, Selamat datang kembali !</h5>
								</div>
							</Col>
							
							<Col xs={8} className='d-block d-sm-none'>
								<button className='btn btn-sm bg-green-5 fright slideHidden'>Info</button>
							</Col>
						</Row>
					</Col>
					
				</Row>
				
			</div>
		);
	}
}
export default connect( state=>state )(Summery)