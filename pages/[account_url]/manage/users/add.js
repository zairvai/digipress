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
import FormUser from 'Components/FormUser'
import FormUserExisting from 'Components/FormUserExisting'
import { bindPromiseCreators } from 'redux-saga-routines';
import { createUserRoutinePromise} from 'State/routines/user';
import UserController from 'Library/controllers/UserController';
import AppContainer from 'Templates/AppContainer'

const PageUserAdd = props => {

    const userController = new UserController(props)

    const {auth,router,createUser} = props

    const pagename=""
	
    const links = [['Manage',`/${auth.account.uniqueURL}/manage/users`,''],['Users',`/${auth.account.uniqueURL}/manage/users`,'active'],['Add new',`/${auth.account.uniqueURL}/manage/users/add`,'active']]
    
    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'
    
    const onSuccess = user =>{
        //router.push(`/${auth.account.uniqueURL}/manage/users/${user.id}`)	
        router.push(`/${auth.account.uniqueURL}/manage/users`)	
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
                        <Col md={14}>
                            <FormUser accountId={auth.account.id} onSuccess={onSuccess}/>
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
            createUserRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageUserAdd))