const initialState = {
    item:{
        id:'1',
        name:'Perkembangan dunia Islam Nusantara',
        summary:"Halo AL",
        content:"<H1>MAS AL</H1>",
        category:{id:1,name:"Berita"},
        tags:[{id:1,name:"islam"},{id:2,name:"nusantara"}],
        author:{id:1,name:"zulfikar"},
        readAccess:"public",
        allowComment:true,
        status:1
    },
    list:[
        {
            id:'1',
            name:'Perkembangan dunia Islam Nusantara',
            category:{id:1,name:"Berita"},
            tags:[{id:1,name:"islam"},{id:2,name:"nusantara"}],
            author:{id:1,name:"zulfikar"},
            readAccess:"public",
            status:1
        },
        {
            id:'2',
            name:'Perjalanan hidup seorang sufi abad pertengahan',
            category:{id:2,name:"Sejarah"},
            tags:[{id:3,name:"nusantara"},{id:1,name:"islam"}],
            author:{id:1,name:"zulfikar"},
            readAccess:"private",
            status:2
        }
    ]
}

export const articles = (state=initialState,action) => {

    return state
}