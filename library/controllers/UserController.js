import {
    getUser
} from 'State/actions/user'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values =>{
        return this.props.createUserRoutinePromise({values})
    }

    _get = (id) =>{
        return this.props.getUserRoutinePromise({id})
    }
}