import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import Layout from 'Templates/Layout.home'
import AppContainer from 'Templates/AppContainer'
import Permission from 'Library/controllers/Permission'
import AuthController from 'Library/controllers/AuthController'
import PostController from 'Library/controllers/PostController'
import ListPosts from 'Components/ListPosts'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostsRoutinePromise } from 'State/routines/post';

const Home = props =>{

    const {auth,router,listPosts} = props

	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")
	const postController = new PostController(props)
	
	React.useEffect(()=>{
		
		let accountId = null

		if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

		postController._list({accountId,postTypes:["Article"],orderBy,direction})

	},[])

    const pagename=""
    const links = [['Main',`/${auth.account.uniqueURL}/main/home/all`,''],['Home',`/${auth.account.uniqueURL}/main/home`,'active']]
    
    return (
        <AppContainer>
            <Layout pagename={pagename} links={links}>
                <ListPosts items={listPosts.list.items} foundDoc={listPosts.list.foundDocs}/>
            </Layout>
        </AppContainer>
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