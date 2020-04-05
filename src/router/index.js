// 导入组件
import Vue from 'vue';
import VueRouter from 'vue-router';
// 登录
import Login from '@/views/login.vue';
// 职位管理
import JobManager from '@/views/job/jobManager.vue';

// 面试间
import VideoManager from '@/views/video/videoManager.vue'
import VideoRoom from '@/views/video/videoRoom.vue';

//帮助中心
import HelpManager from '@/views/help/helpManager.vue';

// 测试
import VideoDemo from '@/views/video/videoDemo'


// 启用路由
Vue.use(VueRouter);

// 导出路由 
export default new VueRouter({
    routes: [{
        path: '/',
        component: Login
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/job-manager',
        component: JobManager
    }, {
        path: '/video-manager',
        component: VideoManager
    }, {
        path: '/video-room',
        component: VideoRoom
    },{
        path: '/video-demo',
        component: VideoDemo
    },{
        path: '/help-manager',
        component: HelpManager
    }
	]
})