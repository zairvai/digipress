'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3({
  signatureVersion: 'v4',
});
const Sharp = require('sharp');

const BUCKET = process.env.BUCKET;
const URL = process.env.URL;
const ALLOWED_DIMENSIONS = new Set();

if (process.env.ALLOWED_DIMENSIONS) {
  const dimensions = process.env.ALLOWED_DIMENSIONS.split(/\s*,\s*/);
  dimensions.forEach((dimension) => ALLOWED_DIMENSIONS.add(dimension));
}

exports.handler = function(event, context, callback) {
  
  const key = event.queryStringParameters.key;
  
  const regExp = new RegExp(/((\d+|auto)x(\d+|auto))\/(.*)/)
  
  if(!regExp.test(key)) {
      callback(null, {
        statusCode: '404',
        headers: {},
        body: '',
      });
      return
  }
  
  const match = key.match(regExp);
  
  const dimensions = match[1];
  
  let width,height
  
  if(match[2]=="auto") width=null
  else width = parseInt(match[2], 10)
  
  if(match[3]=="auto") height=null
  else height = parseInt(match[3], 10)
  
  const originalKey = match[4];

  if(width==null && height==null){
    callback(null, {
        statusCode: '404',
        headers: {},
        body: '',
      });
      return
  }

  if(ALLOWED_DIMENSIONS.size > 0 && !ALLOWED_DIMENSIONS.has(dimensions)) {
     callback(null, {
      statusCode: '403',
      headers: {},
      body: '',
    });
    return;
  }
  
  

  S3.getObject({Bucket: BUCKET, Key: originalKey}).promise()
    .then(data => Sharp(data.Body)
      .resize(width,height)
      .toFormat('png')
      .toBuffer()
      ,error=>{
        //handle error
        throw error
      }
    )
    .then(buffer => S3.putObject({
        ACL:"public-read",
        Body: buffer,
        Bucket: BUCKET,
        ContentType: 'image/png',
        Key: key,
      }).promise()
    )
    .then(() => callback(null, {
        statusCode: '307',
        headers: {'location': `${URL}/${key}`},
        body: '',
      })
    )
    .catch(error => {
      console.log(error)
      callback(null, {
        statusCode: '404',
        headers: {},
        body: '',
      });
    })
}