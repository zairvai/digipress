import React from 'react'
import {connect} from 'react-redux'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import {Row,Col} from 'antd'
import {round} from 'Utilities/number'
import Chartbox3 from 'Components/Chartbox3'
import Chartbox4 from 'Components/Chartbox4'
import AnalyticController from 'Library/controllers/AnalyticController'
import {LoadingOutlined} from '@ant-design/icons'
import moment from 'moment'
import AuthController from 'Library/controllers/AuthController'

const AnalyticBox = ({selectedMenu,...props}) =>{

    const {auth} = props

    const [isFetching,setFetching] = React.useState(true)
    const [gaPageviews,setGaPageviews] = React.useState()
	const [gaSessions,setGaSessions] = React.useState()
    const [gaPagesPerSession,setGaPagesPerSession] = React.useState()
    const [doubleBarData,setDoubleBarData] = React.useState([])
    
    const [selectedRange,setSelectedRange] = React.useState()

    const isMounted = React.useRef()

    const analyticController = new AnalyticController()


    React.useEffect(()=>{
        if(selectedMenu) setSelectedRange(selectedMenu)
    },[selectedMenu])
    
    React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){

            let pagePath

            if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
                pagePath=`/${auth.account.uniqueURL}/`
			}
            
            fetchData({pagePath,startDate:selectedRange && selectedRange.value})

        }

        return ()=>isMounted.current=false

    },[selectedRange])

    const fetchData = ({pagePath,startDate="30daysAgo",endDate="yesterday"}) => {

        let params = {
			metrics: "ga:pageviews,ga:sessions,ga:pageviewsPerSession",
			segment: "gaid::-1",
			dimensions: "ga:date"
		}

        if(startDate) params["startDate"] = startDate
        if(endDate) params["endDate"] = endDate

		if(pagePath){
			params = {...params,filters:`ga:pagePath=~${pagePath}`}
        }

        setFetching(true)

        analyticController._getData(params)
			.then(data=>{
				
				if(data.results){

					if(data.rows){

						let pageviewsRows=[],sessionsRows=[],pagesPerSessionRows=[]
                        let barData1=[],barData2=[]
                        
						data.rows.forEach((record,index)=>{
                            
                            let date =  moment(record[0]).format("D MMM YYYY")
                            
                            let pageviews = parseInt(record[1])
                            let sessions = parseInt(record[2])
                            let pagesPerSession = parseInt(record[3])

                            if(pageviews > 0) pageviewsRows.push({date,value:pageviews})
                            if(sessions > 0) sessionsRows.push({date,value:sessions})
                            if(pagesPerSession > 0) pagesPerSessionRows.push({date,value:pagesPerSession})

                            //if(pageviews>0 && sessions>0){
                                barData1.push({date,value:pageviews})
                                barData2.push({date,value:sessions})
                            //}

						})
						
						setGaPageviews({results:data.results["ga:pageviews"],rows:pageviewsRows})
						setGaSessions({results:data.results["ga:sessions"],rows:sessionsRows})
                        setGaPagesPerSession({results:round(data.results["ga:pageviewsPerSession"]),rows:pagesPerSessionRows})
                        
                        const bar1 = {label:"Pageviews",color:"#F7614E",data:barData1}
                        const bar2 = {label:"Visits",color:"#50bc5e",data:barData2}
                        setDoubleBarData({bar1,bar2})

    
                    }
                }

                setFetching(false)
            })
            .catch(error=>console.log(error))
    }

    const vuroxDarkToolTipStyles = {
		border: 'none',
		borderRadius: '3px',
        fontSize: '12px',
        color:'#333333'
    }

    return(
        <>
            {isFetching ? 

            <VuroxComponentsContainer className="" style={{height:"408px"}}>
                
                <div className="d-flex  justify-content-center align-items-center" style={{height:"inherit"}}>
                    <LoadingOutlined style={{fontSize:"50px",color:"#333333"}} className="align-self-center"/>
                </div>
                
            </VuroxComponentsContainer>

            :
            
            <VuroxComponentsContainer style={{height:"408px"}}>
                <div className="px-4 pt-4">
                    <Row>
                        <Col md={8} xs={24}>
                            <Chartbox3 label="Pageviews" data={gaPageviews} toolTipStyle={vuroxDarkToolTipStyles} fillColor="#F7614D" />
                        </Col>
                        <Col md={8} xs={24}>
                            <Chartbox3 label="Visits" data={gaSessions} toolTipStyle={vuroxDarkToolTipStyles} fillColor="#50bc5e" />
                        </Col>
                        <Col md={8} xs={24}>
                            <Chartbox3 label="Pages/Visit" data={gaPagesPerSession} toolTipStyle={vuroxDarkToolTipStyles} fillColor="#00bcd4" />
                        </Col>
                    </Row>
                </div>
                <div className="pb-4">
                    <Row>
                        <Col md={24}>
                            <Chartbox4 data={doubleBarData} selectedRange={selectedRange} toolTipStyle={vuroxDarkToolTipStyles}/>
                        </Col>
                    </Row>
                </div>
            </VuroxComponentsContainer>

            
            }
            
        </>                        
    )
}

export default connect(state=>({auth:state.auth}))(AnalyticBox)