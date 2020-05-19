/**
 * 统一调用封装入口
 * create by gemini.liu
 */
import axios from 'axios';
import qs from 'qs';
import util from '@/utils/index.js';
const API_DOMAIN_PREFIX = 'https://mianshipower.com:9090/employ-biz';

// 登录请求方法
const loginreq = (method, url, params) => {
    return axios({
        method: method,
		baseURL:API_DOMAIN_PREFIX,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
		responseType: 'json',
		traditional: true,
		transformRequest: [function (data){
			return qs.stringify(data);
		}],
        data: params
    }).then(res =>{
		//console.log(res);
		return res.data;
	}).catch(error=>{
		//console.log(error.response);
		return error.response.data;
	});
};
// 通用公用方法
const req = (method, url, params) => {
    return axios({
        method: method,
		baseURL:API_DOMAIN_PREFIX,
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            token: util.lstore.get("token")
        },
		data:method!='get'?params:null,
		params:method=='get'?params:null,
		responseType: 'json',
        traditional: true,
        transformRequest: [function (data){
			return qs.stringify(data);
        }]
    }).then(res =>{
		console.log("url="+url+",res="+JSON.stringify(res.data));
		return res.data;
	}).catch(error=>{
		console.log("url="+url+",error=>"+JSON.stringify(error));
		let resp = error.response;
		if(resp.code==901 || resp.code==902 ||resp.code==903 ||resp.code==904 ||resp.code==905){
			console.log('token无效:'+resp.msg);
			this.$router.push('/login');
		}
		return error.response.data;
	});
};

export {
    loginreq,
    req
}