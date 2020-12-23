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
import ListCategories from 'Components/ListCategories'
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import AuthController from 'Library/controllers/AuthController'
import CategoryController from 'Library/controllers/CategoryController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listCategoriesRoutinePromise,deleteCategoryRoutinePromise } from 'State/routines/category';

import {NextSeo} from 'next-seo'

const PageCategories = props => {

	const {auth,router,listCategories} = props

	const categoryController = new CategoryController(props)

	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")

	const {confirm} = Modal

	React.useEffect(()=>{
			
		let accountId = null

		if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

		categoryController._list({accountId,orderBy,direction})
	

	},[])

    const pagename=""
	const links = [['Konten',`/${auth.account.uniqueURL}/content/classrooms`,''],['Kategori',`/${auth.account.uniqueURL}/content/categories`,'active']]

	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'
	  
	const onDeleteItem = (item,index) => {
        showDeleteConfirm(item,index)
    }

    const showDeleteConfirm = (item,index) => {

        confirm({
          title: `Kemungkinan category ini digunakan pada artikel/classroom. Apakah kamu ingin menghapus ?`,
          icon: <ExclamationCircleOutlined />,
          content: item.name,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

			categoryController._delete(item.id)
				.then(resp=>categoryController._updateList("remove",[item],index))
				.catch(error=>console.log(error))

          },
          onCancel() {
            console.log('Cancel');
          },
        });
	}
	
	return (
		<AppContainer>
			<NextSeo title="Konten - Kategori"/>
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
									{/* <li className="p-0"><Button className="link" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp; Tambah category</Button></li> */}
									{
										Permission.ADD_CATEGORY({auth}) && <li className="p-0"><Link href={{pathname:`/${auth.account.uniqueURL}/content/categories/add`}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah Category</a></Link></li>
									}
								</ul>
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={24}>
							<VuroxComponentsContainer>
								<ListCategories items={listCategories.list.items} foundDoc={listCategories.list.foundDocs} onDelete={onDeleteItem}/>
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
				listCategoriesRoutinePromise,
				deleteCategoryRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageCategories))