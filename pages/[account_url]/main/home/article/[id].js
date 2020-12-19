import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.article.id'
import { Row, Col,Modal} from 'antd'
import {
	VuroxComponentsContainer
} from 'Components/layout'

import { ExclamationCircleOutlined } from '@ant-design/icons';
import AppContainer from 'Templates/AppContainer'
import ArticleController from 'Library/controllers/ArticleController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getArticleRoutinePromise, updateArticleRoutinePromise} from 'State/routines/article';
import Reader from 'Components/ReaderArticle'

const PageArticleId = props => {

    const {confirm} = Modal

    const {auth,getArticle,router} = props

    const articleController = new ArticleController(props)

    const [item,setItem] = React.useState({})

    const {id} = React.useMemo(()=>router.query,[])

    React.useEffect(async ()=>{
       
        try{
            const article = await articleController._get(id)
            //console.log(article)
            setItem(article.data)

        }catch(error){
            router.push(`/${auth.account.uniqueURL}/content/articles`)
            console.log(error)
        }
        
    },[])

    
    
    const links = [['Main',`/${auth.account.uniqueURL}/main/home/all`,''],['Artikel',`/${auth.account.uniqueURL}/main/home/articles`,''],[item.title,`/${auth.account.uniqueURL}/main/home/article/${item.id}`,'active']]

    const showDeleteConfirm = item => {
        confirm({
          title: 'Apakah kamu ingin menghapus artikel ini ?',
          icon: <ExclamationCircleOutlined />,
          content: item.title,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {
            articleController._delete(item)
                .then(article=>{
                    setTimeout(()=>router.push(`/${auth.account.uniqueURL}/content/articles`),1000)
                    
                }).catch(error=>console.log(error))
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    return(
        <AppContainer>
            <Layout item={item} links={links}>
                <Row>
                    <Col md={24}>
                        <VuroxComponentsContainer className="p-4">
                            <Reader item={getArticle.item} onDelete={showDeleteConfirm}/>
                        </VuroxComponentsContainer>
                    </Col>
                </Row>
            </Layout>
        </AppContainer> 
    )
}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                getArticleRoutinePromise,
                updateArticleRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageArticleId))