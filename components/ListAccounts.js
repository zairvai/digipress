import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {	
	VuroxTableDark
} from 'Components/tables'

import {Status} from 'Components/mycomponents.js'

const List = ({items,...props}) =>{

    const {auth} = props

    const RowItem = ({item,index}) => (
        <Link href={`/${auth.account.uniqueURL}/manage/accounts/${item.id}`} shallow>
            <tr key={item.id}>
                
                <td valign="middle">{index+1}</td>
                <td valign="middle">{item.name}</td>
                <td valign="middle">{item.address}</td>
                <td valign="middle">{item.phoneNumber}</td>
                <td valign="middle">{item.contactPerson}</td>
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
                        {/* <th width="20"><Checkbox/></th> */}
                        <th width="20"></th>
                        <th>Akun</th>
                        <th width="30%">Alamat</th>
                        <th width="15%">Telpon</th>
                        <th width="20%">Contact Person</th>
                        <th className="fright">Status</th>
                        {/* <th className="fright"></th> */}
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