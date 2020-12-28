import React from 'react'

const TinyMce = ({id,...props}) =>{

    let tinymce = null
    const [editor,setEditor] = React.useState(null)

    React.useEffect(()=>{

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
                        import("tinymce/plugins/autoresize"),
                        import("tinymce/plugins/paste")
                    ]

                    await Promise.all(plugins)

                    tinymce.init({
                        selector:`#${id}`,
                        skin_url:`${url.origin}/modules/tinymce/skins/ui/custom`,
                        plugins:["advlist lists fullscreen autolink link code autoresize mymedia paste"],
                        toolbar1:"undo redo | formatselect | fontsizeselect | bold italic underline forecolor backcolor | \
                                    alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link |\
                                    code | fullscreen | mymedia | paste pastetext",
                        menubar:false,
                        statusbar:false,
                        //autoresize_on_init: false,
                        autoresize_bottom_margin: 50,
                        min_height:props.minHeight ? props.minHeight : 600,
                        max_height:2000,
                        setup:(tinyEditor)=>{
                            //console.log("setup")
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
        },1000)
        
        return ()=>{
            // console.log("remove editor")
            if(tinymce)tinymce.remove(editor)
        }

    },[])

    let interval,counter=0

    React.useEffect(()=>{

        interval = setTimeout(function run(){
                
            // console.log(editor)
            // console.log(props.content)
            if(props.content && props.content.trim() !== ""){
                if(counter<10){

                    if(editor && props.content){
                        // console.log("DONE")
                        editor.setContent(props.content)
                        clearTimeout(interval)
                    }else{
                        setTimeout(run,1000)
                    }
                    counter++ 
                }
            }
        
            
        },1000)
    
        return ()=>{
            clearTimeout(interval)
        }
    },[editor,props.content])

    return <>
    
        <textarea style={{visibility:"hidden"}}
            id={id}
            // onChange={(e)=>console.log(e)}
            placeholder={props.placeholder}/>
    </>
        
}

export default TinyMce