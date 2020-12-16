
(function(){

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  function Plugin(){
  
    global.add("mymedia",function(editor){
      
      console.log(editor)
      console.log("shit")

      editor.ui.registry.addButton("mymedia",{
        text:"Add Media",
        tooltip:"add shit",
        onAction:function(){
          alert(1)
        }
      })

      return editor

    })
  }


  Plugin();

}())
  