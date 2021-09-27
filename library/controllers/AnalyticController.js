import {API} from 'aws-amplify'
import * as queries from "Src/graphql/queries"

export default class Controller{

    constructor(){
        this.response = false
    }

    async _getData(params){

        //console.log(params)

        try{
            this.response = await API.graphql({ 
            query: queries.getAnalytic, 
            variables: { 
                input:{
                    params:JSON.stringify(params)
                }
            }})

            //console.log(response)

            const data = {
                results : JSON.parse(this.response.data.getAnalytic.results),
                rows : JSON.parse(this.response.data.getAnalytic.rows)
            }

            return data
        }
        catch(error){
            console.log(error)
            API.cancel(this.response)
        }

    }

    _cancel(){
        API.cancel(this.response)
    }

}