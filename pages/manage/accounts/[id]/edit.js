import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import FormAccount from 'Components/FormAccount'
import Layout from 'Templates/Layout.account.id'
import AppContainer from 'Templates/AppContainer'
import AccountController from 'Library/controllers/AccountController'

const PageAccountEdit = props => {
    
    const accountController = new AccountController(props)

    const {router,getAccount,updateAccount} = props

	const [item,setItem] = React.useState({})

    const {id} = router.query

    React.useEffect(()=>{
        accountController._get(id)
    },[])

    React.useEffect(()=>{

		if(updateAccount.isSuccessFull){

            const item = updateAccount.item
			router.push(`/manage/accounts/${item.id}`)	
        }		
        
        return(()=>{
            accountController._updateInit()
        })
        
    },[updateAccount.isSuccessFull])
    
    React.useEffect(()=>{
		if(getAccount.isSuccessFull) setItem(getAccount.item)
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