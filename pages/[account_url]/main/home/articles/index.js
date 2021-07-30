import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.home'
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import AuthController from 'Library/controllers/AuthController'
import PostController from 'Library/controllers/PostController'
import ArticleController from 'Library/controllers/ArticleController'
import ListPosts from 'Components/ListPosts'
import {Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostsRoutinePromise } from 'State/routines/post';
import { NextSeo } from 'next-seo'

const Home = props =>{

    const {auth,router,listPosts} = props

	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")

    const postController = new PostController(props)
    const articleController = new ArticleController(props)
    
    const {confirm} = Modal
    
	React.useEffect(()=>{
		
		let accountId = null

		if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

		postController._list({accountId,postTypes:["Article"],orderBy,direction})

	},[])

    const pagename=""
    const links = [['Main',`/${auth.account.uniqueURL}/main/home/all`,''],['Home',`/${auth.account.uniqueURL}/main/home`,'active']]
    
    const showDeleteConfirm = (item,index) => {

        confirm({
          title: `Apakah kamu ingin menghapus Artikel ini ?`,
          icon: <ExclamationCircleOutlined />,
          content: item.title,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

            articleController._delete(item)
                .then(post=>{
                    setTimeout(()=>{
                        postController._updateList("remove",[item],index)
                    },1000)
                }).catch(error=>console.log(error))
            

          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    return (
        <Layout>
            <NextSeo title="Home - Artikel"/>
            <ListPosts items={listPosts.list.items} foundDoc={listPosts.list.foundDocs} onDelete={showDeleteConfirm}/>
        </Layout>
    )
}


export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                listPostsRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(Home))