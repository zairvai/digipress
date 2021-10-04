import cssjson from 'cssjson'

export function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous
    );
}


export const getRedirectToUserDefaultPath = (uniqueURL,role) => {

  let url = ""

  switch(role){

    case "owner" 	  :	 
    case "admin" 	  : 	url = `${uniqueURL}report/dashboard`
                        break;

    case "tutor" 	  : 	
    case "student"	: 
    case "member"	  :   url = `${uniqueURL}main/home`	
                        break;

      default	 	    : 	url = `not-found`

  }

  return url

}

export const bypassUniqueURLPath = (path) =>{

  const byPassPaths = ["auth"]

  const found = byPassPaths.indexOf(path)

  if(found<0) return false

  return true
}


export const validateEmail = value =>{

  const exp = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i

  
  if(exp.test(value)) return true
  return false

}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const inlineCssToJson = styleString =>{

  const styleAttributes = cssjson.toJSON(styleString).attributes
  const newAttributes = {}
  
  for (const [key, value] of Object.entries(styleAttributes)) {
    if(key=="font-family") continue
    else if(key=="font-size") newAttributes["fontSize"] = value
    else newAttributes[key] = value
  }

  return newAttributes

}

export function debug(object,level=1){
  if(!process.env.FRONTEND_ENV || process.env.FRONTEND_ENV=="dev"){
    console.log(object)
  }
}