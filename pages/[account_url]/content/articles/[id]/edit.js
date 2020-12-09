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

class Index extends React.Component {

	static contextType = vuroxContext

    item = this.props.articles.item   

    pagename = ""
    links = [['App','/content/classrooms',''],['Articles','/content/articles',''],[this.item.name,`/content/articles/${this.item.id}`,''],["Edit",`/content/articles/${this.item.id}/edit`,'active']]

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

                        <FormArticle item={this.item}/>

					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		);
	}
}
export default connect(state=>state)(Index)