/**
 * 视频相关API
 * create by gemini.liu
 */

import {req} from './axiosFun';

export const getVodPlayApi= (videoId)=>{
	return req("get","/api/vod/play/info?videoId="+videoId,{});
};