import {lstore} from '@/utils/store.js'
import {enterprisePositionsApi} from '@/api/jobFun.js'
/**
 * 系统登陆
 */
const state = {
	user: lstore.get("user"),
	menuList: []
}

const getters = {
  
}

const actions = {
	getMenuList({ commit }) {
		enterprisePositionsApi(false,false).then(
			()=>{
				commit("setMenuList", [
					{id:1,label:'职位管理',route:'/job-manager'},
					{id:2,label:'面试间',route:'/video-manager'},
					{id:3,label:'简历市场',route:'/resume-market'}
					/**,{id:4,label:'帮助中心',route:'/help-manager'}**/
					]);
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
		lstore.set("user",state.user);
	},
	// 退出
	logout() {
		lstore.clear("user");
		lstore.clear("token");
	},
	setMenuCount(state,data){
		/* console.log("state.menuList2="+state.menuList); */
		let list = Object.assign([],state.menuList);
		for(let i=0;i<list.length;i++){
			if(list[i].id==data.id){
				list[i].count=data.count;
			}
		}
		state.menuList=Object.assign([],list);
		console.log("state.menuList3="+state.menuList);
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}