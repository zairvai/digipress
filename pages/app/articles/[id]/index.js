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
import { vuroxContext } from 'Context'

import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';
import { Row, Col,Form,Input,Button, Checkbox,Dropdown,Menu,Select,Space,Radio} from 'antd'
import RichTextEditor from 'Components/RichTextEditor'
import {useForm,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers'
import * as yup from 'yup'


class Index extends React.Component {

	static contextType = vuroxContext

    item = this.props.articles.item   

    pagename = ""
    links = [['App','/app/classroom',''],['Articles','/app/articles',''],[this.item.name,`/app/articles/${this.item.id}`,'active']]

	state = {
        formLayout:'vertical',
        selectedCategory:{id:null,value:null},
        selectedTags:[{id:null,value:null}],
        allowComment:true,
        readAccess:"",
	}

	componentDidMount(){
        
        const selectedCategory = {
            id:this.item.category.id,
            value:this.item.category.id.toString(),
            label:this.item.category.name}

        
        
        let selectedTags = []
        this.item.tags.forEach(tag=>selectedTags.push({
            id:tag.id,
            value:tag.id.toString(),
            label:tag.name}))

        const allowComment = this.item.allowComment
        const readAccess = this.item.readAccess

        this.setState({selectedCategory,selectedTags,allowComment,readAccess})

    }

    onFormLayoutChange = ({ layout }) => {
        this.setState({ formLayout: layout });
    };

    onSelectCategoryChange = selected =>{
        this.setState({selectedCategory:{
            id:parseInt(selected.value),
            value:selected.value,
            label:selected.label}})
    }

    onSelectTagsChange = selecteds =>{

        let items=[]

        selecteds.forEach((item)=>{
            items.push({
                id:parseInt(item.value),
                value:item.value,
                label:item.label})
        })

        this.setState({selectedTags:items})

    }

    onAllowCommentChange = e =>{

        const allowComment = e.target.checked
        this.setState({allowComment})
        
    }

    onReadAccessChange = e => {
        
        const readAccess = e.target.value
        this.setState({readAccess})
    }

	render() {

        
		const { menuState } = this.context
		const toggleClass = menuState ? 'menu-closed' : 'menu-open'

        const {selectedCategory,selectedTags,allowComment,readAccess} = this.state
    

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
                        
                        <Summery2 pagename={this.pagename} links={this.links}/>

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
                                                        labelInValue
                                                        value={selectedCategory}
                                                        showSearch
                                                        size="large"
                                                        placeholder="Select a category"
                                                        optionFilterProp="children"
                                                        optionLabelProp="label"
                                                        onChange={this.onSelectCategoryChange}
                                                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                                        
                                                        {this.props.categories.list.map(item=>
                                                            <Select.Option key={item.id} value={item.id} label={item.name}>{item.name}</Select.Option>
                                                        )}

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
                                                        labelInValue
                                                        value={selectedTags}
                                                        showSearch
                                                        size="large"
                                                        mode="multiple"
                                                        placeholder="Select tags"
                                                        optionFilterProp="children"
                                                        optionLabelProp="label"
                                                        onChange={this.onSelectTagsChange}
                                                        // onFocus={onFocus}
                                                        // onBlur={onBlur}
                                                        // onSearch={onSearch}
                                                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >

                                                        {this.props.tags.list.map(item=>
                                                            <Select.Option key={item.id} value={item.id} label={item.name}>{item.name}</Select.Option>
                                                        )}

                                                    </Select>
                                                </Form.Item>
                                                <div className="d-flex justify-content-end">
                                                    <Button className="link mt-2" type="link" size="small" icon={<i className="ti-plus"></i>}>&nbsp;Add new tag</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={24}>
                                                <Checkbox onChange={this.onAllowCommentChange} checked={allowComment}>Allow comment</Checkbox>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={24}>
                                                <Form.Item label="Who can read this article" className="mt-3 mb-0">
                                                    <Radio.Group onChange={this.onReadAccessChange} value={readAccess}>
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
export default connect(state=>state)(Index)