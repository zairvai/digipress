
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    
    const {params} = event
    
    if(!params || !params.metrics) return
    
    const analytics = require("./modules/analytics")
    
    try{
        const result = await analytics.getData(params)
        
        const responseData = {
            "results" : result.data.totalsForAllResults,
            "rows":result.data.rows
        }
        
        const response = {
            statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  }, 
            body: responseData,
        };
        
        return response;
    }
    catch(error){
        
        console.log(error)
        
        const response = {
            statusCode: 404,
            body: JSON.stringify(error),
        };
        
        return response
    }

};
