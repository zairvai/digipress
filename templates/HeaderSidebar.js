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
	const {auth,baseUrl} = React.useContext(appContext)


	return (
		<div className={`${props.className} vurox-vertical-nav`} style={{width: props.width + 'px'}}>
			<ul>
				<VerticalNavHeading>Report</VerticalNavHeading>
				<Navitem link={`${baseUrl}/report/dashboard`} text='Dashboard' icon={<Icon size="1.3em" path={mdiMonitorDashboard} />} />
						
				<VerticalNavHeading>App</VerticalNavHeading>
				<Navitem link={`${baseUrl}/content/classrooms`}  text='Classrooms' icon={<Icon size="1.3em" path={mdiBookOpenPageVariantOutline} />} />
				<Navitem link={`${baseUrl}/content/articles`} text='Articles' icon={<Icon size="1.3em" path={mdiPostOutline} />} />
				
				{
					!AuthController.isOwner(auth) && !AuthController.isAdmin(auth) ?
					<>
						<Navitem link={`${baseUrl}/content/categories`} text='Categories' icon={<Icon size="1.3em" path={mdiShapeOutline} />} />
						<Navitem link={`${baseUrl}/content/tags`} text='Tags' icon={<Icon size="1.3em" path={mdiTagMultipleOutline} />} />
					</>
					:
					<></>

				}
				
				<VerticalNavHeading>Manage</VerticalNavHeading>
				
				{
					AuthController.isOwner(auth)? 
					<>
						<Navitem link={`${baseUrl}/manage/accounts`} text='Accounts' icon={<Icon size="1.3em" path={mdiBriefcaseAccount} />} />
						<Navitem link={`${baseUrl}/manage/users`} text='Users' icon={<Icon size="1.3em" path={mdiAccountGroupOutline} />} />	
					</>
					:
					<></>
				}

				<VerticalNavHeading>Roles</VerticalNavHeading>
				<Navitem link={`${baseUrl}/roles/admins`} text='Admins' icon={<Icon size="1.3em" path={mdiAccountTieOutline} />} />
				<Navitem link={`${baseUrl}/roles/tutors`} text='Tutors' icon={<Icon size="1.3em" path={mdiAccountSupervisorOutline} />} />
				<Navitem link={`${baseUrl}/roles/students`} text='Students' icon={<Icon size="1.3em" path={mdiSchoolOutline} />} />
				<Navitem link={`${baseUrl}/roles/members`} text='Members' icon={<Icon size="1.3em" path={mdiAccountGroupOutline} />} />

				<VerticalNavHeading>Help</VerticalNavHeading>
				<Navitem link={`${baseUrl}/help/settings`} className={router.asPath===`${baseUrl}/help/settings` ? "active":""} text='Setting' icon={<Icon size="1.3em" path={mdiCogOutline} />} />
				<Navitem link='/help/feedbacks' text='Feedback' icon={<Icon size="1.3em" path={mdiCommentOutline} />} />
				<Navitem link='/help/supports' text='Support' icon={<Icon size="1.3em" path={mdiHeadset} />} />
				<Navitem link='/help/faq' text='FAQ' icon={<Icon size="1.3em" path={mdiFrequentlyAskedQuestions} />} />

				
			</ul>
		</div>
	);
}

export default connect(state=>state)(withRouter(Sidebar))
