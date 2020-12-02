const initialState = {
    item:{
        id:'1',
        name:'Bagaimana cara memahami kata benda dan kerja',
        author:{id:1,name:"abdurahman"},
        datetime:"2020/11/02 19:24",
        status:3
    },
    list:[
        {
            id:'1',
            name:'Bagaimana cara memahami kata benda dan kerja',
            author:{id:1,name:"abdurahman"},
            datetime:"2020/11/02 19:24",
            status:3
        },
        {
            id:'2',
            name:'Apa yang dimaksud dengan kaidah bahasa arab',
            author:{id:1,name:"dimyati"},
            datetime:"2020/11/10 08:10",
            status:2
        }
    ]
}

export const questions = (state=initialState,action) => {

    return state
}