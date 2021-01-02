import React from 'react'
import {connect} from 'react-redux'
import { Row, Col } from 'antd'
import Chartbox1 from 'Components/Chartbox1'
import AnalyticController from 'Library/controllers/AnalyticController'
import moment from 'moment'
import {round} from 'Utilities/number'
import AuthController from 'Library/controllers/AuthController'

const AdminSummeryBox = ({...props}) => {

	const {auth} = props

	const [gaPageviews,setGaPageviews] = React.useState()
	const [gaSessions,setGaSessions] = React.useState()
	const [gaBounceRate,setGaBounceRate] = React.useState()
	const [gaUsers,setGaUsers] = React.useState()

	const isMounted = React.useRef()

	const analyticController = new AnalyticController()

	React.useEffect(()=>{

        isMounted.current = true

        if(isMounted.current){

			let pagePath

            if(!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth)){
                pagePath=`/${auth.account.uniqueURL}/`
			}
			
            fetchData({pagePath})

        }

        return ()=>isMounted.current=false

	},[])
	

	const fetchData = ({pagePath,startDate="30daysAgo",endDate="yesterday"}) => {

		let params = {
			metrics: "ga:pageviews,ga:sessions,ga:bounceRate,ga:users",
			segment: "gaid::-1",
			dimensions: "ga:date"
		}

		if(pagePath){
			params = {...params,filter:`ga:pagePath=~${pagePath}`}
		}

		if(startDate) params["startDate"] = startDate
        if(endDate) params["endDate"] = endDate

		if(pagePath){
			params = {...params,filters:`ga:pagePath=~${pagePath}`}
		}
		
		analyticController._getData(params)
			.then(data=>{
				
				if(data.results){

					if(data.rows){

						let pageviewsRows=[],sessionsRows=[],bounceRateRows=[],usersRows=[]
						let pageviewsCounter=0,sessionsCounter=0,bounceRateCounter=0,usersCounter=0
						let rangeStartDate = moment(data.rows[0][0]).format("D MMM YYYY"),rangeEndDate

						data.rows.forEach((record,index)=>{
							
							if((index+1)%5==0){

								rangeEndDate = moment(record[0]).format("D MMM YYYY")

								let date = `${rangeStartDate} - ${rangeEndDate}`
								
								pageviewsCounter += parseInt(record[1])
								sessionsCounter += parseInt(record[2])
								bounceRateCounter += parseFloat(record[3])
								usersCounter += parseInt(record[4])

								let avgBounceRate = bounceRateCounter/5
								bounceRateRows.push({date,value:round(avgBounceRate)})

								pageviewsRows.push({date,value:pageviewsCounter})
								sessionsRows.push({date,value:sessionsCounter})
								usersRows.push({date,value:usersCounter})

								pageviewsCounter=0,sessionsCounter=0,bounceRateCounter=0,usersCounter=0

								if((index+1) < data.rows.length)
									rangeStartDate = moment(data.rows[index+1][0]).format("D MMM YYYY")

							}else{

								pageviewsCounter += parseInt(record[1])
								sessionsCounter += parseInt(record[2])
								bounceRateCounter += parseFloat(record[3])
								usersCounter += parseInt(record[4])
							}
						})
						
						const pageviews = {results:data.results["ga:pageviews"],rows:pageviewsRows}
						setGaPageviews(pageviews)

						const sessions = {results:data.results["ga:sessions"],rows:sessionsRows}
						setGaSessions(sessions)

						const bounceRate = {results:round(data.results["ga:bounceRate"]),rows:bounceRateRows}
						setGaBounceRate(bounceRate)

						const users = {results:data.results["ga:users"],rows:usersRows}
						setGaUsers(users)

						if(props.onLoad){

							const dataSet = [
								{
									columns:["Pageviews","Visits","Bounce rate(%)","Visitors"],
									data:[pageviews.results,sessions.results,bounceRate.results,users.results]
								},
							]

							// const report = {overall:[
							// 	{name:"pageviews",...pageviews},
							// 	{name:"visits",...sessions},
							// 	{name:"bounce rate",...bounceRate},
							// 	{name:"visitors",...users}]}

							props.onLoad(dataSet)
						}

					}

				}

			})
			.catch(error=>console.log(error))

	}

	const vuroxDarkToolTipStyles = {
		border: 'none',
		borderRadius: '3px',
        fontSize: '12px',
        color:'#333333'
	}
	
	return (
		<Row gutter={{xs:4, sm:6, md:8}}>
			<Col md={12} lg={6} sm={12} className='w-100 mb-2'>
				<Chartbox1 label="Pageviews" data={gaPageviews} toolTipStyle={vuroxDarkToolTipStyles} className="bg-cyan-7"/>
			</Col>
			<Col md={12} lg={6} sm={12} className='w-100 mb-2'>
				<Chartbox1 label="Visits" data={gaSessions} toolTipStyle={vuroxDarkToolTipStyles} className="bg-blue-7"/>
			</Col>
			<Col md={12} lg={6} sm={12} className='w-100 mb-2'>
				<Chartbox1 label="Bounce Rate" data={gaBounceRate} toolTipStyle={vuroxDarkToolTipStyles} className="bg-purple-7"/>
			</Col>
			<Col md={12} lg={6} sm={12} className='w-100 mb-2'>
				<Chartbox1 label="Visitors" data={gaUsers} toolTipStyle={vuroxDarkToolTipStyles} className="bg-green-7"/>
			</Col>
		</Row>
	);
	
}

export default connect(state=>({auth:state.auth}))(AdminSummeryBox)