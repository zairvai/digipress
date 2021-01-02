import React from 'react'
import {
    LineChart, Line, XAxis, Tooltip, ResponsiveContainer
  } from 'recharts';

import {LoadingOutlined} from '@ant-design/icons'

const Chart = ({label,toolTipStyle,...props}) =>{

    const [isLoading,setLoading] = React.useState(true)
    const [data,setData] = React.useState()


    React.useEffect(()=>{
        if(props.data){
            setData(props.data)
            setLoading(false)
        }
    },[props.data])

    
    
    return(
        <div className={`vurox-admin-components-block rounded overview-hidden ${props.className}`} style={{minHeight:"200px"}}>
            
            {isLoading ? 
            <div className="d-flex  justify-content-center align-items-center" style={{minHeight:"inherit"}}>
                <LoadingOutlined style={{fontSize:"50px",color:"#ffffff"}} className="align-self-center"/>
            </div>
            :
            <>
                <div className={`vurox-admin-components-block-content ${props.className} constant-white`}>
                    <h6 className="text-white">{label}</h6>
                    <h3 className="text-white">{data && data.results}{props.numberFormat==="percentage" && '%'}<small>&nbsp;<i className="ti-stats-up"></i> 2.00% (30 hari)</small></h3>
                    <i className=""></i>
                </div>
                <ResponsiveContainer width='100%' height={100} debounce={10}>
                    <LineChart data={data && data.rows} margin={{ top: 20, right: 0, left: 0, bottom: 3 }}>
                        <XAxis dataKey="date" hide={true} />
                        <Tooltip label={label} labelStyle={toolTipStyle} itemStyle={toolTipStyle} cursor={false} />
                        <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </>
            }
        </div>
    )

}

export default Chart