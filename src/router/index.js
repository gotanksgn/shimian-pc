// 导入组件
import Vue from 'vue';
import VueRouter from 'vue-router';
// 登录
import Login from '@/views/login.vue';
// 职位管理
import JobManager from '@/views/job/jobManager.vue';

// 面试间
import VideoManager from '@/views/video/videoManager.vue'
/* import VideoRoom from '@/views/video/videoRoom.vue'; */

//帮助中心
import HelpManager from '@/views/help/helpManager.vue';

//简历市场
import ResumeMarket from '@/views/resume/resumeMarket.vue';

// 测试
import VideoDemo from '@/views/video/videoDemo'
import AutoLogin from '@/views/autoLogin.vue'

// 启用路由
Vue.use(VueRouter);

// 导出路由 
export default new VueRouter({
    routes: [{
        path: '/',
        component: Login,
		hidden: true,
		meta: {
			requireAuth: false
		}
    }, {
        path: '/login',
        component: Login,
		hidden: true,
		meta: {
			requireAuth: false
		}
    }, {
        path: '/auto-login',
        component: AutoLogin,
		hidden: true,
		meta: {
			requireAuth: false
		}
    }, {
        path: '/job-manager',
        component: JobManager,
		meta: {
			requireAuth: true
		}
    }, {
        path: '/video-manager',
        component: VideoManager,
		meta: {
			requireAuth: true
		}
    },/* {
        path: '/video-room',
        component: VideoRoom,
		meta: {
			requireAuth: true
		}
    }, */
	{
        path: '/video-demo',
        component: VideoDemo,
		meta: {
			requireAuth: false
		}
    },{
        path: '/help-manager',
        component: HelpManager,
		meta: {
			requireAuth: true
		}
    },{
        path: '/resume-market',
        component: ResumeMarket,
		meta: {
			requireAuth: true
		}
    }
	]
})