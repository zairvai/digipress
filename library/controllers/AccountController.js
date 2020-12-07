import {
    createAccount,createAccountInit,
    listAccounts,
    getAccount,getAccountInit,
    updateAccount,updateAccountInit
} from 'State/actions/account'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values =>{
        this.dispatch(createAccount({values}))
    }
    _createInit = () => {
        this.dispatch(createAccountInit())
    }

    _update = (id,values) =>{
        this.dispatch(updateAccount(id,{values}))
    }

    _updateInit = () =>{
        this.dispatch(updateAccountInit())
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