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
import { Row, Col} from 'antd'
import {Mylink} from 'Components/mycomponents'

// class Index extends React.Component {

// 	static contextType = vuroxContext

//     item = this.props.classrooms.item   

//     pagename = false
//     links = [['App','/app/classrooms',''],['Classrooms','/app/classrooms',''],[this.item.name,`/app/articles/${this.item.id}`,'active']]

// 	render() {

//         const { menuState } = this.context
//         console.log(this.context)
// 		const toggleClass = menuState ? 'menu-closed' : 'menu-open'

// 		return (
// 			<React.Fragment>
// 				<HeaderLayout className="sticky-top">
// 					<HeaderDark />
// 				</HeaderLayout>
// 				<VuroxLayout>
// 					<VuroxSidebar width={240} className={`sidebar-container  ${toggleClass}`} >
// 						<Sidebar className={toggleClass} />
// 					</VuroxSidebar>
// 					<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
                        
//                         <Summery2 pagename={this.pagename} links={this.links}/>

//                         <Row className="mb-2">
//                             <Col md={12}>
//                                 <div className="vurox-tabs-underlined vurox-dark vurox-tabs-underlined-left mb-1">
//                                     <ul className="nav nav-pills vurox-dropdown-list" id="vurox-tab" role="tablist">
//                                         <li className="nav-item">
//                                             <Mylink href={"/app/classrooms/"+this.item.id} text="Classroom"/>
//                                         </li>
//                                         <li className="nav-item">
//                                             <Mylink href={"/app/classrooms/"+this.item.id+"/lessons"} text="Lessons &amp; Quizes"/>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={24}>
//                                 {this.props.children}
//                             </Col>
//                         </Row>

// 					</ContentLayout>
// 				</VuroxLayout>
// 			</React.Fragment>
// 		);
// 	}
// }

const Index = props =>{

    const context = React.useContext(vuroxContext)

    const item = props.item
    const pagename = false
    const links = [['App','/app/classrooms',''],['Classrooms','/app/classrooms',''],[item.name,`/app/articles/${item.id}`,'active']]

    const { menuState } = context
    const toggleClass = menuState ? 'menu-closed' : 'menu-open'

    return(
        <React.Fragment>
				<HeaderLayout className="sticky-top">
					<HeaderDark />
				</HeaderLayout>
				<VuroxLayout>
					<VuroxSidebar width={240} className={`sidebar-container  ${toggleClass}`} >
						<Sidebar className={toggleClass} />
					</VuroxSidebar>
					<ContentLayout width='100%' className='p-3 vurox-scroll-y'>
                        
                        <Summery2 pagename={pagename} links={links}/>

                        <Row className="mb-2">
                            <Col md={12}>
                                <div className="vurox-tabs-underlined vurox-dark vurox-tabs-underlined-left mb-1">
                                    <ul className="nav nav-pills vurox-dropdown-list" id="vurox-tab" role="tablist">
                                        <li className="nav-item">
                                            <Mylink href={"/app/classrooms/"+item.id} text="Classroom"/>
                                        </li>
                                        <li className="nav-item">
                                            <Mylink href={"/app/classrooms/"+item.id+"/lessons"} text="Lessons &amp; Quizes"/>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                {props.children}
                            </Col>
                        </Row>

					</ContentLayout>
				</VuroxLayout>
			</React.Fragment>
		)
    
}

export default connect(state=>state)(Index)