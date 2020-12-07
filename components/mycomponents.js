import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

export const Status = ({text,state="success",blinking=false,position="left",className}) => {

    if(position==="left")
        return  <div className={`state-wrapper left ${className}`}>
                    <span className={"dot "+state + " " + (blinking ? "blinking":"")}/><span>{text}</span>
                </div>
    if(position==="right")
        return <div className={`state-wrapper right ${className}`}>
                    <span>{text}</span><span className={"dot "+state + " " + (blinking ? "blinking":"")}/>
                </div>

}

export const Mylink = ({text,href}) =>{

    const routes = useRouter()
    const active = routes.asPath == href ? "active":""
    
    return <Link href={href} shallow><a className={"nav-link "+active}>{text}</a></Link>

}

export const ViewMore = ({href=""}) =>{
    return(<div className="align-right"><Link href={href} className="link">See All</Link></div>)
}

