import React from 'react'

const TinyMce = ({id,...props}) =>{

    const [editor,setEditor] = React.useState(null)

    React.useEffect(()=>{

        let tinymce = null

        setTimeout(()=>{
            
            import('tinymce/tinymce')
                .then(async(obj)=>{

                    tinymce = obj.default

                    const url = window.location

                    const plugins = [
                        import("Plugins/tinymce/mymedia"),
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
                        plugins:["advlist lists fullscreen autolink link code autoresize mymedia"],
                        menubar:false,
                        statusbar:false,
                        toolbar1:"undo redo | formatselect | fontsizeselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link | code | fullscreen | mymedia",
                        autoresize_on_init: false,
                        autoresize_bottom_margin: 50,
                        min_height:props.minHeight ? props.minHeight : 600,
                        max_height:900,
                        setup:(tinyEditor)=>{
                            console.log("setup")
                            setEditor(tinyEditor)
                            
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

        },100)
        
        
        return ()=>{
            
            if(tinymce)tinymce.remove(editor)
            
        }

    },[])

    return <>
    
        <textarea style={{visibility:"hidden"}}
            id={id}
            onChange={(e)=>console.log(e)}
            placeholder={props.placeholder}/>
    </>
        
}

export default TinyMce