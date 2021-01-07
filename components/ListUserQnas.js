import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Table,Typography,Empty,Tooltip} from 'antd'
import AuthController from 'Library/controllers/AuthController'
import QnaController from 'Library/controllers/QnaController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listUserQnasRoutinePromise } from 'State/routines/qna';
import _ from 'lodash'
import moment from 'moment'
import HTML from 'Components/HTML'

const List = props =>{

    const {Text,Paragraph} = Typography

    const {auth,currentUser,router} = props

	const qnaController = new QnaController(props)

    let accountId

    const [items,setItems] = React.useState()
    const [isEmpty,setEmpty] = React.useState(false)
    const [loading,setLoading] = React.useState(true)
    const [pagination,setPagination] = React.useState({current:1,pageSize:10})
    const [pageIndex,setPageIndex] = React.useState(0)
	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")
	
	React.useEffect(()=>{

		if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

        fetchItems({accountId,createdById:currentUser.id,replyToUserId:currentUser.id,orderBy,direction,pagination})

    },[])
    
    React.useEffect(()=>{
        if(!items || items.length==0) setEmpty(true)
        else setEmpty(false)
    },[items])

	const fetchItems = async ({accountId,createdById,replyToUserId,orderBy,direction,statuses=[1,2,3],pagination})=>{


		try{

            setLoading(true)

            const from = (pagination.current - 1) * pagination.pageSize
            const size = pagination.pageSize

            const params = {accountId,createdById,replyToUserId,orderBy,direction,from,size,statuses}

            //console.log(params)

			const response = await qnaController._listUserQnas(params)

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
        
        if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

        

        if(!_.isEmpty(sorter)) fetchItems({accountId,createdById:currentUser.id,replyToUserId:currentUser.id,orderBy:`${sorter.field}.keyword`,direction:sorter.order == "ascend" ? "asc":"desc",pagination})
        else fetchItems({accountId,createdById:currentUser.id,replyToUserId:currentUser.id,orderBy,direction,pagination})
    }


    const getColumns = ()  =>{

        let columns = [
            {
                title:"",
                key:"index",
                render:(text,record,index)=>(<p>{pageIndex+index}</p>),
                width:"1%"
            },
            {
                title:"Tanya jawab",
                width:"25%",
                key:"index",
                render:(text,record,index)=>(
                    <>
                    {
                        record.qnaType=="ans" ?
                        <>
                            <p className="mb-0"><Text>{auth.user.id == record.createdBy.id ? "Kamu" : record.createdBy.name}</Text> Menjawab pertanyaan <Text>{auth.user.id == record.replyToUser.id ? "kamu" : record.replyToUser.name}</Text> pada materi <Text strong={true}>{record.lesson.title}</Text> di ruang belajar <Text strong={true}>{record.post.title}</Text></p>
                            
                            <p className="mt-1">
                                <Tooltip title={moment(record.createdAt).format("dddd, Do MMMM YYYY [jam] hh:mm")}>
                                    <span>{moment(record.createdAt).fromNow()}</span>
                                </Tooltip>
                            </p> 

                            <HTML 
                                html={record.content}
                                componentOverrides={{
                                    p:Component=>props=><Component ellipsis={{ rows: 1, expandable: true, symbol: 'Buka' }} {...props}/>
                                }}
                            />
                        </>
                        :
                        <>
                            <p className="mb-0"><Text>{auth.user.id == record.createdBy.id ? "Kamu" : record.createdBy.name}</Text> mengirimkan pertanyaan pada materi <Text strong={true}>{record.lesson.title}</Text> di ruang belajar <Text strong={true}>{record.post.title}</Text></p>

                            <p className="mt-1">
                                <Tooltip title={moment(record.createdAt).format("dddd, Do MMMM YYYY [jam] hh:mm")}>
                                    <span>{moment(record.createdAt).fromNow()}</span>
                                </Tooltip>
                            </p>

                            <HTML 
                                html={record.content}
                                componentOverrides={{
                                    p:Component=>props=><Component ellipsis={{ rows: 1, expandable: true, symbol: 'Buka' }} {...props}/>
                                }}
                            />
                            
                            
                        </>
                    }
                        
                    </>
                )
            }
            
        ]   
        
        return columns

    }


    const rowHandler = (record,rowIndex) => {
        return{
            onClick: e => {
                if(record.qnaType=="ques" && !AuthController.isStudent(auth)) router.push("/[account_url]/content/lessons/[id]/?ref=classrooms",`/${auth.account.uniqueURL}/content/lessons/${record.lesson.id}`,{shallow:true})
                else if(record.qnaType=="ans" && auth.user.id == record.createdBy.id)  router.push("/[account_url]/content/lessons/[id]/?ref=classrooms",`/${auth.account.uniqueURL}/content/lessons/${record.lesson.id}`,{shallow:true})
                else router.push("/[account_url]/content/lessons/[id]",`/${auth.account.uniqueURL}/content/lessons/${record.lesson.id}`,{shallow:true})
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
                        Belum ada komentar
                    </span>
                }
            />
            }
        </VuroxTableDark>
    )
}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
        ...bindPromiseCreators({
            listUserQnasRoutinePromise
    },dispatch),dispatch
    })
)(withRouter(List))