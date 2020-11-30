// // A custom React Hook for using CKEditor with SSR 
// // particularly with NextJS.
// // https://ckeditor.com | https://nextjs.org

// import React, { useRef, useState, useEffect } from 'react'

// const useCKEditor = () => {
//   const editorRef = useRef()
//   const [isEditorLoaded, setIsEditorLoaded] = useState(false)
//   const { CKEditor, InlineEditor, ClassicEditor } = editorRef.current || {}

//   useEffect(() => {
//     editorRef.current = {
//       CKEditor: require('@ckeditor/ckeditor5-react'),
//       InlineEditor: require('@ckeditor/ckeditor5-build-inline'),
//       ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
//     }
//     setIsEditorLoaded(true)
//   }, [])

//   return Object.freeze({
//     isEditorLoaded,
//     CKEditor,
//     InlineEditor
//   })
// }

// export {useCKEditor}