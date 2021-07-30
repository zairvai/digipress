export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values => {
        return this.props.createLessonRoutinePromise({values})
    }

    _get = (id) => {
        return this.props.getLessonRoutinePromise({id})
    }

    _update = (item,values) =>{

        values = {
            id:item.id,
            accountId:item.account.id,
            postId:item.post.id,
            version:item.version,
            ...values}

        return this.props.updateLessonRoutinePromise({values})
    }

    _delete = (item) => {

        const values = {
            id:item.id,
            accountId:item.account.id,
            postId:item.post.id,
            version:item.version,
            status:-1}
            
        return this.props.updateLessonRoutinePromise({values})

    }

    // _delete = (id) => {
    //     return this.props.deleteLessonRoutinePromise({id})
    // }


    _list = values => {
        return this.props.listLessonsRoutinePromise(values)
    }
}
