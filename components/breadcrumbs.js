import React from 'react'
import Link from 'next/link'
export class VuroxBreadcrumbs extends React.Component {
	
	counter = 0

	render() {
		return (
			<>
			{this.props.links && 
				<div className="vurox-breadcrumbs">
					<ul className={this.props.className + " vurox-breadcrumb-list mb-3"}>
						{
							this.props.links.map( (elem) => {
								this.counter++
								return <li key={`bread${this.counter}`}><Link href={elem[1]} shallow><a className={elem[2]}>{elem[0]}</a></Link></li>
							})
						}
					</ul>
					{this.props.pagename && <h4>{this.props.pagename}</h4>}
				</div>
				}
			</>
		)
	}
}