var AWS = require("aws-sdk")
var ddb = new AWS.DynamoDB({apiVersion: '2018-05-29'});

const tableName = process.env.TABLE_APP
const region = process.env.REGION

AWS.config.update({region})