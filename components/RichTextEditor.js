import React from 'react'

class RichTextEditor extends React.Component{


    state = {
        ReactQuill:null,
        reactQuillText: ""
    }

    async componentDidMount(){
        this. modules = {
            toolbar: [
                [{ 'header': [1, 2, 3, 4,5, false] }],
                ["bold", "underline" ,"italic", "strike"],
                ["link", "blockquote", "code", "image"],
                [{ 'color': [] }, { 'background': [] }], 
                [{list: "ordered"},{list: "bullet"}],
                [{ align: "" },{align:"center"},{align:"right"},{align:"justify"}]
            ]
        };

        const ReactQuillComponent = await import('react-quill')//dynamic (()=>import('react-quill'),{ssr:true}) 
        this.setState({ReactQuill:ReactQuillComponent.default})
    }

    handleReactQuillChange = value => {
        this.setState({
          reactQuillText: value
        });

        console.log(this.state.reactQuillText)
    };


    render(){

        const {ReactQuill} = this.state

        return <>
            {
                ReactQuill && 
                    <ReactQuill
                        style = {this.props.style}
                        className={this.props.className}
                        value={this.props.value ? this.props.value : this.reactQuillText}
                        onChange={this.handleReactQuillChange}
                        theme="snow"
                        modules={this.modules}
                    />
            }
        </>
    }


}

export default RichTextEditor