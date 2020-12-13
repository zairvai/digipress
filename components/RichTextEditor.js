import React from 'react'
import dynamic from 'next/dynamic'


const Editor = props => {

    const [TextEditor,setTextEditor] = React.useState(null)


    const [content,setContent] = React.useState("")

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4,5, false] }],
            ["bold", "underline" ,"italic", "strike"],
            ["link", "blockquote", "code", "image"],
            [{ 'color': [] }, { 'background': [] }], 
            [{list: "ordered"},{list: "bullet"}],
            [{ align: "" },{align:"center"},{align:"right"},{align:"justify"}]
        ]
    };

    React.useEffect(()=>{

        const ReactQuillComponent = dynamic (()=>import('react-quill'),{ssr:false}) 
        
        // const QuillImageResize = dynamic (()=>import('quill-image-resize-module',{ssr:false}))
        // ReactQuillComponent.register("modules/imageResize",QuillImageResize)

        setTextEditor(ReactQuillComponent)

       

        return(()=>{

        })
    },[])

    const handleReactQuillChange = value => {
        setContent(value)
    };

    return <>
            {
                TextEditor && 
                    <TextEditor
                        style = {props.style}
                        className={props.className}
                        value={props.value ? props.value : content}
                        onChange={props.onChange}
                        theme="snow"
                        modules={modules}
                    />
            }
        </>

}

export default Editor