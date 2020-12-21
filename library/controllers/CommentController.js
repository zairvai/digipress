import {
    updateList
} from 'State/actions/comment'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values => {
        return this.props.createCommentRoutinePromise({values})
    }

    _get = (id) => {
        return this.props.getCommentRoutinePromise({id})
    }

    _update = (item,values) =>{

        values = {
            id:item.id,
            accountId:item.account.id,
            postId:item.post.id,
            version:item.version,
            ...values}

        return this.props.updateCommentRoutinePromise({values})
    }

    _delete = (item) => {

        const values = {
            id:item.id,
            accountId:item.account.id,
            postId:item.post.id,
            version:item.version,
            status:-1}
            
        return this.props.updateCommentRoutinePromise({values})

    }


    _list = values => {
        return this.props.listCommentsRoutinePromise(values)
    }

    _updateList = (method,items,index)=>{
        this.dispatch(updateList(method,items,index))
    }
}
