/**
 * 系统配置
 */
const state = {
	debug:{
		isOpen:false,
		token:''
	},
	autoLoad:true
}

const getters = {

}

const actions = {
	
}

const mutations = {
	openDebug(state){
		state.debug.isOpen=true;
	},
	closeDebug(state){
		state.debug.isOpen=false;
	},
	openAutoLoad(state){
		state.autoLoad=true;
	},
	closeAutoLoad(state){
		state.autoLoad=false;
	},
	setToken(state,data){
		state.debug.token=data;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}