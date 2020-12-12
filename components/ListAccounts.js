import React from 'react'
import {connect} from 'react-redux'
import {	
	VuroxTableDark
} from 'Components/tables'
import Link from 'next/link'

import {Status} from 'Components/mycomponents.js'

const List = ({items,...props}) =>{

    const {auth} = props

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
                    {
                        items ? 
                        items.map((item,index)=>{

                            if(item){

                                return(
                                    <tr key={item.id}>
                                        {/* <td><Checkbox/></td> */}
                                        <td valign="middle">{index+1}</td>
                                        <td valign="middle"><Link href={{pathname:`/${auth.account.uniqueURL}/manage/accounts/[id]`,query:{id:item.id}}} shallow><a>{item.name}</a></Link></td>
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
                                        {/* <td>
                                            <Popover placement="left" title={text} content={menuContent} trigger="click">
                                                <Button type="link" icon={<Icon size="1.3em" path={mdiDotsVertical} />}/>
                                            </Popover>
                                        </td> */}
                                    </tr>
                                )
                            }
                        })
                        :
                        <></>
                        
                    }
                </tbody>
            </table>
            
        </VuroxTableDark>
    )

}

export default connect(state=>state)(List)