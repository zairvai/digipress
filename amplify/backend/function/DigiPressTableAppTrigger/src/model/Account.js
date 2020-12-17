const functions = require("../functions")

function searchManagerPut(record){
      
      var id = record.dynamodb.Keys.id.S
      var newImage = record.dynamodb.NewImage
  
      var body = {
        "id":id,
        "name":newImage.name.S,
        "uniqueURL":newImage.uniqueURL.S,
        "contactPerson":newImage.contactPerson.S,
        "emailAddress":newImage.emailAddress.S,
        "address":newImage.address.S,
        "phoneNumber":newImage.phoneNumber.S,
        "status":newImage.status.N,
        "__typename":newImage.__typename.S,
        "createdBy":newImage.createdBy.S,
        "updatedBy":newImage.updatedBy.S,
        "createdAt":newImage.createdAt.S,
        "updatedAt":newImage.updatedAt.S
      }

      return functions.invokeLambdaSearchManager("put",`/account/_doc/${id}`,body)

  
  }
  
function searchManagerDelete(record){
    var id = record.dynamodb.Keys.id.S

    return functions.invokeLambdaSearchManager("delete",`/account/_doc/${id}`)

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