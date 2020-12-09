var AWS = require("aws-sdk")
var ddb = new AWS.DynamoDB({apiVersion: '2018-05-29'});

exports.handler = async (event, context, callback) => {
  
  const tableName = process.env.TABLE_APP
  const region = process.env.REGION
  
  AWS.config.update({region})

  if(event.request.userAttributes.sub){

    var now = new Date();

    var params = {
      Item:{
        'id':{S: event.request.userAttributes.sub},
        'name':{S: typeof event.request.userAttributes.name != "undefined" ? event.request.userAttributes.name : event.request.userAttributes.email },
        'emailAddress':{S:event.request.userAttributes.email},
        'phoneNumber':{S:event.request.userAttributes.phone_number},
        'phoneNumberVerified':{BOOL:event.request.userAttributes.phone_number_verified},
        'emailAddressVerified':{BOOL:event.request.userAttributes.email_verified},
        '__typename':{S:"User"},
        'status':{N:"1"},
        'version':{N:"1"},
        'createdAt':{S: now.toISOString()},
        'updatedAt':{S: now.toISOString()}
      },
      TableName:tableName
    }
    
    // Call DynamoDB
    try {
        await ddb.putItem(params).promise()
        callback(null,event)
    } catch (err) {
        console.log("Error", err);
        callback(err)
    }
  }
 else {
    //   context.done(null, event);
    callback(null,event)
  }
  
};
