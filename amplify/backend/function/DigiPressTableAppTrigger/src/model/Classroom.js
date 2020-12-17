const functions = require("../functions")

function searchManagerPut(record){
      
      var id = record.dynamodb.Keys.id.S
      var newImage = record.dynamodb.NewImage
  
      var body = {
        "id":id,
        "accountId":newImage.accountId.S,
        "title":newImage.title.S,
        "categoryId":newImage.categoryId.S,
        "allowComment":newImage.allowComment.BOOL,
        "access":newImage.access.S,
        "status":newImage.status.N,
        "__typename":newImage.__typename.S,
        "version":newImage.version ? newImage.version.N : 1,
        "createdBy":newImage.createdBy.S,
        "updatedBy":newImage.updatedBy.S,
        "createdAt":newImage.createdAt.S,
        "updatedAt":newImage.updatedAt.S
      }
  
      if(newImage.tags){
          let tags = []
          newImage.tags.L.forEach(item=>{
              tags.push(item.S)
          })
          body["tags"] = tags
      }
   
      return functions.invokeLambdaSearchManager("put",`/classroom/_doc/${id}`,body)

  
  }
  
  
  function searchManagerDelete(record){
    var id = record.dynamodb.Keys.id.S
    
    return functions.invokeLambdaSearchManager("delete",`/classroom/_doc/${id}`)

}

function storageManagerDelete(record){
    var id = record.dynamodb.Keys.id.S
    var image = record.dynamodb.OldImage
    var storageBody = {key:`public/${image.accountId.S}/classrooms/${id}.txt`}
    
    return  functions.invokeLambdaStorageManager("delete", storageBody)
}

function insert(record){
    return searchManagerPut(record)
}

function update(record){
    return searchManagerPut(record)
}

function remove(record){
    return searchManagerDelete(record)
}

// function remove(record){
    
//     return new Promise(async(resolve,reject)=>{
//         try{
//             await searchManagerDelete(record)
//             await storageManagerDelete(record)
//             resolve(true)
//         }
//         catch(error){
//             reject(error)
//         }
        
//     })
// }

exports.insert = insert
exports.update = update
exports.remove = remove