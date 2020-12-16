const initialState = {
    item:{
        id:'1',
        name:'Bahasa Arab Dasar 1',
        content:"<img src=\"https://i.ytimg.com/vi/7Zb9ra76Zs8/maxresdefault.jpg\" style=\"float:left;margin-right:10px;\" width=\"300\"/>Dengan kursus bahasa Arab untuk pemula Anda akan mempelajari lebih dari 1300 kosakata dasar dan dengan itu dalam waktu singkat akan mencapai tingkat A1/A2 menurut standar Eropa. Jika Anda memilih paket lengkap, Anda bahkan akan menguasai lebih dari 5000 kata dan akan mencapai tingkat C1/C2.",
        category:{id:3,name:"Bahasa Arab"},
        tags:[{id:4,name:"bahasa arab"},{id:2,name:"nusantara"}],
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
            category:{id:3,name:"Bahasa Arab"},
            tags:[{id:4,name:"bahasa arab"},{id:2,name:"nusantara"}],
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
            category:{id:2,name:"Sejarah"},
            tags:[{id:3,name:"sejarah"},{id:1,name:"islam"}],
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