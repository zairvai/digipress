import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Table,Tag,Empty} from 'antd'
import AuthController from 'Library/controllers/AuthController'
import ArticleController from 'Library/controllers/ArticleController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listArticlesRoutinePromise,deleteArticleRoutinePromise } from 'State/routines/article';
import {Status} from 'Components/mycomponents.js'
import _ from 'lodash'

const List = props =>{

    const {auth,router} = props

	const articleController = new ArticleController(props)

    let accountId

    const [items,setItems] = React.useState()
    const [isEmpty,setEmpty] = React.useState(true)
    const [loading,setLoading] = React.useState(false)
    const [pagination,setPagination] = React.useState({current:1,pageSize:10})
    const [pageIndex,setPageIndex] = React.useState()
	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")
	
	React.useEffect(()=>{

		if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

        fetchItems({accountId,orderBy,direction,pagination})

    },[])
    
    React.useEffect(()=>{
        if(!items || items.length==0) setEmpty(true)
        else setEmpty(false)
    },[items])

	const fetchItems = async ({accountId,title,orderBy,direction,statuses,pagination})=>{

        // console.log(pagination)

		try{

            setLoading(true)

            const from = (pagination.current - 1) * pagination.pageSize
            const size = pagination.pageSize

			const response = await articleController._list({accountId,title,orderBy,direction,from,size,statuses})

			if(response.data.items){
                setItems(response.data.items)
                setPagination({...pagination,total:response.data.foundDocs})
                setPageIndex(from+1)
			}

            setLoading(false)

		}catch(error){
			console.log(error)
		}

    }
    
    const handleTableChange = (pagination,filter,sorter) =>{

        console.log(sorter)
        
        if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

        if(!_.isEmpty(sorter)){
            fetchItems({accountId,orderBy:`${sorter.field}.keyword`,direction:sorter.order == "ascend" ? "asc":"desc",pagination})
        }
        else fetchItems({accountId,orderBy,direction,pagination})
    }

    const getColumns = ()  =>{

        let columns = [
            {
                title:"",
                key:"index",
                render:(text,record,index)=>pageIndex+index,
                width:"1%"
            },
            {
                title:"Artikel",
                dataIndex:"title",
                sorter:true,
                width:"25%"
            },
            {
                title:"Kategori",
                dataIndex:"category",
                width:"20%",
                render:category=>category && category.name
            },
            {
                title:"Tag",
                dataIndex:"tags",
                width:"20%",
                render:tags=>tags.map(tag=> tag && <Tag key={tag.id}>{tag.name}</Tag>)
            },
            {
                title:"Penulis",
                dataIndex:"createdBy",
                render:createdBy=>createdBy && createdBy.name,
                width:"15%"
            },
            {
                title:"Akses",
                dataIndex:"access",
                width:"10%"
            },
            {
                title:"Status",
                dataIndex:"status",
                className:"text-right",
                render:status=>(
                    <div className="fright">
                    {
                        status===3 ? <Status text="Active" state="success" position="right"/> :
                        status===2 && <Status text="Pending" state="warning" position="right" blinking/>
                    }
                    </div>
                )
            }
            
        ]   
        
        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)){
            columns.splice(2,2,
                {
                    title:"Kategori & Tag",
                    render:(text,record,index)=>(
                        <>
                        {record.category && record.category.name}
                        {
                            record.tags && record.tags.map(tag=>tag && <div key={tag.id} className="mt-1"><Tag>{tag.name}</Tag></div>)
                        }
                        </>
                    ),
                    width:"20%"
                },
                {
                    title:"Akun",
                    dataIndex:"account",
                    render:account=>account && account.name,
                    width:"20%"
                }
            )
        }
        
        return columns

    }


    const rowHandler = (record,rowIndex) => {
        return{
            onDoubleClick: e => {
                router.push(`/${auth.account.uniqueURL}/content/articles/${record.id}`)
            }
        }
    }

    return(
        <VuroxTableDark>
            {loading || !isEmpty ? 
            <Table
                onRow={rowHandler}
                columns={getColumns()}
                rowKey={record=>record.id}
                dataSource={items}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
            :
            <Empty
                description={
                    <span>
                        Belum ada berita/artikel
                    </span>
                }
            />
            }
        </VuroxTableDark>
    )


}


export default connect(
    state=>state,
    (dispatch)=>({
        ...bindPromiseCreators({
            listArticlesRoutinePromise,
            deleteArticleRoutinePromise
    },dispatch),dispatch
    })
)(withRouter(List))