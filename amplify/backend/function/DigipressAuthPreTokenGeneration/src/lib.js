var es = require("./es")

exports.getUserAccountAccess  = async (userId,accountId) => {
    
    const path = "/records/_search"
    
    const body = {
      "_source":{"includes":["id","roles"]},
      "query":{
        "bool": {
            "must": [
              {
                "match": {
                  "__typename": "User"
                }
              },
              {
                "nested": {
                  "path": "roles",
                  "query": {
                    "bool": {
                      "must": [
                        {"match": {
                          "roles.accountId": accountId
                        }}
                      ]
                    }
                  }
                }
              },
              {
                "match": {
                  "id.keyword": userId
                }
              }
            ]
        }
      }
    }
    
    let access={}
    
    try{
      
      const result = await es.get(path,body)
      
      if(result.hits.total.value<=0) return false  
      
      const roles = result.hits.hits[0]["_source"].roles
      
      let i = 0
      let found = false
      
      for(i=0;i<roles.length;i++){
        if(roles[i].accountId==accountId) {
          found = true
          break
        }
      }
      
      if(found) access = roles[i]
      
      return access
      
    }catch(error){
      console.log("error file lib")
      console.log(error)
    }
    
    return false
    
}