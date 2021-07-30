import {putRoutine,getRoutine,listRoutine,removeRoutine,
    customPutRoutine,customGetRoutine,customListRoutine} from '../routines/storage'

import _ from 'lodash'

const initialState = {
    error:false,
    isRequesting:false,
    isError:false,
    putData:{},
    getData:{},
    listData:{
        items:[]
    }
}

export const putObject = (state=initialState,action) =>{

    switch(action.type){

        case putRoutine.REQUEST : {

            const {payload} = action

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                putData:payload,
            })

        }

        case customPutRoutine.PROGRESS : {

            const {payload} = action

            return Object.assign({},state,{
                putData:payload
            })

        }

        case putRoutine.SUCCESS : {

            const {payload} = action

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                putData:payload,//[...state.putData,data],
            })
        }

        case putRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error:error
            })
        }

        case customPutRoutine.RESET : {
            return Object.assign({},state,{
                putData:{}
            })
        }
    }

    return state
}

export const getObject = (state=initialState,action) =>{

    switch(action.type){

        case getRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                getData:{}
            })

        }

        case getRoutine.SUCCESS : {

            const {payload} = action

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                getData:payload// [...state.getData,data]
            })
        }

        case getRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error
            })
        }

        case customGetRoutine.RESET : {
            return Object.assign({},state,{
                getData:{}
            })
        }

    }

    return state
}

export const listObjects = (state=initialState,action) =>{

    switch(action.type){

        case listRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })

        }

        case listRoutine.SUCCESS : {

            const {payload} = action
            const {items,...rest} = payload

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                listData:{
                    items:[...state.listData.items,...items],
                    ...rest
                }
            })
        }

        case listRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error
            })
        }

        case customListRoutine.SET : {
            
            const {items} = action.payload

            return Object.assign({},state,{
                listData:{...state.listData,items:items}
            })
        }
    }

    return state
}


export const removeObject = (state=initialState,action) =>{

    switch(action.type){

        case removeRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false
            })

        }

        case removeRoutine.SUCCESS : {

            const {index} = action.payload
            
            console.log(state)
            // const newItems = _.cloneDeep(state.listData.items)
        
            // newItems.splice(index,1)

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                listData:{
                    ...state.listData,items:[]
                }
            })
        }

        case removeRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isError:true,
                error
            })
        }
    }

    return state
}