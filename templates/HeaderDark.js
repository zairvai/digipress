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

import { bindPromiseCreators } from 'redux-saga-routines';
import { signOutRoutinePromise } from 'State/routines/auth';
import AuthController from 'Library/controllers/AuthController'

const HeaderDark = props => {
	
	const {auth} = props

	const { toggleMenu, menuState } = useContext(vuroxContext)


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
							<h5 className="vurox-text-sizes mb-0">{auth.account.name}</h5>
							<h6 className="mt-2">{auth.user.access.role}</h6>
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

							<VuroxDropdown position='vurox-dropdown-top-right' className="ml-3">
								<button className='dropbtn'><i className='ti-user bg-blue-6 flex-fill'></i></button>
								<DropdownItems width={240} className='pb-2'>
									<DropdownItemsHead color='bg-cyan-6'>
										{auth.user.name}
									</DropdownItemsHead>
									<DropdownItem link="/"><i className='ti-lock'></i>Ubah password</DropdownItem>
									<DropdownItem link={`/${auth.account.uniqueURL}/auth/logout`}><i className='ti-arrow-left'></i>Keluar</DropdownItem>
								</DropdownItems>
							</VuroxDropdown>
						</div>
					</Col>
				</Row>
			</VuroxHeader>
		</div>
	);
}
export default connect(
    state=>state,
    (dispatch)=>({
            ...bindPromiseCreators({
            signOutRoutinePromise
        },dispatch),dispatch
    })
)(HeaderDark)