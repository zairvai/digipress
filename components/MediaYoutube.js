import React from 'react'
import ReactPlayer from 'react-player'
import {Typography,Input,Row,Col} from 'antd'

const {Text} = Typography

const MediaPlayer = props =>{

    const [url,setUrl] = React.useState()
    const [selectedVideos,setSelectedVideos] = React.useState([])
    const [errors,setErrors] = React.useState({})
    let timeout


    React.useEffect(()=>{

        return ()=>{
            clearTimeout(timeout)
        }
    },[])

    React.useEffect(()=>{
        if(props.onChange) props.onChange(selectedVideos)
        
    },[selectedVideos])

    const handleChange = e =>{

        clearTimeout(timeout)

        const value = e.target.defaultValue
        

        if(value.trim()=="") return
        
        const re = new RegExp(/https?:\/\/www.youtube.com\/.+?v=(.+)/)
        const match = value.match(re)
        
        timeout = setTimeout(()=>{
            if(match){
                const queryUrl = match[1].split("&")
                const youtubeId=queryUrl[0]
                setUrl(value)
                setSelectedVideos([{youtubeId,url:value,type:"youtube"}])
                setErrors({...errors,youtube:false})
            }else{
                setUrl("")
                setSelectedVideos([])
                setErrors({...errors,youtube:{message:"Silahkan ketik alamat video youtube dengan benar"}})
                
            }
        },1000)
        
    }

    return(
        <div style={{height:"100%"}}>
            
            <Row>
                <Col md={24} xs={24} sm={24}>
                    <Input size="large" className="mb-3" onKeyUp={handleChange} onChange={handleChange} placeholder="https://www.youtube.com/watch?v=abcdefg" allowClear block="true"/>
                    {errors && errors.youtube && <Text type="danger">{errors.youtube.message}</Text>}
                </Col>
            </Row>
            
            <ReactPlayer url={url} width="100%" height="90%" controls={true}
                config={{
                    youtube:{
                        playerVars:{
                            showinfo:1
                        },
                        embedOptions:{
                            rel:0,
                            modestbranding:true
                        }
                    }
                }}
            />
                
            
        </div>
    )

}

export default MediaPlayer