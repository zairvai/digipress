const functions = require("../functions")

function searchManagerPut(record){
      
      var id = record.dynamodb.Keys.id.S
      var newImage = record.dynamodb.NewImage
  
      var body = {
        "id":id,
        "accountId":newImage.accountId.S,
        "postId":newImage.postId.S,
        "qnaType":newImage.qnaType.S,
        "status":newImage.status.N,
        "__typename":newImage.__typename.S,
        "createdBy":newImage.createdBy.S,
        "updatedBy":newImage.updatedBy.S,
        "createdAt":newImage.createdAt.S,
        "updatedAt":newImage.updatedAt.S
      }

      if(newImage.lessonId) body["lessonId"] = newImage.lessonId.S
      if(newImage.replyToId) body["replyToId"] = newImage.replyToId.S
      if(newImage.replyToUserId) body["replyToUserId"] = newImage.replyToUserId.S

      return functions.invokeLambdaSearchManager("put",`/records/_doc/${id}`,body)
  
  }
  
function searchManagerDelete(record){
    var id = record.dynamodb.Keys.id.S
    
    return functions.invokeLambdaSearchManager("delete",`/records/_doc/${id}`)

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