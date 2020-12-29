import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,PageHeader} from 'antd'
import LayoutQna from 'Templates/Layout.qna'

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
					{/* <VuroxComponentsContainer>
						<ListQnas items={listQnas.list.items} foundDoc={listQnas.list.foundDocs} onDelete={showDeleteConfirm}/>
					</VuroxComponentsContainer>	 */}
				</Col>
			</Row>
				
		</LayoutQna>
	);
	
}


export default connect(state=>({auth:state.auth}))(PageQnas)