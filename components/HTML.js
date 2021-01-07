import React from 'react'
import HTMLRenderer from 'react-html-renderer'
import {Typography} from 'antd'

const HTML = (props) =>{

    const {Paragraph} = Typography

    return (
        <HTMLRenderer
            components={{
                div:props=><span>{props.children}</span>,
                a:props=><span>{props.children}</span>,
                span:props=><span>{props.children}</span>,
                p:props=><Paragraph>{props.children}</Paragraph>
            }}
            {...props}
        />
    )

}

export default HTML