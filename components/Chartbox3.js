import React from 'react'
import {
    BarChart, Bar,XAxis, Tooltip, ResponsiveContainer
  } from 'recharts';

const Chart = ({label,fillColor,toolTipStyle,...props}) =>{


    const [isLoading,setLoading] = React.useState(true)
    const [data,setData] = React.useState()

    React.useEffect(()=>{
        if(props.data){
            // props.data.rows.splice(0,10)
            setData(props.data)
            setLoading(false)
        }
    },[props.data])

    return(
        <>
            <ResponsiveContainer className="d-inline-block" width='30%' height={60}>
                <BarChart data={data && data.rows}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
                    <XAxis dataKey="date" hide={true} />
                    <Tooltip contentStyle={toolTipStyle} cursor={false} />
                    <Bar dataKey="value" fill={fillColor} barSize={2} barGap ={2} />
                </BarChart>
            </ResponsiveContainer>

            <h4 className="vurox-fw-300 d-inline-block align-bottom mb-1">
                {data && data.results } 
                <small className="vurox-text-sizes"> {label}</small>
            </h4>
        </>
    )
}

export default Chart