import {sstore} from '@/utils/store.js'
import {enterprisePositionsApi} from '@/api/jobFun.js'
/**
 * 系统登陆
 */
const state = {
	user: sstore.get("user"),
	menuList: []
}

const getters = {
  
}

const actions = {
	getMenuList({ commit }) {
		let jobCount = 0;
		enterprisePositionsApi(false,false).then(
			res=>{
				jobCount = res.data.length;
				commit("setMenuList", [
					{label:'职位管理',route:'/job-manager',count:jobCount},
					{label:'面试间',route:'/video-manager'},
					{label:'帮助中心',route:'/help-manager'}]);
			}
		);
	},
	saveLoginInfo({commit},user){
		commit("login",user);
	}
}

const mutations = {
	setMenuList(state, data){
		state.menuList = data;
	},
	// 登录
	login(state,user) {
		state.user = user;
		sstore.set("user",state.user);
	},
	// 退出
	logout() {
		sstore.clear("user");
		sstore.clear("token");
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}