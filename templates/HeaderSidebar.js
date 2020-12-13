import React, { useContext } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {  VerticalNavHeading, Navitem } from 'Components/nav'

import Icon from '@mdi/react'
import {mdiMonitorDashboard, mdiFrequentlyAskedQuestions, mdiHeadset, mdiCommentOutline, mdiAccountSupervisorOutline, mdiSchoolOutline,mdiCogOutline, mdiNewspaperVariantMultipleOutline, mdiPostOutline, mdiShapeOutline, mdiTagMultipleOutline, mdiAccountMultipleOutline, mdiKeyChain, mdiBookOpenPageVariantOutline, mdiAccountGroupOutline, mdiCommentMultipleOutline, mdiBriefcaseAccount, mdiAccountOutline, mdiAccountTieOutline} from '@mdi/js'
import AuthController from 'Library/controllers/AuthController'

const Sidebar = (props) => {

	const {router,auth} = props


	return (
		<div className={`${props.className} vurox-vertical-nav`} style={{width: props.width + 'px'}}>
			<ul>

			{
				AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth) 
					|| AuthController.isOwner(auth) || AuthController.isAdmin(auth) ? 
				<>
					<VerticalNavHeading>Report</VerticalNavHeading>
					<Navitem link={`/${auth.account.uniqueURL}/report/dashboard`} text='Dashboard' icon={<Icon size="1.3em" path={mdiMonitorDashboard} />} />
					</>
				:
				<></>
			}		

					<VerticalNavHeading>Content</VerticalNavHeading>
					<Navitem link={`/${auth.account.uniqueURL}/content/classrooms`}  text='Classrooms' icon={<Icon size="1.3em" path={mdiBookOpenPageVariantOutline} />} />
					<Navitem link={`/${auth.account.uniqueURL}/content/articles`} text='Articles' icon={<Icon size="1.3em" path={mdiPostOutline} />} />
					
			{
				!AuthController.isAppOwner(auth) && !AuthController.isAppAdmin(auth) ?
				
				<>
					<Navitem link={`/${auth.account.uniqueURL}/content/categories`} text='Categories' icon={<Icon size="1.3em" path={mdiShapeOutline} />} />
					<Navitem link={`/${auth.account.uniqueURL}/content/tags`} text='Tags' icon={<Icon size="1.3em" path={mdiTagMultipleOutline} />} />
				</>
				:
				<></>

			}
				
			{
				AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth) 
					|| AuthController.isOwner(auth) || AuthController.isAdmin(auth) ? 
				<>
					<VerticalNavHeading>Manage</VerticalNavHeading>
				
				{
					AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth) ? 
					<>
						<Navitem link={`/${auth.account.uniqueURL}/manage/accounts`} text='Accounts' icon={<Icon size="1.3em" path={mdiBriefcaseAccount} />} />
					</>
					:
					<></>
				}

				{
					!AuthController.isAppAdmin(auth) && (AuthController.isOwner(auth) || AuthController.isAdmin(auth)) ? 
					<>
						<Navitem link={`/${auth.account.uniqueURL}/manage/users`} text='Users' icon={<Icon size="1.3em" path={mdiAccountGroupOutline} />} />	
					</>
					:
					<></>
				}
				</>
				:
				<></>
			}


				{/* <VerticalNavHeading>Roles</VerticalNavHeading>
				<Navitem link={`/${auth.account.uniqueURL}/roles/admins`} text='Admins' icon={<Icon size="1.3em" path={mdiAccountTieOutline} />} />
				<Navitem link={`/${auth.account.uniqueURL}/roles/tutors`} text='Tutors' icon={<Icon size="1.3em" path={mdiAccountSupervisorOutline} />} />
				<Navitem link={`/${auth.account.uniqueURL}/roles/students`} text='Students' icon={<Icon size="1.3em" path={mdiSchoolOutline} />} />
				<Navitem link={`/${auth.account.uniqueURL}/roles/members`} text='Members' icon={<Icon size="1.3em" path={mdiAccountGroupOutline} />} /> */}

				<VerticalNavHeading>Help</VerticalNavHeading>
				<Navitem link={`/${auth.account.uniqueURL}/help/settings`} className={router.asPath===`/${auth.account.uniqueURL}/help/settings` ? "active":""} text='Setting' icon={<Icon size="1.3em" path={mdiCogOutline} />} />
				<Navitem link='/help/feedbacks' text='Feedback' icon={<Icon size="1.3em" path={mdiCommentOutline} />} />
				<Navitem link='/help/supports' text='Support' icon={<Icon size="1.3em" path={mdiHeadset} />} />
				<Navitem link='/help/faq' text='FAQ' icon={<Icon size="1.3em" path={mdiFrequentlyAskedQuestions} />} />

				
			</ul>
		</div>
	);
}

export default connect(state=>state)(withRouter(Sidebar))
