import React from 'react'
import Link from 'next/link'
export class VuroxBreadcrumbs extends React.Component {
	render() {
		return (
			<div className="vurox-breadcrumbs">
				<ul className={this.props.className + " vurox-breadcrumb-list mb-2"}>
					{
						this.props.links.map( (elem) => <li key={elem[0]}><Link href={elem[1]}><a className={elem[2]}>{elem[0]}</a></Link></li> )
					}
				</ul>
				<h4>{this.props.pagename}</h4>
			</div>
		)
	}
}