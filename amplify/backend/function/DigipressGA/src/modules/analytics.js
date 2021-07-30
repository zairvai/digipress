var {google} = require("googleapis")  
var jwt
var viewId="234916158"
    
const initialize = () =>{
    
    var keys = require("../config/ga_key_ef931b98e554.json")
    
    jwt = new google.auth.JWT({
        email:keys.client_email,
        key:keys.private_key,
        scopes:'https://www.googleapis.com/auth/analytics.readonly'
    })
}


const getData = async (params) =>{
    
    initialize()

    //var response = await jwt.authorize()

    var startDate = "30daysAgo"
    var endDate = 'yesterday'
    
    if(params["startDate"])  startDate = params["startDate"]
    if(params["endDate"])  endDate = params["endDate"]
    const defaults = {
        'auth':jwt,
        'ids': 'ga:' + viewId,
    }
    
    var requestParams = {
        ...defaults,
        ...params,
        'start-date': startDate,
        'end-date': endDate
    }

    var result = await google.analytics('v3').data.ga.get(requestParams)

    return result
}

exports.getData = getData