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

    static DELETE_ARTICLE = ({auth,item,...props}) => {

        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false
        if(AuthController.isTutor(auth) && item.createdBy && auth.user.id != item.createdBy.id) return false

        return true

    }


    static UPDATE_ARTICLE = ({auth,item,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false
        if(AuthController.isTutor(auth) && item.createdBy && auth.user.id != item.createdBy.id) return false

        return true

    }


    static ADD_CLASSROOM = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

    static UPDATE_CLASSROOM = ({auth,item,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false
        if(AuthController.isTutor(auth) && item.createdBy && auth.user.id != item.createdBy.id) return false

        return true

    }

    static DELETE_CLASSROOM = ({auth,item,...props}) => {

        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false
        if(AuthController.isTutor(auth) && item.createdBy && auth.user.id != item.createdBy.id) return false

        return true

    }


    static ADD_LESSON = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

    static UPDATE_LESSON = ({auth,item,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false
        if(AuthController.isTutor(auth) && item.createdBy && auth.user.id != item.createdBy.id) return false

        return true

    }

    static DELETE_LESSON = ({auth,item,...props}) => {

        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false
        if(AuthController.isTutor(auth) && item.createdBy && auth.user.id != item.createdBy.id) return false

        return true

    }


    //COMMENT

    static REPLY_COMMENT = ({auth,item}) => {


        if(item && item.createdBy && auth.user.id == item.createdBy.id) return false
        
        return true

    }

    static UPDATE_COMMENT = ({auth,item,...props}) => {

        if(item && item.createdBy && auth.user.id != item.createdBy.id) return false

        return true

    }

    static DELETE_COMMENT = ({auth,item,...props}) => {
    
        if(AuthController.isTutor(auth) || AuthController.isStudent(auth) || AuthController.isMember(auth)){
            if(item && item.createdBy && auth.user.id != item.createdBy.id) return false
        }

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