import React from 'react'
import {connect} from 'react-redux'
import {Upload,message} from 'antd'
import {UploadOutlined,PlusOutlined} from '@ant-design/icons'
import {MediaItem} from 'Components/MediaItem' 
import { bindPromiseCreators } from 'redux-saga-routines'
import { putRoutinePromise} from 'State/routines/storage'
import StorageController from 'Library/controllers/StorageController'

const {Dragger} = Upload

const MediaUpload = ({name="file",multiple=true,...props}) =>{

    const {auth,putObject} = props

    const [selectedFiles,setSelectedFiles] = React.useState([])
    const [uploadedFiles,setUploadedFiles] = React.useState([])

    const storageController = new StorageController(props)

    React.useEffect(()=>{

        storageController._putReset()
        storageController._getReset()
    
        return ()=>{
            storageController._putReset()
            storageController._getReset()
        }

    },[])

    React.useEffect(()=>{
        if(props.onChange) props.onChange(selectedFiles)
        
    },[selectedFiles])

    React.useEffect(()=>{

        if(Object.keys(putObject.putData).length>0){
            
            const uploadedFile = putObject.putData 
            const foundIndex = uploadedFiles.findIndex(obj=>obj.uid==uploadedFile.uid)
            
            if(foundIndex>-1){
                uploadedFiles[foundIndex] = uploadedFile
                setUploadedFiles([...uploadedFiles])
            }else{
                setUploadedFiles([...uploadedFiles,uploadedFile])
            }
        }

    },[putObject.putData])

    const handleUpload = file =>{

        return storageController._put({
            directory:`${auth.account.id}`,
            file
        })
    }

    const handleDelete = deletedFile =>{
        
        const foundIndex = uploadedFiles.findIndex(obj=>obj.uid==deletedFile.uid)

        if(foundIndex>-1){

            uploadedFiles.splice(foundIndex,1)
            setUploadedFiles([...uploadedFiles])

        }
    }

    const handleChange = ({media,isSelected}) => {

        if(isSelected){
            setSelectedFiles([...selectedFiles,media])
        }else{
            const foundIndex = selectedFiles.findIndex(obj=>obj.uid==media.uid)
            if(foundIndex > -1){
                selectedFiles.splice(foundIndex,1)
                setSelectedFiles([...selectedFiles])
            }
        }

    }

    const UploadButton = ({width="100%",className}) => (
        <div style={{width:width,height:width,border:"1px dashed #dddddd"}} className={`d-flex justify-content-center align-items-center ${className}`}>
            <div>
                <PlusOutlined />
            </div>
        </div>)


    return (
        <Dragger 
            name={name}
            multiple={multiple} 
            style={{height:"100%"}}
            beforeUpload={file=>{

                console.log(file)

                if(file.type!=="image/png" && file.type!=="image/jpeg"){
                    message.error(`Hanya format gambar .png dan .jpg saja yang diperbolehkan.`);
                }

                return file.type === "image/png" || file.type === "image/jpeg"
            }}
            customRequest={({file})=>handleUpload(file)}>
            {
                uploadedFiles.length>0 ?
                <>
                    <div className="media-manager d-flex justify-content-start flex-wrap align-content-start" style={{height:"100%"}}>
                        {uploadedFiles.map((uploaded,index)=><MediaItem key={`media-image-${index}`} index={index} media={uploaded} width={100} onChange={handleChange} onDelete={handleDelete} className="ml-3 mb-3"/>)}
                        <UploadButton width={100} className="ml-3"/>
                    </div>
                </>
                :
                <>
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Klik atau geser ke sini gambar yang akan diunggah.</p>
                    <p className="ant-upload-hint">
                        Bisa satu atau beberapa file. Hanya gambar dengan format .jpeg dan png saja yang diperbolehkan.
                    </p>   
                    <p className="ant-upload-hint">
                        Dilarang mengunggah media yang tidak sesuai dengan ketentuan.
                    </p>
                </>
            }
        </Dragger>   
    )
}

export default connect(
    state=>({
        auth:state.auth,
        dispatch:state.dispatch,
        putObject:state.putObject
    }),
    (dispatch)=>({
            ...bindPromiseCreators({
            putRoutinePromise
        },dispatch),dispatch
    })
)(MediaUpload)