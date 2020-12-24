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
                <Col md={12}>{item.category && item.category.name}</Col>
                <Col md={12}>
                    <div className="fright">
                        <ul className="vurox-horizontal-links vurox-standard-ul">
                            {Permission.UPDATE_ARTICLE({auth,item}) && <li className="p-0 mr-3"><Link href={{pathname:`/${auth.account.uniqueURL}/content/articles/[id]/edit`,query:{id:item.id}}} shallow><a><i className="ti-pencil"></i>&nbsp;Ubah artikel</a></Link></li>}
                            {Permission.DELETE_ARTICLE({auth,item}) && <li className="p-0"><Button onClick={()=>props.onDelete(item)} className="link" type="link" size="small" icon={<i className="ti-trash"></i>}>&nbsp;Hapus artikel</Button></li>}
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={24}>
                    <h4 className="mb-0 mt-2">{item.title}</h4>
                </Col>
            </Row>
            <Row>
                <Col md={24}><h4>{item.name}</h4></Col>
            </Row>
            <Row className="mt-2">
                <Col md={24}>
                    <HTMLRenderer html={item.content ? item.content : ""}/>
                </Col>
            </Row>
            <Row>
                <Col md={24}>
                    Tag&nbsp;
                {
                    item.tags && 
                    item.tags.map(tag=> tag &&
                        <Tag key={tag.id}>
                            <Link href={{pathname:`/content/tags/[name]`,query:{name:tag.name}}} shallow><a>{tag.name}</a></Link>
                        </Tag>	
                    )
                }
                </Col>
            </Row>
        </>
    )

}

export default connect(state=>state)(Reader)