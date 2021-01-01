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

}
