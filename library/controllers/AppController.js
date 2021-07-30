import {
    setCurrentPage
} from 'State/actions/app'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _setCurrentPage = currentPage =>{
        this.dispatch(setCurrentPage(currentPage))
    }
}