import {API} from 'aws-amplify'
import * as queries from "Src/graphql/queries"

export default class Controller{


    async _getData(params){

        //console.log(params)

        try{
            const response = await API.graphql({ 
                query: queries.getAnalytic, 
                variables: { 
                    input:{
                        params:JSON.stringify(params)
                    }
                }})

            //console.log(response)

            const data = {
                results : JSON.parse(response.data.getAnalytic.results),
                rows : JSON.parse(response.data.getAnalytic.rows)
            }

            return data
        }
        catch(error){
            console.log(error)
        }


    }

}