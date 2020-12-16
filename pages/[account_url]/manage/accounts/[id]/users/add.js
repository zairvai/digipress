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
import { getAccountRoutinePromise} from 'State/routines/account';
import AuthController from 'Library/controllers/AuthController';
import AccountController from 'Library/controllers/AccountController'
import UserController from 'Library/controllers/UserController'
import AppContainer from 'Templates/AppContainer'

const PageUserAdd = props => {

    const {auth,router} = props
    const [item,setItem] = React.useState({})
    const {id} = React.useMemo(()=>router.query,[])

    const accountController = new AccountController(props)
    const userController= new UserController(props)
    
    const pagename=""
	const links = [['Kelola',`/${auth.account.uniqueURL}/manage/accounts`,''],['Akun',`/${auth.account.uniqueURL}/manage/accounts`,''],[item.name,`/${auth.account.uniqueURL}/manage/accounts/${item.id}`,''],['Penambahan pengguna',`/${auth.account.uniqueURL}/manage/accounts/${item.id}/users/add`,'active']]
    
    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'


    React.useEffect(async()=>{

        const account = await accountController._get(id)
        setItem(account.data)


    },[id])

    const getRoleInputs = () =>{

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)){
            return [
                {value:"owner",name:"Owner"},
                {value:"admin",name:"Admin"},
                {value:"tutor",name:"Tutor"},
                {value:"student",name:"Student"}
            ]
        }

        return []
    }

    const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/manage/accounts/${item.id}`)
    }
    const onSuccess = user =>{	
        userController._updateList("add",user,0)
        router.push(`/${auth.account.uniqueURL}/manage/accounts/${item.id}`)	
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
                            <FormUser accountId={item.id} onSuccess={onSuccess} onCancel={onCancel} roleInputs={getRoleInputs()}/>
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
            getAccountRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageUserAdd))