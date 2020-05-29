/**
 * 职位管理业务API
 * create by gemini.liu
 */
import {req} from './axiosFun';

// 获取职位列表
export const enterprisePositionsApi=(withStaff,withEnterprise)=>{return req("get","/api/enterprise/positions",{withStaff:withStaff,withEnterprise:withEnterprise})};

// 保存职位
export const savePositionApi=(data)=>{return data.id?req("put","/api/enterprise/positions/"+data.id,data):req("post","/api/enterprise/positions",data)};

//删除职位
export const deletePositionApi=(data)=>{return req("delete","/api/enterprise/positions/"+data.id)}

//关闭职位
export const closePositionApi=(data)=>{return req("patch","/api/enterprise/positions/"+data.id+"/activestatus",{activeStatus:0})}

//启用职位
export const openPositionApi=(data)=>{return req("patch","/api/enterprise/positions/"+data.id+"/activestatus",{activeStatus:1})}

//获取企业用户信息
export const enterpriseStaffsApi=(withStaff,withEnterprise)=>{return req("get","/api/enterprise/staffs",{withEnterprise:withEnterprise})};
