import {
    initSignIn,signIn,signOut,
    completeNewPassword,
    initForgotPassword,forgotPassword,resetPassword,
    getAuthUser,
    setAccount
} from 'State/actions/auth'

import AccountController from './AccountController'

export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    static isAppOwner = auth =>{
        
        if(auth.user){
            const {access} = auth.user
            if(access.accountId === AccountController.APP_ACCOUNT_ID && access.role==="owner") return true
        }
        return false

    }

    static isAppAdmin = auth =>{
        
        if(auth.user){
            const {access} = auth.user
            if(access.accountId === AccountController.APP_ACCOUNT_ID && access.role==="admin") return true
        }
        return false

    }
    

    static isOwner = (auth) => {

        if(auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="owner") return true
        }
        return false

    }

    static isAdmin = (auth) => {

        if(auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="admin") return true
        }
        return false

    }

    static isTutor = (auth) => {

        if(auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="tutor") return true
        }
        return false

    }

    static isStudent = (auth) => {

        if(auth.user){
            const {access} = auth.user
            if(access.accountId === auth.account.id && access.role==="student") return true
        }
        return false

    }

    static isMember = (auth) => {

        if(auth.user){
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

    // _initForgotPassword = () =>{
    //     this.dispatch(initForgotPassword())
    // }

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