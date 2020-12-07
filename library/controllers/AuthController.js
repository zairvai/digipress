import {
    initSignIn,signIn,signOut,
    completeNewPassword,
    initForgotPassword,forgotPassword,resetPassword} from 'State/actions/auth'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    static isAppOwner = (auth) => {
        
        if(auth.user) return auth.user.cognitoGroups.includes("app-owner")
        return false
    }

    static isAppAdmin = (auth) => {

        if(auth.user) return auth.user.cognitoGroups.includes("app-admin")
        return false
    }

    _initSignIn = () =>{
        this.dispatch(initSignIn())
    }

    _signIn = (email,password) =>{

        this.dispatch(signIn({
            values:{
                username:email,
                password:password
            }
        }))
    }
    
    _signOut = () =>{
        this.dispatch(signOut())
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