import React from 'react'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'

import { Row, Col,PageHeader} from 'antd'
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

	const {auth,listTags,listCategories} = props
	

	const propsRef = React.useRef(props)

	const articleController = React.useMemo(()=>new ArticleController(propsRef.current),[propsRef])
	const categoryController = React.useMemo(()=>new CategoryController(propsRef.current),[propsRef])
	const tagController = React.useMemo(()=>new TagController(propsRef.current),[propsRef])


	const router = useRouter()
	const [id,setId] = React.useState(false)
	const [item,setItem] = React.useState(false)
	
	const isMounted = React.useRef()

	React.useEffect(()=>{
        if(router.query.id){
            setId(router.query.id)
        }
    },[router])

	React.useEffect(()=>{
		
		if(id){
			isMounted.current = true

			if(isMounted.current){
				//get category
				categoryController._list({accountId:auth.account.id})
				//get tag
				tagController._list({accountId:auth.account.id})
			
				articleController._get(id)
					.then(article=>setItem(article.data))
					.catch(error=>router.push(`/${auth.account.uniqueURL}/content/articles`))
			}
		}
			
		return ()=>{
			isMounted.current = false
		}

	},[id])


	const onCancel = () => {
        router.push(`/${auth.account.uniqueURL}/content/articles/${item.id}`)	
    }
    
    const onSuccess = article =>{
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
)(PageArticleEdit)