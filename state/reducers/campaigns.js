const initialState = {
    item:{
        id:'1',
        name:'Diskon 10% Pakaian Tradisional',
        keywords:["fashion","baju adat","barang lokal"],
        url:"https://www.tokopedia.com/354barokahgrosir/baju-surjan-lurik-jawa-wayang-02",
        age:{min:17,max:55},
        locations:["jawa barat","jawa tengah"],
        startDate:'20/11/2020',
        endDate:'22/02/2020',
        channels:["fb","ig","adword"],
        performance:{
            reach:102000,
            click:2000
        },
        status:3
    },
    list:[
        {
            id:1,
            name:'Diskon 10% Pakaian Tradisional',
            startDate:'20/11/2020',
            endDate:'22/02/2020',
            channels:["fb","ig","adword"],
            performance:{
                reach:102000,
                click:2000
            },
            status:3
        },
        {
            id:2,
            name:'Jamu Tradisional Khas Solo',
            startDate:'17/11/2020',
            endDate:'19/02/2020',
            channels:["fb","adword"],
            performance:{
                reach:92000,
                click:3500
            },
            status:4
        }
    ]
}

export const campaigns = (state=initialState,action) => {

    return state
}