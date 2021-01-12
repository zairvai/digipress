import {
    completeNewPassword,
    setAccount,
    setUser,
    setLoggedIn
} from 'State/actions/auth'

import AccountController from './AccountController'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    static isAppOwner = auth =>{
        
        if(auth &&  auth.user){
            const {access} = auth.user
            if(access.accountId === AccountController.APP_ACCOUNT_ID && access.role==="owner") return true
        }
        return false

    }

    static isAppAdmin = auth =>{
        
        if(auth &&  auth.user){
            const {access} = auth.user
            if(access.accountId === AccountController.APP_ACCOUNT_ID && access.role==="admin") return true
        }
        return false

    }
    

    static isOwner = (auth) => {

        if(auth &&  auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="owner") return true
        }
        return false

    }

    static isAdmin = (auth) => {

        if(auth && auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="admin") return true
        }
        return false

    }

    static isTutor = (auth) => {

        if(auth && auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="tutor") return true
        }
        return false

    }

    static isStudent = (auth) => {

        if(auth && auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="student") return true
        }
        return false

    }

    static isMember = (auth) => {

        if(auth && auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="member") return true
        }
        return false

    }
    


    static getRole = ({user,account}) => {


        if(typeof user === "undefined") return false
        
        const roles = user.roles

        if(typeof roles === "undefined") return false
        let i = 0,found=false

        for(i=0;i<user.roles.length;i++){
            if(user.roles[i].accountId===account.id){
                found=true
                break
            }
        }
        
        if(found) return roles[i]

        return false
        
    }

    _setAccount = account =>{
        this.dispatch(setAccount(account))
    }

    _setUser = user =>{
        this.dispatch(setUser(user))
    }

    _setLoggedIn = value =>{
        this.dispatch(setLoggedIn(value))
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

    _forgotPassword = (email) =>{

        return this.props.forgotPasswordRoutinePromise({
            values:{
                username:email
            }
        })
    }

    _completeNewPassword = (name,password,user) =>{

        return this.props.completeNewPasswordRoutinePromise({
            values:{
                user,
                name,
                password
            }
        })
    }

    _verifyEmail = (email) =>{

        return this.props.verifyEmailRoutinePromise({
            values:{
                username:email
            }
        })
    }

    _verifySubmitCode = (code) =>{

        return this.props.verifySubmitCodeRoutinePromise({
            values:{
                code
            }
        })
    }

    _resetPassword = (email,password,code) =>{

        return this.props.resetPasswordRoutinePromise({
            values:{
                username:email,
                password,
                code
            }
        })
    }

}