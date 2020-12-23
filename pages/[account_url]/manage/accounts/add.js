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
import { Row, Col} from 'antd'
import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';
import FormAccount from 'Components/FormAccount'
import AppContainer from 'Templates/AppContainer'
import AccountController from 'Library/controllers/AccountController'

import {NextSeo} from 'next-seo'

const PageAccountAdd = props => {

    const {auth,router} = props

    const accountController= new AccountController(props)

    const pagename=""
	
    const links = [['Kelola',`/${auth.account.uniqueURL}/manage/accounts`,''],['Akun',`/${auth.account.uniqueURL}/manage/accounts`,''],['Penambahan akun',`/${auth.account.uniqueURL}/manage/accounts/add`,'active']]
    
    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'

    
    const onSuccess = account =>{
        accountController._updateList("add",account,0)
        router.push(`/${auth.account.uniqueURL}/manage/accounts/${account.id}`)	
    }

    const onCancel = () =>{
        router.push(`/${auth.account.uniqueURL}/manage/accounts`)
    }

    return (
        <AppContainer>
            <NextSeo title="Kelola - Tambah akun"/>
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
                        <Col md={14} sm={24} xs={24}>
                            <FormAccount onSuccess={onSuccess} onCancel={onCancel}/>
                        </Col>
                    </Row>
                </ContentLayout>
            </VuroxLayout>
        </AppContainer>
    );
	
}
export default connect(state=>state)(withRouter(PageAccountAdd))