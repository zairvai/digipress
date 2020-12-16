import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
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
import { Row, Col,Button, Modal} from 'antd'
import { Search} from 'react-bootstrap-icons'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListClassrooms from 'Components/ListClassrooms'
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import AuthController from 'Library/controllers/AuthController'
import ClassroomController from 'Library/controllers/ClassroomController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listClassroomsRoutinePromise } from 'State/routines/classroom';

const PageClassrooms = props => {

	console.log(props)
	
	const {auth,router,listClassrooms} = props

	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")
	
	const classroomController = new ClassroomController(props)

	
	const {confirm} = Modal

	React.useEffect(()=>{
			
		let accountId = null

		if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

		classroomController._list({accountId,orderBy,direction})
	
	},[])

    const pagename=""
	const links = [['Content',`/${auth.account.uniqueURL}/content/classrooms`,''],['Classrooms',`/${auth.account.uniqueURL}/content/classrooms`,'active']]

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'
	  
	const onDeleteItem = (item,index) => {
        showDeleteConfirm(item,index)
    }

    const showDeleteConfirm = (item,index) => {

        confirm({
          title: `Kemungkinan tag ini digunakan pada artikel/classroom. Apakah kamu ingin menghapus ?`,
          icon: <ExclamationCircleOutlined />,
          content: item.name,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

			tagController._delete(item.id)
				.then(resp=>tagController._updateList("remove",[item],index))
				.catch(error=>console.log(error))

          },
          onCancel() {
            console.log('Cancel');
          },
        });
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
					<Row className="mb-2">
						<Col md={12} sm={24} xs={24}>
							<VuroxFormSearch border='rounded-pill border-0' placeholder='Search...' icon={<Search />}/>
						</Col>
						<Col md={12}>
							<div className="fright">
								<ul className="vurox-horizontal-links vurox-standard-ul pt-3">
									{ Permission.ADD_ARTICLE({auth}) && <li className="p-0"><Link href={{pathname:`/${auth.account.uniqueURL}/content/classrooms/add`}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah Classroom</a></Link></li>}
								</ul>
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={24}>
							<VuroxComponentsContainer>
								<ListClassrooms items={listClassrooms.list.items} foundDoc={listClassrooms.list.foundDocs} onDelete={onDeleteItem}/>
							</VuroxComponentsContainer>	
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
				listClassroomsRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageClassrooms))