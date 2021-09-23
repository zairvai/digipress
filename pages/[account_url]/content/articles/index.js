import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { Row, Col, PageHeader,Button} from 'antd'
import ListArticles from 'Components/ListArticles'
import LayoutArticle from 'Templates/Layout.article'
import Permission from 'Library/controllers/Permission'

import {NextSeo} from 'next-seo'

const PageArticles = props => {

	const {auth} = props

	return (
		<LayoutArticle>
			<NextSeo title="Konten - Artikel"/>
			<Row>
				<Col md={24}>
					
					<PageHeader title="Artikel" ghost={false}
						extra={[
							<div key="1">
							{Permission.ADD_ARTICLE({auth}) 
								&& <Link passHref href={`/${auth.account.uniqueURL}/content/articles/add`} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Tambah artikel</Button></Link>}
							</div>
						]}
					/>
					
				</Col>
			</Row>
			<Row>
				<Col md={24}>
					<VuroxComponentsContainer>
						<ListArticles/>
					</VuroxComponentsContainer>	
				</Col>
			</Row>
		</LayoutArticle>
	);
	
}


export default connect(state=>({auth:state.auth}))(PageArticles)