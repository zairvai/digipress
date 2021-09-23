var lib = require("./lib")

exports.handler = async (event, context, callback) => {
  
  let userId
  const {clientMetadata} = event.request
  const accountId = clientMetadata ? clientMetadata.accountId : false

  //console.log(event.request.userAttributes)

  if(event.request.userAttributes.preferred_username) userId = event.request.userAttributes.preferred_username
  else userId = event.request.userAttributes.sub
  
  let access={}

  try{
    
    access = await lib.getUserAccountAccess(userId,accountId)
    
  }catch(error){
    console.log(error)
  }
  
  
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        "access" : JSON.stringify(access)
      },
      // claimsToSuppress: ['email'],
    },
  };
  
  // Return to Amazon Cognito
  callback(null, event);
};