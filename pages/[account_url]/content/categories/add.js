import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout
} from 'Components/layout'
import { vuroxContext } from 'Context'
import { Row,Col } from 'antd'

import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';
import FormCategory from 'Components/FormCategory'
import { bindPromiseCreators } from 'redux-saga-routines';
import CategoryController from 'Library/controllers/CategoryController';
import AppContainer from 'Templates/AppContainer'

const PageCategoryAdd = props => {

    const categoryController = new CategoryController(props)

    const {auth,router} = props

    const pagename=""
	
    const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Kategori',`/${auth.account.uniqueURL}/content/categories`,''],['Penambahan kategory',`/${auth.account.uniqueURL}/content/categories/add`,'active']]
    
    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'

    const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/categories`)	
    }
    
    const onSuccess = category =>{
        categoryController._updateList("add",category,0)
        router.push(`/${auth.account.uniqueURL}/content/categories`)	
    }

    return (
        <AppContainer>
            <HeaderLayout className="sticky-top">
                <HeaderDark />
            </HeaderLayout>
            <VuroxLayout>
                <VuroxSidebar width={240} className={`sidebar-container  ${toggleClass}`} >
                    <Sidebar className={toggleClass} />
                </VuroxSidebar>
                <ContentLayout width='100%' className='p-3 vurox-scroll-y'>
                    <Summery2 pagename={pagename} links={links}/>
                    <Row>
                        <Col md={10} sm={24} xs={24}>
                            <FormCategory accountId={auth.account.id} onSuccess={onSuccess} onCancel={onCancel}/>
                        </Col>
                    </Row>
                </ContentLayout>
            </VuroxLayout>
        </AppContainer>
    );
	
}
export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
        },dispatch),dispatch
    })
)(withRouter(PageCategoryAdd))