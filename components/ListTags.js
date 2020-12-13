import React from 'react'
import {connect} from 'react-redux'
import {	
	VuroxTableDark
} from 'Components/tables'
import {Button,Tooltip} from 'antd'
import Icon from '@mdi/react'
import {mdiDelete} from '@mdi/js'

const List = ({items,...props}) =>{

    return(
        <VuroxTableDark>
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th width="20"></th>
                        <th width="25%">Tag</th>
                        <th className="fright"></th>
                    </tr>
                </thead>
                <tbody>
                    {   items ?
                            items.map((item,index)=>{

                                return(
                                    <tr key={item.id}>
                                        <td valign="middle">{index+1}</td>
                                        <td valign="middle">{item.name}</td>
                                        <td valign="middle" className="fright">
                                            <Tooltip placement="topLeft" title="Hapus" arrowPointAtCenter>
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