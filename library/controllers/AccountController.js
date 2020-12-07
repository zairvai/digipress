import {
    createAccount,listAccounts,
    getAccount,getAccountInit
} from 'State/actions/account'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values =>{
        this.dispatch(createAccount({values}))
    }

    _list = ({orderBy,direction,from,size}) => {

        const requestFrom = typeof from !== "undefined" ? from : 0
        const requestSize = typeof size !== "undefined" ? size : 50
    
        this.dispatch(listAccounts({orderBy,direction,from:requestFrom,size:requestSize}))
        
    }

    _get = ({id}) =>{
        this.dispatch(getAccount({id}))
    }

    _getInit = () => {
        this.dispatch(getAccountInit())
    }

}