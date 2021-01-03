import React from 'react'


import { 
	VuroxChartsBoxHead
} from 'Components/charts'

import {
	ResponsiveContainer, Tooltip, BarChart, Bar,XAxis
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
                            <p className="fright vurox-color-green"><i className="ti-stats-up"></i> +0.2% </p>
                        </Col>
                    </Row>
                </VuroxChartsBoxHead>
                <ResponsiveContainer width='100%' height={123}>
                    <BarChart data={data && data.rows}  margin={{ top: 20, right: 0, left: 0, bottom: 1 }}>
                        <XAxis dataKey="date" stroke="#ccc" hide={true} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={toolTopStyle} cursor={false} />
                        <Bar dataKey="value" fill={fillColor} barSize={10} barGap ={1} />
                    </BarChart>
                </ResponsiveContainer>
            </>
            }
        </>
    )
}

export default Chart