import {
    updateList
} from 'State/actions/user'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values => {
        return this.props.createUserRoutinePromise({values})
    }

    _get = (id) => {
        return this.props.getUserRoutinePromise({id})
    }

    _update = (values) =>{
        return this.props.updateUserRoutinePromise({values})
    }

    _list = values => {
        return this.props.listUsersRoutinePromise({values})
    }

    _updateList = (method,items,index)=>{
        this.dispatch(updateList(method,items,index))
    }
}
