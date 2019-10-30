import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: ()=>import('../views/home.vue')//懒加载
  }
]

const router = new VueRouter({
  mode: 'history',/*默认是hash，url后带#*/
  base: process.env.BASE_URL,
  routes
})

export default router
