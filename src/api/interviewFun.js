/**
 * 面试API
 * create by gemini.liu
 */
import {req} from './axiosFun';
//预约面试
export const createInvitationApi=(data)=>{return req('post','/api/interview/invitations',data)};

//获取面试邀请
export const getInvitationsByStaffApi=(data)=>{return req('get','/api/interview/invitations/by-staffid',data)}

//获取待面试面试邀请
export const getInvitationsWaitByStaffApi=(data)=>{return req('get','/api/interview/invitations/by-staffid/1',data)}

//获取待评价面试
export const getInvitationsUnevaluatedByStaffApi=(data)=>{return req('get','/api/interview/invitations/by-staffid/2',data)}

//获取已结束面试邀请
export const getInvitationsFinishByStaffApi=(data)=>{
	data.limit=100;
	return req('get','/api/interview/invitations/by-staffid/3',data)
}

//获取已处理面试邀请

//呼叫面试请求
export const pushCallApi=(data)=>{return req('post','/api/interview/invitations/push-call',data)}