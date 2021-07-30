import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { vuroxContext } from 'Context'
import LayoutArticle from 'Templates/Layout.article'
import FormArticle from 'Components/FormArticle'

import CategoryController from 'Library/controllers/CategoryController'
import TagController from 'Library/controllers/TagController'
import {Row,Col,PageHeader} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listCategoriesRoutinePromise } from 'State/routines/category';
import { listTagsRoutinePromise } from 'State/routines/tag';
import {NextSeo} from 'next-seo'

const PageArticleAdd = props => {

	const {auth,listTags,listCategories,router} = props
	
	const categoryController = new CategoryController(props)
	const tagController = new TagController(props)
	
	const { menuState } = React.useContext(vuroxContext)
	const toggleClass = menuState ? 'menu-closed' : 'menu-open'

	React.useEffect(()=>{
		
		//get category
		categoryController._list({accountId:auth.account.id})
		//get tag
		tagController._list({accountId:auth.account.id})

	},[])


	const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/articles`)	
    }
    
    const onSuccess = article =>{
		// console.log(article)
        //userController._updateList("add",user,0)
        router.push(`/${auth.account.uniqueURL}/content/articles/${article.id}`)	
	}
	
	return (
		<LayoutArticle>
			<NextSeo title="Konten - Tambah artikel"/>
			<Row>
				<Col md={24}>
					<PageHeader title="Tambah artikel" ghost={false}
						onBack={()=>router.push(`/[account_ur]/content/articles`,`/${auth.account.uniqueURL}/content/articles`,{shallow:true})}
					/>
				</Col>
			</Row>
			<Row>
				<Col md={24} className="mt-2">
					<FormArticle onSuccess={onSuccess} onCancel={onCancel} accountId={auth.account.id} categories={listCategories.list && listCategories.list.items} tags={listTags.list && listTags.list.items}/>
				</Col>
			</Row>
		</LayoutArticle>
	);
	
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
				listCategoriesRoutinePromise,
				listTagsRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageArticleAdd))