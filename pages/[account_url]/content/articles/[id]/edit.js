import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout
} from 'Components/layout'
import { Row, Col,Modal,PageHeader,Button} from 'antd'
import { vuroxContext } from 'Context'
import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';
import LayoutArticle from 'Templates/Layout.article'
import FormArticle from 'Components/FormArticle'

import CategoryController from 'Library/controllers/CategoryController'
import TagController from 'Library/controllers/TagController'
import ArticleController from 'Library/controllers/ArticleController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listCategoriesRoutinePromise } from 'State/routines/category';
import { listTagsRoutinePromise } from 'State/routines/tag';

import { getArticleRoutinePromise} from 'State/routines/article';
import {NextSeo} from 'next-seo'

const PageArticleEdit = props => {

	const {auth,listTags,listCategories,router} = props
	
	const articleController = new ArticleController(props)
	const categoryController = new CategoryController(props)
	const tagController = new TagController(props)

	const [item,setItem] = React.useState(false)

	const {id} = React.useMemo(()=>router.query,[])
	
    const pagename=""
	const links = [['Konten',`/${auth.account.uniqueURL}/content/articles`,''],['Artikel',`/${auth.account.uniqueURL}/content/articles`,''],[item.title,`/${auth.account.uniqueURL}/content/articles/${item.id}`,''],["Ubah",`/${auth.account.uniqueURL}/content/articles/${item.id}/edit`,'active']]
	
	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

	React.useEffect(async()=>{
		
		//get category
		categoryController._list({accountId:auth.account.id})
		//get tag
		tagController._list({accountId:auth.account.id})
		
		try{
			const article = await articleController._get(id)
			setItem(article.data)
		}catch(error){
			router.push(`/${auth.account.uniqueURL}/content/articles`)
		}
			
		

	},[])


	const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/articles/${item.id}`)	
    }
    
    const onSuccess = article =>{
		console.log(article)
        //userController._updateList("add",user,0)
        router.push(`/${auth.account.uniqueURL}/content/articles/${item.id}`)	
	}
	
	return (
		<LayoutArticle>
			<NextSeo title={`Konten - Ubah artikel -  ${item.title}`}/>
			
			<Row>
				<Col md={24}>
					<PageHeader title="Ubah artikel" subTitle={item.title} ghost={false}
						onBack={()=>router.push(`/[account_ur]/content/articles/[id]`,`/${auth.account.uniqueURL}/content/articles/${item.id}`,{shallow:true})}
					/>
				</Col>
			</Row>
			<Row>
				<Col md={24} className="mt-2">
					<FormArticle item={item} onSuccess={onSuccess} onCancel={onCancel} accountId={auth.account.id} categories={listCategories.list.items} tags={listTags.list.items}/>
				</Col>
			</Row>

			
			
		</LayoutArticle>
	);
	
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
				getArticleRoutinePromise,
				listCategoriesRoutinePromise,
				listTagsRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageArticleEdit))