import React from 'react'
import {Modal,Tabs} from 'antd'
import {UploadOutlined, FolderOutlined, LinkOutlined} from '@ant-design/icons'
import MediaUpload from 'Components/MediaUpload'
import MediaChoose from 'Components/MediaChoose'

const Media = ({editor,visible,...props})=>{

    const {TabPane} = Tabs
    const [selectedFiles,setSelectedFiles] = React.useState([])
    const [isOkDisabled,setOkDisabled] = React.useState(false)


    // React.useEffect(()=>{
    //     if(editor){
    //         console.log(editor)
    //     }
    // },[editor])

    const handleOK = () =>{
        // console.log(selectedFiles)
        if(props.onOK) props.onOK(selectedFiles)
    } 

    const handleChange = selectedFiles =>{
        if(selectedFiles.length > 0) setOkDisabled(false)
        else setOkDisabled(true)

        setSelectedFiles(selectedFiles)
    }

    return(
        <Modal
            title="Media Manager"
            centered
            width={995}
            keyboard={false}
            maskClosable={false}
            cancelText="Tutup"
            visible={visible}
            onCancel={props.onCancel}
            onOk={handleOK}
            okButtonProps={{disabled:isOkDisabled}}
            destroyOnClose={true}
        >

            <div style={{height:"500px"}}>

                <Tabs defaultActiveKey="upload" style={{height:"inherit"}}>
                    <TabPane tab={<span><UploadOutlined/>Upload</span>} key="upload" style={{height:"inherit"}}>
                        <MediaUpload onChange={handleChange}/>
                    </TabPane>
                    <TabPane tab={<span><FolderOutlined/>Pilih</span>} key="choose" style={{height:"inherit"}}>
                        <MediaChoose/>
                    </TabPane>
                    <TabPane tab={<span><LinkOutlined/>Link</span>} key="link" style={{height:"inherit"}}>

                    </TabPane>
                </Tabs>

            </div>

        </Modal>
    )

}

export default Media