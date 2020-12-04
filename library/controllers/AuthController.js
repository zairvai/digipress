import {
    initSignIn,signIn,signOut,
    completeNewPassword,
    initForgotPassword,forgotPassword} from 'State/actions/auth'
import { resetPassword } from '../../state/actions/auth'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
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

        //const username = this.props.auth.data.username

        this.dispatch(resetPassword({
            values:{
                username:email,
                password,
                code
            }
        }))
    }

}