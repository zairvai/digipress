import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout
} from 'Components/layout'
import { vuroxContext } from 'Context'
import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';
import AppContainer from 'Templates/AppContainer'
import FormArticle from 'Components/FormArticle'

import CategoryController from 'Library/controllers/CategoryController'
import TagController from 'Library/controllers/TagController'
import ArticleController from 'Library/controllers/ArticleController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listCategoriesRoutinePromise } from 'State/routines/category';
import { listTagsRoutinePromise } from 'State/routines/tag';

import { getArticleRoutinePromise} from 'State/routines/article';


const PageArticleEdit = props => {

	const {auth,listTags,listCategories,router} = props
	
	const articleController = new ArticleController(props)
	const categoryController = new CategoryController(props)
	const tagController = new TagController(props)

	const [item,setItem] = React.useState(false)

	const {id} = React.useMemo(()=>router.query,[])
	
    const pagename=""
	const links = [['Content',`/${auth.account.uniqueURL}/content/articles`,''],['Articles',`/${auth.account.uniqueURL}/content/articles`,''],[item.title,`/${auth.account.uniqueURL}/content/articles/${item.id}`,''],["Edit",`/${auth.account.uniqueURL}/content/articles/${item.id}/edit`,'active']]
	
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
        router.push(`/${auth.account.uniqueURL}/content/articles`)	
    }
    
    const onSuccess = article =>{
		console.log(article)
        //userController._updateList("add",user,0)
        router.push(`/${auth.account.uniqueURL}/content/articles/${item.id}`)	
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
					<FormArticle item={item} onSuccess={onSuccess} onCancel={onCancel} accountId={auth.account.id} categories={listCategories.list.items} tags={listTags.list.items}/>
				</ContentLayout>
			</VuroxLayout>
		</AppContainer>
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