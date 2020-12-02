const initialState = {
    item:{
        id:'1',
        name:'Pengenalan bahasa arab dasar tingkat awal',
        content:"<img src=\"https://i.ytimg.com/vi/7Zb9ra76Zs8/maxresdefault.jpg\" style=\"float:left;margin-right:10px;\" width=\"300\"/>Dengan kursus bahasa Arab untuk pemula Anda akan mempelajari lebih dari 1300 kosakata dasar dan dengan itu dalam waktu singkat akan mencapai tingkat A1/A2 menurut standar Eropa. Jika Anda memilih paket lengkap, Anda bahkan akan menguasai lebih dari 5000 kata dan akan mencapai tingkat C1/C2.",
        type:"lesson",
        author:{id:1,name:"syahroni"},
        status:1
    },
    list:[
        {
            id:'1',
            name:'Pengenalan bahasa arab dasar tingkat awal',
            content:"<img src=\"https://i.ytimg.com/vi/7Zb9ra76Zs8/maxresdefault.jpg\" style=\"float:left;margin-right:10px;\" width=\"300\"/>Dengan kursus bahasa Arab untuk pemula Anda akan mempelajari lebih dari 1300 kosakata dasar dan dengan itu dalam waktu singkat akan mencapai tingkat A1/A2 menurut standar Eropa. Jika Anda memilih paket lengkap, Anda bahkan akan menguasai lebih dari 5000 kata dan akan mencapai tingkat C1/C2.",
            type:"lesson",
            author:{id:1,name:"syahroni"},
            status:1
        },
        {
            id:'2',
            name:'Quiz 1 Pelajaran dasar',
            content:"<img src=\"https://i.ytimg.com/vi/7Zb9ra76Zs8/maxresdefault.jpg\" style=\"float:left;margin-right:10px;\" width=\"300\"/>Dengan kursus bahasa Arab untuk pemula Anda akan mempelajari lebih dari 1300 kosakata dasar dan dengan itu dalam waktu singkat akan mencapai tingkat A1/A2 menurut standar Eropa. Jika Anda memilih paket lengkap, Anda bahkan akan menguasai lebih dari 5000 kata dan akan mencapai tingkat C1/C2.",
            type:"quiz",
            author:{id:1,name:"syahroni"},
            status:1
        }
    ]
}

export const lessons = (state=initialState,action) => {

    return state
}