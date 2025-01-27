import React from 'react'
import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import { Row, Col,Modal,PageHeader,Button} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { mdiCommentMultipleOutline,mdiCommentOffOutline } from '@mdi/js'
import Layout from 'Templates/Layout.article.id'
import Permission from 'Library/controllers/Permission'
import ArticleController from 'Library/controllers/ArticleController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getArticleRoutinePromise,updateArticleRoutinePromise} from 'State/routines/article';
import Icon from '@mdi/react'
import Reader from 'Components/ReaderArticle'
import ListPostComments from 'Components/ListPostComments'

import {NextSeo} from 'next-seo'

const PageArticleId = props => {

    const {confirm} = Modal

    const {auth,commentId} = props
    const router = useRouter()
    const id = router.query.id

    const propsRef = React.useRef(props)

	const articleController = React.useMemo(()=>new ArticleController(propsRef.current),[propsRef])

    const [item,setItem] = React.useState({})
    const [isFetching,setFetching] = React.useState(true)

    const [noOfComment,setNoOfComment] = React.useState(0)

    const isMounted = React.useRef()

    React.useEffect(()=>{
       
        isMounted.current = true
        
        async function doLoad(){

            try{
                const article = await articleController._get(id)
                setFetching(false)
                setItem(article.data)
                setNoOfComment(article.data.noOfAllComment)

            }catch(error){
                router.push(`/${auth.account.uniqueURL}/content/articles`)
            }
        }
        
        if(id && isMounted.current) doLoad()

        return ()=>{
            isMounted.current = false
        }
        
    },[id])



    
    
    const links = [['Konten',`/${auth.account.uniqueURL}/content/articles`,''],['Artikel',`/${auth.account.uniqueURL}/content/articles`,''],[item.title,`/${auth.account.uniqueURL}/content/articles/${item.id}`,'active']]

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
          }
        });
    }

    const onSuccessAddComment = comment => {
        // console.log(comment)
        setNoOfComment(noOfComment+1)

    }

    const onSuccessDeleteComment = comment => {
        console.log(comment)
        setNoOfComment(noOfComment- (comment.noOfReply + 1))

    }

    return(
        <Layout>
            <NextSeo title={`Konten - Artikel -  ${item.title}`}/>
            <VuroxComponentsContainer>
            <Row>
                <Col md={24}>
                    
                </Col>
            </Row>
            </VuroxComponentsContainer>

            <Row>
				<Col md={24}>
                    <PageHeader title={item.title} subTitle={item.category && item.category.name} ghost={false}
                        onBack={()=>router.back()}
						extra={[
							<div className="d-inline" key="1">
                                {Permission.UPDATE_ARTICLE({auth}) 
                                    && <Link href={{pathname:`/${auth.account.uniqueURL}/content/articles/[id]/edit`,query:{id:item.id}}} shallow><Button  type="primary"><i className="ti-plus"></i>&nbsp;Ubah artikel</Button></Link>}
                            </div>,
                            <div className="d-inline" key="2">
                                {Permission.DELETE_ARTICLE({auth}) 
                                    && <Button  type="primary" onClick={()=>showDeleteConfirm(item)}><i className="ti-trash"></i>&nbsp;Hapus artikel</Button>}
                            </div>
						]}
					/>
					
				</Col>
			</Row>
            <VuroxComponentsContainer className="p-4">
                <Row>
                    <Col md={24}> 
                        <Reader item={item}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} sm={24} xs={24} className="mt-3">
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
                <Row>
                    <Col md={24} sm={24} xs={24} className="mt-2">
                        {item.allowComment  ? 
                            <ListPostComments post={item} commentId={commentId} onPostSuccessAddComment={onSuccessAddComment} onPostSuccessDeleteComment={onSuccessDeleteComment}/>
                            :
                            <></>
                        }
                    </Col>
                </Row>
            </VuroxComponentsContainer>
        </Layout> 
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
)(PageArticleId)