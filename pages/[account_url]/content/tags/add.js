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
import FormTag from 'Components/FormTag'
import { bindPromiseCreators } from 'redux-saga-routines';
import TagController from 'Library/controllers/TagController';
import AppContainer from 'Templates/AppContainer'

const PageTagAdd = props => {

    const tagController = new TagController(props)

    const {auth,router} = props

    const pagename=""
	
    const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Tag',`/${auth.account.uniqueURL}/content/tags`,''],['Penambahan tag',`/${auth.account.uniqueURL}/content/tags/add`,'active']]
    
    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'

    const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/tags`)	
    }
    
    const onSuccess = tag =>{
        // tagController._updateList("add",tag,0)
        router.push(`/${auth.account.uniqueURL}/content/tags`)	
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
                            <FormTag accountId={auth.account.id} onSuccess={onSuccess} onCancel={onCancel}/>
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
)(withRouter(PageTagAdd))