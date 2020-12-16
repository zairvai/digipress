import {
    updateList
} from 'State/actions/classroom'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values => {
        return this.props.createClassroomRoutinePromise({values})
    }

    _get = (id) => {
        return this.props.getClassroomRoutinePromise({id})
    }

    _update = (values) =>{
        return this.props.updateClassroomRoutinePromise({values})
    }

    _delete = (id) => {
        return this.props.deleteClassroomRoutinePromise({id})
    }

    _list = values => {
        return this.props.listClassroomsRoutinePromise(values)
    }

    _updateList = (method,items,index)=>{
        this.dispatch(updateList(method,items,index))
    }
}
