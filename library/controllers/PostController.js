import {
    updateList
} from 'State/actions/post'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _get = (id) => {
        return this.props.getPostRoutinePromise({id})
    }

    _list = values => {
        return this.props.listPostsRoutinePromise(values)
    }

    _updateList = (method,items,index)=>{
        this.dispatch(updateList(method,items,index))
    }

}
