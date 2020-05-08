/**
 * 学生业务API
 * create by gemini.liu
 */
import {req} from './axiosFun';

//预约面试
export const getResumesBySearchKeyApi=(data)=>{return req('get','/api/student/resumes/by-searchkey',data)};
