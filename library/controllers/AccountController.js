import {
    createAccount,createAccountInit,
    listAccounts,
    getAccount,getAccountInit,getAccountByUniqueUrl,
    updateAccount,updateAccountInit,
    deleteAccount,deleteAccountInit,
    updateList
} from 'State/actions/account'

export default class Controller{

    static APP_ACCOUNT_ID = "11001" //aplikasi owner id

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    _create = values =>{
        return this.props.createAccountRoutinePromise({values})
    }

    _update = (values) =>{
        // values.id = id
        return this.props.updateAccountRoutinePromise({values})
    }

    _list = ({orderBy,direction,from,size}) => {

        const requestFrom = typeof from !== "undefined" ? from : 0
        const requestSize = typeof size !== "undefined" ? size : 50
    
        this.props.listAccountsRoutinePromise({orderBy,direction,from:requestFrom,size:requestSize})
        
    }

    _get = (id) =>{
        return this.props.getAccountRoutinePromise({id})
    }

    _getInit = () => {
        this.dispatch(getAccountInit())
    }

    _delete = (id) =>{
        
        //this.dispatch(deleteAccount({id}))
        return this.props.deleteAccountRoutinePromise({id})

    }
    _deleteInit = () => {
        this.dispatch(deleteAccountInit())
    }

    _getAccountByUniqueUrl = ({url}) =>{
        
        return this.props.getAccountByUniqueUrlRoutinePromise({url})
    }

    _updateList = (method,items,index)=>{
        return this.dispatch(updateList(method,items,index))
        
    }

}