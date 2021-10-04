import React from 'react'
import $ from 'jquery'
import _ from 'lodash'


// Content styles, including inline UI like fake cursors
  /* eslint import/no-webpack-loader-syntax: off */
import contentCss from '!!raw-loader!tinymce/skins/content/default/content.min.css';
import contentUiCss from '!!raw-loader!tinymce/skins/ui/oxide/content.min.css';


const TinyMce = ({id,className="",mode="full",
    height,maxHeight,minHeight,bottomMargin,content,placeholder,onChange,onRemove,...props}) =>{

    const tinymceRef = React.useRef(null)
    const editorRef = React.useRef(null)

    const[tinymce,setTinymce] = React.useState()
    const[editor,setEditor] = React.useState()
    //const[params,setParams] = React.useState()

    const isMounted = React.useRef(true)

    const getParams = () =>{

        const selector= `#${id}` + (className!=="" ? `.${className}` : "")
        const editorId = selector

        const url = window.location

        let pluginList = [],toolbar1 = "",skinUrl = ""
        let quickBarImage=false,formats=false

        if(mode=="full"){
        
            pluginList = ["advlist lists fullscreen autolink link code autoresize mymedia paste image imagetools"]
            toolbar1 = "undo redo | formatselect | fontsizeselect | bold italic underline forecolor backcolor | \
                        alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist | link |\
                        code | fullscreen | paste pastetext | mymedia"
            
            skinUrl=`${url.origin}/modules/tinymce/skins/ui/custom`                    

            formats ={
                alignleft : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,iframe', classes : 'content-align-left',exact:true},
                aligncenter : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,iframe', classes : 'content-align-center',exact:true},
                alignright : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,iframe', classes : 'content-align-right',exact:true},
                alignjustify : {selector : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img,iframe', classes : 'content-align-justify',exact:true}
            }

        }else{
        
            pluginList = ["autoresize"]
            skinUrl=`${url.origin}/modules/tinymce/skins/ui/simple`
        }

        const tinyParams = {
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
        
                setEditor(tinyEditor)
        
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
                    onChange(tinyEditor)
                })
        
                tinyEditor.on("init",function(e,evt){
                    // console.log(editor)
                    if(props.onFinishSetup) props.onFinishSetup(tinyEditor)
                })
        
                tinyEditor.on("detach remove",function(){
                    if(props.onRemove) props.onRemove(tinyEditor)
                })
        
                //custom context
                setupContextToolbar(tinyEditor)
                
            }
        }

        return tinyParams

    }

    React.useEffect(()=>{
        
        let plugins=[]

        if(isMounted.current){

            setTimeout(()=>{

                import('tinymce/tinymce')
                    .then(async(obj)=>{

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

                        setTinymce(obj.default)
                        
                    })
                
                
            },1000)
        }
                
        return ()=>{

            isMounted.current = false
            if(tinymce) tinymce.remove(editor)

        }

    },[])

    React.useEffect(()=>{
        if(tinymce) tinymce.init(getParams())
    },[tinymce])

    React.useEffect(()=>{
        if(editor){
            if(props.isSubmitting){
                editor.mode.set('readonly')
            }
            else{
                //finish submission
                editor.mode.set('design')
            }
        }
       
        return ()=>{
            if(editor) editor.setContent("")
        }
    },[editor,props.isSubmitting])

    const setupContextToolbar = editor =>{

        editor.ui.registry.addContextToolbar('imagealignment', {
            predicate: function (node) {
                return node.nodeName.toLowerCase() === 'img'
            },
            items: 'alignleft aligncenter alignright | imageoptions',
            position: 'node',
            scope: 'node'
          });

        editor.ui.registry.addContextToolbar('textselection',{
            predicate:function(node){
                return !editor.selection.isCollapsed() && node.nodeName.toLowerCase() !== 'img'
            },
            items: 'alignleft aligncenter alignright',
            position: 'selection',
            scope: 'node'
        })

        // editor.ui.registry.addContextToolbar('iframealignment', {
        //     predicate: function (node) {
        //         console.log(node)
        //         return node.nodeName.toLowerCase() === 'iframe'
        //     },
        //     items: 'alignleft aligncenter alignright | imageoptions',
        //     position: 'node',
        //     scope: 'node'
        // });

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