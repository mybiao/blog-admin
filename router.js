import Router from 'vue-router'

export default new Router({
    mode:"history",
    routes:[
        {
            name:"login",
            path:"/admin/login",
            component: ()=>import('./src/components/Login')
        },
        {
            name:"admin",
            path:"/admin",
            component:()=>import("./src/components/MainPage"),
            meta:{
                keepAlive:true
            },
            children:[
                {
                    path:'',
                    component: ()=>import('./src/components/PageList'),
                    name:"pages",
                    meta:{
                        keepAlive:true
                    },
                },
                {
                    path:'page/:pid',
                    component: ()=>import('./src/components/PageContent'),
                    name:"page",
                    meta:{
                        keepAlive:false
                    },
                }
            ]
        },
        {
            name:"edit",
            path:"/admin/edit/:pid",
            component: ()=>import("./src/components/Mark"),
            meta:{
                keepAlive:false
            }
        },
    ]
})