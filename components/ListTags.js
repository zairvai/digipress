import React from 'react'
import {connect} from 'react-redux'
import {	
	VuroxTableDark
} from 'Components/tables'
import Link from 'next/link'
import {Button,Tooltip} from 'antd'
import Icon from '@mdi/react'
import {mdiDelete} from '@mdi/js'
import {Status} from 'Components/mycomponents.js'

const List = ({items,...props}) =>{

    console.log(items)
    
    const {auth,accountId} = props

    return(
        <VuroxTableDark>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th width="20"></th>
                        <th width="25%">Pengguna</th>
                        <th width="20%">Email</th>
                        <th width="20%">Telpon</th>
                        <th width="10%">Role</th>
                        <th width="10%">Status</th>
                        <th className="fright"></th>
                    </tr>
                </thead>
                <tbody>
                    {   items ?
                            items.map((item,index)=>{
                                
                                let i=0,found=false, role={}
                                for(i=0;i<item.roles.length;i++){
                                    if(item.roles[i].accountId===accountId){
                                        found=true
                                        break
                                    }
                                }

                                if(found) role = item.roles[i]

                                return(
                                    <tr key={item.id}>
                                        <td valign="middle">{index+1}</td>
                                        {/* <td valign="middle"><Link href={{pathname:`/[account_url]/manage/users/[id]`,query:{account_url:auth.account.uniqueURL,id:item.id}}} shallow><a>{item.name}</a></Link></td> */}
                                        <td valign="middle">{item.name}</td>
                                        <td valign="middle">{item.emailAddress}</td>
                                        <td valign="middle">{item.phoneNumber}</td>
                                        <td valign="middle">{role.role}</td>
                                        <td valign="middle">
                                            {
                                                role.status===2 ? <Status text="Pending" state="warning" position="right" blinking/> :
                                                role.status===3 ? <Status text="Active" state="success" position="right"/> :
                                                role.status===4 ? <Status text="Suspended" state="fail" position="right"/> :
                                                <></>
                                            }
                                        </td>
                                        <td valign="middle" className="fright">
                                            <Tooltip placement="topLeft" title="Hapus akses" arrowPointAtCenter>
                                                <Button type="link" icon={<Icon size="1.3em" path={mdiDelete}  onClick={()=>props.onDelete(item,index)}/>}/>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                )
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