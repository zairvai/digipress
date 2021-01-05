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

						<Panel header="Siapa saja yang dapat membuat artikel dan ruang belajar" key="20">
							<p>Hanya pemilik akun pesantren, admin dan tutor yang dapat membuat artikel dan ruang belajar</p>
						</Panel>

						<Panel header="Bagaimana cara membuat artikel" key="8">
							<p>Ke halaman artikel lalu klik tombol 'tambah' artikel</p>
						</Panel>
						<Panel header="Bagaimana cara mengubah artikel" key="9">
							<p>Ke halaman artikel lalu klik artikel yang mau diubah lalu klik tombol 'ubah' artikel</p>
						</Panel>
						<Panel header="Bagaimana cara menghapus artikel" key="10">
							<p>Ke halaman artikel lalu klik artikel yang mau dihapus lalu klik tombol 'hapus' artikel</p>
						</Panel>
						<Panel header="Bagaimana cara membuat ruang belajar" key="11">
							<p>Ke halaman ruang belajar lalu klik tombol 'tambah' ruang belajar</p>
						</Panel>
						<Panel header="Bagaimana cara mengubah ruang belajar" key="12">
							<p>Ke halaman ruang belajar lalu klik ruang belajar yang mau diubah lalu klik tombol 'ubah' ruang belajar</p>
						</Panel>
						<Panel header="Bagaimana cara menghapus ruang belajar" key="13">
							<p>Ke halaman ruang belajar lalu klik ruang belajar yang mau dihapus lalu klik tombol 'hapus' ruang belajar</p>
						</Panel>

						<Panel header="Bagaimana cara membuat materi" key="14">
							<p>Ke halaman ruang belajar lalu klik ruang belajar yang akan ditambahkan materi lalu klik tombol 'tambah' materi</p>
						</Panel>

						<Panel header="Bagaimana cara mengubah materi" key="15">
							<p>Ke halaman ruang belajar lalu klik ruang belajar yang akan diubah materinya dan klik materi tersebut lalu klik tombol 'ubah' materi</p>
						</Panel>
						
						<Panel header="Bagaimana cara menghapus materi" key="16">
							<p>Ke halaman ruang belajar lalu klik ruang belajar yang akan dihapus materinya dan klik materi tersebut lalu klik tombol 'hapus' materi</p>
						</Panel>

						<Panel header="Bagaimana cara mengirim komentar" key="17">
							<p>Ke halaman home lalu klik artikel yang akan dikirim komentar</p>
						</Panel>


						<Panel header="Bagaimana cara mengirim pertanyaan pada ruang belajar" key="18">
							<p>Ke halaman home lalu klik ruang belajar dan pilih materi yang akan dikirim pertanyaan</p>
						</Panel>

						<Panel header="Bagaimana cara menjawab pertanyaan" key="19">
							<p>Ke halaman ruang belajar lalu klik ruang belajar dan pilih materi dan pilih pertanyaan yang akan dijawab</p>
						</Panel>

				</Collapse>
				</Col>
			</Row>

			
		</LayoutFaq>
	);
	
}


export default connect(state=>({auth:state.auth}))(PageFaq)