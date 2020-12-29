import React from 'react'
import {connect} from 'react-redux'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { Row, Col,PageHeader} from 'antd'
import LayoutComment from 'Templates/Layout.comment'
import ListUserComments from 'Components/ListUserComments'

import {NextSeo} from 'next-seo'

const PageComments = props => {

	const {auth} = props

    // const pagename=""
	// const links = [['Main',`/${auth.account.uniqueURL}/main/home`,''],['Komentar',`/${auth.account.uniqueURL}/main/comments`,'active']]

	
	return (
		<LayoutComment>
			<NextSeo title="Komentar"/>
			<Row>
				<Col md={24}>
					
					<PageHeader title="Komentar kamu" ghost={false}/>
					
				</Col>
			</Row>
			<Row>
				<Col md={24}>
					<VuroxComponentsContainer>
						<ListUserComments currentUser={auth.user}/>
					</VuroxComponentsContainer>	
				</Col>
			</Row>
					
		</LayoutComment>
	);
	
}


export default connect(state=>({auth:state.auth}))(PageComments)