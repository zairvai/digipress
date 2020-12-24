import React from 'react'
import {connect} from 'react-redux'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Table,Button,Tooltip,Modal,Empty} from 'antd'
import Icon from '@mdi/react'
import {mdiDelete} from '@mdi/js'
import AuthController from 'Library/controllers/AuthController'
import UserController from 'Library/controllers/UserController'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { bindPromiseCreators } from 'redux-saga-routines';
import { listUsersRoutinePromise,updateUserRoutinePromise } from 'State/routines/user';
import {Status} from 'Components/mycomponents.js'
import _ from 'lodash'

const List = props =>{

    const {auth,currentAccount,roleListInput} = props

	const userController = new UserController(props)

    const [items,setItems] = React.useState()
    const [isEmpty,setEmpty] = React.useState(false)
    const [loading,setLoading] = React.useState(true)
    const [pagination,setPagination] = React.useState({current:1,pageSize:10})
    const [pageIndex,setPageIndex] = React.useState()
	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")

	const {confirm} = Modal
	
	React.useEffect(()=>{

        fetchItems({accountId:currentAccount.id,orderBy,direction,pagination})

    },[currentAccount])
    
    React.useEffect(()=>{
        if(!items || items.length==0) setEmpty(true)
        else setEmpty(false)
    },[items])

	const fetchItems = async ({accountId,name,orderBy,direction,statuses,pagination})=>{

		try{

            setLoading(true)

            const from = (pagination.current - 1) * pagination.pageSize
            const size = pagination.pageSize

			const response = await userController._list({accountId,name,roles:roleListInput,orderBy,direction,from,size,statuses})

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
            fetchItems({accountId:currentAccount.id,orderBy:`${sorter.field}.keyword`,direction:sorter.order == "ascend" ? "asc":"desc",pagination})
        }
        else fetchItems({accountId:currentAccount.id,orderBy,direction,pagination})
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
                title:"Nama",
                dataIndex:"name",
                sorter:true,
                width:"25%"
            },
            {
                title:"Email",
                dataIndex:"emailAddress",
                width:"20%"
            },
            {
                title:"Telpon",
                dataIndex:"phoneNumber",
                width:"20%"
            },
            {
                title:"Role",
                dataIndex:"roles",
                render:roles=>{
                    let i=0,found=false, role={}
                    for(i=0;i<roles.length;i++){
                        if(roles[i].accountId===currentAccount.id){
                            found=true
                            break
                        }
                    }

                    if(found) {
                        role = roles[i]
                        return <>{role.role}</>
                    }

                    return <></>
                    
                },
                width:"10%"
            },
            {
                title:"Status",
                dataIndex:"status",
                render:status=>(
                    <div>
                    {
                        status===2 ? <Status text="Pending" state="warning" position="right" blinking/> :
                        status===3 ? <Status text="Active" state="success" position="right"/> :
                        status===4 && <Status text="Suspended" state="fail" position="right"/>
                        
                        
                    }
                    </div>
                ),
                width:"10%"
            },
            {
                title:"",
                key:"operation",
                render:(text,record,index)=>(
                    <div className="fright">
                        <Tooltip placement="topLeft" title="Hapus" arrowPointAtCenter>
                            <Button type="link" icon={<Icon size="1.3em" path={mdiDelete}/>}  onClick={()=>showRevokeAccessConfirm(record,currentAccount,index)}/>
                        </Tooltip>
                    </div>
                )
            }
        ]   
        
        return columns

    }

    const showRevokeAccessConfirm = (item,account,index) => {

        confirm({
          title: `Apakah kamu ingin menghapus akses pengguna ini dari akun ${account.name} ?`,
          icon: <ExclamationCircleOutlined />,
          content: item.name,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

            let roles = _.cloneDeep(item.roles)
            const indexRole = roles.findIndex((role) => role.accountId === account.id)
            roles.splice(indexRole,1)//remove from array

            var values ={roles}
            
            userController._update(item,values)
                .then(resp=>{
                    const clonedItems = _.cloneDeep(items)
                    clonedItems.splice(index,1)
                    setItems(clonedItems)
                })
                .catch(error=>console.log(error))

            // const clonedItems = _.cloneDeep(items)
            //         clonedItems.splice(index,1)
            //         setItems(clonedItems)

          },
          onCancel() {
            console.log('Cancel');
          },
        });
    }

    return(
        <VuroxTableDark>
            {loading || !isEmpty ? 
            <Table
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
                        Belum ada anggota
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
            listUsersRoutinePromise,
            updateUserRoutinePromise
    },dispatch),dispatch
    })
)(List)