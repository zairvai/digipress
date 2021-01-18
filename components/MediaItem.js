import React from 'react'
import {connect} from 'react-redux'
import {Image,Progress} from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
import { bindPromiseCreators } from 'redux-saga-routines'
import { removeRoutinePromise} from 'State/routines/storage'
import {LoadingOutlined} from '@ant-design/icons'
import {getBase64} from 'Helper'

const ActionLayer = ({media,index,width,...props}) => {

    const handleDelete = (e) => {
        e.stopPropagation()
        if(props.onDelete) props.onDelete({...media,index})
        //console.log("delete : ",media)
    }

    return(
        <div className="d-flex justify-content-center align-items-center" 
            style={{position:"relative",zIndex:1,backgroundColor:"rgba(0,0,0,0.4)",width:width,height:width}}>

            <DeleteOutlined style={{color:"#ffffff",fontSize:"16px"}} onClick={handleDelete}/>

        </div>
    )

} 


const ItemImage = ({media,index=false,dimension={width:100,height:100},width="100%",className="",...props}) =>{

    const {auth}  = props

    const [isFetching,setFetching] = React.useState(true)
    const [isSelected,setSelected] = React.useState(false)
    const [isLayerVisible,setLayerVisible] = React.useState(false)
    const [previewMedia,setPreviewMedia] = React.useState()
    
    React.useEffect(() =>{

        if(media.key){
            setFetching(false)
            const url = `${media.baseURL}/${dimension.width}x${dimension.height}/${encodeURI(media.key)}`
            setPreviewMedia(url)
        }
        // else if(media.file){
        //     getBase64(media.file)      
        //         .then(preview=>setPreviewMedia(preview))
        //         .catch(error=>console.log(error))
        // }

    },[media.key])


    const handleClick = (e) =>{
        e.stopPropagation()
        if(!isFetching){
            // console.log(media)
            setSelected(!isSelected)
            if(props.onChange) props.onChange({media:{...media,type:"image"},isSelected:!isSelected})
        }
    }

    const handleMouseEnter = e =>{
        e.stopPropagation()
        if(!isFetching){
            setLayerVisible(true)
        }
    }

    const handleMouseOut = e =>{
        e.stopPropagation()
        if(!isFetching){
            setLayerVisible(false)
        }
    }

    return(
        <>
            <div style={{width:width}} className={className}>
                <div className={`media-wrapper d-flex justify-content-center align-items-center ${isSelected && 'selected'}`} 
                    style={{width:width,height:width,
                        background: previewMedia && `url("${previewMedia}") no-repeat center`
                    }} 
                    onClick={handleClick} 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseOut}>
                    
                    {/* {isLayerVisible && <ActionLayer media={media} index={index} width="100%" onDelete={props.onDelete}/>} */}

                    {isFetching && <LoadingOutlined style={{fontSize:"20px",color:"#333333"}} className="align-self-center"/>}
                    
                    {/* <Image src={previewMedia} preview={previewMedia} className={isFetching && 'blur'}/> */}
                    
                </div>
                {   media.progress ?
                        <div className="mt-1" style={{width:"100%"}}>
                            <Progress percent={Math.ceil(media.progress*100)} size="small" status={media.progress < 1 ? 'active' : 'success'}/>
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
    }))(ItemImage)

export {
    MediaImage   
}