import React from 'react'
import {connect} from 'react-redux'
import LayoutFaq from 'Templates/Layout.faq'
import {NextSeo} from 'next-seo'
import {Row,Col,PageHeader,Collapse} from 'antd'

const PageFaq = props => {

	const {Panel} = Collapse

	const {auth} = props

	return (
		<LayoutFaq>
			<NextSeo title="Faq"/>
			
			<Row>
				<Col md={24}>
					<PageHeader title="Frequently Asked Questions" ghost={false}/>
				</Col>
			</Row>
			<Row>
				<Col md={24}>
					<Collapse defaultActiveKey={['1']}>
						<Panel header="Apa itu digipress Pesantren" key="1">
							<p>Sebuah konsep portal guna membantu memberikan informasi mengenai pesantren kepada masyarakat luas serta membantu pesantren untuk menyebarkan pandangan dan keilmuan mereka melalui artikel dan diskusi yang difasilitasi portal tersebut.</p>
						</Panel>
						<Panel header="Bagaimana cara login digipress" key="2">
							<p>Dengan membuka halaman https://digipress.id/[nama_akun]/auth/login</p>
							<p>[nama_akun] adalah nama unik URL untuk setiap pesantren yang telah didaftarkan oleh Admin Bakti Kominfo. Nama tersebut</p>
						</Panel>
						
				</Collapse>
				</Col>
			</Row>

			
		</LayoutFaq>
	);
	
}


export default connect(state=>({auth:state.auth}))(PageFaq)