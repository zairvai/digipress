const initialState = {
    item:{
        id:'1',
        name:'Perkembangan dunia Islam Nusantara',
        summary:"Halo AL",
        content:"<img src=\"https://amaljariah.org/wp-content/uploads/2017/01/3-Faktor-Berkembangnya-Sains-di-Dunia-Islam.jpg\" style=\"float:left;margin-right:10px;\" width=\"400\"/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut pulvinar nisi. Pellentesque vel dolor sollicitudin, aliquet dui vel, lobortis quam. Curabitur vitae massa et ipsum sodales lobortis sed eleifend libero. Fusce mattis et lacus non efficitur. Aliquam at placerat metus. Nulla facilisi. Suspendisse auctor metus erat, sit amet condimentum tortor pulvinar id. Sed tristique tincidunt dolor rhoncus convallis. In hac habitasse platea dictumst. Nunc nec ultricies risus. Mauris tristique elit eget varius ornare. Praesent sapien arcu, vehicula pretium arcu sit amet, iaculis sodales augue.</p>\
        <p>Quisque orci est, efficitur et felis in, bibendum feugiat erat. Ut tempus nisl non felis dapibus semper. Nulla vehicula sit amet lorem laoreet euismod. Aliquam erat volutpat. Aenean porttitor orci ac felis varius, at congue libero suscipit. Aenean tellus felis, sagittis id neque nec, pharetra posuere dolor. Ut scelerisque eu sem ut sagittis. Quisque in nunc vel dolor rutrum maximus. Ut tellus lectus, lobortis id enim id, consequat tristique libero. Duis odio lectus, porttitor sit amet enim non, viverra auctor ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla sit amet vestibulum tortor, sit amet interdum sem. Etiam quis vehicula mi.</p>\
        <p>Mauris maximus nisi ut purus vestibulum sagittis. Cras dignissim convallis egestas. Ut eu arcu tempus, convallis sapien ut, ultrices ante. Pellentesque euismod neque sit amet viverra vehicula. Maecenas at neque sit amet nunc commodo pretium. Nullam vehicula nisl eget varius placerat. Nunc semper tempor molestie. Integer ut mauris sem. Maecenas aliquet, risus a aliquet rhoncus, massa felis convallis dui, elementum commodo justo felis id mi. Pellentesque vitae porta leo, id consequat sapien. In sodales, ante a dapibus pulvinar, arcu dui tempus purus, ut pretium nulla enim et mi. Donec leo nunc, fermentum quis pretium non, dignissim a velit. Sed volutpat felis ac elit condimentum, non rhoncus purus mollis. Ut aliquet neque nec fringilla dictum. Nam id efficitur nibh.</p>\
        <p>Vivamus dolor ex, elementum ac blandit ullamcorper, tincidunt quis metus. Pellentesque faucibus est sed felis gravida, nec finibus ipsum faucibus. Quisque sit amet suscipit purus, a ultrices tellus. Praesent ac odio cursus, venenatis justo ac, vehicula est. Proin eget cursus nulla. Phasellus lacinia porta est, ac placerat justo. Donec nec sodales enim. Curabitur faucibus efficitur purus vel posuere. Curabitur id vehicula sapien. Aliquam ac nisl sed orci ultrices tincidunt. Nullam gravida eget massa in aliquet. Aenean vehicula aliquet elementum. Phasellus imperdiet pretium posuere. Fusce nec dapibus turpis. Donec bibendum eu neque pellentesque gravida.</p>\
        <p>Duis a diam ac purus interdum efficitur. Quisque in purus magna. Nunc pulvinar quam libero, ac suscipit nunc bibendum et. Quisque eleifend, mi in faucibus bibendum, quam arcu efficitur lectus, et vehicula lorem mauris a nisi. Sed vehicula quis eros at finibus. Donec ultrices fermentum purus eget lacinia. Sed accumsan nibh quam, in posuere lacus tristique et. Etiam lorem arcu, scelerisque non neque nec, consectetur hendrerit nisi. Suspendisse tempor odio nunc, sed condimentum enim dictum et. Mauris nunc eros, faucibus a nisl nec, tempus tristique felis.</p>",
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