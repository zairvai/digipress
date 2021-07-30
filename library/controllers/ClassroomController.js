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

    _update = (item,values) =>{
        
        values = {
            id:item.id,
            accountId:item.account.id,
            version:item.version,
            ...values}

        return this.props.updateClassroomRoutinePromise({values})
    }

    // delete canonical
    _delete = (item) => {

        const values = {
            id:item.id,
            accountId:item.account.id,
            version:item.version,
            status:-1}
            
        return this.props.updateClassroomRoutinePromise({values})

    }

    // _delete = (id) => {
    //     return this.props.deleteClassroomRoutinePromise({id})
    // }

    _list = values => {
        return this.props.listClassroomsRoutinePromise(values)
    }
}
