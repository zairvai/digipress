import {
    appRoutine
} from '../routines/app'

const initialState = {
    currentPage:""
}


export const appReducer = (state=initialState,action) => {

    switch(action.type){

        case appRoutine.SETCURRENTPAGE  : {

            const {currentPage} = action
            
            return Object.assign({},state,{
                currentPage
            })   
        }
    }

    return state
}