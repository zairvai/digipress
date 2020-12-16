import React from 'react'

import {Select} from 'antd'

const SelectCategory = props =>{

    const {items} = props

    return(
        <Select
            disabled={props.disabled}
            labelInValue
            value={props.value}
            showSearch
            size="large"
            placeholder="Pilih kategori"
            optionFilterProp="children"
            optionLabelProp="label"
            onChange={props.onChange}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            
            {items && items.map(item=>
                <Select.Option key={item.id} value={item.id} label={item.name}>{item.name}</Select.Option>
            )}

        </Select>
    )

}

export default SelectCategory