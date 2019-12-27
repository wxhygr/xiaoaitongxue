import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Common from '../views/Common.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/home',
        redirect: '/'
    },
    {
        path: '/',
        component: Common,
        children: [{
                path: '',
                name: 'home',
                component: Home,
            },
            {
                path: "/release",
                name: "release",
                component: () =>
                    import ("../views/Release/release.vue")
            },
            {
                path: "/tabpage",
                name: "tabpage",
                component: () =>
                    import ("../views/Tabpage/tabpage.vue")
            },
            {
                path: "/upload",
                name: "upload",
                component: () =>
                    import ("../views/Upload/upload.vue")
            },
            {
                path: "/pagingform",
                name: "pagingform",
                component: () =>
                    import ("../views/Pagingform/pagingform.vue")
            },
            {
                path: "/export",
                name: "export",
                component: () =>
                    import ("../views/Export/export.vue")
            },
            {
                path: "/signout",
                name: "signout",
                component: () =>
                    import ("../views/Signout/signout.vue")
            },
            {
                path: "/article",
                name: "article",
                component: () =>
                    import ("../views/Article/article.vue")
            },
            {
                path: "/see",
                name: "see",
                component: () =>
                    import ("../views/Release/see.vue")
            },
            {
                path: "/edit",
                name: "edit",
                component: () =>
                    import ("../views/Release/edit.vue")
            },
            {
                path: "/statistics",
                name: "statistics",
                component: () =>
                    import ("../views/Statistics/statistics.vue")
            }
        ]
    },
    {
        path: "/sign",
        name: "sign",
        component: () =>
            import ("../views/Sign/sign.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("../views/Register/register.vue")
    },
    {
        path: "/map",
        name: "map",
        component: () =>
            import ("../views/Article/高德地图/map.vue")

    },




    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    let username = localStorage.getItem("username")
    if (to.path === "/sign" || to.path === "/register") {
        next()
    } else {
        username ? next() : next("/sign")
    }


})












export default router