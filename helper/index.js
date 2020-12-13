

export function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous
    );
}

// function getRoles(){

//   const roles=[
//     {path:"app-owners",name:"App Owners",value:"AppOwner"},
//     {path:"app-admins",name:"App Admins",value:"AppAdmin"},
//     {path:"owners",name:"Owners",value:"Owner"},
//     {path:"admins",name:"Admins",value:"Admin"},
//     {path:"tutors",name:"Tutors",value:"Tutor"},
//     {path:"students",name:"Students",value:"Student"},
//     {path:"members",name:"Members",value:"Member"}
//   ]

//   return roles

// }

// export {
//   getRoles
// }

// export function getRole(rolePath){

//   const roles = getRoles()
//   let i = 0
//   let found = false
//   for(i=0;i<roles.length;i++){
//     if(roles[i].path===rolePath) {
//       found = true 
//       break
//     }
//   }

//   if(found) return roles[i]
//   return false
// }

export const getRedirectToDefaultPath = (auth,role) => {


  let url = ""

  switch(role){

    case "owner" 	  :	 
    case "admin" 	  : 	url = `/${auth.account.uniqueURL}/report/dashboard`
                        break;

    case "tutor" 	  : 	url = `/${auth.account.uniqueURL}/content/classrooms`
                        break;
    case "student"	: 
    case "member"	  : 	break;

      default	 	    : 	url = `not-found`

  }

  return url

}