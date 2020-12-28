export default class Controller{

    constructor({dispatch, ...props}){

        this.props = props
        
        //this.dispatch = dispatch
    }

    _create = values => {
    
        return this.props.createQnaRoutinePromise({values})
    }

    _get = (id) => {
        return this.props.getQnaRoutinePromise({id})
    }

    _update = (item,values) =>{

        values = {
            id:item.id,
            accountId:item.account.id,
            postId:item.post.id,
            version:item.version,
            ...values}

        
        return this.props.updateQnaRoutinePromise({values})
    }

    _delete = (item) => {

        const values = {
            id:item.id,
            accountId:item.account.id,
            postId:item.post.id,
            version:item.version,
            status:-1}
        
        //console.log(values)

        return this.props.updateQnaRoutinePromise({values})

    }


    _listPostQnas = values => {
        return this.props.listPostQnasRoutinePromise(values)
    }

    _listUserQnas = values => {
        return this.props.listUserQnasRoutinePromise(values)
    }
}
