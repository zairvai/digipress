

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
    case "member"	  :   url = `${uniqueURL}/main/home`	
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