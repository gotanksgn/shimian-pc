/**
 * 系统登陆
 */
const state = {
	user: {
		
	},
	menuList: []
}

const getters = {
  
}

const actions = {
	getMenuList({ commit }) {
		setTimeout(() => {
			commit("setMenuList", [
				{label:'职位管理',route:'/job-manager'},
				{label:'面试间',route:'/video-manager',count:5},
				{label:'帮助中心',route:'/help-manager'}])
		}, 1000);
	},
	getLoginUser({ commit }) {
		setTimeout(() => {
			commit("setLoginUser", {
				id:100001,
				fullname:'刘先生',
				phone:'19920104504'
			});
		}, 1000);
	}
}

const mutations = {
	setMenuList(state, data){
		state.menuList = data;
	},
	setLoginUser(state, data){
		state.user = data;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}