const initialState = {
    item:{
        id:'1',
        name:'Terima kasih atas artikelnya',
        author:{id:1,name:"abdurahman"},
        datetime:"2020/11/02 19:24",
        status:2
    },
    list:[
        {
            id:'1',
            name:'Terima kasih atas artikelnya',
            author:{id:1,name:"abdurahman"},
            datetime:"2020/11/02 19:24",
            status:2
        },
        {
            id:'2',
            name:'Pembahasan yang sangat menarik',
            author:{id:1,name:"dimyati"},
            datetime:"2020/11/10 08:10",
            status:3
        }
    ]
}

export const comments = (state=initialState,action) => {

    return state
}