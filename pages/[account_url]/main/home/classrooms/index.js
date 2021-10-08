import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.home'
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import AuthController from 'Library/controllers/AuthController'
import PostController from 'Library/controllers/PostController'
import ClassroomController from 'Library/controllers/ClassroomController'
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
    
    const {confirm} = Modal

	React.useEffect(()=>{
		
		let accountId = null

		if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

		postController._list({accountId,postTypes:["Classroom"],orderBy,direction})

	},[])

    const pagename=""
    const links = [['Main',`/${auth.account.uniqueURL}/main/home/all`,''],['Home',`/${auth.account.uniqueURL}/main/home`,'active']]
    
    const showDeleteConfirm = (item,index) => {

        confirm({
          title: `Apakah kamu ingin menghapus Ruang belajar ini ?`,
          icon: <ExclamationCircleOutlined />,
          content: item.title,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

            classroomController._delete(item)
                .then(post=>{
                    setTimeout(()=>{
                       // postController._updateList("remove",[item],index)
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
            <NextSeo title="Home - Ruang belajar"/>
            <ListPosts items={listPosts.list.items} foundDoc={listPosts.list.foundDocs} onDelete={showDeleteConfirm}/>
        </Layout>
    )
}


export default withRouter(connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                listPostsRoutinePromise
        },dispatch),dispatch
    })
)(Home))