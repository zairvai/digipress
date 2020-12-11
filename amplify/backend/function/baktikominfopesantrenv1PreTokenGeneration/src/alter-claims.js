var lib = require("./lib")

exports.handler = async (event, context, callback) => {
  
  console.log(event)
  
  const {clientMetadata} = event.request
  const accountId = clientMetadata ? clientMetadata.accountId : false
  const userId = event.request.userAttributes.sub
  
  let access={}

  try{
    
    access = await lib.getUserAccountAccess(userId,accountId)
    
  }catch(error){

    console.log("file alter-claims")
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
