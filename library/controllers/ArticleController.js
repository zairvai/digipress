import {
    updateList
} from 'State/actions/article'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values => {
        return this.props.createArticleRoutinePromise({values})
    }

    _get = (id) => {
        return this.props.getArticleRoutinePromise({id})
    }

    _update = (values) =>{
        return this.props.updateArticleRoutinePromise({values})
    }

    _delete = (id) => {
        return this.props.deleteArticleRoutinePromise({id})
    }

    _list = values => {
        return this.props.listArticlesRoutinePromise(values)
    }

    _updateList = (method,items,index)=>{
        this.dispatch(updateList(method,items,index))
    }
}
