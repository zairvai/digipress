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
                .then(async(obj)=>{

                    tinyMce = obj.default

                    const url = window.location

                    console.log("prepare init")

                    await import("Plugins/tinymce/media")
                    await import("tinymce/plugins/advlist")
                    await import("tinymce/plugins/lists")
                    await import("tinymce/plugins/fullscreen")
                    await import("tinymce/plugins/autolink")
                    await import("tinymce/plugins/link")
                    await import("tinymce/plugins/code")
                    await import("tinymce/plugins/autoresize")

                    tinymce.init({
                        selector:`#${id}`,
                        skin_url:`${url.origin}/modules/tinymce/skins/ui/oxide`,
                        plugins:["advlist lists fullscreen autolink link code autoresize"],
                        menubar:false,
                        toolbar1:"undo redo | formatselect | fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | code | fullscreen ",
                        toolbar2:"bullist numlist | link | ",
                        autoresize_on_init: false,
                        autoresize_bottom_margin: 50,
                        min_height:600,
                        max_height:900,
                        setup:(tinyEditor)=>{
                            console.log(tinyEditor)
                            console.log("setup")
                            
                            editor = tinyEditor
                            
                            tinyEditor.on("keyup change",()=>{
                                const content = tinyEditor.getContent()
                                props.onChange(content)
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
            onChange={(e)=>console.log(e)}
            placeholder={props.placeholder}/>
    </>
        
}

export default TinyMce