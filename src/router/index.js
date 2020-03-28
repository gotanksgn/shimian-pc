// 导入组件
import Vue from 'vue';
import VueRouter from 'vue-router';
// 登录
import Login from '@/views/login.vue';
// 职位管理
import JobManager from '@/views/job/jobManager.vue';

// 面试间


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
    }]
})