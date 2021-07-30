export const authError = error =>{

    const {code} = error

    let errorObj

    switch(code){

        case "NotAuthorizedException" :
            errorObj = {message:"Email atau password yang kamu masukan tidak sesuai."}
            break
            
        case "NoAccessToAccountException" :
            errorObj = {message:"Kamu tidak memiliki akses ke akun ini"}
            break

        case "UserNotFoundException" : 
            errorObj = {message:"Email yang kamu masukkan tidak terdaftar."}
            break

        case "LimitExceededException": 
            errorObj = {message:"Kamu telah mencoba beberapa kali. Silahkan coba lagi dalam beberapa menit."}
            break

        case "InvalidParameterException":
            errorObj = {message:"Email kamu belum pernah diverifikasi. Silahkan verifikasi terlebih dahulu."}
            break
        case "CodeMismatchException" :
            errorObj = {message:"Kode keamanan yang dimasukkan tidak sesuai."}
            break

    }

    return errorObj

}