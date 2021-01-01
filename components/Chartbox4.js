import React from 'react'

import {
	VuroxComponentsContainer
} from 'Components/layout'

import { 
    VuroxChartsLegend,
    processDualChartsData
} from 'Components/charts'

import {
	ResponsiveContainer,LineChart,Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';


import {Row,Col,Typography} from 'antd'

const Chart = ({selectedRange,toolTipStyle,...props}) =>{


    const {Text} = Typography

    const [bar1,setBar1] = React.useState()
    const [bar2,setBar2] = React.useState()
    const [doubleBarChartData,setDoubleBarChartData] = React.useState([])

    React.useEffect(()=>{
        if(props.data){
            
            setBar1(props.data.bar1)
            setBar2(props.data.bar2)
            
        }
    },[props.data])


    React.useEffect(()=>{

        if(bar1 && bar2) {
            let barChartData = processDualChartsData( bar1.data, bar2.data, 'date', bar1.label, bar2.label )
            setDoubleBarChartData(barChartData)
        }

    },[bar1,bar2])

    return(
        <>
            
            <Row className="p-4">
                <Col md={12}>
                    <h5>Performance Overview</h5>
                    <p className="vurox-text-sizes mb-2">
                        <Text>{selectedRange && selectedRange.description}</Text>
                    </p>
                </Col>
                <Col md={12}>
                    <div className="fright pt-3">
                        <VuroxChartsLegend fill={bar1 && bar1.color} text={bar1 && bar1.label} type='horizontal' shape='rectangle' />
                        <VuroxChartsLegend fill={bar1 && bar2.color} text={bar1 && bar2.label} type='horizontal' shape='rectangle' />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={24} xs={24}>
                    <ResponsiveContainer width='100%' height={192} >	
                        <LineChart data={doubleBarChartData}
                            margin={{ top: 10, right: 40, left: 0, bottom: 0 }}>
                            <XAxis dataKey="date" stroke="#ccc" tickLine={false} axisLine={false} />
                            <YAxis stroke="#ccc" tickLine={false} axisLine={false} domain={[0, 300]} />
                            <CartesianGrid horizontal={false} strokeDasharray="1 1" opacity={0.15} />
                            <Tooltip contentStyle={toolTipStyle} cursor={false} />
                            <Line type="linear" dataKey={bar1 && bar1.label} stroke={bar1 && bar1.color} fillOpacity={1} strokeWidth={2} dot={{ fill: bar1 && bar1.color, strokeWidth: 1 }} />
                            <Line type="linear" dataKey={bar1 && bar2.label} stroke={bar1 && bar2.color} fillOpacity={1} strokeWidth={1} opacity={0.5} dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>	
                </Col>
            </Row>
            
            
            
        </>
    )
}

export default Chart