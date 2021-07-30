/* Amplify Params - DO NOT EDIT
	AUTH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var AWS = require("aws-sdk")

exports.handler = (event,context,callback)=>{
  
  const cisp = new AWS.CognitoIdentityServiceProvider()

  const userPoolId = process.env.AUTH_USERPOOLID
  
  var field;
    
  if(Array.isArray(event)) field = event[0].field
  else field = event.field
  
  switch(field){

    case "createUser":

      var {phoneNumber,emailAddress,password,name} = event.arguments

      var params = {
          "DesiredDeliveryMediums":["EMAIL"],
          "TemporaryPassword":password,
          "ForceAliasCreation":true,
          "UserAttributes":[
              {
                  "Name":"phone_number",
                  "Value":phoneNumber
              },
              {
                  "Name":"email",
                  "Value":emailAddress
              },
              {
                  "Name":"name",
                  "Value":name
              }
          ],
          "Username":emailAddress,
          "UserPoolId":userPoolId
      }
      
      cisp.adminCreateUser(params,(error,data)=>{
        
          if(error) callback(error,null)
          else{
              callback(null,{
                  id:data.User.Attributes[0].Value,
                  name:data.User.Attributes[1].Value,
                  phoneNumber:data.User.Attributes[2].Value,
                  emailAddress:data.User.Attributes[3].Value,
                  createdAt:data.User.UserCreateDate,
                  updatedAt:data.User.UserLastModifiedDate,
                  enabled:data.User.Enabled
                })
          }
      
      })

      break
      
  case "updateUser":
      
      var {id,emailAddress,phoneNumber,name} = event.arguments
      
      var userAttributes = []

      if(phoneNumber){
          userAttributes.push({
              "Name":"phone_number",
              "Value":phoneNumber
          })
      }

      if(name){
        userAttributes.push({
            "Name":"name",
            "Value":name
          })
      }

      if(emailAddress){
        userAttributes.push({
          "Name":"email",
          "Value":emailAddress
        })
      }
      
      var params = {
          "UserAttributes":userAttributes,
          "Username":id,
          "UserPoolId":userPoolId
      }
      
      cisp.adminUpdateUserAttributes(params,(error,data)=>{
      
          if(error) callback(error,null)
          else{
              callback(null,{id:id})
          }
      
      })
      
      break
      
  case "deleteUser":
      
      var {id,emailAddress} = event.arguments
      
      var params = {
          "Username":emailAddress,
          "UserPoolId":userPoolId
      }
      
      cisp.adminDeleteUser(params,(error,data)=>{
      
          if(error) callback(error,null)
          else{
              callback(null,{id:id})
          }
      
      })
      
      break   
      
      case "enableUser":
          
          var {id} = event.arguments
          
          var params = {
              "Username":id,
              "UserPoolId":userPoolId
          }
          
          cisp.adminEnableUser(params,(error,data)=>{
          
              if(error) callback(error,null)
              else{
                  callback(null,{id:id})
              }
          
          })
          
          break
      
      case "disableUser":
          
          var {id} = event.arguments
          
          var params = {
              "Username":id,
              "UserPoolId":userPoolId
          }
          
          cisp.adminDisableUser(params,(error,data)=>{
          
              if(error) callback(error,null)
              else{
                  callback(null,{id:id})
              }
          
          })
          
          break

      case "setPassword":

          var {id,permanent,password} = event.arguments

          var params = {
              "Username":id,
              "UserPoolId":userPoolId,
              "Permanent":permanent,
              "Password":password
          }


          cisp.adminSetUserPassword(params,(error,data)=>{

            if(error) callback(error,null)
            else{
                callback(null,{id:id})
            }

          })

          break

      case "getUser":

          var {emailAddress} = event.arguments

          var params = {
            "Username":emailAddress,
            "UserPoolId":userPoolId
          }

          cisp.adminGetUser(params,(error,data)=>{
            
            if(error) {
              if(error.code=="UserNotFoundException") callback(null,null)
              else callback(error,null)
            }
            else{
                callback(null,data)
            }
          })

          break

      default : 
          callback("Unknown action, unable to resolve " + field, null)
          break
    }
  
}
