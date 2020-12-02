import React from 'react'
import {connect} from 'react-redux'
import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout
} from 'Components/layout'
import { vuroxContext } from 'Context'
import HeaderDark from 'Templates/HeaderDark';
import Summery2 from 'Templates/Summery2';
import Sidebar from 'Templates/HeaderSidebar';

import FormArticle from 'Components/FormArticle'

class index extends React.Component {

    static contextType = vuroxContext
    
    pagename="New article"
	links = [['App','/app/classroom',''],['Articles','/app/articles',''],['Add new','/app/articles/add','active']]
	
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
                        <Summery2 pagename={this.pagename} links={this.links}/>
                        <FormArticle/>
					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(index)