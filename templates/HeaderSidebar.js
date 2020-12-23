import React, { useContext } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import {  VerticalNavHeading, Navitem } from 'Components/nav'

import Icon from '@mdi/react'
import {mdiMonitorDashboard, 
	mdiFrequentlyAskedQuestions, mdiHomeOutline,
	mdiHeadset, mdiCommentOutline,mdiCogOutline,
	mdiPostOutline, mdiShapeOutline, mdiTagMultipleOutline, 
	mdiBookOpenPageVariantOutline, mdiAccountGroupOutline, 
	mdiBriefcaseAccount,mdiCommentMultipleOutline,mdiCommentQuestionOutline} from '@mdi/js'
import AuthController from 'Library/controllers/AuthController'

const Sidebar = (props) => {

	const {router,auth} = props


	return (
		<div className={`${props.className} vurox-vertical-nav`} style={{width: props.width + 'px'}}>

			<ul>

				{
					AuthController.isOwner(auth) || AuthController.isAdmin(auth) &&
					<>
						<VerticalNavHeading>Laporan</VerticalNavHeading>
						<Navitem link={`/${auth.account.uniqueURL}/report/dashboard`} text='Dashboard' icon={<Icon size="1.3em" path={mdiMonitorDashboard} />} />
					</>
					
				}	

				<VerticalNavHeading>Aktivitas</VerticalNavHeading>
				<Navitem link={`/${auth.account.uniqueURL}/main/home/all`} activeLink={`/${auth.account.uniqueURL}/main/home`} text='Home' icon={<Icon size="1.3em" path={mdiHomeOutline} />} />
				<Navitem link={`/${auth.account.uniqueURL}/main/comments`} activeLink={`/${auth.account.uniqueURL}/main/comments`} text='Komentar' icon={<Icon size="1.3em" path={mdiCommentMultipleOutline} />} />
				<Navitem link={`/${auth.account.uniqueURL}/main/qnas`} activeLink={`/${auth.account.uniqueURL}/main/qnas`} text='Tanya jawab' icon={<Icon size="1.3em" path={mdiCommentQuestionOutline} />} />

				
				<VerticalNavHeading>Konten</VerticalNavHeading>
				<Navitem link={`/${auth.account.uniqueURL}/content/classrooms`}  text='Ruang belajar' icon={<Icon size="1.3em" path={mdiBookOpenPageVariantOutline} />} />
				<Navitem link={`/${auth.account.uniqueURL}/content/articles`} text='Berita artikel' icon={<Icon size="1.3em" path={mdiPostOutline} />} />
				
			{
				!AuthController.isStudent(auth) || !AuthController.isMember(auth) ?
				
				<>
					<Navitem link={`/${auth.account.uniqueURL}/content/categories`} text='Kategori' icon={<Icon size="1.3em" path={mdiShapeOutline} />} />
					<Navitem link={`/${auth.account.uniqueURL}/content/tags`} text='Tag' icon={<Icon size="1.3em" path={mdiTagMultipleOutline} />} />
				</>
				:
				<></>

			}
				
			{
				AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth) 
					|| AuthController.isOwner(auth) || AuthController.isAdmin(auth) ? 
				<>
					<VerticalNavHeading>Kelola</VerticalNavHeading>
				
				{
					AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth) ? 
					<>
						<Navitem link={`/${auth.account.uniqueURL}/manage/accounts`} text='Akun Pesantren' icon={<Icon size="1.3em" path={mdiBriefcaseAccount} />} />
					</>
					:
					<></>
				}

				{
					!AuthController.isAppAdmin(auth) && (AuthController.isOwner(auth) || AuthController.isAdmin(auth)) ? 
					<>
						<Navitem link={`/${auth.account.uniqueURL}/manage/users`} text='Anggota saya' icon={<Icon size="1.3em" path={mdiAccountGroupOutline} />} />	
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

				<VerticalNavHeading>Umum</VerticalNavHeading>
				<Navitem link={`/${auth.account.uniqueURL}/help/settings`} className={router.asPath===`/${auth.account.uniqueURL}/help/settings` ? "active":""} text='Pengaturan' icon={<Icon size="1.3em" path={mdiCogOutline} />} />
				<Navitem link='/help/feedbacks' text='Saran' icon={<Icon size="1.3em" path={mdiCommentOutline} />} />
				<Navitem link='/help/supports' text='Bantuan' icon={<Icon size="1.3em" path={mdiHeadset} />} />
				<Navitem link='/help/faq' text='FAQ' icon={<Icon size="1.3em" path={mdiFrequentlyAskedQuestions} />} />

				
			</ul>
		</div>
	);
}

export default connect(state=>state)(withRouter(Sidebar))
