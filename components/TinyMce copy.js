import React from 'react'
import tinymce from 'tinymce'
import "tinymce/plugins/wordcount"
import "tinymce/plugins/table"


const Editor = ({id,content,...props}) =>{

    const [editor,setEditor] = React.useState()

    React.useEffect(()=>{

        const url = window.location

        tinymce.init({
            selector:`#${id}`,
            skin_url:`${url.origin}/modules/tinymce/skins/oxide`,
            plugins:"wordcount table",
            setup:(editor)=>{
                setEditor(editor)
                editor.on("keyup change",()=>{
                    const content = editor.getContent()
                    props.onEditorChange(content)
                })
            }
        })

        return ()=>{
            tinymce.remove(editor)
        }
    },[])

    return (
        <textarea
            id={id}
            value={content}
            onChange={(e)=>console.log(e)}
        >
        </textarea>
    )
}

export default Editor