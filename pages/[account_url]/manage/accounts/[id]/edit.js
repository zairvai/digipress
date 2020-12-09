import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import FormAccount from 'Components/FormAccount'
import Layout from 'Templates/Layout.account.id'
import AppContainer from 'Templates/AppContainer'
import AccountController from 'Library/controllers/AccountController'
import { appContext } from 'Context/app'

const PageAccountEdit = props => {
    
    const accountController = new AccountController(props)

    const {router,getAccount,updateAccount} = props

    const { baseUrl } = React.useContext(appContext)

	const [item,setItem] = React.useState({})

    const {id} = router.query

    React.useEffect(()=>{
        accountController._get(id)
    },[])
    
    React.useEffect(()=>{
		if(getAccount.isSuccessFull) setItem(getAccount.item)
    },[getAccount.isSuccessFull])


    const onSuccess = account =>{
        router.push(`${baseUrl}/manage/accounts/${account.id}`)	
    }

    const links = [['Manage',`${baseUrl}/manage/accounts`,''],['Accounts',`${baseUrl}/manage/accounts`,''],[item.name,`${baseUrl}/manage/accounts/${item.id}`,''],["Edit",`${baseUrl}/manage/accounts/${item.id}`,'active']]

    return (
        <AppContainer>
            <Layout item={item} links={links}>
                <FormAccount item={item} onSuccess={onSuccess}/>
            </Layout>
        </AppContainer>
    );
	
}
export default connect(state=>state)(withRouter(PageAccountEdit))