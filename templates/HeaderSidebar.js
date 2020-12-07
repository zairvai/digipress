import React, { useContext } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {  VerticalNavHeading, Navitem } from 'Components/nav'

import Icon from '@mdi/react'
import {mdiMonitorDashboard, mdiFrequentlyAskedQuestions, mdiHeadset, mdiCommentOutline, mdiAccountSupervisorOutline, mdiSchoolOutline,mdiCogOutline, mdiNewspaperVariantMultipleOutline, mdiPostOutline, mdiShapeOutline, mdiTagMultipleOutline, mdiAccountMultipleOutline, mdiKeyChain, mdiBookOpenPageVariantOutline, mdiAccountGroupOutline, mdiCommentMultipleOutline, mdiBriefcaseAccount, mdiAccountOutline, mdiAccountTieOutline} from '@mdi/js'
import { appContext } from '../context/app'
import AuthController from 'Library/controllers/AuthController'

const Sidebar = (props) => {

	const {router} = props
	const {auth} = React.useContext(appContext)

	return (
		<div className={`${props.className} vurox-vertical-nav`} style={{width: props.width + 'px'}}>
			<ul>
				<VerticalNavHeading>Report</VerticalNavHeading>
				<Navitem link='/report/dashboard' text='Dashboard' icon={<Icon size="1.3em" path={mdiMonitorDashboard} />} />
						
				<VerticalNavHeading>App</VerticalNavHeading>
				<Navitem link='/app/classrooms' text='Classrooms' icon={<Icon size="1.3em" path={mdiBookOpenPageVariantOutline} />} />
				<Navitem link='/app/articles' text='Articles' icon={<Icon size="1.3em" path={mdiPostOutline} />} />
				{/* <Navitem link='/app/comments' text='Comments' icon={<Icon size="1.3em" path={mdiCommentMultipleOutline} />} />
				<Navitem link='/app/qa' text='Q &amp; A' icon={<Icon size="1.3em" path={mdiCommentMultipleOutline} />} /> */}
				
				{
					!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth) ?
					<>
						<Navitem link='/app/categories' text='Categories' icon={<Icon size="1.3em" path={mdiShapeOutline} />} />
						<Navitem link='/app/tags' text='Tags' icon={<Icon size="1.3em" path={mdiTagMultipleOutline} />} />
					</>
					:
					<></>

				}
				
				<VerticalNavHeading>Manage</VerticalNavHeading>
				
				{
					AuthController.isAppOwner(auth)? 
					
					<Navitem link='/manage/accounts' text='Accounts' icon={<Icon size="1.3em" path={mdiBriefcaseAccount} />} />
					:
					<></>
				}

				<VerticalNavHeading>Roles</VerticalNavHeading>
				<Navitem link='/roles/app-admins/' className={router.asPath==="/roles/app-admins/" ? "active":""} text='App Admins' icon={<Icon size="1.3em" path={mdiAccountTieOutline} />} />
				<Navitem link='/roles/admins/' className={router.asPath==="/roles/admins/" ? "active":""} text='Admins' icon={<Icon size="1.3em" path={mdiAccountOutline} />} />
				<Navitem link='/roles/tutors/' className={router.asPath==="/roles/tutors/" ? "active":""} text='Tutors' icon={<Icon size="1.3em" path={mdiAccountSupervisorOutline} />} />
				<Navitem link='/roles/students/' className={router.asPath==="/roles/students/" ? "active":""} text='Students' icon={<Icon size="1.3em" path={mdiSchoolOutline} />} />
				<Navitem link='/roles/members/' className={router.asPath==="/roles/members/" ? "active":""} text='Members' icon={<Icon size="1.3em" path={mdiAccountGroupOutline} />} />



				<VerticalNavHeading>Help</VerticalNavHeading>
				<Navitem link='/help/setting' text='Setting' icon={<Icon size="1.3em" path={mdiCogOutline} />} />
				<Navitem link='/help/feedback' text='Feedback' icon={<Icon size="1.3em" path={mdiCommentOutline} />} />
				<Navitem link='/help/support' text='Support' icon={<Icon size="1.3em" path={mdiHeadset} />} />
				<Navitem link='/help/faq' text='FAQ' icon={<Icon size="1.3em" path={mdiFrequentlyAskedQuestions} />} />

				
			</ul>
		</div>
	);
}

export default connect(state=>state)(withRouter(Sidebar))
