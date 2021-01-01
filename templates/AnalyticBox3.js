import React from 'react'
import {connect} from 'react-redux'
import {Row,Col,Empty} from 'antd'

import {
	VuroxComponentsContainer
} from 'Components/layout'

import Chartbox5Pie from 'Components/Chartbox5Pie'
import AnalyticController from 'Library/controllers/AnalyticController'
import PostController from 'Library/controllers/PostController'

import { bindPromiseCreators } from 'redux-saga-routines';
import { listPostsRoutinePromise} from 'State/routines/post';

const AnalyticBox = ({selectedMenu,pagePath,...props}) =>{

    const [isEmpty,setEmpty] = React.useState(true)

    const [gaData,setGaData] = React.useState()

    const [selectedRange,setSelectedRange] = React.useState()
    const isMounted = React.useRef()

    const [isFetching,setFetching] = React.useState(false)

    const analyticController = new AnalyticController()
    const postController = new PostController(props)

    React.useEffect(()=>{
        if(selectedMenu) setSelectedRange(selectedMenu)
    },[selectedMenu])

    React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){

            fetchData({pagePath,startDate:selectedRange && selectedRange.value})

        }

        return ()=>isMounted.current=false

    },[selectedRange])

    const fetchData = ({pagePath,startDate="30daysAgo",endDate="yesterday"}) => {

        let params = {
			metrics: "ga:uniquePageviews",
			segment: "gaid::-1",
            dimensions: "ga:pagePath",
            // filters:"ga:pagePath=~/main/home/articles/[a-zxA-Z0-9\-]+/$",
            sort:"-ga:pagePath,-ga:uniquePageviews",
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
                    
                    const results = parseInt(data.results["ga:uniquePageviews"])

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
                            

                            const posts = await postController._list({ids})

                            if(posts && posts.data.items){

                                posts.data.items.forEach(post=>{
                                    
                                    const index = dataRows.findIndex(obj=>obj.id==post.id)

                                    if(index>-1){
                                        dataRows[index] = {...dataRows[index],title:post.title,author:post.createdBy.name}
                                    }
                                })
                            }
            
                            dataRows.sort((a,b)=>a.value < b.value ? 1 : b.value < a.value ? -1 : 0)
            
                            // const top3 = dataRows.splice(0,3)

                            setGaData({results,rows:dataRows})
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
                        {isEmpty ? 
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
                listPostsRoutinePromise
        },dispatch),dispatch
    })
)(AnalyticBox)