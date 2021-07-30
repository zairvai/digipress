import {
    appRoutine
} from '../routines/app'


export const setCurrentPage = currentPage => ({
    type : appRoutine.SETCURRENTPAGE,
    currentPage
})
