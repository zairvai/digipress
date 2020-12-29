import {
    createRoutine,createRoutineCreator
} from 'redux-saga-routines'

//add account
var customRoutine = createRoutineCreator(["SETCURRENTPAGE"])
export const appRoutine = customRoutine("app_routine")
