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
import { getCategoryRoutinePromise } from 'State/routines/category';

import CategoryController from 'Library/controllers/CategoryController';
import AppContainer from 'Templates/AppContainer'

import {NextSeo} from 'next-seo'

const PageCategoryAdd = props => {

    const categoryController = new CategoryController(props)

    const {auth,router} = props

    const {id} = React.useMemo(()=>router.query,[])

	const [item,setItem] = React.useState({})

    const pagename=""
	
    const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Kategori',`/${auth.account.uniqueURL}/content/categories`,''],[item.name,`/${auth.account.uniqueURL}/content/categories/${item.id}/edit`,''],["Ubah",`/${auth.account.uniqueURL}/content/categories/${item.id}/edit`,'active']]
    
    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'

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
        <AppContainer>
            <NextSeo title={`Konten - Ubah kategori - ${item.name}`}/>
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
                            <FormCategory item={item} accountId={auth.account.id} onSuccess={onSuccess} onCancel={onCancel}/>
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
                getCategoryRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageCategoryAdd))