import React from 'react'
import $ from 'jquery'
import _ from 'lodash'

const TinyMce = ({id,className="",mode="full",
    height,maxHeight,minHeight,bottomMargin,content,placeholder,onChange,onRemove,...props}) =>{

    let tinymce,editor

    const [ed,setEd] = React.useState()

    const isMounted = React.useRef()

    React.useEffect(()=>{
        
            isMounted.current = true

            if(isMounted.current){

                const selector= `#${id}` + (className!=="" ? `.${className}` : "")
                const editorId = selector


                setTimeout(()=>{
                    
                    const url = window.location

                    let plugins=[],pluginList = [],toolbar1 = "",skinUrl = ""

                    if(mode=="full"){
                    
                        pluginList = ["advlist lists fullscreen autolink link code autoresize mymedia paste"]
                        toolbar1 = "undo redo | formatselect | fontsizeselect | bold italic underline forecolor backcolor | \
                                    alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link |\
                                    code | fullscreen | mymedia | paste pastetext"
                        
                        skinUrl=`${url.origin}/modules/tinymce/skins/ui/custom`
                        
                    }else{
                    
                        pluginList = ["autoresize"]
                        skinUrl=`${url.origin}/modules/tinymce/skins/ui/simple`
                    }

                    let tinyParams = {
                        selector:editorId,
                        skin_url:skinUrl,
                        plugins:pluginList,
                        toolbar1:toolbar1,
                        menubar:false,
                        statusbar:false,
                        height:height ? height : minHeight ? minHeight : 100,
                        autoresize_bottom_margin: bottomMargin ? bottomMargin : 50,
                        min_height: height ? height : minHeight ? minHeight : 600,
                        max_height:maxHeight ? maxHeight : 2000,
                        setup:(tinyEditor)=>{
                            
                            $(editorId).addClass("isTinymce")

                            editor = tinyEditor

                            setEd(tinyEditor)

                            tinyEditor.on('keydown', function (e, evt) {
                                if (e.keyCode == 9) e.preventDefault();
                                else if(e.keyCode == 13){
                                    if(props.onPressEnter) props.onPressEnter(e)
                                }
                            })

                            tinyEditor.on("keyup change",()=>{
                                const content = tinyEditor.getContent()
                                onChange(content)
                            })
                        }
                    }

                
                    import('tinymce/tinymce')
                        .then(async(obj)=>{

                            tinymce = obj.default
                            
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

                            }else{
                                plugins = [
                                    import("tinymce/plugins/autoresize")
                                ]
                            }
            
                            await Promise.all(plugins)

                            tinymce.init(tinyParams)
                            
                        })
                    
                    
                },10)
            }
                
            
        
        return ()=>{

            // if(tinymce) {
                
            //     console.log(editor)
            //     //tinymce.remove(editor)
            //     console.log(editorId + " is removed")

                
            
            // }

            tinymce.remove(editor)
            if(onRemove) onRemove()
            

            return ()=>isMounted.current = false
            
        }

    },[])

    let interval,counter=0

    React.useEffect(()=>{

        // console.log(ed)

        isMounted.current = true

        if(isMounted.current){
            interval = setTimeout(function run(){
                    
                // console.log(editor)
                // console.log(content)
                if(content && content.trim() !== ""){
                    if(counter<10){

                        if(ed && content){
                            // console.log("DONE")
                            ed.setContent(content)
                            clearTimeout(interval)
                        }else{
                            setTimeout(run,1000)
                        }
                        counter++ 
                    }
                }
            
                
            },1000)
        }
    
        return ()=>{
            clearTimeout(interval)
            return ()=>isMounted.current = false
        }
    },[ed,content])




    return <>
    
        <textarea 
            id={id}
            className={className}
            style={{visibility:"hidden"}}
            placeholder={placeholder}
            />
    </>
        
}

export default React.memo(props=><TinyMce {...props}/>) 
// export default TinyMce