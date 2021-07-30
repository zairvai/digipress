import {putResetObject,getResetObject,setListdata} from 'State/actions/storage'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _put = object => {
        return this.props.putRoutinePromise({object})
    }

    _get = object => {
        return this.props.getRoutinePromise({object})
    }

    _remove = object =>{
        return this.props.removeRoutinePromise({object})
    }

    _list = object => {
        return this.props.listRoutinePromise({object})
    }

    _putReset = () =>{
        this.dispatch(putResetObject())
    }

    _getReset = () =>{
        this.dispatch(getResetObject())
    }

    _setListdata = data =>{

        this.dispatch(setListdata(data))
    }
}