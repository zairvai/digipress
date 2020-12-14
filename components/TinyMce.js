import React from 'react'
import dynamic from 'next/dynamic'
// import "tinymce/plugins/wordcount"
// import "tinymce/plugins/table"

const TinyMce = ({id,content,...props}) =>{
    
    const [editor,setEditor] = React.useState()
    const [tinymce,setTinymce] = React.useState(null)
    

    React.useEffect(async ()=>{
        const tce = await import('tinymce')
        setTinymce(tce.default)
    },[])

    React.useEffect(async ()=>{

        if(tinymce){

            await import("tinymce/plugins/wordcount")
            await import("tinymce/plugins/table")

            console.log(tinymce)

            const url = window.location

            tinymce.init({
                selector:`#${id}`,
                skin_url:`${url.origin}/modules/tinymce/skins/ui/oxide`,
                plugins:"wordcount table",
                setup:(tinyEditor)=>{
                    console.log("setup")
                    setEditor(tinyEditor)
                    tinyEditor.on("keyup change",()=>{
                        const content = tinyEditor.getContent()
                        props.onEditorChange(content)
                    })
                }
            })

        }

        return ()=>{
            if(tinymce) tinymce.remove(editor)
        }
    },[tinymce])

    return <>
        {   tinymce && 
            <textarea
                id={id}
                value={content}
                onChange={(e)=>console.log(e)}
        />
        }
    </>
        
}

export default TinyMce