import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row,Col,PageHeader} from 'antd'
import FormTag from 'Components/FormTag'
import { bindPromiseCreators } from 'redux-saga-routines'
import LayoutTag from 'Templates/Layout.tag'

import {NextSeo} from 'next-seo'

const PageTagAdd = props => {

    const {auth,router} = props
	
    // const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Tag',`/${auth.account.uniqueURL}/content/tags`,''],['Penambahan tag',`/${auth.account.uniqueURL}/content/tags/add`,'active']]


    const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/tags`)	
    }
    
    const onSuccess = tag =>{
        router.push(`/${auth.account.uniqueURL}/content/tags`)	
    }

    return (
        <LayoutTag>
            <NextSeo title="Konten - Tambah tag" />
            <Row>
				<Col md={10} sm={24} xs={24}>
					<PageHeader title="Tambah tag" ghost={false}
						onBack={()=>router.push(`/[account_ur]/content/tags`,`/${auth.account.uniqueURL}/content/tags`,{shallow:true})}
					/>
				</Col>
			</Row>
            <Row>
                <Col md={10} sm={24} xs={24} className="mt-2">
                    <FormTag accountId={auth.account.id} onSuccess={onSuccess} onCancel={onCancel}/>
                </Col>
            </Row>
        
        </LayoutTag>
    );
	
}
export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
        },dispatch),dispatch
    })
)(withRouter(PageTagAdd))