import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Table,Empty,Modal,Tag} from 'antd'
import AuthController from 'Library/controllers/AuthController'
import AccountController from 'Library/controllers/AccountController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listAccountsRoutinePromise,deleteAccountRoutinePromise } from 'State/routines/account';
import {Status} from 'Components/mycomponents.js'
import _ from 'lodash'

const List = props =>{

    const {auth,router} = props

	const accountController = new AccountController(props)

    const [items,setItems] = React.useState()
    const [isEmpty,setEmpty] = React.useState(false)
    const [loading,setLoading] = React.useState(true)
    const [pagination,setPagination] = React.useState({current:1,pageSize:10})
    const [pageIndex,setPageIndex] = React.useState()
	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")

	React.useEffect(()=>{

        fetchItems({orderBy,direction,pagination})

	},[])

    React.useEffect(()=>{
        if(!items || items.length==0) setEmpty(true)
        else setEmpty(false)
    },[items])

	const fetchItems = async ({name,orderBy,direction,statuses,pagination})=>{

		try{

            setLoading(true)

            const from = (pagination.current - 1) * pagination.pageSize
            const size = pagination.pageSize

			const response = await accountController._list({name,orderBy,direction,from,size,statuses})
            console.log(response)
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

        if(!_.isEmpty(sorter)){
            fetchItems({orderBy:`${sorter.field}.keyword`,direction:sorter.order == "ascend" ? "asc":"desc",pagination})
        }
        else fetchItems({orderBy,direction,pagination})
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
                title:"Akun",
                dataIndex:"name",
                sorter:true,
                width:"25%"
            },
            {
                title:"Alamat",
                dataIndex:"address",
                width:"30%"
            },
            {
                title:"Telpon",
                dataIndex:"phoneNumber",
                width:"15%"
            },
            {
                title:"Kontak person",
                dataIndex:"contactPerson",
                width:"20%"
            },
            {
                title:"Status",
                dataIndex:"status",
                className:"text-right",
                render:status=>(
                    <div>
                    {
                       status===2 ? <Status text="Pending" state="warning" position="right" blinking/> :
                       status===3 ? <Status text="Active" state="success" position="right"/> :
                       status===4 && <Status text="Suspended" state="fail" position="right"/>
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
                router.push(`/${auth.account.uniqueURL}/manage/accounts/${record.id}`)
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
                        Belum ada akun
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
            listAccountsRoutinePromise,
            deleteAccountRoutinePromise
    },dispatch),dispatch
    })
)(withRouter(List))