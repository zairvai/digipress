const initialState = {
    item:{
        id:'1',
        name:'islam',
        description:"",
        status:1
    },
    list:[
        {
            id:'1',
            name:'islam',
            description:"",
            status:1
        },
        {
            id:'2',
            name:'nusantara',
            description:"",
            status:1
        },
        {
            id:'3',
            name:'sejarah',
            description:"",
            status:1
        }
    ]
}

export const tags = (state=initialState,action) => {

    return state
}