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
    vuroxDarkToolTipStyles,
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
import { vuroxContext } from '../../../context'

import Layout from 'Templates/DashboardLayout'
import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import AdminSummeryBox from 'Templates/AdminSummeryBox';
import Sidebar from 'Templates/HeaderSidebar';

import { Row, Col,Space,Form,Tag,Typography} from 'antd'
import {ViewMore} from 'Components/link'
import {currency} from 'Utilities/number'

import {
	ResponsiveContainer, BarChart,LineChart,Line, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, linearGradient, PieChart, Pie, Sector
} from 'recharts';


class Page extends React.Component {

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
        
        this.item = this.props.campaigns.item 
        console.log(this.item)
        this.links = [['Main','/dashboard',''],['Campaign','/campaign','active']]

    }
    
	render() {
		
		return (
			<React.Fragment>
                <Layout>
					<AdminSummeryBox />
					<Row gutter={{xs: 4, sm:6, md: 8}}>
						<Col md={14}>
						<VuroxComponentsContainer className="p-4 rounded-top">
							<Row>
								<Col md={12}>
									<h5>Campaign Metric</h5>
									<p className="vurox-text-sizes mb-2">
										Total number of reach within the date range
									</p>
								</Col>
								<Col md={12}>
									<ul className='vurox-horizontal-links boxed fright mb-3'>
										<li><Link href=""><a className='active'>All</a></Link></li>
										<li><Link href=""><a>Today</a></Link></li>
										<li><Link href=""><a>Weekly</a></Link></li>
										<li><Link href=""><a>Monthly</a></Link></li>
									</ul>
								</Col>
							</Row>
							<Row>
								<Col md={8} xs={24}>
									<ResponsiveContainer className="d-inline-block" width='30%' height={60}>
										<BarChart data={this.props.company.visitors[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
											<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
											<Bar dataKey="value" fill="#00bcd4" barSize={2} barGap ={2} />
										</BarChart>
									</ResponsiveContainer>

									<h4 className="vurox-fw-300 d-inline-block align-bottom mb-1">
										{this.props.company.visitors[0].dailyTotal } 
										<small className="vurox-text-sizes"> Reach</small>
									</h4>
								</Col>
								<Col md={8} xs={24}>
									<ResponsiveContainer className="d-inline-block" width='30%' height={60}>
										<BarChart data={this.props.company.orders[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
											<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
											<Bar dataKey="value" fill="#50bc5e" barSize={2} barGap ={2} />
										</BarChart>
									</ResponsiveContainer>
									<h4 className="vurox-fw-300 d-inline-block align-bottom mb-1">{this.props.company.orders[0].dailyTotal} <small className="vurox-text-sizes"> Click</small></h4>
									
								</Col>
								<Col md={8} xs={24}>
									<ResponsiveContainer className="d-inline-block" width='30%' height={60}>
										<BarChart data={this.props.company.bounce[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
											<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
											<Bar dataKey="value" fill="#F7614D" barSize={2} barGap ={2} />
										</BarChart>
									</ResponsiveContainer>
									<h4 className="vurox-fw-300 d-inline-block align-bottom mb-1">{this.props.company.bounce[0].dailyTotal}% <small className="vurox-text-sizes"> CTR</small></h4>
								</Col>
							</Row>
						</VuroxComponentsContainer>
						<VuroxComponentsContainer className="vurox-admin-secondary-bg mt-n2 rounded-bottom mb-2">
							<Row className="p-4">
								<Col md={12}>
									<h5>Performance Overview</h5>
									<p className="vurox-text-sizes mb-2">
										Total number of users within the date range
									</p>
								</Col>
								<Col md={12}>
									<div className="fright pt-3">
										<VuroxChartsLegend fill='#F7614E' text='Reach' type='horizontal' shape='rectangle' />
										<VuroxChartsLegend fill='#50bc5e' text='Click' type='horizontal' shape='rectangle' />
									</div>
								</Col>
							</Row>
							<Row>
								<Col md={24} xs={24}>
									<ResponsiveContainer width='100%' height={240} >	
										<LineChart data={this.state.doubleBarChartData}
											margin={{ top: 10, right: 40, left: 0, bottom: 0 }}>
											<XAxis dataKey="date" stroke="#ccc" tickLine={false} axisLine={false} />
											<YAxis stroke="#ccc" tickLine={false} axisLine={false} domain={[0, 300]} />
											<CartesianGrid horizontal={false} strokeDasharray="1 1" opacity={0.15} />
											<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
											<Line type="linear" dataKey="visitors" stroke="#F7614D" fillOpacity={1} strokeWidth={2} dot={{ fill: '#F7614D', strokeWidth: 3 }} />
											<Line type="linear" dataKey="profit" stroke="#50bc5e" fillOpacity={1} strokeWidth={1} opacity={0.5} dot={false}/>
										</LineChart>
									</ResponsiveContainer>	
								</Col>
							</Row>
						</VuroxComponentsContainer>
						</Col>

						<Col md={10}>
							<Row gutter={{xs:4, sm:6, md:8}}>
								<Col sm={12} xs={24}>
									<VuroxComponentsContainer className="mb-2">
										<VuroxChartsBoxHead>
											<Row>
												<Col md={12} sm={12}>
													<h4 className="mb-1">33.50%</h4>
													<p className="vurox-text-sizes">
														CTR
													</p>
												</Col>
												<Col md={12} sm={12}>
													<p className="fright vurox-color-green"><i className="ti-stats-up"></i> +1.34% </p>
												</Col>
											</Row>
										</VuroxChartsBoxHead>
										<ResponsiveContainer width='100%' height={130} >	
											<AreaChart data={this.props.company.bounce[0].monthlyStats}
												margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
												<defs>
												<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
													<stop offset="5%" stopColor="#00C150" stopOpacity={0.5}/>
													<stop offset="95%" stopColor="#00C150" stopOpacity={0}/>
												</linearGradient>
												</defs>
												<CartesianGrid vertical={false} horizontal={false} strokeDasharray="1 1" />
												<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
												<Area type="linear" dataKey="value" stroke="#00C150" fillOpacity={1} fill="url(#colorUv)" />
											</AreaChart>
										</ResponsiveContainer>
									</VuroxComponentsContainer>
								</Col>
								<Col sm={12} xs={24}>
									<VuroxComponentsContainer>
										<VuroxChartsBoxHead>
											<Row>
												<Col md={12} sm={12}>
													<h4 className="mb-1">33.50%</h4>
													<p className="vurox-text-sizes">
														Total Users
													</p>
												</Col>
												<Col md={12} sm={12}>
													<p className="fright vurox-color-red"><i className="ti-stats-down"></i> -2.34% </p>
												</Col>
											</Row>
										</VuroxChartsBoxHead>
										<ResponsiveContainer width='100%' height={130}>
											<BarChart data={this.props.company.visitors[0].dailyStats}  margin={{ top: 20, right: 0, left: 0, bottom: 1 }}>
												<Tooltip contentStyle={vuroxDarkToolTipStyles} cursor={false} />
												<Bar dataKey="value" fill="#F7614E" barSize={10} barGap ={2} />
											</BarChart>
										</ResponsiveContainer>
									</VuroxComponentsContainer>
								</Col>
							</Row>
							<Row gutter={{xs:4, sm:6, md:8}}>
								<Col md={24} xs={24}>
									<VuroxComponentsContainer>	 
										<VuroxChartsBoxHead>
											<div className="pb-3">
												
												<Row>
													<Col md={18}>
														<h5>Interest/Keyword</h5>
													</Col>
													<Col md={6}>
														<ViewMore/>
													</Col>
												</Row>

												<p className="vurox-text-sizes">Most interest or keyword that reach your audience</p>

											</div>
											<Row>
												<Col md={10}>
													<ResponsiveContainer width='100%' height={163}>
														<PieChart>
															<Pie data={this.props.company.piedata} startAngle={360} endAngle={0} innerRadius={20} outerRadius={60} fill="#8884d8" paddingAngle={5} dataKey="value" stroke={0}>
																{
																	this.props.company.piedata.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
																}
															</Pie>
														</PieChart>
													</ResponsiveContainer>
												</Col>
												<Col md={14} xs={24}>
													<VuroxProgressbar progresstextleft='Barang lokal' progresstextright='984' progresscolor='#7B4DFF' width='45%' />

													<VuroxProgressbar progresstextleft='Elektronik' progresstextright='23984' progresscolor='#F7614E' width='85%' />

													<VuroxProgressbar progresstextleft='Komputer' progresstextright='984' progresscolor='#f9be49' width='60%' />
												</Col>
											</Row>
											
										</VuroxChartsBoxHead>
									</VuroxComponentsContainer>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col md={24}>
							<Row>
								<Col md={12}>
									<VuroxComponentsContainer>
										<VuroxChartsBoxHead>
											<div className="pb-4">
												<Row>
													<Col md={18}>
														<h5>Channel Source</h5>
													</Col>
													<Col md={6}>
														<ViewMore/>
													</Col>
												</Row>
												<p className="vurox-text-sizes">Channel where campaign has been reached to</p>
											</div>
											<Row className='py-2'>
												<Col md={12} xs={12}>
																	
													<p className="vurox-text-sizes">This Month </p>
													<ResponsiveContainer className="d-inline-block mt--15" width='40%' height={71}>
														<BarChart data={this.props.company.visitors[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
															<Tooltip cursor={false} />
															<Bar dataKey="value" fill="#F7614D" barSize={2} barGap ={2} />
														</BarChart>
													</ResponsiveContainer>

													<h4 className="vurox-fw-300 d-inline-block align-bottom">
														<small className="vurox-sm-stats vurox-color-red"><i className="ti-stats-down"></i> -4.34%
														</small>
													</h4>
													<h4 className="vurox-fw-300 align-bottom mt--7">
														{this.props.company.visitors[0].dailyTotal }
													</h4>


												</Col>
												<Col md={12} xs={12}>
																	
													<p className="vurox-text-sizes mb-0">Last Month </p>
													<ResponsiveContainer className="d-inline-block mt--15" width='40%' height={63}>
														<BarChart data={this.props.company.visitors[0].dailyStats}  margin={{ top: 20, right: 5, left: 0, bottom: 12 }}>
															<Tooltip cursor={false} />
															<Bar dataKey="value" fill="#50bc5e" barSize={2} barGap ={2} />
														</BarChart>
													</ResponsiveContainer>

													<h4 className="vurox-fw-300 d-inline-block align-bottom">
														<small className="vurox-sm-stats vurox-color-green"><i className="ti-stats-up"></i> +4.34%
														</small>
													</h4>
													<h4 className="vurox-fw-300 align-bottom mt--7">
														{this.props.company.visitors[0].monthlyTotal }
													</h4>

												</Col>
											</Row>
											<Row>
												<Col md={10}>
													<ResponsiveContainer width='100%' height={150}>
														<PieChart>
															<Pie
																data={this.props.company.piedata}
																startAngle={360}
																endAngle={0}
																innerRadius={0}
																outerRadius={60}
																fill="#8884d8"
																paddingAngle={5}
																dataKey="value"
																stroke={0}>
																{
																	this.props.company.piedata.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
																}
															</Pie>
														</PieChart>
													</ResponsiveContainer>
												</Col>
												<Col md={14} xs={24}>
													<VuroxProgressbar progresstextleft='Google Adword' progresstextright='5000' progresscolor='#7B4DFF' width='45%' />

													<VuroxProgressbar progresstextleft='Facebook' progresstextright='23984' progresscolor='#F7614E' width='85%' />

													<VuroxProgressbar progresstextleft='Instagram' progresstextright='1230' progresscolor='#f9be49' width='60%' />

												</Col>
											</Row>
										</VuroxChartsBoxHead>
										
									</VuroxComponentsContainer>
								</Col>
								<Col md={12}>
									<VuroxComponentsContainer className="ml-md-2">
										<VuroxTableHeading>
											<Row>
												<Col md={18}>
													<h5>Top Locations</h5>
													
												</Col>
												<Col md={6}>
													<ViewMore/>
												</Col>
											</Row>
											<p className="vurox-text-sizes">Locations where campaign has been reached to</p>
										</VuroxTableHeading>
										<VuroxTableDark>
											<table className="table table-borderless">
												<thead>
													<tr>
														<th>Location</th>
														<th className="fright">Click</th>
														<th className="fright">Reach</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>DKI Jakarta</td>
														<td className="fright">{currency(10000)}</td>
														<td className="fright">{currency(102000)}</td>
													</tr>
													<tr>
														<td>Bandung</td>
														<td className="fright">{currency(3000)}</td>
														<td className="fright">{currency(70000)}</td>
													</tr>
													<tr>
														<td>Yogyakarta</td>
														<td className="fright">{currency(5000)}</td>
														<td className="fright">{currency(95000)}</td>
													</tr>
													<tr>
														<td>Semarang</td>
														<td className="fright">{currency(2500)}</td>
														<td className="fright">{currency(55000)}</td>
													</tr>
													<tr>
														<td>Bali</td>
														<td className="fright">{currency(4000)}</td>
														<td className="fright">{currency(83000)}</td>
													</tr>
												</tbody>
											</table>
											
										</VuroxTableDark>
										
									</VuroxComponentsContainer>	
								</Col>
								
							</Row>
						</Col>
					</Row>
								
                </Layout>
            </React.Fragment>
		);
	}
}
export default connect(state=>state)(withRouter(Page))