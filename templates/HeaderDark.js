import React, {useContext} from 'react'
import {connect} from 'react-redux'
import Header from './Head'
import Link from 'next/link'
import {Space} from 'antd'
import VuroxHeader, {VuroxBrand, VuroxMenuToggler} from 'Components/Header'
import VuroxFormSearch from 'Components/search'
import ProfileBadge from 'Components/profile'
import VuroxDropdown, { DropdownItems, DropdownItem, DropdownItemSeperator, DropdownBigItems, DropdownItemsHead } from 'Components/dropdown'
import { 
	VuroxProgressbar
} from 'Components/progressbar';
import { Search, GridFill ,Grid } from 'react-bootstrap-icons'
import { vuroxContext } from '../context'
import { appContext } from '../context/app'
import { Row, Col,Button} from 'antd'

import AuthController from 'Library/controllers/AuthController'

const HeaderDark = props => {
	const { toggleMenu, menuState } = useContext(vuroxContext)

	const {auth} = React.useContext(appContext)
	const [name,setName] = React.useState("")

	React.useEffect(()=>{
		if(auth.user) setName(auth.user.name)
	},[auth.user])
	
	return (
		<div>
			<Header />
			<VuroxHeader version='dark'>
				<Row align="middle">
					<Col span={12}>
						<Space direction="horizontal" size="large" align="center">
							{/* <VuroxBrand image='/image/logo.png' /> */}
							{
								menuState ? 
								<Grid className="vurox-menu-toggler" onClick={ toggleMenu } />
								:
								<GridFill className="vurox-menu-toggler" onClick={ toggleMenu } />
							}
							{/* <VuroxFormSearch border='rounded-pill border-0' placeholder='Search...' icon={<Search />}/> */}

							{

								AuthController.isAppOwner(auth)  ? 
								<h5 className="vurox-text-sizes mb-0">APP Owner</h5>
								:
								!AuthController.isAppAdmin(auth) ? 
								<h5 className="vurox-text-sizes mb-0">APP Admin</h5>
								:
								<h5 className="vurox-text-sizes mb-0">{props.accounts.name}</h5>

							}
						</Space>
					</Col>
				
					<Col span={12}>
						<div className='justify-content-end d-flex flex-row'>
							{/* <VuroxDropdown position='vurox-dropdown-top-right'>
								<button className='dropbtn'><i className="ti-settings"></i></button>
								<DropdownItems>
									<DropdownItem link='/'>Account</DropdownItem>
									<DropdownItem link='/'>Settings</DropdownItem>
									<DropdownItem link='/'>Logout</DropdownItem>
								</DropdownItems>
							</VuroxDropdown> */}

							<VuroxDropdown position='vurox-dropdown-top-right'>
								<button className='dropbtn'><i className="ti-bell"></i></button>
								<DropdownItems width={240} className='pb-2'>
									<DropdownItemsHead color='bg-cyan-6'>
										Notifications <span className="badge badge-pill badge-light">20+</span>
									</DropdownItemsHead>
									<DropdownItem link='/'>
										<DropdownBigItems>
											<i className='ti-pulse bg-yellow-6 flex-fill'></i>
											<div className="dropdown-big-items-content">
												<p className='text-meta'>March 28, 2020</p>
												<p>This is a alert notification</p>
											</div>
										</DropdownBigItems>
									</DropdownItem>
									<DropdownItem link='/'>
										<DropdownBigItems>
											<i className='ti-user bg-purple-6 flex-fill'></i>
											<div className="dropdown-big-items-content">
												<p className='text-meta'>March 28, 2020</p>
												<p>New user request received</p>
											</div>
										</DropdownBigItems>
									</DropdownItem>
									<DropdownItem link='/'>
										<DropdownBigItems>
											<i className='ti-help-alt bg-cyan-4 flex-fill'></i>
											<div className="dropdown-big-items-content">
												<p className='text-meta'>April 08, 2020</p>
												<p>Received a new help request</p>
											</div>
										</DropdownBigItems>
									</DropdownItem>
									<DropdownItem link='/'>
										<DropdownBigItems>
											<i className='ti-stats-up bg-red-4 flex-fill'></i>
											<div className="dropdown-big-items-content">
												<p className='text-meta'>April 08, 2020</p>
												<p>A new monthly report has been published</p>
											</div>
										</DropdownBigItems>
									</DropdownItem>
								</DropdownItems>
							</VuroxDropdown>

							<VuroxDropdown position='vurox-dropdown-top-right'>
								<button className='dropbtn'><i className='ti-user bg-blue-6 flex-fill'></i></button>
								<DropdownItems width={240} className='pb-2'>
									<DropdownItemsHead color='bg-cyan-6'>
										{name}
									</DropdownItemsHead>
									<DropdownItem link="/"><i className='ti-lock'></i>Ubah password</DropdownItem>
									<DropdownItem link="/"><i className='ti-arrow-left'></i>Keluar</DropdownItem>
								</DropdownItems>
							</VuroxDropdown>
							{/* <VuroxDropdown position='vurox-dropdown-top-right'>
								<button className='dropbtn'><i className="ti-email"></i></button>
								<DropdownItems width={240}> 
									<DropdownItemsHead color='bg-green-6'>
										Message <span className="badge badge-pill badge-light">20+</span>
									</DropdownItemsHead>
									<DropdownItem link='/'>
										<DropdownBigItems>
											<img className='flex-fill' src="/image/propic/5.jpg" alt=""/>
											<div className="dropdown-big-items-content">
												<p>Hello, we are going to fishing </p>
												<p className='text-meta'>March 28, 2020</p>
											</div>
										</DropdownBigItems>
									</DropdownItem>
									<DropdownItem link='/'>
										<DropdownBigItems>
											<img className='flex-fill' src="/image/propic/1.jpg" alt=""/>
											<div className="dropdown-big-items-content">
												<p>We are opening a new shop</p>
												<p className='text-meta'>March 28, 2020</p>
											</div>
										</DropdownBigItems>
									</DropdownItem>
									<DropdownItem link='/'>
										<DropdownBigItems>
											<img className='flex-fill' src="/image/propic/4.jpg" alt=""/>
											<div className="dropdown-big-items-content">
												<p>Received a new help request</p>
												<p className='text-meta'>April 08, 2020</p>
											</div>
										</DropdownBigItems>
									</DropdownItem>
									<DropdownItem link='/'>
										<DropdownBigItems>
											<i className='ti-stats-up bg-red-4 flex-fill'></i>
											<div className="dropdown-big-items-content">
												<p>A new monthly report has been published</p>
												<p className='text-meta'>April 08, 2020</p>
											</div>
										</DropdownBigItems>
									</DropdownItem>
									<DropdownItemSeperator />
									<DropdownItem className='text-center' link='/' >Check All</DropdownItem>
								</DropdownItems>
							</VuroxDropdown> */}


							{/* <VuroxDropdown position='vurox-dropdown-top-right'>
								<ProfileBadge name='S'  size='md' shape='rounded' version='dark' className='mt-3 ml-2 vurox-dropdown' badge='2' badgeColor='bg-purple-6' badgeShape='circle' />
								<DropdownItems width={200} className='py-2'>
									<DropdownItem link='#' className='disabled-hover'>
										<DropdownBigItems>
											<img className='flex-fill' src="/image/propic/5.jpg" alt=""/>
											<div className="dropdown-big-items-content">
												<p>Welcome, {props.users.username} </p>
												<p className='text-meta'>Balance: $4435.34</p>
											</div>
										</DropdownBigItems>
										<VuroxProgressbar className='mt-3 progressbar-xs' progresstextleft='Storage' progresstextright='45GB' progresscolor='#7B4DFF' width='80%' />
									</DropdownItem>
									<DropdownItem link='/'><i className='ti-user'></i>Profile</DropdownItem>
									<DropdownItem link='/'><i className='ti-image'></i>Portfolio</DropdownItem>
									<DropdownItem link='/'><i className='ti-import'></i>Downloads</DropdownItem>
									<DropdownItem link='/'><i className='ti-heart'></i>Favourite</DropdownItem>
									<DropdownItem link='/'><i className='ti-layers'></i>Collections</DropdownItem>
									<DropdownItem link='/'><i className='ti-money'></i>Earnings</DropdownItem>
									<DropdownItem link='/'><i className='ti-layout-media-overlay'></i>Statements</DropdownItem>
								</DropdownItems>
							</VuroxDropdown> */}
						</div>
					</Col>
				</Row>
			</VuroxHeader>
		</div>
	);
}
export default connect( state=>state )(HeaderDark)