import React from 'react'
import {connect} from 'react-redux'
import Link from 'next/link'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Button,Tooltip} from 'antd'
import Icon from '@mdi/react'
import {mdiDelete} from '@mdi/js'

const List = ({items,...props}) =>{

    const {auth} = props

    return(
        <VuroxTableDark>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th width="20"></th>
                        <th width="25%">Category</th>
                        <th width="25%">Deskripsi</th>
                        <th className="fright"></th>
                    </tr>
                </thead>
                <tbody>
                    {   items ?
                            items.map((item,index)=>{

                                return(
                                    <Link key={`${item.name}${item.id}`} href={`/${auth.account.uniqueURL}/content/categories/${item.id}/edit`} shallow>
                                        <tr>
                                            <td valign="middle">{index+1}</td>
                                            <td valign="middle">{item.name}</td>
                                            <td valign="middle">{item.desc}</td>
                                            <td valign="middle" className="fright">
                                                <Tooltip placement="topLeft" title="Hapus" arrowPointAtCenter>
                                                    <Button type="link" icon={<Icon size="1.3em" path={mdiDelete}  onClick={()=>props.onDelete(item,index)}/>}/>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    </Link>
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