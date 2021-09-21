import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import FormUser from 'Components/FormUser'
import LayoutUser from 'Templates/Layout.user'
import UserController from 'Library/controllers/UserController'
import { Row,Col } from 'antd'

import { bindPromiseCreators } from 'redux-saga-routines';
import { getUserRoutinePromise } from 'State/routines/user';

import {NextSeo} from 'next-seo'

const PageUserEdit = props => {
    
    const userController = new UserController(props)

    const {auth,router,getUser,updateUser} = props

    const {id} = React.useMemo(()=>router.query,[])

	const [item,setItem] = React.useState({})

     React.useEffect(async()=>{
        
        const user = await userController._get(id)
        setItem(user.data)
        // console.log(user.data)
        //console.log(getUser.item)

        
    },[id])


    const onSuccess = user =>{
        router.push(`/${auth.account.uniqueURL}/manage/users/${user.id}`)	
    }

    const links = [['Manage',`/${auth.account.uniqueURL}/manage/users`,''],['Users',`/${auth.account.uniqueURL}/manage/users`,''],[item.name,`/${auth.account.uniqueURL}/manage/users/${item.id}`,''],["Edit",`/${auth.account.uniqueURL}/manage/users/${item.id}/edit`,'active']]

    return (
        <LayoutUser>
            <NextSeo title={`Kelola - Ubah anggota - ${item.name}`}/>
        
            <Row>
                <Col md={14} sm={24} xs={24}>
                    <FormUser item={item} onSuccess={onSuccess}/>
                </Col>
            </Row>
        </LayoutUser>
    );
	
}

export default withRouter(connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            getUserRoutinePromise
        },dispatch),dispatch
    })
)(PageUserEdit))
