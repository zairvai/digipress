import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { Row, Col, PageHeader,Button} from 'antd'
import ListClassrooms from 'Components/ListClassrooms'
import LayoutClassroom from 'Templates/Layout.classroom'
import Permission from 'Library/controllers/Permission'

import {NextSeo} from 'next-seo'

const PageClassrooms = props => {

	const {auth} = props

	return (
		<LayoutClassroom>
			<NextSeo title="Konten - Ruang belajar"/>
			<Row>
				<Col md={24}>
					
					<PageHeader title="Ruang Belajar" ghost={false}
						extra={[
							<div key="1">
							{Permission.ADD_CLASSROOM({auth}) 
								&& <Link href={`/${auth.account.uniqueURL}/content/classrooms/add`} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Tambah ruang belajar</Button></Link>}
							</div>
						]}
					/>
					
				</Col>
			</Row>
			<Row>
				<Col md={24}>
					<VuroxComponentsContainer>
						<ListClassrooms/>
					</VuroxComponentsContainer>	
				</Col>
			</Row>
		</LayoutClassroom>
	);
	
}


export default connect(state=>({auth:state.auth}))(PageClassrooms)