import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {Tag} from 'antd'
import {	
	VuroxTableDark
} from 'Components/tables'

import {Status} from 'Components/mycomponents.js'

const List = ({items,...props}) =>{

    const {auth} = props

    const RowItem = ({item,index}) => {

        return(
            <Link href={`/${auth.account.uniqueURL}/content/classrooms/${item.id}`} shallow>
                <tr key={item.id}>
                    
                    <td valign="middle">{index+1}</td>
                    <td valign="middle">{item.title}</td>
                    <td valign="middle">{item.category.name}</td>
                    <td valign="middle">{
                        item.tags &&
                            item.tags.map(tag=><Tag key={tag.id}>{tag.name}</Tag>)
                        }
                    </td>
                    <td valign="middle">{item.access}</td>
                    <td valign="middle">{item.createdBy.name}</td>
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
    }
    return(
        <VuroxTableDark>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th width="20"></th>
                        <th width="25%">Ruang belajar</th>
                        <th width="20%">Kategory</th>
                        <th width="20%">Tags</th>
                        <th width="10%">Akses</th>
                        <th width="10%">Pengajar</th>
                        <th className="fright">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map((item,index)=><RowItem key={`${item.name}${item.id}`} item={item} index={index}/>)}
                </tbody>
            </table>
            
        </VuroxTableDark>
    )

}

export default connect(state=>state)(List)