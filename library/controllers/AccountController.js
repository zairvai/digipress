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

    _update = (item,values) =>{
        
        values = {
            id:item.id,
            version:item.version,
            ...values}

        return this.props.updateAccountRoutinePromise({values})
    }

    _list = (values) => {
    
        this.props.listAccountsRoutinePromise(values)
        
    }

    _get = (id) =>{
        return this.props.getAccountRoutinePromise({id})
    }

    _delete = (item) => {

        const values = {
            id:item.id,
            version:item.version,
            status:-1}
            
        return this.props.updateAccountRoutinePromise({values})
    }


    //  delete fisik
    // _delete = (id) =>{
        
    //     return this.props.deleteAccountRoutinePromise({id})

    // }

    _getAccountByUniqueUrl = ({url}) =>{
        
        return this.props.getAccountByUniqueUrlRoutinePromise({url})
    }

    _updateList = (method,items,index)=>{
        return this.dispatch(updateList(method,items,index))
        
    }

}