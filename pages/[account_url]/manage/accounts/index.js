import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import LayoutAccount from 'Templates/Layout.account'
import { Row, Col, PageHeader,Button} from 'antd'
import ListAccounts from 'Components/ListAccounts'
import {NextSeo} from 'next-seo'

const PageAccounts = props => {

	const {auth} = props

    // const pagename=""
	// const links = [['Kelola',`/${auth.account.uniqueURL}/manage/accounts`,''],['Akun',`/${auth.account.uniqueURL}/manage/accounts`,'active']]
	  
	return (
		<LayoutAccount>
			<NextSeo title="Kelola - Akun"/>
			
			<Row>
				<Col md={24}>
					
					<PageHeader title="Kelola akun" ghost={false}
						extra={[
							<div key="1">
								<Link href={`/${auth.account.uniqueURL}/manage/accounts/add`} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Tambah akun</Button></Link>
							</div>
						]}
					/>
					
				</Col>
			</Row>
			<Row>
				<Col md={24}>
					<VuroxComponentsContainer>
						<ListAccounts/>
					</VuroxComponentsContainer>	
				</Col>
			</Row>
					
			
		</LayoutAccount>
	);
	
}


export default connect(state=>({auth:state.auth}))(PageAccounts)