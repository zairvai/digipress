import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'

import {withRouter} from 'next/router'
import {
    VuroxBreadcrumbs
} from 'Components/breadcrumbs'

import {	
	VuroxTableHeading, 
	VuroxAdvancedTableHeading, 
	VuroxTableDark
} from 'Components/tables'

import { 
	VuroxChartsBoxHead, 
	VuroxChartsLegend, 
	processDualChartsData
} from 'Components/charts'
import { VuroxProgressbar } from 'Components/progressbar' 
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import { vuroxContext } from 'Context'

import HeaderDark from 'Templates/HeaderDark';
import Summery from 'Templates/Summery';
import Sidebar from 'Templates/HeaderSidebar';

import {Mylink} from 'Components/mycomponents'

import { Row, Col,Space} from 'antd'

import {currency} from 'Utilities/number'

import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, linearGradient, PieChart, Pie, Sector
} from 'recharts';


class campaign extends React.Component {

	static contextType = vuroxContext
	state = {
		doubleBarChartData: [],
		doubleBarChartData2: []
	}

    item = {}
    links = []
	componentDidMount(){
        
        const visitors = this.props.company.visitors[0].dailyStats
        const profit = this.props.company.profit
        
		let barChartData = processDualChartsData( visitors, profit, 'date', 'visitors', 'profit', 20 )
		let barChartData2 = processDualChartsData( visitors, profit, 'date', 'visitors', 'profit', 7 )

		this.setState({doubleBarChartData: barChartData })
        this.setState({doubleBarChartData2: barChartData2 })
        
        var {query} = this.props.router 
        this.id = query.id
        
        this.item = this.props.accounts.item 

        this.links = [['Report','/report/dashboard',''],['Dashboard','/report/dashboard','active']]
    }
    
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
                        <Summery pagename={this.item.name} links={this.links}/>
                        <Row className="mb-2">
                            <Col md={12}>
                                <div className="vurox-tabs-underlined vurox-dark vurox-tabs-underlined-left mt-3 mb-1">
                                    <ul className="nav nav-pills vurox-dropdown-list" id="vurox-tab" role="tablist">
                                        <li className="nav-item">
                                            <Mylink href={"/campaign/"+this.id} text="Overview"/>
                                        </li>
                                        {/* <li className="nav-item">
                                            <Mylink href={"/campaign/"+this.id+"/description"} text="Description"/>
                                        </li> */}
                                    </ul>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="fright">
                                    <ul className="vurox-horizontal-links vurox-standard-ul pt-3">
                                        <li><a href=""><i className="ti-save"></i> save report</a></li>
                                        <li><a href=""><i className="ti-book"></i> Export to PDF</a></li>
                                        <li><a href=""><i className="ti-email"></i> Send to email</a></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
						<Row id="description">
                            <Col md={24}>
                                {this.props.children}
                            </Col>
                        </Row>
					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(withRouter(campaign))