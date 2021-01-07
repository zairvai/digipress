import React from 'react'
import {connect} from 'react-redux'
import {Row,Col,Empty} from 'antd'

import {
	VuroxComponentsContainer
} from 'Components/layout'

import Chartbox5Pie from 'Components/Chartbox5Pie'
import AnalyticController from 'Library/controllers/AnalyticController'
import ClassroomController from 'Library/controllers/ClassroomController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listClassroomsRoutinePromise} from 'State/routines/classroom';

import AuthController from 'Library/controllers/AuthController'


const AnalyticBox = ({selectedMenu,gaFilters,...props}) =>{

    const {auth} = props

    const [isEmpty,setEmpty] = React.useState(true)

    const [gaData,setGaData] = React.useState()

    const [selectedRange,setSelectedRange] = React.useState()
    const isMounted = React.useRef()

    const [isFetching,setFetching] = React.useState(false)

    const analyticController = new AnalyticController()
    const classroomController = new ClassroomController(props)

    React.useEffect(()=>{
        if(selectedMenu) setSelectedRange(selectedMenu)
    },[selectedMenu])

    React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){

            let pagePath

            if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
                pagePath=`/${auth.account.uniqueURL}/${gaFilters}`
            }else{
                pagePath=`/${gaFilters}`
            }
            
            fetchData({pagePath,startDate:selectedRange && selectedRange.value})

        }

        return ()=>isMounted.current=false

    },[selectedRange])

    const fetchData = ({pagePath,startDate="30daysAgo",endDate="yesterday"}) => {

        let params = {
			metrics: "ga:pageviews",
			segment: "gaid::-1",
            dimensions: "ga:pagePath",
            // filters:"ga:pagePath=~/main/home/articles/[a-zxA-Z0-9\-]+/$",
            sort:"-ga:pagePath,-ga:pageviews",
            "max-results":5
		}

        if(startDate) params["startDate"] = startDate
        if(endDate) params["endDate"] = endDate

		if(pagePath){
			params = {...params,filters:`ga:pagePath=~${pagePath}`}
        }
        
        setFetching(true)

        analyticController._getData(params)
			.then(async data=>{

                if(data.results){
                    
                    const results = parseInt(data.results["ga:pageviews"])

                    if(data.rows){

                        let dataRows=[],ids=[]

                        data.rows.forEach((record,index)=>{

                            //parse id from pagepath url
                            let path = record[0]
                            let re = new RegExp(pagePath)
                            const matches = path.match(re)

                            if(matches){
                                
                                const id = matches[1]
                                const existIndex = dataRows.findIndex(obj=>obj.id==id)
                                
                                if(existIndex>-1){//if duplicate id
                                    dataRows[existIndex].value += parseInt(record[1])
                                }else{
                                    dataRows.push({
                                        id,value:parseInt(record[1])
                                    })
                                    ids.push(id)
                                }

                            }
                        })
                        
                        if(ids.length>0){
                            

                            const excelData=[]
                            const posts = await classroomController._list({ids})

                            dataRows.sort((a,b)=>a.value < b.value ? 1 : b.value < a.value ? -1 : 0)

                            if(posts && posts.data &&  posts.data.items){

                                const items = posts.data.items

                                dataRows.forEach((row,index)=>{

                                    const found = items.findIndex(obj=>obj.id==row.id)

                                    if(found>-1){
                                        row = {...row,title:items[found].title,author:items[found].createdBy.name}
                                        dataRows[index] = row                                        
                                        
                                        excelData.push([index+1,row.title,row.author,row.value])
                                    }

                                })
                            }

                            setGaData({results,rows:dataRows})

                            if(props.onLoad){

                                const dataSet1 = [{
                                    ySteps:2,
                                    columns:["No","Ruang belajar","Pengajar","Total dipelajari"],
                                    data:excelData
                                }]
    
                                props.onLoad(dataSet1)
                            }

                        }
                        
                        setEmpty(false)
                    }
                    else{

                    }

                    setFetching(false)
                }

            })
            .catch(error=>console.log(error))
    }


    return(
        <>
            <VuroxComponentsContainer style={{height:"330px"}}>
                <Row>
                    <Col md={24}>
                        {isEmpty && !isFetching ? 
                            <div className="d-flex align-items-center justify-content-center" style={{minHeight:"330px"}}>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </div>
                        :
                            <Chartbox5Pie loading={isFetching} label={props.label} description={props.description} data={gaData}/>
                        }
                    </Col>
                </Row>
            </VuroxComponentsContainer>
        
        </>                        
    )
}

export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
                listClassroomsRoutinePromise
        },dispatch),dispatch
    })
)(AnalyticBox)