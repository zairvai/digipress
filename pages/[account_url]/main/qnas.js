import React from 'react'
import {connect} from 'react-redux'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { Row, Col,PageHeader} from 'antd'
import LayoutQna from 'Templates/Layout.qna'
import ListUserQnas from 'Components/ListUserQnas'

import {NextSeo} from 'next-seo'

const PageQnas = props => {

	const {auth} = props

	// const links = [['Main',`/${auth.account.uniqueURL}/main/home`,''],['Tanya jawab',`/${auth.account.uniqueURL}/main/qnas`,'active']]

	
	return (
		<LayoutQna>
			<NextSeo title="Tanya Jawab"/>
			<Row>
				<Col md={24}>
					
					<PageHeader title="Tanya jawab" ghost={false}/>
					
				</Col>
			</Row>
			
			<Row>
				<Col md={24}>
					<VuroxComponentsContainer>
						<ListUserQnas currentUser={auth.user}/>
					</VuroxComponentsContainer>	
				</Col>
			</Row>
				
		</LayoutQna>
	);
	
}


export default connect(state=>({auth:state.auth}))(PageQnas)