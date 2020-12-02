import React from 'react'
import {connect} from 'react-redux'
import Layout from 'Templates/Layout.article.id'
import { Row, Col,Tag,Form,Input,Button, Checkbox,Dropdown,Menu,Select,Space,Radio,Typography} from 'antd'
import Link from 'next/link'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import {	
	VuroxTableDark
} from 'Components/tables'
import HTMLRenderer from 'react-html-renderer'
import {Status} from 'Components/mycomponents.js'

class Index extends React.Component{

    item = this.props.articles.item


    render(){

        return(
            <React.Fragment>
                <Layout item={this.item}>

                    <Row>
                        <Col md={24}>
                            <VuroxComponentsContainer className="p-4">
                                <Row>
                                    <Col md={12}><h6>{this.item.category.name}</h6></Col>
                                    <Col md={12}>
                                        <div className="fright">
                                            <ul className="vurox-horizontal-links vurox-standard-ul">
                                                <li className="p-0"><Link href={{pathname:'/app/articles/[id]/edit',query:{id:this.item.id}}} shallow><a><i className="ti-pencil"></i>&nbsp;Edit article</a></Link></li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={24}><h4>{this.item.name}</h4></Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={24}>
                                        <HTMLRenderer html={this.item.content}/>
                                    </Col>
                                </Row>
                                <Row className="mt-5">
                                    <Col md={24}>
                                    {
                                        this.item.tags.map(tag=>
                                            <Tag key={tag.id}>
                                                <Link href={{pathname:'/app/tags/[name]',query:{name:tag.name}}} shallow><a>{tag.name}</a></Link>
                                            </Tag>	
                                        )
                                    }
                                    </Col>
                                </Row>
                            </VuroxComponentsContainer>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <VuroxComponentsContainer className="p-4 mt-2">
                                <Row>
                                    <Col md={12}><h6>Kolom Komentar</h6></Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col md={24}>
                                        <VuroxTableDark>
                                            <table className="table table-borderless mb-0">
                                                <thead>
                                                    <tr>
                                                        <th width="20"><Checkbox/></th>
                                                        <th width="40%">Komentar</th>
                                                        <th>Tanggal</th>
                                                        <th>Penulis</th>
                                                        <th className="fright">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
													this.props.comments.list.map(item=>(
														<tr key={item.id}>
															<td><Checkbox/></td>
															<td valign="middle"><Link href={{pathname:'/app/articles/[id]/comments/[cid]',query:{id:this.item.id,cid:item.id}}} shallow><a>{item.name}</a></Link></td>
															<td valign="middle">{item.datetime}</td>
															<td valign="middle"><Link href={{pathname:'/access/user/[id]',query:{id:item.author.id}}} shallow><a>{item.author.name}</a></Link></td>
															<td valign="middle" className="fright">
																{
																	item.status===3 ? <Status text="Approved" state="success" position="right"/> :
																	item.status===2 ? <Status text="Pending" state="warning" position="right" blinking/> :
																	// campaign.status===2 ? <Status text="On Approval" state="warning" position="right"/> :
																	// campaign.status===3 ? <Status text="Running" state="success" position="right" blinking/> :
																	// campaign.status===4 ? <Status text="Finished" state="default" position="right"/> :
																	// campaign.status===5 ? <Status text="Canceled" state="fail" position="right"/> :
																	<></>
																}
															</td>
														</tr>
													))
												}
                                                </tbody>
                                            </table>
                                        </VuroxTableDark>
                                    </Col>
                                </Row>
                            </VuroxComponentsContainer>
                        </Col>
                    </Row>

                </Layout>
            </React.Fragment>
        )

    }

}

export default connect(state=>state)(Index)