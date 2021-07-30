import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { Row, Col,PageHeader,Button} from 'antd'
import LayoutTag from 'Templates/Layout.tag'
import ListTags from 'Components/ListTags'
import Permission from 'Library/controllers/Permission'

import {NextSeo} from 'next-seo'

const PageTags = props => {

	const {auth} = props

    // const pagename=""
	// const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Tag',`/${auth.account.uniqueURL}/content/tags`,'active']]

	return (
		<LayoutTag>
			<NextSeo title="Konten - Tags"/>
			<Row>
				<Col md={24}>
					
					<PageHeader title="Tag" ghost={false}
						extra={[
							<div key="1">
							{Permission.ADD_TAG({auth}) 
								&& <Link href={`/${auth.account.uniqueURL}/content/tags/add`} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Tambah tag</Button></Link>}
							</div>
						]}
					/>
					
				</Col>
			</Row>
			<Row>
				<Col md={24}>
					<VuroxComponentsContainer>
						<ListTags/>
					</VuroxComponentsContainer>	
				</Col>
			</Row>
				
		</LayoutTag>
	);
	
}


export default connect(state=>({auth:state.auth}))(PageTags)