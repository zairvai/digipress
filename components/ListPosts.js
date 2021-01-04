import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import Truncate from 'react-truncate-html'
import {Row,Col,Typography,Divider,Button} from 'antd'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import Icon from '@mdi/react'
import { mdiBookOpenPageVariantOutline, mdiCommentMultipleOutline,mdiCommentOffOutline, mdiPostOutline } from '@mdi/js'
import Permission from 'Library/controllers/Permission'

const {Title,Text,Paragraph} = Typography

const ArticleItem = ({item,index,auth,...props}) => {

    return (
        <VuroxComponentsContainer className="mb-4 post">
            <div className="pt-3 px-3">
                <Row>
                    <Col md={18} sm={12} xs={12}>
                        <span><Icon size="1.5em" path={mdiPostOutline}/></span>&nbsp;
                        <Text>{item.category && item.category.name}</Text>
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <div className="fright">
                            <ul className="vurox-horizontal-links vurox-standard-ul">
                                {Permission.UPDATE_ARTICLE({auth,item}) && <li><Link href={{pathname:`/${auth.account.uniqueURL}/content/articles/[id]/edit`,query:{id:item.id}}} shallow><a><i className="ti-pencil"></i>&nbsp;Ubah</a></Link></li>}
                                {Permission.DELETE_ARTICLE({auth,item}) && <li><Button onClick={()=>props.onDelete(item,index)} className="link" type="link" size="small" icon={<i className="ti-trash"></i>}>&nbsp;Hapus</Button></li>}
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={24}>
                        <Title level={3} className="mt-2">{item.title}</Title>
                        
                        <Truncate 
                            lines={10}
                            responsive={false} 
                            dangerouslySetInnerHTML={{
                                __html: item.content
                            }}/>
                    
                    </Col>
                </Row>

                <Row>
                    <Col md={24}>
                        <Text>Penulis : {item.createdBy.name}</Text>
                    </Col>
                </Row>

            </div>
            <Row>
                <Col md={24} sm={24} xs={24}><Divider className="my-3"/></Col>
            </Row>
            
            <div className="pb-3 px-3">
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        <ul className="vurox-horizontal-links vurox-standard-ul">
                            {
                                item.allowComment  ? 
                                <li><a><Icon size="1.3em" path={mdiCommentMultipleOutline}/>&nbsp;{item.noOfAllComment > 0 ? `${item.noOfAllComment} komentar` : "belum ada komentar"}</a></li>
                                :
                                <li>
                                    <Icon size="1.3em" path={mdiCommentOffOutline}/>&nbsp;Komentar tidak diperbolehkan oleh penulis
                                </li>
                            }
                        </ul>
                    </Col>
                    <Col md={12} sm={12} xs={12}>
                        <div className="fright">
                            <ul className="vurox-horizontal-links vurox-standard-ul">
                                <li><Link href={`/${auth.account.uniqueURL}/main/home/articles/${item.id}`}><a>Baca artikel</a></Link></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </VuroxComponentsContainer>
    )

}

const ClassroomItem = ({item,index,auth,...props}) => {

    return (
        <VuroxComponentsContainer className="mb-4 post">
            <div className="pt-3 px-3">
                <Row>
                    <Col md={18} sm={12} xs={12}>
                        <Icon size="1.5em" path={mdiBookOpenPageVariantOutline}/> &nbsp;
                        <Text>{item.category.name}</Text>
                        
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <div className="fright">
                            <ul className="vurox-horizontal-links vurox-standard-ul">
                                {Permission.UPDATE_CLASSROOM({auth,item}) && <li><Link href={{pathname:`/${auth.account.uniqueURL}/content/classrooms/[id]/edit`,query:{id:item.id}}} shallow><a><i className="ti-pencil"></i>&nbsp;Ubah</a></Link></li>}
                                {Permission.DELETE_CLASSROOM({auth,item}) && <li><Button onClick={()=>props.onDelete(item,index)} className="link" type="link" size="small" icon={<i className="ti-trash"></i>}>&nbsp;Hapus</Button></li>}
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={24}>
                        <Title level={3} className="mt-2">{item.title}</Title>
                        <Truncate 
                            lines={10}
                            responsive={false} 
                            dangerouslySetInnerHTML={{
                                __html: item.content
                            }}/>
                        
                    </Col>
                </Row>
                <Row>
                    <Col md={24}>
                        <Text>Pengajar : {item.createdBy.name}</Text>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col md={24} sm={24} xs={24}><Divider className="my-3"/></Col>
            </Row>
            
            <div className="pb-3 px-3">
                <Row>
                    <Col md={12} sm={12} xs={12}>
                        {/* <ul className="vurox-horizontal-links vurox-standard-ul">
                            <li><a><Icon size="1.3em" path={mdiCommentMultipleOutline}/>&nbsp;10</a></li>
                        </ul> */}
                    </Col>
                    <Col md={12} sm={12} xs={12}>
                        <div className="fright">
                            <ul className="vurox-horizontal-links vurox-standard-ul">
                                <li><Link href={`/${auth.account.uniqueURL}/main/home/classrooms/${item.id}`}><a>Masuk ruang belajar</a></Link></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </VuroxComponentsContainer>
    )

}

const List = ({items,...props}) =>{

    const {auth} = props

    return(
        <>
            {
                items && items.map((item,index)=>(
                    <div key={item.id}>
                    {
                        item.postType == "Article" ? 
                        <ArticleItem item={item} index={index} auth={auth} onDelete={props.onDelete}/>
                        :
                        <ClassroomItem item={item} index={index} auth={auth} onDelete={props.onDelete}/>
                    }
                    </div>
                ))
            }
        </>
    )
}

export default connect(state=>state)(List)