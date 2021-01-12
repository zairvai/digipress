
(function(){

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  function Plugin(){
  
    global.add("mymedia",function(editor){
      
      const event = new CustomEvent("openTinymceMedia",{
        detail:{
          editor
        }})

      editor.ui.registry.addButton("mymedia",{
        text:"Add Media",
        tooltip:"add shit",
        onAction:function(){
          document.dispatchEvent(event)
        }
      })

      return editor

    })
  }


  Plugin();

}())
  