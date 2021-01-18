import React from 'react'
import {connect} from 'react-redux'
import { bindPromiseCreators } from 'redux-saga-routines'
import { listRoutinePromise,removeRoutinePromise } from 'State/routines/storage'
import {MediaImage} from 'Components/MediaItem' 
import StorageController from 'Library/controllers/StorageController'
import InfiniteScroll from 'react-infinite-scroll-component'
import {LoadingOutlined} from '@ant-design/icons'
import _ from 'lodash'

const MediaChoose = ({...props}) =>{

    const {auth,listObjects} = props

    const [selectedFiles,setSelectedFiles] = React.useState([])

    const storageController = new StorageController(props)
    
    React.useEffect(()=>{

        fetchItems({directory:`${auth.account.id}`})

        return ()=>{
            storageController._setListdata({items:[]})
        }

    },[])

    React.useEffect(()=>{
        
        if(props.onChange) props.onChange(selectedFiles)

    },[selectedFiles])

    const fetchItems = ({maxKeys=40,directory,nextToken}) => {

        storageController._list({maxKeys,directory,nextToken})

    }

    const fetchMoreData = () =>{
        console.log("more data")
        fetchItems({maxKeys:16,directory:`${auth.account.id}`,nextToken:listObjects.listData.nextToken})
    }

    const handleDelete = deletedFile =>{
        
        console.log(deletedFile)

        if(deletedFile.index!==false){
            const items = _.clone(listObjects.listData.items)
            items.splice(deletedFile.index,1)
            storageController._setListdata({items})

        }
    }

    const handleChange = ({media,isSelected}) => {

        // console.log(media)

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

    return(
        <div id="scrollable" style={{height:"100%",border:"1px dashed #dddddd",padding:"16px 0",overflow:"auto"}}>
            {
                listObjects.listData.items.length>0 ?
                <InfiniteScroll
                    scrollableTarget="scrollable"
                    dataLength={listObjects.listData.items.length}
                    next={fetchMoreData}
                    hasMore={listObjects.listData.hasMore}
                    loader={
                        <div className="d-flex justify-content-center" style={{overflow:"hidden"}}>
                            <LoadingOutlined style={{fontSize:"30px",color:"#333333"}} className="align-self-center"/>
                        </div>
                    }
                >
                    <div className="media-manager d-flex justify-content-start flex-wrap align-content-start" style={{height:"100%"}}>
                        {listObjects.listData.items.map((item,index)=><MediaImage key={`media-image-${index}`} index={index} media={item} width={100} onChange={handleChange} onDelete={handleDelete} className="ml-3 mb-3"/>)}
                    </div>
                </InfiniteScroll>
                :
                <>   
                </>
            }
        </div>
    )
}

export default connect(
    state=>({
        auth:state.auth,
        dispatch:state.dispatch,
        listObjects:state.listObjects
    }),
    (dispatch)=>({
            ...bindPromiseCreators({
            listRoutinePromise,
            removeRoutinePromise
        },dispatch),dispatch
    })
)(MediaChoose)