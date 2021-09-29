import React from 'react'
import HTMLRenderer from 'react-html-renderer'
import {Typography} from 'antd'
import {inlineCssToJson} from 'Helper'

const HTML = (htmlProps) =>{

    const {Paragraph,Text} = Typography

    return (
        <HTMLRenderer
            components={{
                p:props=><Paragraph displayName="htmlParagraph" className={props.class}>{props.children}</Paragraph>,
                div:props=>{
                    const styleAttributes = inlineCssToJson(props.style)
                    return <Text style={styleAttributes}>{props.children}</Text>
                },
                a:props=>{
                    const styleAttributes = inlineCssToJson(props.style)
                    return <Text displayName="htmlAnchor" style={styleAttributes}>{props.children}</Text>
                },
                span:props=>{
                    const styleAttributes = inlineCssToJson(props.style)
                    return <Text displayName="htmlSpan" style={styleAttributes}>{props.children}</Text>
                },
                
            }}
            {...htmlProps}
        />
    )

}

export default HTML