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

                    const plugins = [
                        import("Plugins/tinymce/media"),
                        import("tinymce/plugins/advlist"),
                        import("tinymce/plugins/lists"),
                        import("tinymce/plugins/fullscreen"),
                        import("tinymce/plugins/autolink"),
                        import("tinymce/plugins/link"),
                        import("tinymce/plugins/code"),
                        import("tinymce/plugins/autoresize")
                    ]

                    await Promise.all(plugins)

                    tinymce.init({
                        selector:`#${id}`,
                        skin_url:`${url.origin}/modules/tinymce/skins/ui/custom`,
                        plugins:["advlist lists fullscreen autolink link code autoresize"],
                        menubar:false,
                        statusbar:false,
                        toolbar1:"undo redo | formatselect | fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link | code | fullscreen ",
                        autoresize_on_init: false,
                        autoresize_bottom_margin: 50,
                        min_height:props.minHeight ? props.minHeight : 600,
                        max_height:900,
                        setup:(tinyEditor)=>{
                            editor = tinyEditor
                            
                            tinyEditor.on('keydown', function (e, evt) {
                                if (e.keyCode == 9) e.preventDefault();
                            })
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