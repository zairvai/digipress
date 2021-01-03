import React from 'react'
import {connect} from 'react-redux'
import { Row, Col,PageHeader,Button} from 'antd'
import AdminSummeryBox from 'Templates/AdminSummeryBox';
import LayoutDashboard from 'Templates/Layout.dashboard'
import AnalyticNav from 'Templates/AnalyticNav'
import AnalyticBox1 from 'Templates/AnalyticBox1'
import AnalyticBox2 from 'Templates/AnalyticBox2'
import AnalyticBox3 from 'Templates/AnalyticBox3'
import AnalyticBox4 from 'Templates/AnalyticBox4'
import {NextSeo} from 'next-seo'
import AuthController from 'Library/controllers/AuthController'
import ReactExport from 'react-export-excel';
import moment from "moment";

const PageDashboard = props => {

	const {ExcelFile} = ReactExport
	const {ExcelSheet} = ExcelFile
	const {auth,router} = props

	const [accountURL,setAccountURL] = React.useState()

	const [selectedMenu,setSelectedMenu] = React.useState()

	const [summaryReport,setSummaryReport] = React.useState()
	const [analytic1,setAnalytic1] = React.useState()
	const [analytic2,setAnalytic2] = React.useState()
	const [analytic3,setAnalytic3] = React.useState()
	const [analytic4,setAnalytic4] = React.useState()

	const [report,setReport] = React.useState()
	const [filename,setFilename] = React.useState("Download")
	const [isDownloadable,setDownloadable] = React.useState(false)

	React.useEffect(()=>{

		if(!AuthController.isAppOwner(auth) || !AuthController.isAppAdmin(auth)){

			setAccountURL(auth.account.uniqueURL)
		}

		setFilename(`Digipress.id ${moment().format("DD-MMM-YYYY kk:mm:ss")}`)

	},[])

	React.useEffect(()=>{

		if(summaryReport && analytic1 && analytic2 && analytic3 && analytic4){
			const bundledReport = [...summaryReport,...analytic1,...analytic2,...analytic3,...analytic4]
			console.log(bundledReport)
			setReport(bundledReport)
			setDownloadable(true)
		}

	},[summaryReport,analytic1,analytic2,analytic3,analytic4])

	const handleMenuChange = selected =>{
		setSelectedMenu(selected)
	}

	const DownloadButton = ({loading,...props}) =>(
		<ExcelFile filename={filename} element={<Button loading={loading} key="download-report" type="primary">{!loading && <i className="ti-download"></i>}&nbsp;Unduh laporan</Button>}>
			<ExcelSheet dataSet={report} name="Digipress Report"/>
		</ExcelFile>
	)


	return (
		<LayoutDashboard>
			<NextSeo title="Dashboard"/>
			<Row>
				<Col md={24} sm={24} xs={24}>
					<div className="my-2">
						<PageHeader
							className="p-0"
							title="Laporan"
							subTitle="penggunaaan akun secara keseluruhan"
							extra={[
								<DownloadButton loading={!isDownloadable} key="extra-download-button"/>
							]}
						/>
					</div>
				</Col>
			</Row>
			<AdminSummeryBox onLoad={setSummaryReport}/>
			<Row>
				<Col md={24}>
					<div className="mb-2">
						<AnalyticNav onMenuChange={handleMenuChange}/>
					</div>
				</Col>
			</Row>
			<Row>
				<Col md={14}>
					<AnalyticBox1 selectedMenu={selectedMenu} onLoad={setAnalytic1}/>
				</Col>
				<Col md={10}>
					<Row>
						<Col md={24}>
							<div className="ml-md-2 ml-0">
								<AnalyticBox2 selectedMenu={selectedMenu} pagePath={`/${accountURL}/`} onLoad={setAnalytic2}/>
							</div>
						</Col>
					</Row>
					
				</Col>
			</Row>
			<Row>
				<Col md={12} sm={12} xs={24}>
					<div className="mt-2">
						<AnalyticBox3 selectedMenu={selectedMenu} gaFilters={`main/home/articles/([a-zA-Z0-9\-]+)/$`} label="Top Artikel" description="Artikel paling sering dibaca" onLoad={setAnalytic3}/>
					</div>
				</Col>
				<Col md={12} sm={12} xs={24}>
					<div className="mt-2 ml-md-2 ml-0">
						<AnalyticBox4 selectedMenu={selectedMenu} gaFilters={`main/home/classrooms/([a-zA-Z0-9\-]+)/$`} label="Top Ruang belajar" description="Ruang belajar teraktif" onLoad={setAnalytic4}/>
					</div>
				</Col>
			</Row>
		</LayoutDashboard>
	);
	
}


export default connect(state=>state)(PageDashboard)