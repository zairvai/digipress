import React from 'react'
import {connect} from 'react-redux'
import {	
	VuroxTableDark
} from 'Components/tables'
import Link from 'next/link'
import {Status} from 'Components/mycomponents.js'

const List = ({items,...props}) =>{

    const {auth} = props

    const RowItem = ({item,index}) => (
        <Link href={{pathname:`/${auth.account.uniqueURL}/content/classrooms/[id]/lessons/[lid]`,query:{id:item.post.id,lid:item.id}}} shallow>
            
            <tr>
                <td valign="middle">{index+1}</td>
                <td valign="middle">{item.title}</td>
                <td valign="middle" className="fright">
                    {
                        item.status===3 ? <Status text="Active" state="success" position="right"/> :
                        item.status===2 ? <Status text="Pending" state="warning" position="right" blinking/> :
                        <></>
                    }
                </td>
            </tr>
            
        </Link>
    )

    return(
        <VuroxTableDark>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th width="20"></th>
                        <th width="40%">Materi</th>
                        <th className="fright">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item,index)=><RowItem key={`${item.name}${item.id}`} index={index} item={item}/>)}
                </tbody>
            </table>
            
        </VuroxTableDark>
    )

}

export default connect(state=>state)(List)