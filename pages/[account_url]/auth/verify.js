import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import { Row,Col,Typography} from 'antd'
import { bindPromiseCreators } from 'redux-saga-routines'
import {
	VuroxComponentsContainer
} from 'Components/layout'
import Layout from 'Templates/Layout.app'
import FormVerify from 'Components/FormAuthVerify'
import FormVerifyChangeEmail from 'Components/FormAuthVerifyChangeEmail'
import FormVerifySubmit from 'Components/FormAuthVerifySubmit'
import FormVerifySuccess from 'Components/FormAuthVerifySuccess'
import { LoadingOutlined } from '@ant-design/icons'
import { getUserRoutinePromise } from 'State/routines/user';
import UserController from 'Library/controllers/UserController'

import {NextSeo} from 'next-seo'

const PageAuth = props => {

    const {auth,router} = props

    const {Title,Text} = Typography

    const userController = new UserController(props)

    const [item,setItem] = React.useState()

    const [isFetching,setFetching] = React.useState(false)
    const [isChangingEmail,setChangingEmail] = React.useState(false)
    const [isCodeSent,setCodeSent] = React.useState(false)
    const [isVerified,setVerified] = React.useState(false)

    const isMounted = React.useRef()

    React.useEffect(()=>{
        
        isMounted.current = true

        if(isMounted.current){

            const {email_verified,email} = auth.user

            if(email_verified){
                setItem({emailAddress:email})
                setVerified(true)
            }
            else{
                setFetching(true)

                userController._get(auth.user.id)
                    .then(user=>{
                        console.log(user)
                        setItem(user.data)
                    })
                    .catch(error=>console.log(error))
                    .finally(()=>setFetching(false))

            }
        }

        return ()=>isMounted.current=false

    },[])

    React.useState(()=>{
        console.log("isVerified : ",isVerified)
    },[isVerified])

    
    const handleSuccessSendingCode = () =>{
        setCodeSent(true)
    }

    //when user changing email
    const handleSuccessChangeEmail = user =>{
        setChangingEmail(false)

        setItem(user)
        setCodeSent(true)
    }

    const handleSuccessSubmitCode = () =>{
        setCodeSent(false)
        setVerified(true)
        console.log("TAI LOE")
    }

    

    return (
        <Layout>
            <NextSeo title="Verifikasi Email" />
            <Row>
				<Col md={10} sm={24} xs={24}>
                    <VuroxComponentsContainer className="p-4">
                        <Title level={5}>Verifikasi Email</Title>
                        <Text type="secondary">Untuk keamanan akun dan lupa password.</Text>
                    </VuroxComponentsContainer>
				</Col>
			</Row>
            <Row>
                <Col md={10} sm={24} xs={24}>
                    {
                        isFetching ? 
                            <VuroxComponentsContainer className="p-4">
                                <div className="d-flex  justify-content-center align-items-center" style={{minHeight:"inherit"}}>
                                    <LoadingOutlined style={{fontSize:"50px",color:"#333333"}} className="align-self-center"/>
                                </div>
                            </VuroxComponentsContainer>
                        :
                        isChangingEmail ? <FormVerifyChangeEmail item={item} onCancel={()=>setChangingEmail(false)} onSuccess={handleSuccessChangeEmail}/>
                        :
                        isCodeSent ? <FormVerifySubmit item={item} onSuccess={handleSuccessSubmitCode} />
                        :
                        isVerified ? <FormVerifySuccess item={item}/>
                        :
                        <FormVerify item={item} onSuccess={handleSuccessSendingCode} onChangeEmail={()=>setChangingEmail(true)}/>
                    }
                </Col>
            </Row>
        
        </Layout>
    );
	
}
export default connect(
    state=>({auth:state.auth}),
    (dispatch)=>({
            ...bindPromiseCreators({
                getUserRoutinePromise
        },dispatch),dispatch
    })
)(withRouter(PageAuth))