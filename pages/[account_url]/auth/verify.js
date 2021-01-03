import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row,Col,PageHeader} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines'
import Layout from 'Templates/Layout.app'
import FormVerify from 'Components/FormAuthVerify'
import FormVerifySubmit from 'Components/FormAuthVerifySubmit'
import {NextSeo} from 'next-seo'

const PageAuth = props => {

    const {auth,router} = props

    const [isCodeSent,setCodeSent] = React.useState(false)
    
    const handleSuccessVerify = resp =>{
        setCodeSent(true)
        console.log(resp)
    }

    const handleSuccessSubmitCode = resp=>{
        router.push("/[account_url/main/home/",`/${auth.account.uniqueURL}/main/home`,{shallow:true})
    }
    return (
        <Layout>
            <NextSeo title="Verifikasi Email" />
            <Row>
				<Col md={10} sm={24} xs={24}>
					<PageHeader title="Verifikasi Email" subTitle="Untuk keamanan akun dan password." ghost={false}/>
				</Col>
			</Row>
            <Row>
                <Col md={10} sm={24} xs={24}>
                    {!isCodeSent ? 
                        <FormVerify emailAddress={auth.user.email} onSuccess={handleSuccessVerify}/>
                    :
                        <FormVerifySubmit emailAddress={auth.user.email} onSuccess={handleSuccessSubmitCode} />
                    }
                </Col>
            </Row>
        
        </Layout>
    );
	
}
export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
        },dispatch),dispatch
    })
)(withRouter(PageAuth))