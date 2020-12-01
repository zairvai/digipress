const initialState = {
    item:{
        id:'1',
        name:'Bahasa Arab',
        description:"Pelajaran Bahasa Arab",
        status:1
    },
    list:[
        {
            id:'1',
            name:'Berita',
            description:"Pengetahuan umum",
            status:1
        },
        {
            id:'2',
            name:'Sejarah',
            description:"Pelajaran Ilmu Sejarah",
            status:1
        },
        {
            id:'3',
            name:'Bahasa Arab',
            description:"Pelajaran Bahasa Arab",
            status:1
        },
    ]
}

export const categories = (state=initialState,action) => {

    return state
}