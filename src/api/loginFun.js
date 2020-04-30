/**
 * 登陆API
 * create by gemini.liu
 */
import { loginreq,req } from './axiosFun';

const APP_CODE="shimianPC";

// 发送验证码
export const smscodeApi = (phone) => {return loginreq("post", "/api/user/logins/smscode", {phone:phone})};

// 短信验证接口
export const tokenApi = (phone,smsCode) => {return loginreq("post","/api/user/logins/token",{appCode:APP_CODE,phone:phone,smsCode:smsCode,webId:'cli_'+phone})};

// 获取用户信息接口
export const userinfoApi = ()=>{return req("get","/api/user/infos")};
