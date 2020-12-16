import {
    createLessonRoutine,
    updateLessonRoutine,
    deleteLessonRoutine,
    getLessonRoutine,
    listLessonsRoutine,
    customListLessonsRoutine
} from '../routines/lesson'

const initialState = {
    error:false,
    isRequesting:false,
    isSuccessFull:false,
    isError:false
}


export const createLesson = (state={item:{},...initialState},action) => {

    switch(action.type){

        case createLessonRoutine.REQUEST  : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })

        }
        case createLessonRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }
        case createLessonRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }
        case createLessonRoutine.FULFILL : {

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:false,
                error:false
            })
        }
    }

    return state
}

export const getLesson = (state={item:{},...initialState},action) => {

    switch(action.type){

        case getLessonRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case getLessonRoutine.SUCCESS : {

            const {data} = action.payload
            // data["roles"] = JSON.parse(data["roles"])
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case getLessonRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }

        case getLessonRoutine.FULFILL : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false
            })
        }

    }

    return state
}

export const listLessons = (state={list:[],...initialState},action) => {

    switch(action.type){

        case listLessonsRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                list:state.list
            })
        }

        case listLessonsRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                list:data
            })     

        }

        case listLessonsRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                list:[]
            })
        }

        case listLessonsRoutine.FULFILL : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false
            })
        }

        case customListLessonsRoutine.UPDATELIST : {

            const {method,items,index}  = action
            
            if(method==="add") state.list.items.unshift(items)
            else if(method==="remove"){
                //hapus items dari index sepanjang items.length
                state.list.items.splice(index,items.length)
            }
            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:true,
                isError:false,
                error:false
            })

        }

    }

    return state
}


export const updateLesson = (state={item:{},...initialState},action) => {

    switch(action.type){


        case updateLessonRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case updateLessonRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case updateLessonRoutine.FAILURE : {

            const {error} = action.payload

            return Object.assign({},state,{
                isRequesting:false,
                isSuccessFull:false,
                isError:true,
                error,
                item:{}
            })
        }

        case updateLessonRoutine.FULFILL : {

            return Object.assign({},state,{
                isRequesting:false,
                error:false,
                isError:false,
                isSuccessFull:false
            })
        }

    }

    return state
}

export const deleteLesson = (state={item:{},...initialState},action) => {

    switch(action.type){

        case deleteLessonRoutine.REQUEST : {

            return Object.assign({},state,{
                isRequesting:true,
                error:false,
                isError:false,
                isSuccessFull:false,
                item:{}
            })
        }

        case deleteLessonRoutine.SUCCESS : {

            const {data} = action.payload
            
            return Object.assign({},state,{
                isRequesting:false,
                isError:false,
                error:false,
                isSuccessFull:true,
                item:data
            })     

        }

        case deleteLessonRoutine.FAILURE : {

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