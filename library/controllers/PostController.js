import {all} from 'redux-saga/effects'

export default class Controller{

    static actionList = []

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

    static _all = sagas =>{
        this.actionList = [...this.actionList,...sagas]
        // console.log(sagas)
    }

}
