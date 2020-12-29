import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.article.id'
import { Row, Col,Modal} from 'antd'
import {
	VuroxComponentsContainer
} from 'Components/layout'

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { mdiCommentMultipleOutline,mdiCommentOffOutline } from '@mdi/js'
import AppContainer from 'Templates/AppContainer'
import ArticleController from 'Library/controllers/ArticleController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getArticleRoutinePromise, updateArticleRoutinePromise} from 'State/routines/article';
import Icon from '@mdi/react'
import Reader from 'Components/ReaderArticle'
import ListPostComments from 'Components/ListPostComments'
import {NextSeo} from 'next-seo'

const PageArticleId = props => {

    const {confirm} = Modal

    const {auth,getArticle,router} = props

    const {id,commentId} = React.useMemo(()=>router.query,[])

    const articleController = new ArticleController(props)

    const [item,setItem] = React.useState({})
    const [noOfComment,setNoOfComment] = React.useState(0)

    React.useEffect(async ()=>{
       
        try{
            const article = await articleController._get(id)
            //console.log(article)
            setItem(article.data)
            setNoOfComment(article.data.noOfAllComment)

        }catch(error){
            router.push(`/${auth.account.uniqueURL}/main/home/articles`)
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
                    setTimeout(()=>router.push(`/${auth.account.uniqueURL}/main/home/articles`),1000)
                    
                }).catch(error=>console.log(error))
          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    const onSuccessAddComment = comment => {
        // console.log(comment)
        setNoOfComment(noOfComment+1)

    }

    const onSuccessDeleteComment = comment => {
        // console.log(comment)
        setNoOfComment(noOfComment- (comment.noOfReply + 1))

    }

    return(
        <AppContainer>
            <NextSeo title={`${item.title} - Artikel`}/>
            <Layout item={item} links={links}>
                <Row>
                    <Col md={24}>
                        <VuroxComponentsContainer className="p-4">

                            <Reader item={getArticle.item} onDelete={showDeleteConfirm}/>

                            <Row>
                                <Col md={24} className="mt-4">
                                    <Row>
                                        <Col md={12} sm={12} xs={12}>
                                            <ul className="vurox-horizontal-links vurox-standard-ul">
                                            {
                                                item.allowComment  ? 
                                                <li><a><Icon size="1.3em" path={mdiCommentMultipleOutline}/>&nbsp;{noOfComment > 0 ? `${noOfComment} komentar` : "belum ada komentar"}</a></li>
                                                :
                                                <li>
                                                    <Icon size="1.3em" path={mdiCommentOffOutline}/>&nbsp;Komentar tidak diperbolehkan oleh penulis
                                                </li>
                                            }
                                            </ul>
                                        </Col>
                                    </Row>
                            
                                </Col>
                            </Row>
                            <Row>
                                <Col md={24} sm={24} xs={24} className="mt-1">
                                    {item.allowComment  ? 
                                        <ListPostComments post={item} commentId={commentId} onPostSuccessAddComment={onSuccessAddComment} onPostSuccessDeleteComment={onSuccessDeleteComment}/>
                                        :
                                        <></>
                                    }
                                </Col>
                            </Row>
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