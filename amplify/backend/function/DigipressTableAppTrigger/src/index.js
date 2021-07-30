/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_DIGIPRESSIDENTITYMANAGER_NAME
	FUNCTION_DIGIPRESSSEARCHMANAGER_NAME
	FUNCTION_DIGIPRESSSTORAGEMANAGER_NAME
	REGION
Amplify Params - DO NOT EDIT */exports.handler = event => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  return Promise.resolve('Successfully processed DynamoDB record');
};
