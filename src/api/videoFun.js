/**
 * 视频相关API
 * create by gemini.liu
 */

/* import {req} from './axiosFun'; */
import {aliReq} from './axiosAliFun'

//获取播放视频
export const getVodPlayApi= (data)=>{
	return aliReq("get","/api/vod/play/info",data);
};

//获取阿里鉴权
export const rtcAuthApi = (data)=>{
	return aliReq("get","/api/rtc/auth/token",data);
}
