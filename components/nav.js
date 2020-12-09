import React from 'react'
import Link from 'next/link'  
import { useRouter } from 'next/router'
export default class Nav extends React.Component {
	render() {
		return (
		    <div className="vurox-header-menu fright">
				<ul className="vurox-main-menu justify-content-end d-flex flex-row align-items-center">
					{this.props.children}
				</ul>
			</div>
		);
	}
}

export const Navitem = (props) => {
	const router = useRouter()
	
	const test = router.asPath.search(props.link)
	const active = test >=0 ?  " active" : ""

	const submenuIcon = props.className === 'has-submenu' ? <i className="ti-angle-right"></i> : null
	const badge = props.badge !== null ? <span className={props.badge + ' ml-2'}>{props.badgeText}</span> : null
	return(
		<li className={props.className + active}>
			<Link href={props.link}>
				<a>{props.icon}<span>{ props.text }  { badge } { submenuIcon }</span>
				</a>
			</Link>
			{props.children}
		</li>
	)
}

export class SubNavItems extends React.Component {
	render() {
		return (
			<ul className="vurox-sub-menu">
				{this.props.children}
			</ul>
		)
	}
}
export const VerticalNav = (props) => (	
	<ul>
		{props.children}
	</ul>
)

export const VerticalNavHeading = (props) => (
	<li className="vurox-vertical-nav-heading">{props.children}</li>
)
