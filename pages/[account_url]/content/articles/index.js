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
import ListTags from 'Components/ListTags'
import AppContainer from 'Templates/AppContainer'
import ArticleController from 'Library/controllers/ArticleController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listTagsRoutinePromise,deleteTagRoutinePromise } from 'State/routines/tag';

const PageArticles = props => {

	const {auth,router,listTags} = props

	const articleController = new ArticleController(props)

	const {confirm} = Modal
	
	React.useEffect(async ()=>{
		
		try{
			await listItems({accountId:auth.account.id})
		}catch(error){
			console.log(error)
		}

	},[])

	const listItems = async ({accountId,name=false,orderBy="createdAt",direction="asc",from=0,size=50}) => {

        try{

            await articleController._list({
                accountId,
                name,
                orderBy,
                direction,
                from,size})

        }catch(error){
            console.log(error)
        }

    }

    const pagename=""
	const links = [['Content',`/${auth.account.uniqueURL}/content/classrooms`,''],['Articles',`/${auth.account.uniqueURL}/content/articles`,'active']]

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
									<li className="p-0"><Link href={{pathname:`/${auth.account.uniqueURL}/content/articles/add`}} shallow><a><i className="ti-plus"></i>&nbsp;Tambah Article</a></Link></li>
								</ul>
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={24}>
							<VuroxComponentsContainer>
								{/* <ListTags items={listTags.list.items} foundDoc={listTags.list.foundDocs} onDelete={onDeleteItem}/> */}
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
				listTagsRoutinePromise,
				deleteTagRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageArticles))