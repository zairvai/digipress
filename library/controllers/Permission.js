import AuthController from 'Library/controllers/AuthController'
export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }

    static ADD_ARTICLE = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

    static DELETE_ARTICLE = ({auth,...props}) => {

        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }


    static UPDATE_ARTICLE = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }


    static ADD_CLASSROOM = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

    static UPDATE_CLASSROOM = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

    static DELETE_CLASSROOM = ({auth,...props}) => {

        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }


    static ADD_LESSON = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

    static UPDATE_LESSON = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

    static DELETE_LESSON = ({auth,...props}) => {

        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }




    //TAG

    static ADD_TAG = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

    //CATEGORY

    static ADD_CATEGORY = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

}