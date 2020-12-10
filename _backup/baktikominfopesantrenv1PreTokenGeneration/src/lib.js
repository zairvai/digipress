var es = require("./es")

exports.getUserAccountAccess  = async (userId,accountId) => {
    
    const path = "/access/_search"
    
    const body = {
      "_source":{"includes":["id","userId","accountId","role","status"]},
      "query":{
        "bool": {
          "must": [
            {
              "match": {
                "userId": userId
              }
            },
            {
              "match": {
                "accountId": accountId
              }
            }
          ]
        }
      }
    }
    
    try{
      
      const result = await es.get(path,body)
      const access = result.hits.hits[0]["_source"]
      
      return access
      
    }catch(error){
      console.log("error file lib")
      console.log(error)
    }
    
    return false
    
}