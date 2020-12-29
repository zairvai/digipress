import React from 'react'
import {connect} from 'react-redux'
import {Row,Col,Button,Tag} from 'antd'
import Link from 'next/link'
import Permission from 'Library/controllers/Permission'
import HTMLRenderer from 'react-html-renderer'

const Reader = ({item,...props}) =>{

    const {auth} = props 

    return(
        <>
            <Row>
                <Col md={24}>
                    <HTMLRenderer html={item && item.content}/>
                </Col>
            </Row>
            <Row>
                <Col md={24}>
                    Tag&nbsp;
                {
                    item.tags && 
                    item.tags.map(tag=> tag &&
                        <Tag key={tag.id}>
                            <Link href={{pathname:'/content/tags/[name]',query:{name:tag.name}}} shallow><a>{tag.name}</a></Link>
                        </Tag>	
                    )
                }
                </Col>
            </Row>
        </>
    )

}

export default connect(state=>state)(Reader)