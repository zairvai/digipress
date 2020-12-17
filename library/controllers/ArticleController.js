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

    _update = (item,values) =>{
        
        values = {
            id:item.id,
            accountId:item.account.id,
            version:item.version,
            ...values}

        return this.props.updateArticleRoutinePromise({values})
    }

    // delete canonical
    _delete = (item) => {

        const values = {
            id:item.id,
            accountId:item.account.id,
            version:item.version,
            status:-1}
            
        return this.props.updateArticleRoutinePromise({values})

    }

    // delete fisik
    // _delete = (id) => {
    //     return this.props.deleteArticleRoutinePromise({id})
    // }

    _list = values => {
        return this.props.listArticlesRoutinePromise(values)
    }

    _updateList = (method,items,index)=>{
        this.dispatch(updateList(method,items,index))
    }
}
