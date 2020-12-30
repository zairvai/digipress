import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import LayoutAccount from 'Templates/Layout.account'
import { Row, Col,PageHeader} from 'antd'
import FormAccount from 'Components/FormAccount'
import AccountController from 'Library/controllers/AccountController'

import {NextSeo} from 'next-seo'

const PageAccountAdd = props => {

    const {auth,router} = props

    const accountController= new AccountController(props)

	
    // const links = [['Kelola',`/${auth.account.uniqueURL}/manage/accounts`,''],['Akun',`/${auth.account.uniqueURL}/manage/accounts`,''],['Penambahan akun',`/${auth.account.uniqueURL}/manage/accounts/add`,'active']]
    

    const onSuccess = account =>{
        router.push(`/${auth.account.uniqueURL}/manage/accounts/${account.id}`)	
    }

    const onCancel = () =>{
        router.push(`/${auth.account.uniqueURL}/manage/accounts`)
    }

    return (
        <LayoutAccount>
            <NextSeo title="Kelola - Tambah akun"/>
            <Row>
				<Col md={14}>
					<PageHeader title="Tambah akun" ghost={false}
						onBack={()=>router.push(`/[account_ur]/manage/accounts`,`/${auth.account.uniqueURL}/manage/accounts`,{shallow:true})}
					/>
				</Col>
			</Row>
            <Row>
                <Col md={14} sm={24} xs={24} className="mt-2">
                    <FormAccount onSuccess={onSuccess} onCancel={onCancel}/>
                </Col>
            </Row>
              
        </LayoutAccount>
    );
	
}
export default connect(state=>({auth:state.auth}))(withRouter(PageAccountAdd))