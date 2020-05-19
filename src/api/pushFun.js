/**
 * 消息推送API
 * create by gemini.liu
 */
import {req} from './axiosFun';

// 鉴权取token
export const authOtpApi = () => {return req("get", "/api/auth/goeasy/otp")};