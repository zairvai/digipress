import React,{useEffect} from 'react'
import {useRouter} from 'next/router'

const Index = () => {

    const router = useRouter()

    useEffect(()=>{
        router.push('/report/dashboard')
        return ()=>{}
    })

    return (<></>)

}

export default Index