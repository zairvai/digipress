import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.home'
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import AuthController from 'Library/controllers/AuthController'
import PostController from 'Library/controllers/PostController'
import ArticleController from 'Library/controllers/ArticleController'
import ClassroomController from 'Library/controllers/ClassroomController'
import ListPosts from 'Components/ListPosts'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostsRoutinePromise } from 'State/routines/post';
import { updateArticleRoutinePromise } from 'State/routines/article';
import { updateClassroomRoutinePromise } from 'State/routines/classroom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Modal} from 'antd'

const Home = props =>{

    const {auth,router,listPosts} = props

	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")
    const postController = new PostController(props)
    const articleController = new ArticleController(props)
    const classroomController = new ClassroomController(props)
    
    const {confirm} = Modal
    
	React.useEffect(()=>{
		
		let accountId = null

		if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

		postController._list({accountId,postTypes:["Article","Classroom"],orderBy,direction})

	},[])

    const pagename=""
    const links = [['Main',`/${auth.account.uniqueURL}/main/home/all`,''],['Home',`/${auth.account.uniqueURL}/main/home`,'active']]
    
    const showDeleteConfirm = (item,index) => {

        confirm({
          title: `Apakah kamu ingin menghapus ${item.postType == "Article" ? 'Artikel' : 'Ruang belajar'} ini ?`,
          icon: <ExclamationCircleOutlined />,
          content: item.title,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

            if(item.postType=="Article"){
                articleController._delete(item)
                    .then(post=>{
                        setTimeout(()=>{
                            postController._updateList("remove",[item],index)
                        },1000)
                    }).catch(error=>console.log(error))
            }else{
                classroomController._delete(item)
                    .then(post=>{
                        setTimeout(()=>{
                            postController._updateList("remove",[item],index)
                        },1000)
                    }).catch(error=>console.log(error))
            }

          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    return (
        <AppContainer>
            <Layout pagename={pagename} links={links}>
                <ListPosts items={listPosts.list.items} foundDoc={listPosts.list.foundDocs} onDelete={showDeleteConfirm}/>
            </Layout>
        </AppContainer>
    )
}


export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                listPostsRoutinePromise,
                updateArticleRoutinePromise,
                updateClassroomRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(Home))