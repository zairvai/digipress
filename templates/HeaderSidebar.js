import React, { useContext } from 'react';
import {connect} from 'react-redux'
import {  VerticalNavHeading, Navitem } from 'Components/nav'
import * as Bsicon from 'react-bootstrap-icons'
import VuroxFormSearch from 'Components/search'
import Icon from '@mdi/react'
import {mdiMonitorDashboard,mdiAccountOutline, mdiFrequentlyAskedQuestions, mdiHeadset, mdiCommentOutline, mdiAccountSupervisorOutline, mdiCogOutline, mdiNewspaperVariantMultipleOutline, mdiPostOutline, mdiShapeOutline, mdiTagMultipleOutline, mdiAccountMultipleOutline, mdiKeyChain, mdiBookOpenPageVariantOutline, mdiAccountGroupOutline, mdiCommentMultipleOutline, mdiBriefcaseAccount} from '@mdi/js'

const Sidebar = (props) => {

	return (
			<div className={`${props.className} vurox-vertical-nav`} style={{width: props.width + 'px'}}>
				<ul>

					{/* {
					props.accounts.type === 'admin' ? 
					<>
						<VerticalNavHeading>Administrator</VerticalNavHeading>
						<Navitem link='/manager/manager' text='Managers' icon={<Icon size="1.3em" path={mdiAccountOutline} />} />
						<Navitem link='/manager/account' text='Accounts' icon={<Icon size="1.3em" path={mdiAccountSupervisorOutline} />} />
					</>
					:
					<></>
					}

					{
					props.accounts.type === 'manager' ? 
					<>
						<VerticalNavHeading>Manager</VerticalNavHeading>
						<Navitem link='/manager/account' text='Accounts' icon={<Icon size="1.3em" path={mdiAccountOutline} />} />
					</>
					:
					<></>
					} */}

					<VerticalNavHeading>Report</VerticalNavHeading>
					<Navitem link='/report/dashboard' text='Dashboard' icon={<Icon size="1.3em" path={mdiMonitorDashboard} />} />
							
					<VerticalNavHeading>App</VerticalNavHeading>
					<Navitem link='/app/classrooms' text='Classrooms' icon={<Icon size="1.3em" path={mdiBookOpenPageVariantOutline} />} />
					<Navitem link='/app/articles' text='Articles' icon={<Icon size="1.3em" path={mdiPostOutline} />} />
					{/* <Navitem link='/app/comments' text='Comments' icon={<Icon size="1.3em" path={mdiCommentMultipleOutline} />} />
					<Navitem link='/app/qa' text='Q &amp; A' icon={<Icon size="1.3em" path={mdiCommentMultipleOutline} />} /> */}
					<Navitem link='/app/categories' text='Categories' icon={<Icon size="1.3em" path={mdiShapeOutline} />} />
					<Navitem link='/app/tags' text='Tags' icon={<Icon size="1.3em" path={mdiTagMultipleOutline} />} />
					
					<VerticalNavHeading>Access</VerticalNavHeading>
					{/* <Navitem link='/access/roles' text='Roles' icon={<Icon size="1.3em" path={mdiKeyChain} />} /> */}
					<Navitem link='/access/accounts' text='Accounts' icon={<Icon size="1.3em" path={mdiBriefcaseAccount} />} />
					<Navitem link='/access/users' text='Users' icon={<Icon size="1.3em" path={mdiAccountMultipleOutline} />} />
					{/* <Navitem link='/access/groups' text='Groups' icon={<Icon size="1.3em" path={mdiAccountGroupOutline} />} /> */}

					<VerticalNavHeading>Help</VerticalNavHeading>
					<Navitem link='/help/setting' text='Setting' icon={<Icon size="1.3em" path={mdiCogOutline} />} />
					<Navitem link='/help/feedback' text='Feedback' icon={<Icon size="1.3em" path={mdiCommentOutline} />} />
					<Navitem link='/help/support' text='Support' icon={<Icon size="1.3em" path={mdiHeadset} />} />
					<Navitem link='/help/faq' text='FAQ' icon={<Icon size="1.3em" path={mdiFrequentlyAskedQuestions} />} />

					
				</ul>
			</div>
	);
}

export default connect(state=>state)(Sidebar)
