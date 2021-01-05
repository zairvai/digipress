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
							<p>Dengan membuka halaman https://digipress.id/[nama_akun]</p>
							<p>[nama_akun] adalah nama unik URL untuk setiap pesantren yang telah didaftarkan oleh Admin Bakti Kominfo.</p>
						</Panel>
						<Panel header="Kenapa harus dengan alamat email yang benar" key="3">
							<p>Dengan memasukan alamat email yang benar, maka sistem digipress dapat melindungi anda dari lupa password dan kendala dalam menggunakan fiturnya.</p>
						</Panel>
						<Panel header="Kenapa saya harus verifikasi alamat email" key="4">
							<p>Verifikasi email diperlukan sebagai standar keamanan data pengguna. Pada saat lupa password, hanya email terverifikasi yang dapat melakukan  perbaikan password.</p>
						</Panel>
						<Panel header="Bagaimana melakukan verifikasi alamat email" key="5">
							<p>Setelah login, akan ada tanda bell nofitikasi di kanan atas, silahkan klik tanda tersebut dan klik tautan verifikasi email. dan selanjutnya ikuti proses yang diarahkan.</p>
						</Panel>
						<Panel header="Apa yang harus dilakukan saat lupa password" key="6">
							<p>Pada form login, silahkan klik tautan 'lupa password' lalu masukan alamat email yang sudah diverifikasi. Selanjutnya kode keamanan untuk mengganti password dikirim ke alamat email tersebut. Lalu masukan kode tersebut pada saat penggantian password.</p>
						</Panel>
						<Panel header="Kode penggantian password tidak sampai ke alamat email" key="7">
							<p>Kode keamanan mungkin bisa langsung masuk kotak 'inbox'. Jika tidak ada silahkan cek juga di kotak 'spam'</p>
						</Panel>
				</Collapse>
				</Col>
			</Row>

			
		</LayoutFaq>
	);
	
}


export default connect(state=>({auth:state.auth}))(PageFaq)