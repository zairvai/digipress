import React from 'react';
import {useWindowSize} from 'Context'
export const VuroxBody = props => (
  <div className={props.className + ' vurox-dark-version vurox-fixed-position vurox-admin-template'}>
    {props.children}
  </div> 
)

export const VuroxLayout = (props) => {
  return(
    <div className={`${props.className == undefined ? '' : props.className} d-flex`}>
      {props.children}
    </div>
  )
}

export const HeaderLayout = (props) => {
  return (
    <div style={{height: props.height}} className={props.className}>
    	{props.children}
    </div>
  )
}

export const VuroxSidebar = (props) => {
  const className = useWindowSize().width < 700 ? ' initial-closed' : ''
  return (
    <div className={props.className + className} style={{width: props.width + 'px'}}>
    	{props.children}
    </div>
  )
}

export const ContentLayout = (props) => {
  return (
    <div className={props.className} style={{width: props.width}}>
    	{props.children}
    </div>
  )
}


export const SidebarwithContentLayout = (props) => {
  return (
    <div className={props.className + ' d-md-flex flex-row vurox-theme'}>
    	{props.children}
    </div>
  )
}
export const VuroxComponentsContainer = (props) => {
  
    var style = {backgroundColor:props.fillbg}
    if(props.style) style = Object.assign(style,props.style)

    return (
        <div className={props.className + ' vurox-admin-primary-bg vurox-admin-components-block overview-hidden'} style={style}> 
            {props.children}             
        </div>
    )
}



