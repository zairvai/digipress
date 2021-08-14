var AWS = require("aws-sdk")

var region = process.env.REGION
var domain = process.env.ELASTICSEARCH_ENDPOINT
var endpoint = new AWS.Endpoint(domain)
var request = new AWS.HttpRequest(endpoint,region)

function put(path,body){

    return new Promise((resolve,reject)=>{
        request.method = "PUT"
        request.path = path // /records/_search
        request.body = JSON.stringify(body)
        request.headers["host"] = domain
        request.headers["Content-Type"] = "application/json"
        request.headers["Content-Length"] = Buffer.byteLength(request.body)

        var client = new AWS.HttpClient()

        var credentials = new AWS.EnvironmentCredentials('AWS');
        var signer = new AWS.Signers.V4(request, 'es');
        signer.addAuthorization(credentials, new Date());

        client.handleRequest(request,null,
            response => {

                var responseBody = ""

                response.on("data",chunk=>{
                    responseBody += chunk
                })

                response.on("end",chunk=>{
                    
                    resolve(JSON.parse(responseBody))

                })
            },
            error => {
                console.log(error)
                reject(error)
            })

    })
}


function get(path,body=false){

    return new Promise((resolve,reject)=>{

        request.method = "GET"
        request.path = path // /records/doc/id
        request.headers["host"] = domain

        if(body){
            request.body = JSON.stringify(body)
            request.headers["Content-Type"] = "application/json"
            request.headers["Content-Length"] = Buffer.byteLength(request.body)
        }

        var client = new AWS.HttpClient()

        var credentials = new AWS.EnvironmentCredentials('AWS');
        var signer = new AWS.Signers.V4(request, 'es');
        signer.addAuthorization(credentials, new Date());

        client.handleRequest(request,null,
            response => {

                var responseBody = ""

                response.on("data",chunk=>{
                    responseBody += chunk
                })

                response.on("end",chunk=>{
                    
                    resolve(JSON.parse(responseBody))

                })
            },
            error => {
                console.log(error)
                reject(error)
            })


    })

}

function remove(path){

    return new Promise((resolve,reject)=>{

        request.method = "DELETE"
        request.path = path // /records/doc/id
        request.headers["host"] = domain

        var credentials = new AWS.EnvironmentCredentials('AWS');
        var signer = new AWS.Signers.V4(request, 'es');
        signer.addAuthorization(credentials, new Date());
        
        var client = new AWS.HttpClient()

        client.handleRequest(request,null,
            response => {

                var responseBody = ""

                response.on("data",chunk=>{
                    responseBody += chunk
                })

                response.on("end",chunk=>{
                    
                    resolve(JSON.parse(responseBody))
                })
            },
            error => {
                console.log(error)
                reject(error)
            })

    })

}

exports.put = put
exports.get = get
exports.remove = remove