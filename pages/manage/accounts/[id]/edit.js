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
import Layout from 'Templates/Layout.account.id'
import AppContainer from 'Templates/AppContainer'
import AccountController from 'Library/controllers/AccountController'

const PageAccountEdit = props => {
    
    const {router,getAccount} = props

	const [item,setItem] = React.useState({})

	const accountController = new AccountController(props)

    const {id} = router.query

    React.useEffect(()=>{
        accountController._get({id})
    },[])

    React.useEffect(()=>{

		if(getAccount.isSuccessFull){
			
			setItem(getAccount.item)

			console.log("loading complete")
		}else{
			console.log("still loading")
		}
	
    },[getAccount.isSuccessFull])

    const links = [['Manage','/manage/accounts',''],['Accounts','/manage/accounts',''],[item.name,`/manage/accounts/${item.id}`,''],["Edit",`/manage/accounts/${item.id}`,'active']]

    return (
        <AppContainer>
            <Layout item={item} links={links}>
                <FormAccount item={item}/>
            </Layout>
        </AppContainer>
    );
	
}
export default connect(state=>state)(withRouter(PageAccountEdit))