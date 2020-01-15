import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')//懒加载
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register.vue')
    },
    {
        path: '/manage',
        name: 'manage',
        component: () => import('../views/manage.vue'),
        children: [//嵌套路由
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'song',
                component: () => import('../manage/song.vue'),
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',/*默认是hash，url后带#*/
    base: process.env.BASE_URL,
    routes
})

export default router
