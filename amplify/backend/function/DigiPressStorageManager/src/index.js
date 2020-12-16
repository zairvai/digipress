/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_BAKTIKOMINFOPESANTRENV1_BUCKETNAME
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk")
const s3 = new AWS.S3()

exports.handler = async(event,context,callback) => {
    
    let field;
        
    if(Array.isArray(event)) field = event[0].field
    else field = event.field
    
    switch(field){
        
        case 'put'      :   
            
            var params = {
                Body:event.arguments.content,
                Bucket:process.env.STORAGE_BAKTIKOMINFOPESANTRENV1_BUCKETNAME,
                Key: event.arguments.key
            }
            
            return s3.putObject(params).promise()

        case 'get'      :

            var params = {
                Bucket:process.env.STORAGE_BAKTIKOMINFOPESANTRENV1_BUCKETNAME,
                Key: event.arguments.key
            }
            
            return new Promise((resolve,reject)=>{
                s3.getObject(params).promise()
                    .then(data=>resolve(data.Body.toString("utf8")))
                    .catch(error=>reject(error))
            })

        case 'delete'   :   
            
            var params = {
                Bucket:process.env.STORAGE_BAKTIKOMINFOPESANTRENV1_BUCKETNAME,
                Key: event.arguments.key
            }

            console.log(params)
            
            return s3.deleteObject(params).promise()
    }
    
    
};
