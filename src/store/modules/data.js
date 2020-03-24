import {login} from '@/api/userMG.js'
const state = {
	username: "",
	list: []
}

const getters = {
  
}

const actions = {
	getList ({ commit }) {
		//ajax
		setTimeout(() => {
			commit("setList", ["a","b","c","d"])
		}, 1000);
	}
}

const mutations = {
	setUsername(state, data){
		state.username = data;
	},
	setList(state, data){
		state.list = data;
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}