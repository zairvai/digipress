import React from 'react'
import dynamic from 'next/dynamic'
// import "tinymce/plugins/wordcount"
// import "tinymce/plugins/table"

const TinyMce = ({id,content,...props}) =>{
    
    

    React.useEffect(()=>{

        console.log("construct")

        let tinyMce = null
        let editor = null

        setTimeout(()=>{
        import('tinymce/tinymce')
            .then(obj=>{

                tinyMce = obj.default

                const url = window.location

                console.log("prepare init")

                tinymce.init({
                    selector:`#${id}`,
                    skin_url:`${url.origin}/modules/tinymce/skins/ui/oxide`,
                    //plugins:"wordcount table",
                    setup:(tinyEditor)=>{
                        console.log(tinyEditor)
                        console.log("setup")
                        
                        editor = tinyEditor
                        
                        tinyEditor.on("keyup change",()=>{
                            const content = tinyEditor.getContent()
                            props.onEditorChange(content)
                        })
                    }
                })
                
            })
        },1000)
        
        
        return ()=>{
            
            console.log("unmount")

            if(tinyMce){
                console.log("remove editor")
                tinyMce.remove(editor)
            }
            
        }

    },[])

    return <>
    
        <textarea style={{visibility:"hidden"}}
            id={id}
            value={content}
            onChange={(e)=>console.log(e)}/>
    </>
        
}

export default TinyMce