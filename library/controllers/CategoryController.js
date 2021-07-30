export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values => {
        return this.props.createCategoryRoutinePromise({values})
    }

    _get = (id) => {
        return this.props.getCategoryRoutinePromise({id})
    }

    _update = (values) =>{
        return this.props.updateCategoryRoutinePromise({values})
    }

    _delete = (id) => {
        return this.props.deleteCategoryRoutinePromise({id})
    }

    _list = values => {
        return this.props.listCategoriesRoutinePromise(values)
    }
}
