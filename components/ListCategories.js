import React from 'react'
import {connect} from 'react-redux'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Table,Button,Tooltip,Modal,Pagination} from 'antd'
import Icon from '@mdi/react'
import {mdiDelete} from '@mdi/js'
import AuthController from 'Library/controllers/AuthController'
import CategoryController from 'Library/controllers/CategoryController'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { bindPromiseCreators } from 'redux-saga-routines';
import { listCategoriesRoutinePromise,deleteCategoryRoutinePromise } from 'State/routines/category';
import _ from 'lodash'

const List = props =>{

    const {auth} = props

	const categoryController = new CategoryController(props)

    let accountId

    const [items,setItems] = React.useState()
    const [loading,setLoading] = React.useState(false)
    const [pagination,setPagination] = React.useState({current:1,pageSize:10})
    const [pageIndex,setPageIndex] = React.useState()
	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")

	const {confirm} = Modal
	
	React.useEffect(()=>{

		if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

        fetchItems({accountId,orderBy,direction,pagination})

	},[])

	const fetchItems = async ({accountId,name,orderBy,direction,statuses,pagination})=>{

        // console.log(pagination)

		try{

            setLoading(true)

            const from = (pagination.current - 1) * pagination.pageSize
            const size = pagination.pageSize

			const response = await categoryController._list({accountId,name,orderBy,direction,from,size,statuses})


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
                title:"Kategori",
                dataIndex:"name",
                sorter:true,
                width:"25%"
            },
            {
                title:"Deskripsi",
                dataIndex:"desc",
                width:"25%"
            },
            {
                title:"Dibuat oleh",
                dataIndex:"createdBy",
                render:createdBy=>createdBy.name,
                width:"25%"
            },
            {
                title:"",
                key:"operation",
                render:(text,record,index)=>(
                    <div className="fright">
                    <Tooltip placement="topLeft" title="Hapus" arrowPointAtCenter>
                        <Button type="link" icon={<Icon size="1.3em" path={mdiDelete}/>}  onClick={()=>showDeleteConfirm(record,index)}/>
                    </Tooltip>
                    </div>
                )
            }
        ]   
        
        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)){
            columns.splice(3,0,{
                title:"Akun",
                dataIndex:"account",
                render:account=>account.name,
                width:"25%"
            })
        }
        
        return columns

    }

    const showDeleteConfirm = (item,index) => {

        confirm({
          title: `Kemungkinan kategori ini digunakan pada artikel atau ruang belajar. Apakah kamu ingin menghapus ?`,
          icon: <ExclamationCircleOutlined />,
          content: item.name,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

			categoryController._delete(item.id)
				.then(resp=>{
                    const clonedItems = _.cloneDeep(items)
                    clonedItems.splice(index,1)
                    setItems(clonedItems)
                })
				.catch(error=>console.log(error))

          }
        });
	}

    return(
        <VuroxTableDark>
            <Table
                columns={getColumns()}
                rowKey={record=>record.id}
                dataSource={items}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </VuroxTableDark>
    )

}


export default connect(
    state=>state,
    (dispatch)=>({
        ...bindPromiseCreators({
            listCategoriesRoutinePromise,
            deleteCategoryRoutinePromise
    },dispatch),dispatch
    })
)(List)