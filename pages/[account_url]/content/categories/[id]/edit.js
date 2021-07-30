import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row, Col, PageHeader} from 'antd'
import FormCategory from 'Components/FormCategory'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getCategoryRoutinePromise } from 'State/routines/category';
import LayoutCategory from 'Templates/Layout.category'
import CategoryController from 'Library/controllers/CategoryController';

import {NextSeo} from 'next-seo'

const PageCategoryAdd = props => {

    const categoryController = new CategoryController(props)

    const {auth,router} = props

    const {id} = React.useMemo(()=>router.query,[])

	const [item,setItem] = React.useState({})
	
    // const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Kategori',`/${auth.account.uniqueURL}/content/categories`,''],[item.name,`/${auth.account.uniqueURL}/content/categories/${item.id}/edit`,''],["Ubah",`/${auth.account.uniqueURL}/content/categories/${item.id}/edit`,'active']]

    React.useEffect(async()=>{
        
        const category = await categoryController._get(id)
        setItem(category.data)

        
    },[id])

    const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/categories`)	
    }
    
    const onSuccess = category =>{
        // categoryController._updateList("add",category,0)
        router.push(`/${auth.account.uniqueURL}/content/categories`)	
    }

    return (
        <LayoutCategory>
            <NextSeo title={`Konten - Ubah kategori - ${item.name}`}/>
            <Row>
				<Col md={10} sm={24} xs={24}>
					<PageHeader title="Ubah kategori" subTitle={item.name} ghost={false}
						onBack={()=>router.push(`/[account_ur]/content/categories`,`/${auth.account.uniqueURL}/content/categories`,{shallow:true})}
					/>
				</Col>
			</Row>
            <Row>
                <Col md={10} sm={24} xs={24} className="mt-2">
                    <FormCategory item={item} accountId={auth.account.id} onSuccess={onSuccess} onCancel={onCancel}/>
                </Col>
            </Row>
                
        </LayoutCategory>
    );
	
}
export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
                getCategoryRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageCategoryAdd))