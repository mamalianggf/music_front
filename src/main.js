import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from "axios";
import Qs from "qs";
import VueCookies from "vue-cookies";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    let url = config.url;
    let res = url.endsWith(".do");
    if (res) {//后缀为.do则需要判断token
        let token = VueCookies.get("token");
        if (token == null) {
            router.push({name: "login"});
        }
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么;处理ExceptionHandler对象的返回
    if (response.data.status == 500) {
        Vue.prototype.$message({
            showClose: true,
            message: response.data.message,
            type: 'error',
            duration: 3000
        });
        return Promise.reject(response.data.message);
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    Vue.prototype.$message({
        showClose: true,
        message: '未处理的服务器错误',
        type: 'error',
        duration: 3000
    });
    return Promise.reject(error);
});

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.prototype.$qs = Qs;

Vue.use(ElementUI);
Vue.use(VueCookies);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
