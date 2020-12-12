const functions = require("../functions")

function searchManagerPut(record){
      
      var id = record.dynamodb.Keys.id.S
      var newImage = record.dynamodb.NewImage
  
      var body = {
        "id":id,
        "accountId":newImage.accountId.S,
        "name":newImage.name.S,
        "status":newImage.status.N,
        "__typename":newImage.__typename.S,
        "version":newImage.version ? newImage.version.N : 1
      }
  
  
      if(newImage.createdAt) body["createdAt"] = newImage.createdAt.S
      if(newImage.updatedAt) body["updatedAt"] = newImage.updatedAt.S

      return functions.invokeLambdaSearchManager("put",`/tag/_doc/${id}`,body)

  
  }
  
function searchManagerDelete(record){
    var id = record.dynamodb.Keys.id.S

    return functions.invokeLambdaSearchManager("delete",`/tag/_doc/${id}`)

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


exports.insert = insert
exports.update = update
exports.remove = remove