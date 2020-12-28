import React from 'react'
import HTMLRenderer from 'react-html-renderer'
import {Typography} from 'antd'

const HTML = (props) =>{

    const {Paragraph} = Typography

    return (
        <HTMLRenderer
            components={{
                p:props=><Paragraph {...props}/>
            }}
            {...props}
        />
    )

}

export default HTML