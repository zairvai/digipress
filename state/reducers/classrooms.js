const initialState = {
    item:{
        id:'1',
        name:'Bahasa Arab Dasar 1',
        content:"<H1>MAS AL</H1>",
        tags:["bahasa arab","nusantara"],
        author:{id:1,name:"zulfikar"},
        noOfModules:3,
        noOfQuizes:2,
        readAccess:"private",
        allowComment:1,
        status:1
    },
    list:[
        {
            id:'1',
            name:'Bahasa Arab Dasar 1',
            content:"<H1>Bahasa Arab Dasar 1 Siap</H1>",
            tags:["bahasa arab","nusantara"],
            author:{id:1,name:"zulfikar"},
            noOfModules:3,
            noOfQuizes:2,
            readAccess:"private",
            allowComment:1,
            status:1
        },
        {
            id:'2',
            name:'Sejarah Islam Awal 1',
            content:"<H1>Pelajaran pengetahuan sejarah islam</H1>",
            tags:["sejarah","islam"],
            author:{id:1,name:"zulfikar"},
            noOfModules:4,
            noOfQuizes:1,
            readAccess:"private",
            allowComment:1,
            status:1
        }
    ]
}

export const classrooms = (state=initialState,action) => {

    return state
}