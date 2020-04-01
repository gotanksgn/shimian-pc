import Vue from 'vue'
import App from './App.vue'

// 引入meta
import VueMeta from 'vue-meta'
Vue.use(VueMeta);

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入video-player
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

// 引入aliyun-webrtc
import AliyunWebRtc from 'aliyun-webrtc-sdk'
Vue.use(AliyunWebRtc)

// 引入路由
import router from './router';

// 引入状态管理
import store from './store';

// 引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, //使用store vuex状态管理
    render: h => h(App),
    // components: { App },
    // template: '<App/>',
    data: {
         // 空的实例放到根组件下，所有的子组件都能调用
        Bus: new Vue()
    }

})
