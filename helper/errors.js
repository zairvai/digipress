export const authError = error =>{

    const {code} = error

    let errorObj

    switch(code){

        case "UserNotFoundException" : 
            errorObj = {message:"Email yang kamu masukkan belum terdaftar."}
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