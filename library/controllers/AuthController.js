import {
    initSignIn,signIn,signOut,
    completeNewPassword,
    initForgotPassword,forgotPassword,resetPassword,
    getAuthUser,
    setAccount
} from 'State/actions/auth'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    static isOwner = (auth) => {

        if(auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="Owner") return true
        }
        return false

    }

    static isAdmin = (auth) => {

        if(auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="Admin") return true
        }
        return false

    }

    static getRole = auth => {

        if(auth.user){
            const {access} = auth.user
            return access.role
        }

        return{}
    }

    _setAccount = account =>{
        this.dispatch(setAccount(account))
    }

    _initSignIn = () =>{
        this.dispatch(initSignIn())
    }

    _get = () => {
        return this.props.getAuthUserRoutinePromise()
    }

    _signIn = (email,password,accountId) =>{

        return this.props.signInRoutinePromise({
            values:{
                username:email,
                password,
                accountId
            }
        })
    }
    
    _signOut = () =>{
        return this.props.signOutRoutinePromise()
    }

    _completeNewPassword = (name,password) =>{

        const user = this.props.auth.data        

        this.dispatch(completeNewPassword({
            values:{
                user,
                name,
                password
            }
        }))
    }

    _initForgotPassword = () =>{
        this.dispatch(initForgotPassword())
    }

    _forgotPassword = (email) =>{

        this.dispatch(forgotPassword({
            values:{
                username:email
            }
        }))
    }

    _resetPassword = (email,password,code) =>{

        this.dispatch(resetPassword({
            values:{
                username:email,
                password,
                code
            }
        }))
    }

}