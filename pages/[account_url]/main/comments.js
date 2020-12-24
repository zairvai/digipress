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

import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import AuthController from 'Library/controllers/AuthController'
import CommentController from 'Library/controllers/CommentController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listCommentsRoutinePromise,deleteCommentRoutinePromise } from 'State/routines/comment';

import {NextSeo} from 'next-seo'

const PageComments = props => {

	const {auth,router,listComments} = props

	const commentController = new CommentController(props)

	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")

	const {confirm} = Modal
	
	React.useEffect(()=>{
		
		let accountId = null

		if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

		commentController._list({accountId,orderBy,direction})

	},[])

    const pagename=""
	const links = [['Main',`/${auth.account.uniqueURL}/main/home`,''],['Komentar',`/${auth.account.uniqueURL}/main/comments`,'active']]

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

	
	return (
		<AppContainer>
			<NextSeo title="Komentar"/>
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
								{/* <ul className="vurox-horizontal-links vurox-standard-ul pt-3">
									
								</ul> */}
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={24}>
							{/* <VuroxComponentsContainer>
								<ListComments items={listComments.list.items} foundDoc={listComments.list.foundDocs} onDelete={showDeleteConfirm}/>
							</VuroxComponentsContainer>	 */}
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
				listCommentsRoutinePromise,
				deleteCommentRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageComments))