import React from 'react'
import {connect} from 'react-redux'
import {Result,Button} from 'antd'
import {
	VuroxComponentsContainer
} from 'Components/layout'

const PageResult = ({item,...props}) =>{

    return(
        <VuroxComponentsContainer>
            <Result
                status="success"
                title="Verifikasi berhasil"
                subTitle={`${item && item.emailAddress} sudah terverifikasi`}
            />
        </VuroxComponentsContainer>
    )
}

export default connect(state=>({auth:state.auth}))(PageResult)