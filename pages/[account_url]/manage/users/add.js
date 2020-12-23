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
import AuthController from 'Library/controllers/AuthController';
import UserController from 'Library/controllers/UserController';
import AppContainer from 'Templates/AppContainer'

import {NextSeo} from 'next-seo'

const PageUserAdd = props => {

    const userController = new UserController(props)

    const {auth,router,createUser} = props

    const pagename=""
	
    const links = [['Kelola',`/${auth.account.uniqueURL}/manage/users`,''],['Anggota',`/${auth.account.uniqueURL}/manage/users`,''],['Penambahan anggota',`/${auth.account.uniqueURL}/manage/users/add`,'active']]
    
    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'
    
    const getRoleInputs = () =>{

        if(AuthController.isAppAdmin(auth)) return []// donot allow app admin to manage current account user

        if(AuthController.isAppOwner(auth)){
            return [
                {value:"admin",name:"Admin"}
            ]
        }else if(AuthController.isOwner(auth)){
            return [
                {value:"admin",name:"Admin"},
                {value:"tutor",name:"Tutor"},
                {value:"student",name:"Student"}
            ]
        }
        else if(AuthController.isAdmin(auth)){
            return [
                {value:"tutor",name:"Tutor"},
                {value:"student",name:"Student"}
            ]
        }

        return []
    }

    const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/manage/users`)	
    }
    
    const onSuccess = user =>{
        userController._updateList("add",user,0)
        router.push(`/${auth.account.uniqueURL}/manage/users`)	
    }

    return (
        <AppContainer>
            <NextSeo title="Kelola - Tambah anggota"/>
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
                            <FormUser accountId={auth.account.id} roleInputs={getRoleInputs()} onSuccess={onSuccess} onCancel={onCancel}/>
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
)(withRouter(PageUserAdd))