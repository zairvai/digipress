import React from 'react'
import {Dropdown,Menu,Button} from 'antd'
import { DownOutlined } from '@ant-design/icons';
const DropdownMenu = ({items,selected,...props}) =>{

    const [selectedMenu,setSelectedMenu] = React.useState()

    React.useEffect(()=>{
        if(selected) setSelectedMenu(selected)
    },[selected])
    
    function handleMenuClick({ item, key, keyPath, domEvent }) {
        const selected = items.find(obj=>obj.value==key)

        setSelectedMenu(selected)
        
        if(props.onChange) props.onChange(selected)
        
    }

    const menu = (
        <Menu onClick={handleMenuClick} selectedKeys={[selectedMenu && selectedMenu.value]}>
            {items.map(item=><Menu.Item key={item.value}>{item.label}</Menu.Item>)}
        </Menu>
        );
        
    return(
        <Dropdown overlay={menu} trigger={['click']}>
            <Button>
                {selectedMenu ? selectedMenu.label : "Menu"} <DownOutlined />
            </Button>
        </Dropdown>
    )
}

export default DropdownMenu