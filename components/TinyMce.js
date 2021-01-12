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
                    let quickBarImage=false,formats=false

                    if(mode=="full"){
                    
                        pluginList = ["advlist lists fullscreen autolink link code autoresize mymedia paste image imagetools"]
                        toolbar1 = "undo redo | formatselect | fontsizeselect | bold italic underline forecolor backcolor | \
                                    alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link |\
                                    code | fullscreen | paste pastetext"
                        
                        skinUrl=`${url.origin}/modules/tinymce/skins/ui/custom`                    

                        formats ={
                            alignleft : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'content-align-left',exact:true},
                            aligncenter : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'content-align-center',exact:true},
                            alignright : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes : 'content-align-right',exact:true}
                        }

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
                        formats:formats,
                        //quickbars_image_toolbar: quickBarImage,
                        quickbars_selection_toolbar: false,
                        quickbars_insert_toolbar:false,
                        height:height ? height : minHeight ? minHeight : 100,
                        autoresize_bottom_margin: bottomMargin ? bottomMargin : 50,
                        min_height: height ? height : minHeight ? minHeight : 600,
                        max_height:maxHeight ? maxHeight : 2000,
                        contextmenu:false,
                        setup:(tinyEditor)=>{
                            
                            $(editorId).addClass("isTinymce")

                            editor = tinyEditor

                            setEd(tinyEditor)

                            tinymce.execCommand('mceFocus',false,editorId);

                            tinyEditor.on('focusout blur',function(e,evt){
                                if(props.onFocusOut) props.onFocusOut()
                            })

                            tinyEditor.on('keydown', function (e, evt) {
                                
                                if (e.keyCode == 9) e.preventDefault();

                                else if(e.keyCode == 13){
                                    
                                    //if this function handler, prevent new line on enter.
                                    //shift + enter instead.
                                    if(props.onPressEnter){

                                        if(e.shiftKey){
                                            tinyEditor.execCommand('mceInsertContent', false, "");
                                            e.stopPropagation()
                                        }
                                        else{
                                            e.preventDefault()
                                            props.onPressEnter(tinyEditor)
                                        }
                                    }
                                }
                            })

                            tinyEditor.on("keyup change",function(e,evt){
                                onChange(editor)
                            })

                            tinyEditor.on("init",function(e,evt){
                                if(props.onFinishSetup) props.onFinishSetup(tinyEditor)
                            })

                            tinyEditor.on("detach remove",function(){
                                if(props.onRemove) props.onRemove(tinyEditor)
                            })

                            //custom context
                            setupContextToolbar(editor)
                            
                        }
                    }

                
                    import('tinymce/tinymce')
                        .then(async(obj)=>{

                            tinymce = obj.default
                            
                            if(mode=="full"){
                                plugins = [
                                    import("Plugins/tinymce/mymedia"),
                                    import("tinymce/plugins/quickbars"),
                                    import("tinymce/plugins/image"),
                                    import("tinymce/plugins/imagetools"),
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

            isMounted.current = false
            if(tinymce) tinymce.remove(editor)

            
        }

    },[])

    React.useEffect(()=>{
        if(ed){
            if(props.isSubmitting){
                ed.mode.set('readonly')
            }
            else{
                //finish submission
                //ed.setContent("")
                ed.mode.set('design')
            }
        }
       
        return ()=>{
            if(ed) ed.setContent("")
        }
    },[ed,props.isSubmitting])

    const setupContextToolbar = editor =>{

        editor.ui.registry.addContextToolbar('imagealignment', {
            predicate: function (node) {
              return node.nodeName.toLowerCase() === 'img'
            },
            items: 'alignleft aligncenter alignright',
            position: 'node',
            scope: 'node'
          });
    }

    return <>
    
        <textarea 
            id={id}
            className={className}
            style={{visibility:"hidden"}}
            placeholder={placeholder}
            />
    </>
        
}

//export default React.memo(props=><TinyMce {...props}/>) 
export default TinyMce