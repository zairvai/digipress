import React,{useEffect} from 'react'
import {useRouter} from 'next/router'

const index = () => {

    const router = useRouter()

    useEffect(()=>{
        router.push('/dashboard')
        return ()=>{}
    })

    return (<></>)

}

export default index