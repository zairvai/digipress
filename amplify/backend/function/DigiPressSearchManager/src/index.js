/* Amplify Params - DO NOT EDIT
    ELASTICSEARCH_ENDPOINT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

var es = require("./es")

exports.handler = function (event, context,callback) { //eslint-disable-line
  
  var field;
  var path = event.arguments.path;
  var body = event.arguments.body

  if(Array.isArray(event)) field = event[0].field
  else field = event.field

  switch(field){

      case "put":
            es.put(path,body).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
            break

      case 'get':
            es.get(path,body).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
            break
      
      case "delete":
            es.remove(path).then(data=>context.done(null, data)).catch(error=>context.done("Error",error))
            break
      
      default: 
            context.done(null,"Unknown action, unable to resolve " + field)
            break
  }
  
};
