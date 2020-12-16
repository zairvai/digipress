const AWS = require("aws-sdk")

exports.invokeLambdaIdentityManager = function(field,body){

    const lambda = new AWS.Lambda({
        region:process.env.REGION,
        apiVersion:"2015-03-31"
    })

    var params = {
        FunctionName:process.env.FUNCTION_DIGIPRESSIDENTITYMANAGER_NAME,
        InvocationType:"Event",
        LogType:"Tail",
        Payload:`{
            "field":"${field}",
            "arguments":${JSON.stringify(body)}
        }`
    }

    return lambda.invoke(params).promise()

}

exports.invokeLambdaSearchManager = function(field,path,body={}){

    const lambda = new AWS.Lambda({
        region:process.env.REGION,
        apiVersion:"2015-03-31"
    })

    var params = {
        FunctionName:process.env.FUNCTION_DIGIPRESSSEARCHMANAGER_NAME,
        InvocationType:"Event",
        LogType:"Tail",
        Payload:`{
            "field":"${field}",
            "arguments":{
                "path":"${path}",
                "body":${JSON.stringify(body)}
            }
        }`
    }
    
    return lambda.invoke(params).promise()

}

exports.invokeLambdaStorageManager = function(field,body){

    const lambda = new AWS.Lambda({
        region:process.env.REGION,
        apiVersion:"2015-03-31"
    })

    var params = {
        FunctionName:process.env.FUNCTION_DIGIPRESSSTORAGEMANAGER_NAME,
        InvocationType:"Event",
        LogType:"Tail",
        Payload:`{
            "field":"${field}",
            "arguments":${JSON.stringify(body)}
        }`
    }
    
    return lambda.invoke(params).promise()

}