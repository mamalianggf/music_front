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
    component: ()=>import('../views/login.vue')//懒加载
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import('../views/register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',/*默认是hash，url后带#*/
  base: process.env.BASE_URL,
  routes
})

export default router
