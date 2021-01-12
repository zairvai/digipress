import React from 'react'
import {connect} from 'react-redux'
import {Image,Progress} from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
import { bindPromiseCreators } from 'redux-saga-routines'
import { getRoutinePromise} from 'State/routines/storage'
import StorageController from 'Library/controllers/StorageController'

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const ActionLayer = ({media,width,...props}) => {

    const handleDelete = (e) => {
        e.stopPropagation()
        if(props.onDelete) props.onDelete(media)
        //console.log("delete : ",media)
    }

    return(
        <div className="d-flex justify-content-center align-items-center" 
            style={{position:"absolute",zIndex:1,backgroundColor:"rgba(0,0,0,0.4)",width:width,height:width + 0.009 * width}} >

            <DeleteOutlined style={{color:"#ffffff",fontSize:"16px"}} onClick={handleDelete}/>

        </div>
    )

} 


const ItemImage = ({media,width="100%",className="",preview=false,...props}) =>{

    const {getObject}  = props

    const [isFetching,setFetching] = React.useState(true)
    const [isSelected,setSelected] = React.useState(false)
    const [isLayerVisible,setLayerVisible] = React.useState(false)
    const [previewMedia,setPreviewMedia] = React.useState()

    React.useEffect(async () =>{

        if(media.key){
            const storageController = new StorageController(props)
            //return getObject.getData listen by useEffect
            storageController._get({...media,level:"public"})
        }else{
            const preview = await getBase64(media.file)      
            setPreviewMedia(preview)      
        }

    },[media])

    React.useEffect(()=>{

        if(media.progress >= 1) setFetching(false)

    },[media.progress])

    React.useEffect(()=>{

        if(Object.keys(getObject.getData).length>0){
            const getData = getObject.getData
            if(getData.key==media.key) {
                setPreviewMedia(getData.url)
            }
        }

    },[getObject.getData])

    const handleClick = (e) =>{
        e.stopPropagation()
        setSelected(!isSelected)
        if(props.onChange) props.onChange({file:{...media,url:previewMedia},isSelected:!isSelected})
    }

    const handleMouse = e =>{
        e.stopPropagation()
        setLayerVisible(!isLayerVisible)
    }

    return(
        <>
            <div style={{width:width}} className={className}>
                <div className={`media-wrapper d-flex justify-content-center align-items-center ${isSelected && 'selected'}`} 
                    style={{width:width,height:width + 0.009 * width}} 
                    onClick={handleClick} onMouseEnter={handleMouse} onMouseLeave={handleMouse}>
                    
                    {!isFetching && isLayerVisible && <ActionLayer media={media} width={width} onDelete={props.onDelete}/>}
                    
                    <Image src={previewMedia} preview={preview} className={isFetching && 'blur'}/>
                    
                </div>
                {   media.progress ?
                        <div className="mt-1" style={{width:"100%"}}>
                            <Progress percent={media.progress*100} size="small" status={media.progress < 1 ? 'active' : 'success'}/>
                        </div>
                        :
                    <></>
                }
            </div>
        </>
    )
}

const MediaImage = connect(state=>({
        auth:state.auth,
        dispatch:state.dispatch,
        getObject:state.getObject
    }),
    (dispatch)=>({
            ...bindPromiseCreators({
            getRoutinePromise
        },dispatch),dispatch
    }))(ItemImage)

export {
    MediaImage
}