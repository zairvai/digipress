import React from 'react'
import {connect} from 'react-redux'
import {Row,Col,} from 'antd'
import {
	VuroxComponentsContainer
} from 'Components/layout'

import {round} from 'Utilities/number'
import Chartbox5Line from 'Components/Chartbox5Line'
import Chartbox5Bar from 'Components/Chartbox5Bar'
import AnalyticController from 'Library/controllers/AnalyticController'
import moment from 'moment'
import AuthController from 'Library/controllers/AuthController'

const AnalyticBox = ({selectedMenu,...props}) =>{

    const {auth} = props
    
    const [gaNewUsers,setGaNewUsers] = React.useState()
    const [gaReturnUsers,setGaReturnUsers] = React.useState()
    const [selectedRange,setSelectedRange] = React.useState()
    const isMounted = React.useRef()

    const [isFetching,setFetching] = React.useState(false)

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

        return ()=>{
            analyticController._cancel()
            isMounted.current=false
        }

    },[selectedRange])

    const fetchData = ({pagePath,startDate="30daysAgo",endDate="yesterday"}) => {

        let params = {
			metrics: "ga:sessions",
			segment: "gaid::-1",
            dimensions: "ga:date,ga:userType",
            sort:"ga:userType"
		}

        if(startDate) params["startDate"] = startDate
        if(endDate) params["endDate"] = endDate

		if(pagePath){
			params = {...params,filters:`ga:pagePath=~${pagePath}`}
        }
        
        setFetching(true)

        analyticController._getData(params)
			.then(data=>{
				
				if(data && data.results){

                    const results = parseInt(data.results["ga:sessions"])
                    
					if(data.rows){

                        let newUsersRows=[],returnUsersRows=[]
                        let newUsersExcel=[],returnUsersExcel=[]
                        let newUsersCounter=0,returnUsersCounter=0
    

                        data.rows.forEach((record,index)=>{

                            let date =  moment(record[0]).format("D MMM YYYY")
                            
                            let sessions = parseInt(record[2])

                            if(sessions>0){
                                
                                if(record[1]==="New Visitor"){
                                    newUsersRows.push({date,value:sessions})
                                    newUsersExcel.push([date,sessions])
                                    newUsersCounter += sessions
                                }
                                else if(record[1]==="Returning Visitor"){
                                    returnUsersRows.push({date,value:sessions})
                                    returnUsersExcel.push([date,sessions])
                                    returnUsersCounter += sessions
                                }
                            }
                        })

                        const newUsers = {results:round((newUsersCounter/results)*100),rows:newUsersRows}
                        
                        setGaNewUsers(newUsers)
                        const returnUsers = {results:round((returnUsersCounter/results)*100),rows:returnUsersRows}
                        setGaReturnUsers(returnUsers)

                        if(props.onLoad){

							const dataSet1 = [{
                                ySteps:2,
                                columns:["Tanggal","Return visitor"],
                                data:returnUsersExcel
                            }]

                            const dataSet2 = [{
                                ySteps:1,
                                columns:["Tanggal","New visitor"],
                                data:newUsersExcel
                            }]


                            props.onLoad([...dataSet1,...dataSet2])
                        }
                        
                    }

                }

                setFetching(false)
            })
    }

    const vuroxDarkToolTipStyles = {
		border: 'none',
		borderRadius: '3px',
        fontSize: '12px',
        color:'#333333'
    }

    return(
        <>
            <VuroxComponentsContainer style={{height:"200px"}}>
                <Row>
                    <Col md={24} className="mt-0 mt-xs-2">
                        <Chartbox5Line loading={isFetching} label="Return visitors" tooltipStyle={vuroxDarkToolTipStyles} data={gaReturnUsers} fillColor="#00C150"/>  
                    </Col>
                </Row>
            </VuroxComponentsContainer>
            <VuroxComponentsContainer style={{height:"200px"}} className="mt-2">
                <Row>
                    <Col md={24}>
                        <Chartbox5Bar loading={isFetching} label="New visitors" tooltipStyle={vuroxDarkToolTipStyles} data={gaNewUsers} fillColor="#F7614E"/>  
                    </Col>
                </Row>
            </VuroxComponentsContainer>
            
        </>                        
    )
}

export default connect(state=>({auth:state.auth}))(AnalyticBox)