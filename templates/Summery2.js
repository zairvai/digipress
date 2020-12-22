import React from 'react';
import { Space } from 'antd'
import $ from 'jquery'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import {currency} from 'Utilities/number'
import {withRouter} from 'next/router'

import {
    VuroxBreadcrumbs
} from 'Components/breadcrumbs'


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
					<Col lg={24} md={24} xs={24}>
						<Row>
                            <Col md={24}>
                                <Row className="vurox-admin-content-top-section">
                                    <Col>
                                        <VuroxBreadcrumbs pagename={this.props.pagename} links={this.props.links}/>
                                    </Col>
                                </Row>
                            </Col>
							
							{/* <Col xs={8} className='d-block d-sm-none'>
								<button className='btn btn-sm bg-green-5 fright slideHidden'>Info</button>
							</Col> */}
						</Row>
					</Col>
					<Col lg={12} md={14} className='d-none d-sm-block slideHiddenContent'>
						{/* <Space size={40} className="fright">
							<Col>
								<p className="vurox-text-sizes mb-2">Current Balance</p>
								<h5 className="mb-0">{this.props.users.currency}{currency(this.props.users.salesVolume)}</h5>
							</Col>
							<Col>
								<button type="button" className="float-none float-sm-right mr-2 btn white bg-magenta-5 btn-md rounded hover-color my-3 my-sm-0 py-3">Top up Balance</button>
							</Col>
						</Space> */}
					</Col>
				</Row>
				
			</div>
		);
	}
}
export default connect( state=>state )(withRouter(Summery))