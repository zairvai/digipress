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
import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';

import FormAccount from 'Components/FormAccount'
import AppContainer from 'Templates/AppContainer'
import AccountController from 'Library/controllers/AccountController'

const PageAccountAdd = props => {
    
    const accountController = new AccountController(props)

    const {router,createAccount} = props

    const pagename=""
	const links = [['Manage','/manage/accounts',''],['Accounts','/manage/accounts',''],['Add new','/manage/accounts/add','active']]
	
    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'
    
    React.useEffect(()=>{

		if(createAccount.isSuccessFull){

            const item = createAccount.item
            
            accountController._updateList("add",[item]).then(success=>{
                console.log(success)
                router.push(`/manage/accounts/${item.id}`)	
            }).catch(error=>console.log(error))
			
        }		
        
        return(()=>{
            accountController._createInit()
        })
        
	},[createAccount.isSuccessFull])

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
                    <FormAccount/>
                </ContentLayout>
            </VuroxLayout>
        </AppContainer>
    );
	
}
export default connect(state=>state)(withRouter(PageAccountAdd))