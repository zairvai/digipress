const initialState = {
    id:1,
    name:"Al-Mahadul Islami",
    item:{
        id:1,
        name:"Al-Mahadul Islami",
        address:"JL Raya Kenep, Beji, Bangil, Pondokyapi, Gunungsari, Kec. Beji, Pasuruan, Jawa Timur 67154",
        phone:"0343-741238",
        person:"Zaid Alaydrus",
        status:3
    },
    list:[
        {
            id:1,
            name:"Al-Mahadul Islami",
            address:"JL Raya Kenep, Beji, Bangil, Pondokyapi, Gunungsari, Kec. Beji, Pasuruan, Jawa Timur 67154",
            phone:"0343-741238",
            person:"Zaid Alaydrus",
            status:3
        },
        {
            id:2,
            name:"Pondok Pesantren Alzaytun",
            address:"Mekarjaya, Alzaytun, Indramayu Regency, West Java 45264",
            phone:"0234-742815",
            person:"Muhammad Baydhowi",
            status:2
        }
    ]
}

export const accounts = (state=initialState,action) => {

    return state
}