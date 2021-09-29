import React from 'react'
import $ from 'jquery'
import _ from 'lodash'

const TinyMce = ({id,className="",mode="full",
    height,maxHeight,minHeight,bottomMargin,content,placeholder,onChange,onRemove,...props}) =>{

    const tinymce = React.useRef()
    const editor = React.useRef()

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

                            editor.current = tinyEditor

                            setEd(tinyEditor)

                            tinymce.current.execCommand('mceFocus',false,editorId);

                            tinyEditor.on('focusout blur',function(e,evt){
                                if(props.onFocusOut) props.onFocusOut()
                            })

                            tinyEditor.on('keydown', function (e, evt) {
                                if (e.keyCode == 9) e.preventDefault();
                                else if(e.keyCode == 13){

                                    if(e.shiftKey){
                                        //tinyEditor.setContent(tinyEditor.getContent()+"<p></p>")
                                        tinyEditor.execCommand('mceInsertContent', false, "");
                                        e.stopPropagation()
                                    }
                                    else{
                                        e.preventDefault()
                                        if(props.onPressEnter) props.onPressEnter(tinyEditor)
                                    }
                                }
                            })

                            tinyEditor.on("keyup change",()=>{
                                //const content = tinyEditor.getContent()
                                onChange(editor.current)
                            })

                            if(props.onFinishSetup) props.onFinishSetup(tinyEditor)
                        }
                    }

                
                    import('tinymce/tinymce')
                        .then(async(obj)=>{

                            tinymce.current = obj.default
                            
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

                            tinymce.current.init(tinyParams)
                            
                        })
                    
                    
                },10)
            }
                
            
        
        return ()=>{

            // if(tinymce) {
                
            //     console.log(editor)
            //     //tinymce.remove(editor)
            //     console.log(editorId + " is removed")

                
            
            // }

            tinymce.current.remove(editor)
            if(onRemove) onRemove()
            

            return ()=>isMounted.current = false
            
        }

    },[])

    React.useEffect(()=>{
        if(ed){
            if(props.isSubmitting){
                ed.mode.set('readonly')
            }
            else{
                //initial or finish submission
                ed.setContent("")
                ed.mode.set('design')
            }
        }
        // console.log(editor.getContent({format:'text'}))
        // 
    },[ed,props.isSubmitting])

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