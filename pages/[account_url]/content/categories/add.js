import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row, Col, PageHeader} from 'antd'
import FormCategory from 'Components/FormCategory'
import { bindPromiseCreators } from 'redux-saga-routines';
import LayoutCategory from 'Templates/Layout.category'
import CategoryController from 'Library/controllers/CategoryController';

import {NextSeo} from 'next-seo'

const PageCategoryAdd = props => {

    const categoryController = new CategoryController(props)

    const {auth,router} = props

    // const pagename=""
	
    // const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Kategori',`/${auth.account.uniqueURL}/content/categories`,''],['Penambahan kategory',`/${auth.account.uniqueURL}/content/categories/add`,'active']]

    const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/categories`)	
    }
    
    const onSuccess = category =>{
        categoryController._updateList("add",category,0)
        router.push(`/${auth.account.uniqueURL}/content/categories`)	
    }

    return (
        <LayoutCategory>
            <NextSeo title="Konten - Tambah kategori"/>
            <Row>
				<Col md={10} sm={24} xs={24}>
					<PageHeader title="Tambah kategori" ghost={false}
						onBack={()=>router.push(`/[account_ur]/content/categories`,`/${auth.account.uniqueURL}/content/categories`,{shallow:true})}
					/>
				</Col>
			</Row>
            <Row>
                <Col md={10} sm={24} xs={24} className="mt-2">
                    <FormCategory accountId={auth.account.id} onSuccess={onSuccess} onCancel={onCancel}/>
                </Col>
            </Row>      
        </LayoutCategory>
    );
	
}
export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
        },dispatch),dispatch
    })
)(withRouter(PageCategoryAdd))