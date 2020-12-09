import {
    createUserRoutine,
    updateUserRoutine,
    deleteUserRoutine,
    getUserRoutine,
    listUsersRoutine
} from '../routines/user'

const initialState = {
    error:false,
    isRequesting:false,
    isSuccessFull:false,
    isError:false
}


export const getUser = (state={item:{},...initialState},action) => {

    switch(action.type){

        case getUserRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case getUserRoutine.SUCCESS : {

            const {data} = action.payload
            data["roles"] = JSON.parse(data["roles"])
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case getUserRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }

    }

    return state
}