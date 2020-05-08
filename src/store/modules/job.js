import {enterpriseStaffsApi,enterprisePositionsApi,savePositionApi,deletePositionApi} from '@/api/jobFun.js'
import {lstore} from '@/utils/store.js'
/**
 * 职位管理
 */
const state = {
	hoursTip:'您好',
	jobList:[
		
	],
	staff:{},
	currentPosition: {},
	currentJob:{}
}


const getters = {
}

const actions = {
	getHoursTip({commit}){
		let date=new Date();
		let tip;
		if(date.getHours()>=5 && date.getHours()<12){
			tip="早上好"
		}else if(date.getHours()>=12 && date.getHours()<18){
			tip="下午好"
		}else{
			tip="晚上好"
		}
		commit('setHoursTip',tip);
	},
	getStaffInfo({commit}){
		enterpriseStaffsApi(true).then(res=>{
			if(res.code==0){
				commit("setStaffInfo",res.data);
			}else{
				console.log(res.msg);
			}
		});
	},
	getJobList({commit}){
		enterprisePositionsApi(true,true).then(res=>{
			if(res.code==0){
				let waitResumeCount = 0;
				let waitResumeList;
				commit('clearPositionList');
				res.data.forEach(function(item,idx){
					commit('pushPositionList',item);
					if(item.senders!=undefined && item.senders!=null){
						waitResumeList = item.senders.filter(sender=>{
							return sender.state=='SENT' || sender.state=='READ';
						});
						waitResumeCount=waitResumeCount+waitResumeList.length;
					}
					console.log("item="+item.id+"，waitResumeCount="+waitResumeCount);
					if(idx==res.data.length-1){
						commit('login/setMenuCount',{id:1,count:waitResumeCount}, {root: true});
					}
				});
			}else{
				console.log(res.msg);
			}
		});
	},
	savePosition({commit}, data) {
		//处理一下数据类型
		let saveData = Object.assign({},data);
		saveData.positionType=''+saveData.positionType.slice(-1);
		return new Promise((resolve, reject) => {
			savePositionApi(saveData).then(res=>{
				if(data.id){
					commit('setCurrentPosition', data);
				}else{
					data.id = res.data.id;
				}
				commit('pushPositionList', data);
				resolve(res);
			}).catch(error=>{
				reject(error);
			});
		});
	},
	deletePosition({commit}, data){
		return new Promise((resolve, reject) => {
			deletePositionApi(data).then(res=>{
				commit('removePosition',data);
				resolve(res);
			}).catch(error=>{
				reject(error);
			});
		});
	},
	getJob({commit},data){
		commit('setCurrentJob',data);
	}
}

const mutations = {
	setHoursTip(state,tip){
		state.hoursTip=tip;
	},
	setCurrentPosition(state, data){
		state.currentPosition = Object.assign(state.currentPosition,data);
		//暂时该字段缺失
		state.currentPosition.jobProps='全职';
	},
	clearPositionList(state){
		state.jobList=[];
	},
	pushPositionList(state,data){
		let curObj = state.jobList.filter(e=>e.id===data.id)[0];
		console.log("curObj="+JSON.stringify(data));
		if(curObj){
			Object.assign(curObj, data);
		}else{
			state.jobList.push(data);
		}
	},
	removePosition(state,data){
		state.jobList.splice(state.jobList.indexOf(data),1);
	},
	setCurrentJob(state,data){
		let curObj = state.jobList.filter(e=>e.id===data.id)[0];
		if(curObj){
			state.currentJob = Object.assign({},curObj);
		}else{
			state.currentJob = {};
		}
		/* console.log("setCurrentJob=>"+JSON.stringify(state.currentJob)); */
	},
	setStaffInfo(state,data){
		state.staff=Object.assign({},data);
		lstore.set("staff",state.staff);
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}