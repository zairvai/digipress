import React from 'react'

import { 
	VuroxChartsBoxHead
} from 'Components/charts'

import {
	ResponsiveContainer, CartesianGrid, Tooltip, AreaChart, Area,XAxis
} from 'recharts';

import {LoadingOutlined} from '@ant-design/icons'

import {Row,Col} from 'antd'

const Chart = ({label,fillColor,toolTopStyle,loading,...props}) => {

    const [data,setData] = React.useState()

    React.useEffect(()=>{
        if(props.data) setData(props.data)
    },[props.data])

    return(
        
        <>
            {loading ? 
            
            <div className="d-flex  justify-content-center align-items-center" style={{height:"200px"}}>
                <LoadingOutlined style={{fontSize:"50px",color:`${fillColor}`}} className="align-self-center"/>
            </div>
            
            :
            <>
                <VuroxChartsBoxHead>
                    <Row>
                        <Col md={12} sm={12}>
                            <h4 className="mb-1">{data && data.results}%</h4>
                            <p className="vurox-text-sizes">{label}</p>
                        </Col>
                        <Col md={12} sm={12}>
                            <p className="fright vurox-color-green"><i className="ti-stats-up"></i> +1.34% </p>
                        </Col>
                    </Row>
                </VuroxChartsBoxHead>
                <ResponsiveContainer width='100%' height={123} >	
                    <AreaChart data={data && data.rows}
                        margin={{ top: 10, right: 0, left: 0, bottom: 3 }}>
                        <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={fillColor} stopOpacity={0.5}/>
                            <stop offset="95%" stopColor={fillColor} stopOpacity={0}/>
                        </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} horizontal={false} strokeDasharray="1 1" />
                        <XAxis dataKey="date" stroke="#ccc" hide={true} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={toolTopStyle} cursor={false} />
                        <Area type="linear" dataKey="value" stroke={fillColor} fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </>
            }
        </>
    )
}

export default Chart