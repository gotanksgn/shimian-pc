import {lstore} from '@/utils/store.js'
import {getInvitationsWaitByStaffApi,getInvitationsUnevaluatedByStaffApi,getInvitationsFinishByStaffApi} from '@/api/interviewFun.js'
/**
 * 视频面试
 */
const state = {
	waitList:[],
	doneList:[],
	unevaluatedList:[],
	currentInvitation:{}
}

const getters = {
  
}

const actions = {
	getWaitList({commit}){
		getInvitationsWaitByStaffApi({"staffId":lstore.get("staff").id}).then(res=>{
			commit("setWaitList",res.data);
		});
	},
	getUnevaluatedList({commit}){
		getInvitationsUnevaluatedByStaffApi({"staffId":lstore.get("staff").id}).then(res=>{
			commit("setUnevaluatedList",res.data);
		});
	},
	getDoneList({commit}){
		getInvitationsFinishByStaffApi({"staffId":lstore.get("staff").id}).then(res=>{
			commit("setDoneList",res.data);
		});
	}
}

const mutations = {
	pushWaitList(state, data){
		state.waitList.push.apply(state.waitList,data);
	},
	setWaitList(state,data){
		state.waitList=data;
	},
	setUnevaluatedList(state,data){
		state.unevaluatedList=data;
	},
	setDoneList(state,data){
		state.doneList=data;
	},
	setCurrentInvitation(state,data){
		state.currentInvitation=data;
		console.log("state.currentInvitation="+JSON.stringify(state.currentInvitation));
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}