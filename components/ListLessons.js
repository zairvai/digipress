import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Table,Empty} from 'antd'
import AuthController from 'Library/controllers/AuthController'
import LessonController from 'Library/controllers/LessonController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listLessonsRoutinePromise,deleteLessonRoutinePromise } from 'State/routines/lesson';
import {Status} from 'Components/mycomponents.js'
import _ from 'lodash'

const List = props =>{

    const {auth,router,postId} = props

	const lessonController = new LessonController(props)

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

        fetchItems({accountId,postId,orderBy,direction,pagination})

    },[])
    
    React.useEffect(()=>{
        if(!items || items.length==0) setEmpty(true)
        else setEmpty(false)
    },[items])

	const fetchItems = async ({accountId,postId,title,orderBy,direction,statuses,pagination})=>{

        // console.log(pagination)

		try{

            setLoading(true)

            const from = (pagination.current - 1) * pagination.pageSize
            const size = pagination.pageSize

			const response = await lessonController._list({accountId,postId,title,orderBy,direction,from,size,statuses})

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
                title:"Materi",
                dataIndex:"title",
                sorter:true,
                width:"40%"
            },
            {
                title:"Status",
                dataIndex:"status",
                fixed:"right",
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
        

        return columns

    }


    const rowHandler = (record,rowIndex) => {
        return{
            onDoubleClick: e => {
                router.push(`/${auth.account.uniqueURL}/content/classrooms/${postId}/lessons/${record.id}`)
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
                        Belum ada materi pada ruang belajar ini
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
            listLessonsRoutinePromise,
            deleteLessonRoutinePromise
    },dispatch),dispatch
    })
)(withRouter(List))