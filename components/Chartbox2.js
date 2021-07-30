import React from 'react'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import {	
	VuroxTableHeading, 
	VuroxTableDark
} from 'Components/tables'
import {Row,Col,Typography} from 'antd'
import {currency} from 'Utilities/number'

const Chart = props =>{

    const {Text} = Typography

    return(
        <>
            <VuroxComponentsContainer>
                <VuroxTableHeading>
                    <Row>
                        <Col md={18}>
                            <h5>Top Berita/Artikel</h5>
                        </Col>
                    </Row>
                    <Text>Berita atau Artikel yang paling sering dibaca</Text>
                </VuroxTableHeading>
                <VuroxTableDark>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th className="fright">Bounce</th>
                                <th className="fright">Views</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DKI Jakarta</td>
                                <td className="fright">10%</td>
                                <td className="fright">{currency(102000)}</td>
                            </tr>
                            <tr>
                                <td>Bandung</td>
                                <td className="fright">30%</td>
                                <td className="fright">{currency(70000)}</td>
                            </tr>
                            <tr>
                                <td>Yogyakarta</td>
                                <td className="fright">15%</td>
                                <td className="fright">{currency(95000)}</td>
                            </tr>
                            <tr>
                                <td>Semarang</td>
                                <td className="fright">22.5%</td>
                                <td className="fright">{currency(55000)}</td>
                            </tr>
                            <tr>
                                <td>Bali</td>
                                <td className="fright">63%</td>
                                <td className="fright">{currency(83000)}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </VuroxTableDark>
                
            </VuroxComponentsContainer>	
        </>                        
    )
}

export default Chart