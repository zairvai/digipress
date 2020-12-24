import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'

import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import VuroxFormSearch from 'Components/search'
import { vuroxContext } from 'Context'
import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';
import { Row, Col,Modal} from 'antd'
import { Search} from 'react-bootstrap-icons'
import AuthController from 'Library/controllers/AuthController'
import ListUsers from 'Components/ListUsers'
import AppContainer from 'Templates/AppContainer'
import FormUser from 'Components/FormUser'
import FormUserExisting from 'Components/FormUserExisting'

import {NextSeo} from 'next-seo'

const PageListUser = props => {

    const {auth} = props

    const pagename=""
	const links = [['Kelola',`/${auth.account.uniqueURL}/manage/users`,''],['Anggota saya',`/${auth.account.uniqueURL}/manage/users`,'active']]

    const { menuState } = React.useContext(vuroxContext)
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'

    const [addVisible,setAddVisible] = React.useState(false)

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
        <AppContainer>
            <NextSeo title="Kelola - Anggota"/>
            <HeaderLayout className="sticky-top">
                <HeaderDark />
            </HeaderLayout>
            <VuroxLayout>
                <VuroxSidebar width={240} className={`sidebar-container  ${toggleClass}`} >
                    <Sidebar className={toggleClass} />
                </VuroxSidebar>
                <ContentLayout width='100%' className='p-3 vurox-scroll-y'>
                    <Summery2 pagename={pagename} links={links}/>

                    <Modal
                        title={`Tambah Pengguna ${auth.account.name}`}
                        centered
                        footer={null}
                        bodyStyle={{padding:0}}
                        onCancel={()=>setAddVisible(false)} 
                        visible={addVisible}
                        keyboard={false}
                        mask={false}
                        maskClosable={false}
                        width={500}>

                        {/* <Tabs className="formTab" defaultActiveKey="1">
                            <TabPane tab="Pengguna baru" key="1"> */}
                                <Row>
                                    <Col md={24}>
                                        <FormUser 
                                            accountId={auth.account.id}
                                            //onSuccess={onSuccessAdd}
                                            onCancel={()=>setAddVisible(false)} 
                                            onOk={()=>setAddVisible(false)}/>

                                    </Col>
                                </Row>
                            {/* </TabPane>
                            <TabPane tab="Pengguna lama" key="2">
                                <Row>
                                    <Col md={24}>
                                        <FormUserExisting></FormUserExisting>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs> */}
                    </Modal>
                    
                    <Row className="mb-2">
                        <Col md={12}>
                            <VuroxFormSearch border='rounded-pill border-0' placeholder='Search...' icon={<Search />} className="mr-2"/>
                        </Col>
                        <Col md={12}>
                            <div className="fright">
                                <ul className="vurox-horizontal-links vurox-standard-ul pt-3">
                                    {/* <li className="p-0"><Button onClick={showForm} className="link" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp; Tambah pengguna</Button></li> */}
                                    <li className="p-0"><Link href={{pathname:`/${auth.account.uniqueURL}/manage/users/add`}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah anggota</a></Link></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <VuroxComponentsContainer>
                                <ListUsers currentAccount={auth.account} roleListInput={getRoleListInput()}/>
                            </VuroxComponentsContainer>	
                        </Col>
                    </Row>
                </ContentLayout>
            </VuroxLayout>
        </AppContainer>
    );

}
export default connect(state=>state)(PageListUser)