import React,{useState} from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {	
	VuroxTableDark
} from 'Components/tables'

import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import VuroxFormSearch from 'Components/search'
import { vuroxContext } from 'Context'

import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';

import { Row, Col,Form,Input,Button, Checkbox,Dropdown,Menu,Select,Space,Radio} from 'antd'
import {currency} from 'Utilities/number'
import Icon from '@mdi/react'
import {mdiGoogleAds, mdiInstagram} from '@mdi/js'
import {Status} from 'Components/mycomponents.js'
import { Search} from 'react-bootstrap-icons'
import RichTextEditor from 'Components/RichTextEditor'


class index extends React.Component {

	static contextType = vuroxContext

    item = {}

	state = {
        formLayout:'vertical',
        pagename:"",
        links:[],
	}

    

	componentDidMount(){
        this.item = this.props.articles.item     
        const pagename = ""
        const links = [['App','/app/classroom',''],['Articles','/app/articles',''],[this.item.name,`/app/articles/${this.item.id}`,'active']]
        
        this.setState({pagename,links})
    }

    onAccessValueChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({accessValue:e.target.value})
    };

    onFormLayoutChange = ({ layout }) => {
        this.setState({ formLayout: layout });
    };

	render() {

		const { menuState } = this.context
		const toggleClass = menuState ? 'menu-closed' : 'menu-open'


		return (
			<React.Fragment>
				<HeaderLayout className="sticky-top">
					<HeaderDark />
				</HeaderLayout>
				<VuroxLayout>
					<VuroxSidebar width={240} className={`sidebar-container  ${toggleClass}`} >
						<Sidebar className={toggleClass} />
					</VuroxSidebar>
					<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
                        
                        <Summery2 pagename={this.state.pagename} links={this.state.links}/>

                        <Form
                            layout={this.state.formLayout}
                            initialValues={{layout:this.state.formLayout}}
                        >
                            <Row>
                                <Col md={18}>
                                    <VuroxComponentsContainer className="p-4">
                                        <Row>
                                            <Col md={24}>
                                                <Form.Item label="Title">
                                                    <Input size="large" placeholder="..." value={this.item.name} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={24}>
                                                <Form.Item label="Summary" className="mb-0">
                                                    <Input.TextArea style={{height:"150px"}} placeholder="..." value={this.item.summary}/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </VuroxComponentsContainer>	
                                    <VuroxComponentsContainer className="p-4 mt-2">
                                        <Row>
                                            <Col md={24}>
                                                <Form.Item label="Content">
                                                    <RichTextEditor style={{height:"600px"}} className="mb-3" value={this.item.content}/>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </VuroxComponentsContainer>
                                </Col>
                                <Col md={6}>
                                    <VuroxComponentsContainer className="p-4 ml-2">
                                        <Row>
                                            <Col md={24}>
                                                
                                                <Form.Item label="Category" className="mb-0">
                                                    <Select
                                                        size="large"
                                                        showSearch
                                                        placeholder="Select a category"
                                                        optionFilterProp="children"
                                                        // onChange={onChange}
                                                        // onFocus={onFocus}
                                                        // onBlur={onBlur}
                                                        // onSearch={onSearch}
                                                        filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        <Select.Option value="jack">Jack</Select.Option>
                                                        <Select.Option value="lucy">Lucy</Select.Option>
                                                        <Select.Option value="tom">Tom</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                                <div className="d-flex justify-content-end">
                                                    <Button className="link mt-2" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp;Add new category</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={24}>
                                                
                                                <Form.Item label="Tags" className="mb-0">
                                                    <Select
                                                        size="large"
                                                        showSearch
                                                        mode="tags"
                                                        placeholder="Select tags"
                                                        optionFilterProp="children"
                                                        // onChange={onChange}
                                                        // onFocus={onFocus}
                                                        // onBlur={onBlur}
                                                        // onSearch={onSearch}
                                                        filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        <Select.Option value="jack">Jack</Select.Option>
                                                        <Select.Option value="lucy">Lucy</Select.Option>
                                                        <Select.Option value="tom">Tom</Select.Option>
                                                    </Select>
                                                </Form.Item>
                                                <div className="d-flex justify-content-end">
                                                    <Button className="link mt-2" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp;Add new tag</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={24}>
                                                <Checkbox onChange={()=>{}}>Allow comment</Checkbox>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={24}>
                                                <Form.Item label="Who can read this article" className="mt-3 mb-0">
                                                    <Radio.Group onChange={this.onAccessValueChange.bind(this)} value={this.state.accessValue}>
                                                        <Radio value="public">Public</Radio>
                                                        <Radio value="private">Private</Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </VuroxComponentsContainer>
                                    <VuroxComponentsContainer className="p-4 ml-2 mt-2">
                                        <Row>
                                            <Col md={24}>
                                                <Row>
                                                    <Col md={11}>
                                                        <Button size="medium" type="primary" block>Save</Button>
                                                    </Col>
                                                    <Col md={2}></Col>
                                                    <Col md={11}>
                                                        <Button size="medium" type="primary" danger block>Unpublish</Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </VuroxComponentsContainer>
                                </Col>
                            </Row>
						</Form>

					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(index)