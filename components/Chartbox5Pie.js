import React from 'react'
import {connect} from 'react-redux'

import { 
	VuroxChartsBoxHead
} from 'Components/charts'
import { 
    VuroxProgressbar 
} 
from 'Components/progressbar' 
import {
	ResponsiveContainer,Cell, PieChart, Pie
} from 'recharts';

import {LoadingOutlined} from '@ant-design/icons'
import {Row,Col} from 'antd'



const Chart = ({label,description,fillColor,toolTopStyle,loading,...props}) => {

    const [data,setData] = React.useState()

    const pieColors = ["#7B4DFF","#F7614E","#f9be49","#D44DFF","#FF4DD1","#FF4D78","#FF7B4D","#FFD44D","#E559F1","#59F1E5"]

    React.useEffect(()=>{
        if(props.data) {
            
            setData(props.data)
        }
    },[props.data])

    return(
        
        <>
            {loading ?
                <div className="d-flex  justify-content-center align-items-center" style={{height:"330px"}}>
                    <LoadingOutlined style={{fontSize:"50px",color:"#333333"}} className="align-self-center"/>
                </div>
                :
                <VuroxChartsBoxHead>
                    <div className="pb-3">
                        
                        <Row>
                            <Col md={18}>
                                <h5>{label}</h5>
                            </Col>
                        </Row>

                        <p className="vurox-text-sizes">{description}</p>

                    </div>
                    <Row>
                        <Col md={10}>
                            <ResponsiveContainer width='100%' height={200}>
                                <PieChart>
                                    <Pie data={data && data.rows} startAngle={360} endAngle={0} innerRadius={40} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value" stroke={0}>
                                        {
                                            data && data.rows.map((row, index) => <Cell key={`cell-${row.id}`} fill={pieColors[index]} />)
                                        }
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </Col>
                        <Col md={14} xs={24}>
                            <div className="ml-md-2 ml-0">
                            {
                                data && data.rows.map((row,index)=><VuroxProgressbar key={`progress-${row.id}`} progresstextleft={row.title} progresstextright={row.value} progresscolor={pieColors[index]} width={`${data && (row.value/data.results)*100}%`} />)
                            }
                            </div>
                        </Col>
                    </Row>
                    
                </VuroxChartsBoxHead>
            }
        </>
    )
}

export default Chart