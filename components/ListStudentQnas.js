import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Table,Typography,Empty,Button,Modal,Row,Col,Tooltip} from 'antd'
import AuthController from 'Library/controllers/AuthController'
import QnaController from 'Library/controllers/QnaController'
import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostQnasRoutinePromise,updateQnaRoutinePromise } from 'State/routines/qna';
import {Status} from 'Components/mycomponents.js'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {EditFilled,DeleteFilled} from '@ant-design/icons'
import FormQna from 'Components/FormQna'
import _ from 'lodash'
import moment from 'moment'
import HTML from 'Components/HTML'

const List = props =>{

    const {Title,Text,Paragraph} = Typography

    const {auth,lesson,qnaType,replyToId,createdById,router} = props

    const [isFormVisible,setFormVisible] = React.useState(false)

	const qnaController = new QnaController(props)
    
    const {confirm} = Modal

    const [items,setItems] = React.useState([])
    const [isEmpty,setEmpty] = React.useState(false)
    const [isLoading,setLoading] = React.useState(true)
    const [pagination,setPagination] = React.useState({current:1,pageSize:10})
    const [pageIndex,setPageIndex] = React.useState(0)
	const [orderBy,setOrderBy]	= React.useState("createdAt")
	const [direction,setDirection] = React.useState("desc")
    const [selectedItem,setSelectedItem] = React.useState()

    let accountId
    const isMounted = React.useRef()

	React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){
            if(lesson.post){
                if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
                    accountId = auth.account.id
                }
                
                var params = {accountId,postId:lesson.post.id,lessonId:lesson.id,qnaType,replyToId,createdById,orderBy,direction,pagination}

                fetchItems(params)
            }
        }

        return ()=>isMounted.current = false

    },[lesson])
    
    React.useEffect(()=>{
        if(!items || items.length==0) setEmpty(true)
        else setEmpty(false)
    },[items])


    const fetchItems = async ({accountId,postId,lessonId,qnaType,replyToId,createdById,orderBy,direction,statuses=[2,3],pagination})=>{

		try{

            setLoading(true)

            const from = (pagination.current - 1) * pagination.pageSize
            const size = pagination.pageSize

            const params = {accountId,postId,lessonId,qnaType,replyToId,createdById,orderBy,direction,from,size,statuses}

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
                        <HTML 
                            html={record.content}
                            componentOverrides={{
                                p:Component=>props=><Component ellipsis={{ rows: 4, expandable: true, symbol: 'Buka' }} {...props}/>
                            }}
                        />
                        <ul className="vurox-horizontal-links vurox-standard-ul">
                            <li className="pl-0"><Tooltip title="Hapus" onClick={ e =>{showDeleteConfirm(record);e.stopPropagation()}}><DeleteFilled/></Tooltip></li>
                            <li><Tooltip title="Ubah"><EditFilled onClick={(e)=>{showForm(record);e.stopPropagation()}}/></Tooltip></li>
                        </ul>

                        <Text type="secondary">{moment(record.createdAt).fromNow()}</Text>
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
                            <Text>Belum ada jawaban</Text>
                        :
                            <>
                                <HTML 
                                    html={record.replies[0].content}
                                    componentOverrides={{
                                        p:Component=>props=><Component ellipsis={{ rows: 4, expandable: true, symbol: 'Buka' }} {...props}/>
                                    }}
                                />
                                <Text type="secondary">{moment(record.replies[0].createdAt).fromNow()}</Text>

                            </>
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

        var params = {accountId,postId:lesson.post.id,lessonId:lesson.id,qnaType,replyToId,createdById,orderBy,direction,pagination}

        fetchItems(params)
    }

    const rowHandler = (record,rowIndex) => {
        return{
            onClick: e => {
                //console.log(record)
            }
        }
    }


    const showDeleteConfirm = (item) => {

        confirm({
          title: `Apakah kamu ingin menghapus jawaban ?`,
          icon: <ExclamationCircleOutlined />,
          content: <HTML 
                        html={item.content}
                        componentOverrides={{
                            p:Component=>props=><Component ellipsis={{ rows: 1, expandable: true, symbol: 'Buka' }} {...props}/>
                        }}
                    />,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

			qnaController._delete(item)
				.then(question=>{
                    const clonedItems = _.cloneDeep(items)
                    const index = clonedItems.findIndex(obj=>obj.id==question.data.id)
                    if(index>-1){
                        clonedItems.splice(index,1)
                        setItems(clonedItems)
                    }
                })
				.catch(error=>console.log(error))

          }
        });
	}

    const showForm = item =>{
        // console.log(item)

        if(item){
            setSelectedItem(item)
        }

        setFormVisible(true)
    }

    const handleSuccess = (repliedQuestion) =>{

        // console.log(repliedQuestion)
        const clonedtems = [...items]
        const index = clonedtems.findIndex(obj=>obj.id==repliedQuestion.id)
        
        if(index > -1){
            console.log(repliedQuestion)
            clonedtems.splice(index,1,repliedQuestion)
            setItems(clonedtems)
        }else{
            setItems([...items,repliedQuestion])
        }

        setFormVisible(false)
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
                        <>
                            <Text>Kamu belum ada pertanyaan pada materi ini</Text><br/><br/>
                            <Button  type="primary" onClick={(e)=>{showForm();e.stopPropagation()}}><i className="ti-plus"></i>&nbsp;Kirim pertanyaan</Button>
                        </>
                    }
                />
                }
            </VuroxTableDark>

            <Modal
                title="Kirim pertanyaan"
                destroyOnClose={true}
                centered
                footer={null}
                bodyStyle={{padding:0}}
                visible={isFormVisible}
                keyboard={false}
                mask={false}
                maskClosable={false}
                onCancel={()=>setFormVisible(false)}
                width={900}>

                    <Row>
                        <Col md={24} className="p-4">
                            <div className="mb-3"><Title level={5}>Pertanyaan</Title></div>
                            <FormQna formId="qnaForm" 
                                item={selectedItem}
                                lesson={lesson}
                                replyToUser={lesson && lesson.createdBy} 
                                qnaType="ques" 
                                onCancel={()=>setFormVisible(false)} 
                                onSuccess={handleSuccess}/>
                        </Col>
                    </Row>
                    
            </Modal>

        </>)


}



export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
        ...bindPromiseCreators({
            listPostQnasRoutinePromise,
            updateQnaRoutinePromise
    },dispatch),dispatch
    })
)(withRouter(List))