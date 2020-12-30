import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Table,Typography,Empty,Button} from 'antd'
import AuthController from 'Library/controllers/AuthController'
import QnaController from 'Library/controllers/QnaController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostQnasRoutinePromise } from 'State/routines/qna';
import {Status} from 'Components/mycomponents.js'
import Icon from '@mdi/react'
import {mdiFormatQuoteOpenOutline,mdiFormatQuoteCloseOutline} from '@mdi/js'
import _ from 'lodash'
import moment from 'moment'
import HTML from 'Components/HTML'

const List = props =>{

    const {Title,Text,Paragraph} = Typography

    const {auth,lesson,qnaType,replyToId,router} = props

	const qnaController = new QnaController(props)

    const [items,setItems] = React.useState()
    const [isEmpty,setEmpty] = React.useState(false)
    const [isLoading,setLoading] = React.useState(true)
    const [pagination,setPagination] = React.useState({current:1,pageSize:10})
    const [pageIndex,setPageIndex] = React.useState(0)
	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")
    
    let accountId
    const isMounted = React.useRef()

	React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){
            if(lesson.post){
                if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
                    accountId = auth.account.id
                }
                
                var params = {accountId,postId:lesson.post.id,lessonId:lesson.id,qnaType,replyToId,orderBy,direction,pagination}

                fetchItems(params)
            }
        }

        return ()=>isMounted.current = false

    },[lesson])
    
    React.useEffect(()=>{
        if(!items || items.length==0) setEmpty(true)
        else setEmpty(false)
    },[items])


    const fetchItems = async ({accountId,postId,lessonId,qnaType,replyToId,orderBy,direction,statuses=[2,3],pagination})=>{

		try{

            setLoading(true)

            const from = (pagination.current - 1) * pagination.pageSize
            const size = pagination.pageSize

            const params = {accountId,postId,lessonId,qnaType,replyToId,orderBy,direction,from,size,statuses}


			const response = await qnaController._listPostQnas(params)

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

    const getColumns = ()  =>{

        let columns = [
            {
                key:"createdBy",
                title:"Penanya",
                dataIndex:"createdBy",
                render:createdBy=>createdBy.name,
                width:"20%"
            },
            {
                key:"question",
                title:"Tanya",
                render:(text,record,index)=>(
                    <>
                        <Text type="secondary">{moment(record.createdAt).fromNow()}</Text>
                        <HTML 
                            html={record.content}
                            componentOverrides={{
                                p:Component=>props=><Component ellipsis={{ rows: 1, expandable: true, symbol: 'Buka' }} {...props}/>
                            }}
                        />
                    </>
                ),
                width:"30%"
            },
            {
                key:"answer",
                title:"Jawab",
                render:(text,record,index)=>(
                    <>
                        {record.status==2 ? 
                            <Button  type="primary"><i className="ti-angle-left"></i>&nbsp;Kirim jawaban</Button>
                        :
                            <></>
                        }
                    </>
                ),
                width:"30%"
            },
            {
                key:"status",
                title:"Status",
                dataIndex:"status",
                fixed:"right",
                className:"text-right",
                render:status=>(
                    <div className="fright">
                    {
                        status===2 ? <Status text="Belum terjawab" state="warning" position="right" blinking/> :
                        status===3 && <Status text="Terjawab" state="success" position="right"/> 
                    }
                    </div>
                ),
                width:"20%"
            }
            
        ]   
        
    
        return columns
    
    }

    const handleTableChange = (pagination,filter,sorter) =>{

        console.log(sorter)
        
        if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

        var params = {accountId,postId:lesson.post.id,lessonId:lesson.id,qnaType,replyToId,orderBy,direction,pagination}

        fetchItems(params)
    }

    const rowHandler = (record,rowIndex) => {
        return{
            onClick: e => {
                console.log(record)
            }
        }
    }

    return( 
        <>
            <VuroxTableDark>
                {isLoading || !isEmpty ? 
                <Table
                    onRow={rowHandler}
                    columns={getColumns()}
                    rowKey={record=>record.id}
                    dataSource={items}
                    pagination={pagination}
                    loading={isLoading}
                    onChange={handleTableChange}
                />
                :
                <Empty
                    description={
                        <span>
                            Belum ada pertanyaan pada materi ini
                        </span>
                    }
                />
                }
            </VuroxTableDark>
        </>)


}



export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
        ...bindPromiseCreators({
            listPostQnasRoutinePromise
    },dispatch),dispatch
    })
)(withRouter(List))