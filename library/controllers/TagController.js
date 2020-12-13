import {
    updateList
} from 'State/actions/tag'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values => {
        return this.props.createTagRoutinePromise({values})
    }

    _get = (id) => {
        return this.props.getTagRoutinePromise({id})
    }

    _update = (values) =>{
        return this.props.updateTagRoutinePromise({values})
    }

    _delete = (id) => {
        return this.props.deleteTagRoutinePromise({id})
    }

    _list = values => {
        return this.props.listTagsRoutinePromise(values)
    }

    _updateList = (method,items,index)=>{
        this.dispatch(updateList(method,items,index))
    }
}
