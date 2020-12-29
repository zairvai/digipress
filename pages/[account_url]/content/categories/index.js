import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { vuroxContext } from 'Context'
import { Row, Col, PageHeader,Button} from 'antd'
import ListCategories from 'Components/ListCategories'
import LayoutCategory from 'Templates/Layout.category'
import Permission from 'Library/controllers/Permission'

import {NextSeo} from 'next-seo'

const PageCategories = props => {

	const {auth} = props

    // const pagename=""
	// const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Kategori',`/${auth.account.uniqueURL}/content/categories`,'active']]

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

	return (
		<LayoutCategory>
			<NextSeo title="Konten - Kategori"/>
			<Row>
				<Col md={24}>
					
					<PageHeader title="Kategori" ghost={false}
						extra={[
							<div key="1">
							{Permission.ADD_CATEGORY({auth}) 
								&& <Link href={`/${auth.account.uniqueURL}/content/categories/add`} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Tambah kategori</Button></Link>}
							</div>
						]}
					/>
					
				</Col>
			</Row>
			<Row>
				<Col md={24}>
					<VuroxComponentsContainer>
						<ListCategories/>
					</VuroxComponentsContainer>	
				</Col>
			</Row>
		</LayoutCategory>
	);
	
}


export default connect(state=>state)(withRouter(PageCategories))