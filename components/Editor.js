import React from 'react'
import dynamic from 'next/dynamic'
// import TinyMce from 'Components/TinyMce'

const Editor = props => {

    const [TextEditor,setTextEditor] = React.useState(null)
    const [content,setContent] = React.useState("")
    
    // let TinyMceComponent = null

    // if(typeof navigator !== "undefined") {
    //     console.log("huwa")
    //     TinyMceComponent = dynamic (()=>import('Components/TinyMce'),{ssr:false,loading:()=><p>....loading</p>}) 
    // }

    // console.log(navigator)

    // React.useEffect(async()=>{
        
    //     try{
            
            
                
                
    //             setTextEditor(TinyMceComponent)
    //         }
        
    //     }catch(error){

    //     }

    // },[])

    return <>
        {
            TinyMceComponent && 
                <TinyMceComponent
                    id={props.id}
                    onChange={props.onChange}
                    content={props.value ? props.value : content}
                />
        }
    </>

}

export default Editor

