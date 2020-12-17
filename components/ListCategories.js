import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Button,Tooltip} from 'antd'
import Icon from '@mdi/react'
import {mdiDelete} from '@mdi/js'
import AuthController from 'Library/controllers/AuthController'

const List = ({items,...props}) =>{

    const {auth} = props

    const RowItem = ({item,index}) => (
        <Link href={`/${auth.account.uniqueURL}/content/categories/${item.id}/edit`} shallow>
            <tr>
                <td valign="middle">{index+1}</td>
                <td valign="middle">{item.name}</td>
                <td valign="middle">{item.desc}</td>
                {
                    (AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) && 
                    <td valign="middle">{item.account.name}</td>
                }
                <td valign="middle">{item.createdBy.name}</td>
                <td valign="middle" className="fright">
                    <Tooltip placement="topLeft" title="Hapus" arrowPointAtCenter>
                        <Button type="link" icon={<Icon size="1.3em" path={mdiDelete}  onClick={(e)=>{props.onDelete(item,index);e.stopPropagation(); }}/>}/>
                    </Tooltip>
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
                        <th width="25%">Kategori</th>
                        <th width="25%">Deskripsi</th>
                        {
                            (AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) && 
                            <th valign="middle">Akun</th>
                        }
                        <th width="25%">Dibuat oleh</th>
                        <th className="fright"></th>
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