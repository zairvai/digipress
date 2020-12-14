import AuthController from 'Library/controllers/AuthController'
export default class Controller{

    constructor({dispatch, ...props}){
        
        this.props = props
        
        this.dispatch = dispatch
    }


    //TAG

    static ADD_TAG = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

    static ADD_CATEGORY = ({auth,...props}) => {

        if(AuthController.isAppOwner(auth) || AuthController.isAppAdmin(auth)) return false
        if(AuthController.isStudent(auth) || AuthController.isMember(auth)) return false

        return true

    }

}