import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import FormAccount from 'Components/FormAccount'
import Layout from 'Templates/Layout.account.id'
import { Row, Col} from 'antd'
import AppContainer from 'Templates/AppContainer'
import AccountController from 'Library/controllers/AccountController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getAccountRoutinePromise} from 'State/routines/account';

const PageAccountEdit = props => {
    
    const accountController = new AccountController(props)

    const {auth,router} = props

	const [item,setItem] = React.useState({})

    const {id} = React.useMemo(()=>router.query,[])

    React.useEffect(async ()=>{
        const account = await accountController._get(id)
        setItem(account.data)
    },[])


    const onSuccess = account =>{
        router.push(`/${auth.account.uniqueURL}/manage/accounts/${account.id}`)	
    }

    const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/manage/accounts/${id}`)
    }

    const links = [['Kelola',`/${auth.account.uniqueURL}/manage/accounts`,''],['Akun',`/${auth.account.uniqueURL}/manage/accounts`,''],[item.name,`/${auth.account.uniqueURL}/manage/accounts/${item.id}`,''],["Ubah",`/${auth.account.uniqueURL}/manage/accounts/${item.id}/edit`,'active']]

    return (
        <AppContainer>
            <Layout item={item} links={links}>
                <Row>
                    <Col md={14} sm={24} xs={24}>
                        <FormAccount item={item} onSuccess={onSuccess} onCancel={onCancel}/>
                    </Col>
                </Row>
            </Layout>
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
)(withRouter(PageAccountEdit))