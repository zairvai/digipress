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

    const {auth,lesson,qnaType,replyToId,router} = props

    const [isFormVisible,setFormVisible] = React.useState(false)

	const qnaController = new QnaController(props)
    
    const {confirm} = Modal

    const [items,setItems] = React.useState()
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
                        
                        <HTML 
                            html={record.content}
                            componentOverrides={{
                                p:Component=>props=><Component ellipsis={{ rows: 4, expandable: true, symbol: 'Buka' }} {...props}/>
                            }}
                        />
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
                            <Button  type="primary" onClick={(e)=>{showForm(record);e.stopPropagation()}}><i className="ti-angle-left"></i>&nbsp;Kirim jawaban</Button>
                        :
                            <>
                                
                                <HTML 
                                    html={record.replies[0].content}
                                    componentOverrides={{
                                        p:Component=>props=><Component ellipsis={{ rows: 4, expandable: true, symbol: 'Buka' }} {...props}/>
                                    }}
                                />
                                <ul className="vurox-horizontal-links vurox-standard-ul">
                                    <li className="pl-0"><Tooltip title="Hapus" onClick={ e =>{showDeleteConfirm(record.replies[0]);e.stopPropagation()}}><DeleteFilled/></Tooltip></li>
                                    <li><Tooltip title="Ubah"><EditFilled onClick={(e)=>{showForm(record);e.stopPropagation()}}/></Tooltip></li>
                                </ul>
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

        // console.log(sorter)
        
        if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
			accountId = auth.account.id
		}

        var params = {accountId,postId:lesson.post.id,lessonId:lesson.id,qnaType,replyToId,orderBy,direction,pagination}

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
                            p:Component=>props=><Component ellipsis={{ rows: 2, expandable: true, symbol: 'Buka' }} {...props}/>
                        }}
                    />,
          okText:"Ya",
          cancelText:"Tidak",
          onOk() {

			qnaController._delete(item)
				.then(answer=>{
                    const question = answer.data.replyTo
                    //update pertanyaan jadi belum terjawab status = 2
                    return qnaController._update(question,{status:2,lessonId:question.lesson.id})
                })
                .then(replyTo=>{
                    const question = replyTo.data
                    const clonedItems = _.cloneDeep(items)
                    const index = clonedItems.findIndex(obj=>obj.id==question.id)
                    if(index>-1){
                        clonedItems.splice(index,1,question)
                        setItems(clonedItems)
                    }
                })
				.catch(error=>console.log(error))

          }
        });
	}

    const showForm = item =>{
        // console.log(item)
        setSelectedItem(item)
        setFormVisible(true)
    }

    const handleSuccess = (repliedQuestion) =>{

        // console.log(repliedQuestion)
        const clonedtems = [...items]
        const index = clonedtems.findIndex(obj=>obj.id==repliedQuestion.id)
        
        if(index > -1){
            clonedtems.splice(index,1,repliedQuestion)
            setItems(clonedtems)
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
                        <span>
                            Belum ada pertanyaan pada materi ini
                        </span>
                    }
                />
                }
            </VuroxTableDark>

            <Modal
                title="Kirim jawaban"
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
                            <div className="mb-3">
                                <Title level={5}>Pertanyaan</Title>
                                <Text>Oleh {selectedItem && selectedItem.createdBy.name}</Text>&nbsp;
                                <Text type="secondary">{moment(selectedItem && selectedItem.createdAt).fromNow()}</Text>
                            </div>
                            
                            <HTML 
                                html={selectedItem && selectedItem.content}
                                componentOverrides={{
                                    p:Component=>props=><Component ellipsis={{ rows: 5, expandable: true, symbol: 'Buka' }} {...props}/>
                                }}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={24} className="p-4">
                            <div className="mb-3"><Title level={5}>Jawaban</Title></div>
                            <FormQna formId="qnaForm" 
                                item={selectedItem && selectedItem.replies && selectedItem.replies[0]}
                                lesson={selectedItem}
                                replyTo={selectedItem}
                                replyToUser={selectedItem && selectedItem.createdBy} 
                                qnaType="ans" 
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