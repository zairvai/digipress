import React from 'react'

import {
	VuroxComponentsContainer
} from 'Components/layout'
import {Row,Col} from 'antd'

import DropdownMenu from 'Components/DropdownMenu'

const Nav = props =>{

    const [selectedRange,setSelectedRange] = React.useState()

    React.useEffect(()=>{ 

        setSelectedRange(rangeDateItems[2])

    },[])

    const rangeDateItems = [
        {label:"Kemarin",description:"Statistik pengguna kemarin",value:"yesterday"},
        {label:"7 hari lalu",description:"Statistik pengguna dalam 7 hari terakhir",value:"7daysAgo"},
        {label:"30 hari lalu",description:"Statistik pengguna dalam 30 hari terakhir",value:"30daysAgo"}
    ]

    const handleMenuChange = selectedItem =>{
        setSelectedRange(selectedItem)
        if(props.onMenuChange) props.onMenuChange(selectedItem)
    }

    return(
        <VuroxComponentsContainer className="p-4">
            <Row>
                <Col md={12}>
                    <div className="d-flex align-items-center" style={{height:"100%"}}>
                        <h5 className="m-0">Analytics</h5>
                    </div>
                </Col>
                <Col md={12} >
                    <div className="fright">
                        <DropdownMenu items={rangeDateItems} selected={selectedRange} onChange={handleMenuChange}/>
                    </div>
                </Col>
            </Row>
        </VuroxComponentsContainer>
    )
}

export default Nav