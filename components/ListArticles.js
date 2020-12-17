import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {Tag} from 'antd'
import {	
	VuroxTableDark
} from 'Components/tables'

import {Status} from 'Components/mycomponents.js'
import AuthController from 'Library/controllers/AuthController'

const List = ({items,...props}) =>{

    const {auth} = props

    const RowItem = ({item,index}) => {

        return(
            <Link href={`/${auth.account.uniqueURL}/content/articles/${item.id}`} shallow>
                <tr key={item.id}>
                    
                    <td valign="middle">{index+1}</td>
                    <td valign="middle">{item.title}</td>

                    {
                        AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth) ? 
                        <>
                            <td valign="middle">
                                {item.category.name}
                                {
                                    item.tags && item.tags.map(tag=><div className="mt-1"><Tag key={tag.id}>{tag.name}</Tag></div>)
                                }
                            </td>
                            <td valign="middle">
                                {item.account.name}
                            </td>
                        </>
                        :
                        <>
                            <td valign="middle">
                                {item.category.name}
                            </td>
                            <td valign="middle">
                                {
                                    item.tags && item.tags.map(tag=><div className="mt-1"><Tag key={tag.id}>{tag.name}</Tag></div>)
                                }
                            </td>
                        </>
                        
                    }

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
                        <th width="25%">Artikel</th>
                        {
                            AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth) ? 
                            <>
                                <th width="20%">Kategori &amp; Tag</th>
                                <th width="20%">Akun</th>
                            </>
                            :
                            <>
                                <th width="20%">Kategori</th>
                                <th width="20%">Tag</th>
                            </>
                            
                        }
                        <th width="10%">Akses</th>
                        <th width="10%">Penulis</th>
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