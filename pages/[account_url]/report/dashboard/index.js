import React from 'react'
import {connect} from 'react-redux'
import { Row, Col} from 'antd'
import AdminSummeryBox from 'Templates/AdminSummeryBox';
import LayoutDashboard from 'Templates/Layout.dashboard'
import AnalyticNav from 'Templates/AnalyticNav'
import AnalyticBox1 from 'Templates/AnalyticBox1'
import AnalyticBox2 from 'Templates/AnalyticBox2'
import AnalyticBox3 from 'Templates/AnalyticBox3'
import AnalyticBox4 from 'Templates/AnalyticBox4'
import {NextSeo} from 'next-seo'

import AuthController from 'Library/controllers/AuthController'

const PageDashboard = props => {

	const {auth,router} = props

	const [accountURL,setAccountURL] = React.useState()

	const [selectedMenu,setSelectedMenu] = React.useState()


	React.useEffect(()=>{

		if(!AuthController.isAppOwner(auth) || !AuthController.isAppAdmin(auth)){

			setAccountURL(auth.account.uniqueURL)
		}

	},[])

	const handleMenuChange = selected =>{
		setSelectedMenu(selected)
	}



	return (
		<LayoutDashboard>
			<NextSeo title="Dashboard"/>
			<AdminSummeryBox/>
			<Row>
				<Col md={24}>
					<div className="mb-2">
						<AnalyticNav onMenuChange={handleMenuChange}/>
					</div>
				</Col>
			</Row>
			<Row>
				<Col md={14}>
					<AnalyticBox1 selectedMenu={selectedMenu}/>
				</Col>
				<Col md={10}>
					<Row>
						<Col md={24}>
							<div className="ml-md-2 ml-0">
								<AnalyticBox2 selectedMenu={selectedMenu} pagePath={`/${accountURL}/`}/>
							</div>
						</Col>
					</Row>
					
				</Col>
			</Row>
			<Row>
				<Col md={12} sm={12} xs={24}>
					<div className="mt-2">
						<AnalyticBox3 selectedMenu={selectedMenu} gaFilters={`main/home/articles/([a-zA-Z0-9\-]+)/$`} label="Top Artikel" description="Artikel paling sering dibaca"/>
					</div>
				</Col>
				<Col md={12} sm={12} xs={24}>
					<div className="mt-2 ml-md-2 ml-0">
						<AnalyticBox4 selectedMenu={selectedMenu} gaFilters={`main/home/classrooms/([a-zA-Z0-9\-]+)/$`} label="Top Ruang belajar" description="Ruang belajar teraktif"/>
					</div>
				</Col>
			</Row>
		</LayoutDashboard>
	);
	
}


export default connect(state=>state)(PageDashboard)