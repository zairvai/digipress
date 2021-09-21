import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import FormAccount from 'Components/FormAccount'
import LayoutAccount from 'Templates/Layout.account'
import { Row, Col,PageHeader} from 'antd'
import AccountController from 'Library/controllers/AccountController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getAccountRoutinePromise} from 'State/routines/account';
import {NextSeo} from 'next-seo'

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

    // const links = [['Kelola',`/${auth.account.uniqueURL}/manage/accounts`,''],['Akun',`/${auth.account.uniqueURL}/manage/accounts`,''],[item.name,`/${auth.account.uniqueURL}/manage/accounts/${item.id}`,''],["Ubah",`/${auth.account.uniqueURL}/manage/accounts/${item.id}/edit`,'active']]

    return (
        <LayoutAccount>
            <NextSeo title={`Kelola - Ubah akun - ${item.name}`}/>
            <Row>
				<Col md={14}>
					<PageHeader title="Ubah akun" subTitle={item.name} ghost={false}
						onBack={()=>router.push(`/[account_ur]/manage/accounts/[id]`,`/${auth.account.uniqueURL}/manage/accounts/${item.id}`,{shallow:true})}
					/>
				</Col>
			</Row>
            
            <Row>
                <Col md={14} sm={24} xs={24} className="mt-2">
                    <FormAccount item={item} onSuccess={onSuccess} onCancel={onCancel}/>
                </Col>
            </Row>
            
        </LayoutAccount>
    );
	
}

export default withRouter(connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
            getAccountRoutinePromise
        },dispatch),dispatch
    })
)(PageAccountEdit))