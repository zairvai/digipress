import React from 'react'
import {connect} from 'react-redux'
import { bindPromiseCreators } from 'redux-saga-routines'
import { listRoutinePromise} from 'State/routines/storage'
import StorageController from 'Library/controllers/StorageController'

const MediaChoose = ({...props}) =>{

    const {auth,listObject} = props

    const storageController = new StorageController(props)
    
    React.useEffect(()=>{
        storageController._list({
            level:"public",
            maxKeys:5,
            directory:`${auth.account.id}/media/`
        })

        return ()=>{
            storageController._listReset()
        }
    },[])

    return(
        <></>
    )
}

export default connect(
    state=>({
        auth:state.auth,
        dispatch:state.dispatch,
        listObject:state.listObject
    }),
    (dispatch)=>({
            ...bindPromiseCreators({
            listRoutinePromise
        },dispatch),dispatch
    })
)(MediaChoose)