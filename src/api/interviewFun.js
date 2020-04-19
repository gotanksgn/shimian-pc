/**
 * 面试API
 * create by gemini.liu
 */
import {req} from './axiosFun';
//预约面试
export const createInvitationApi=(data)=>{return req('post','/api/interview/invitations',data)};