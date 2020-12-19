import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.article.id'
import { Row, Col,Tag,Modal,Input,Button, Checkbox,Dropdown,Menu,Select,Space,Radio,Typography} from 'antd'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AppContainer from 'Templates/AppContainer'
import ArticleController from 'Library/controllers/ArticleController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { getArticleRoutinePromise,deleteArticleRoutinePromise} from 'State/routines/article';

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
                {/* <Row>
                    <Col md={24}>
                        <VuroxComponentsContainer className="p-4 mt-2">
                            <Row>
                                <Col md={12}><h6>Kolom Komentar</h6></Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={24}>
                                    <VuroxTableDark>
                                        <table className="table table-borderless mb-0">
                                            <thead>
                                                <tr>
                                                    <th width="20"><Checkbox/></th>
                                                    <th width="40%">Komentar</th>
                                                    <th>Tanggal</th>
                                                    <th>Penulis</th>
                                                    <th className="fright">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                props.comments.list.map(item=>(
                                                    <tr key={item.id}>
                                                        <td><Checkbox/></td>
                                                        <td valign="middle"><Link href={{pathname:'/content/articles/[id]/comments/[cid]',query:{id:item.id,cid:item.id}}} shallow><a>{item.name}</a></Link></td>
                                                        <td valign="middle">{item.datetime}</td>
                                                        <td valign="middle"><Link href={{pathname:'/access/user/[id]',query:{id:item.author.id}}} shallow><a>{item.author.name}</a></Link></td>
                                                        <td valign="middle" className="fright">
                                                            {
                                                                item.status===3 ? <Status text="Approved" state="success" position="right"/> :
                                                                item.status===2 ? <Status text="Pending" state="warning" position="right" blinking/> :
                                                                // campaign.status===2 ? <Status text="On Approval" state="warning" position="right"/> :
                                                                // campaign.status===3 ? <Status text="Running" state="success" position="right" blinking/> :
                                                                // campaign.status===4 ? <Status text="Finished" state="default" position="right"/> :
                                                                // campaign.status===5 ? <Status text="Canceled" state="fail" position="right"/> :
                                                                <></>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </VuroxTableDark>
                                </Col>
                            </Row>
                        </VuroxComponentsContainer>
                    </Col>
                </Row> */}

            </Layout>
        </AppContainer> 
    )

    

}

export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                getArticleRoutinePromise,
                deleteArticleRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageArticleId))