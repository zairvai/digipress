export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values => {
        return this.props.createUserRoutinePromise({values})
    }

    _update = (item,values) =>{
        
        values = {
            id:item.id,
            version:item.version,
            ...values    
        }

        return this.props.updateUserRoutinePromise({values})
    }

    _get = (id) => {
        return this.props.getUserRoutinePromise({id})
    }

    _list = values => {
        return this.props.listUsersRoutinePromise(values)
    }

    _getUserByEmail = ({emailAddress}) =>{
        
        return this.props.getUserByEmailRoutinePromise({emailAddress})
    }

}
