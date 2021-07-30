import React from 'react'
import {Row,Col,Tag} from 'antd'
import HTML from 'Components/HTML'

const Reader = ({item}) =>{

    return(
        <>
            <Row>
                <Col md={24}>
                    <div id="postContent">
                        <HTML html={item && item.content}/>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={24}>
                {
                    item.tags && 
                    <>Tag&nbsp;
                    {item.tags.map(tag=> tag &&
                        <Tag key={tag.id}>
                            {tag.name}
                        </Tag>	
                    )}
                    </>
                }
                </Col>
            </Row>
        </>
    )

}

export default Reader