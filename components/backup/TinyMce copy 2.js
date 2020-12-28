import React from 'react'
import $ from 'jquery'

const TinyMce = ({id,mode="full",...props}) =>{

    let tinymce = null
    const [editor,setEditor] = React.useState(null)
    const [isReady,setReady] = React.useState(false)

    React.useEffect(()=>{
        console.log("loading")
        if(id!=="undefined") {
            console.log($(`#${id}`).length)
            setReady(true)
        }
    },[id])

    React.useEffect(()=>{

        if(isReady){
            console.log("ready")
            // setTimeout(()=>{
                
                import('tinymce/tinymce')
                    .then(async(obj)=>{

                        tinymce = obj.default

                        const url = window.location

                        let plugins=[]
                        let pluginList = []
                        let toolbar1 = ""
                        let skinUrl = ""

                        if(mode=="full"){
                            plugins = [
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

                            pluginList = ["advlist lists fullscreen autolink link code autoresize mymedia paste"]
                            toolbar1 = "undo redo | formatselect | fontsizeselect | bold italic underline forecolor backcolor | \
                                                alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link |\
                                                code | fullscreen | mymedia | paste pastetext"
                            
                            skinUrl=`${url.origin}/modules/tinymce/skins/ui/custom`
                            
                        }else{
                            plugins = [
                                import("tinymce/plugins/autoresize")
                            ]
                            pluginList = ["autoresize"]

                            skinUrl=`${url.origin}/modules/tinymce/skins/ui/simple`
                        }

                        await Promise.all(plugins)

                        tinymce.init({
                            selector:`#${id}`,
                            skin_url:skinUrl,
                            plugins:pluginList,
                            toolbar1:toolbar1,
                            menubar:false,
                            statusbar:false,
                            height:props.height ? props.height : props.minHeight ? props.minHeight : 100,
                            //autoresize_on_init: false,
                            autoresize_bottom_margin: props.bottomMargin ? props.bottomMargin : 50,
                            min_height: props.height ? props.height : props.minHeight ? props.minHeight : 600,
                            max_height:props.maxHeight ? props.maxHeight : 2000,
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
            // },100)
        }
    
        
        return ()=>{
            // console.log("remove editor")
            if(tinymce)tinymce.remove(editor)
        }

    },[isReady])

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
    
        <textarea 
            id={id}
            style={{visibility:"hidden"}}
            placeholder={props.placeholder}/>
    </>
        
}

export default TinyMce