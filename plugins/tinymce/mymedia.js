
(function(){

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  function Plugin(){
  
    global.add("mymedia",function(editor){
      
      const event = new CustomEvent("openTinymceMedia",{
        detail:{
          editor
        }})

      editor.ui.registry.addButton("mymedia",{
        icon:"image",
        text:"Media",
        tooltip:"Add Media",
        onAction:function(){
          document.dispatchEvent(event)
        }
      })

      return editor

    })
  }


  Plugin();

}())
  