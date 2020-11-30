const initialState = {
    item:{
        id:'1',
        name:'Perkembangan dunia Islam Nusantara',
        summary:"Halo AL",
        content:"<H1>MAS AL</H1>",
        category:{id:1,name:"Berita"},
        tags:["islam","nusantara"],
        author:{id:1,name:"zulfikar"},
        readAccess:"public",
        allowComment:1,
        status:1
    },
    list:[
        {
            id:'1',
            name:'Perkembangan dunia Islam Nusantara',
            category:{id:1,name:"Berita"},
            tags:["islam","nusantara"],
            author:{id:1,name:"zulfikar"},
            readAccess:"public",
            status:1
        },
        {
            id:'2',
            name:'Perjalanan hidup seorang sufi abad pertengahan',
            category:{id:2,name:"Sejarah"},
            tags:["sejarah","islam"],
            author:{id:1,name:"zulfikar"},
            readAccess:"private",
            status:2
        }
    ]
}

export const articles = (state=initialState,action) => {

    return state
}