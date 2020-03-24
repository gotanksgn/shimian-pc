import Vue from 'vue'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// 引入路由
import router from './router';
// 引入状态管理
import store from './vuex/store';
// 引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.use(store);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, //使用store vuex状态管理
    components: { App },
    template: '<App/>',
    data: {
        // 空的实例放到根组件下，所有的子组件都能调用
        Bus: new Vue()
    }

})
