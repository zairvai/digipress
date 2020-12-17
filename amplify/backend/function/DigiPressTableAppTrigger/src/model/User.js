const functions = require("../functions")

function searchManagerPut(record){
    
    var id = record.dynamodb.Keys.id.S
    var newImage = record.dynamodb.NewImage

    var roles = []
    newImage.roles.L.forEach(item=>{
      
      var roleItem = item.M
      
      roles.push({
        "accountId":roleItem.accountId.S,
        "role":roleItem.role.S,
        "status":roleItem.status.N,
        "createdBy":roleItem.createdBy.S,
        "updatedBy":roleItem.updatedBy.S,
        "createdAt":roleItem.createdAt.S,
        "updatedAt":roleItem.updatedAt.S,
        "createdBy":newImage.createdBy.S,
        "updatedBy":newImage.updatedBy.S
      })
    })

    var body = {
      "id":id,
      "name":newImage.name.S,
      "emailAddress":newImage.emailAddress.S,
      "emailAddressVerified":newImage.emailAddressVerified.BOOL,
      "phoneNumber":newImage.phoneNumber.S,
      "phoneNumberVerified":newImage.phoneNumberVerified.BOOL,
      "roles":roles,
      "status":newImage.status.S,
      "__typename":newImage.__typename.S,
      "createdAt":newImage.createdAt.S,
      "updatedAt":newImage.updatedAt.S
    }

    return functions.invokeLambdaSearchManager("put",`/user/_doc/${id}`,body)

}

function searchManagerDelete(record){
  
    var id = record.dynamodb.Keys.id.S

    return functions.invokeLambdaSearchManager("delete",`/user/_doc/${id}`)
  
}

function cognitoUpdate(record){

    var id = record.dynamodb.Keys.id.S
    var newImage = record.dynamodb.NewImage
    var oldImage = record.dynamodb.OldImage
    
    var cognitoUpdateAttr = {}
    var cognitoEnabledDisabled = {}

    var promises = []

    if(newImage.name.S != oldImage.name.S) cognitoUpdateAttr["name"] = newImage.name.S
    if(newImage.phoneNumber.S != oldImage.phoneNumber.S) cognitoUpdateAttr["phoneNumber"] = newImage.phoneNumber.S

    if(newImage.status.S != oldImage.status.S) cognitoEnabledDisabled["status"] = newImage.status.S

    if(Object.keys(cognitoUpdateAttr).length>0) {
      cognitoUpdateAttr["id"] = id
      cognitoUpdateAttr["emailAddress"] = newImage.emailAddress.S

      //update cognito attribute
      promises.push(functions.invokeLambdaIdentityManager("updateUser",cognitoUpdateAttr))
    }

    if(Object.keys(cognitoEnabledDisabled).length>0) {
      cognitoEnabledDisabled["id"] = id
      cognitoEnabledDisabled["emailAddress"] = newImage.emailAddress.S
      
      //update cognito enabled/disabled
      if(newImage.status.S == "Active") promises.push(functions.invokeLambdaIdentityManager("enableUser",cognitoEnabledDisabled))
      else if(newImage.status.S == "Inactive") promises.push(functions.invokeLambdaIdentityManager("disableUser",cognitoEnabledDisabled))
    }

    return Promise.all(promises)
    
}

function cognitoDelete(record){

    var id = record.dynamodb.Keys.id.S
    var oldImage = record.dynamodb.OldImage

    var cognitoDelete = {
      "id":id,
      "emailAddress":oldImage.emailAddress.S
    }

    return functions.invokeLambdaIdentityManager("deleteUser",cognitoDelete)
  
}

function insert(record){
  
  return searchManagerPut(record)
  
}

function update(record){

  return Promise.all([
    searchManagerPut(record),
    cognitoUpdate(record)
  ])

}

function remove(record){

  return Promise.all([
    searchManagerDelete(record),
    cognitoDelete(record)
  ])
}

exports.search = {
  put:searchManagerPut,
  delete:searchManagerDelete
}

exports.cognito={
  update:cognitoUpdate,
  delete:cognitoDelete
}

exports.insert = insert
exports.update = update
exports.remove = remove
