import React from 'react'
import {Modal,Tabs} from 'antd'
import {UploadOutlined, FolderOutlined, YoutubeOutlined} from '@ant-design/icons'
import MediaUpload from 'Components/MediaUpload'
import MediaChoose from 'Components/MediaChoose'
import MediaYoutube from 'Components/MediaYoutube'

const Media = ({editor,visible,...props})=>{

    const {TabPane} = Tabs
    const [selectedMedias,setSelectedMedias] = React.useState([])
    const [isOkDisabled,setOkDisabled] = React.useState(true)

    const handleOK = () =>{
        if(props.onOK) props.onOK(selectedMedias)
    } 

    const handleChange = selectedMedias =>{

        // console.log(selectedMedias)
        if(selectedMedias.length > 0) setOkDisabled(false)
        else setOkDisabled(true)

        setSelectedMedias(selectedMedias)
    }

    const handleTabChange = key => {
        setSelectedMedias([])
        setOkDisabled(true)
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

            <div style={{height:"600px"}}>

                <Tabs defaultActiveKey="upload" style={{height:"inherit"}} onChange={handleTabChange}>
                    <TabPane tab={<span><UploadOutlined/>Unggah gambar</span>} key="upload" style={{height:"inherit"}}>
                        <MediaUpload onChange={handleChange}/>
                    </TabPane>
                    <TabPane tab={<span><FolderOutlined/>Pilih gambar</span>} key="choose" style={{height:"inherit"}}>
                        <MediaChoose onChange={handleChange}/>
                    </TabPane>
                    <TabPane tab={<span><YoutubeOutlined/>Youtube</span>} key="youtube" style={{height:"inherit"}}>
                        <MediaYoutube onChange={handleChange}/>
                    </TabPane>
                    
                    
                    
                </Tabs>

            </div>

        </Modal>
    )

}

export default Media