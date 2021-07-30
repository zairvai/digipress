import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import LayoutUser from 'Templates/Layout.user'
import { Row, Col, PageHeader,Button} from 'antd'
import AuthController from 'Library/controllers/AuthController'
import ListUsers from 'Components/ListUsers'

import {NextSeo} from 'next-seo'

const PageListUser = props => {

    const {auth} = props

    // const pagename=""
	// const links = [['Kelola',`/${auth.account.uniqueURL}/manage/users`,''],['Anggota saya',`/${auth.account.uniqueURL}/manage/users`,'active']]

    const getRoleListInput = () =>{

        if(AuthController.isAppAdmin(auth)) return []// donot allow app admin to manage current account user

        if(AuthController.isAppOwner(auth)){
            return ["admin"]
        }else if(AuthController.isOwner(auth)){
            return ["admin","tutor","student","member"]
        }
        else if(AuthController.isAdmin(auth)){
            return ["tutor","student","member"]
        }

        return []
    }

    return (
        <LayoutUser>
            <NextSeo title="Kelola - Anggota"/>
                    
            <Row>
				<Col md={24}>
					
					<PageHeader title="Kelola anggota" ghost={false}
						extra={[
							<div key="1">
								<Link href={`/${auth.account.uniqueURL}/manage/users/add`} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Tambah anggota</Button></Link>
							</div>
						]}
					/>
					
				</Col>
			</Row>
            <Row>
                <Col md={24}>
                    <VuroxComponentsContainer>
                        <ListUsers currentAccount={auth.account} roleListInput={getRoleListInput()}/>
                    </VuroxComponentsContainer>	
                </Col>
            </Row>
              
        </LayoutUser>
    );

}
export default connect(state=>({auth:state.auth}))(PageListUser)