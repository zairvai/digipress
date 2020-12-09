import {
    initSignIn,signIn,signOut,
    completeNewPassword,
    initForgotPassword,forgotPassword,resetPassword,
    setUser,setAccount
} from 'State/actions/auth'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    static isOwner = (auth) => {
        
        if(auth.user){
            const {roles} = auth.user
            if(roles[auth.account.id].role==="Owner") return true
        }

        return false
    }

    static isAdmin = (auth) => {

        if(auth.user){
            const {roles} = auth.user
            if(roles[auth.account.id].role==="Admin") return true
        }
        return false
    }

    static getRole = auth => {
        if(auth.user){
            const {roles} = auth.user
            return roles[auth.account.id]
        }

        return{}
    }

    _setUser = user =>{
        this.dispatch(setUser(user))
    }

    _setAccount = account =>{
        this.dispatch(setAccount(account))
    }

    _initSignIn = () =>{
        this.dispatch(initSignIn())
    }

    _signIn = (email,password) =>{

        return this.props.signInRoutinePromise({
            values:{
                username:email,
                password:password
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