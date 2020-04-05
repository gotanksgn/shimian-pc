import {isNotEmpty} from './common.js'
/**
 * 获取当前时间戳
 * @return {number}
 */
let getTime = function () {
    return new Date().getTime();
}

/**
 * 距现在的已过时间
 * @param {string} startTime 开始日期字符串
 * @returns {string}
 */
let passedTime = function (startTime) {
    let currentTime = Date.parse(new Date()),
        time = currentTime - (new Date(startTime)),
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
    if (year) return year + "年前"
    if (month) return month + "个月前"
    if (day) return day + "天前"
    if (hour) return hour + "小时前"
    if (min) return min + "分钟前"
    else return '刚刚'
}

/**
 * 距现在的剩余时间
 * @param {string} endTime 结束日期字符串
 * @returns {string}
 */
let remainTime = function (endTime) {
    let startDate = new Date();
    let endDate = new Date(endTime);
    let t = endDate.getTime() - startDate.getTime(); //时间差
    let d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return `${d}天${h}小时${m}分钟${s}秒`;
}

/**
 * 格式化日期
 * @param {string} dateTime 日期/日期字符串
 * @param {object} fmt 格式
 * @return {string}
 */
let format = function (dateTime, fmt = 'yyyy-MM-dd hh:mm:ss') {
    let d=dateTime;
    let o = {
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度   
        "S": d.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 字符串转日期
 * @param {string} dateStr 日期字符串
 * @return {Date|''}
 */
let strToDate = function (dateStr) {
    if (isNotEmpty(dateStr)) {
        return new Date(Date.parse(dateStr.replace(/-/g, '/')));
    }
    return '';
};

/**
 * 比较两个日期
 * @param {Date} d1 第一个日期
 * @param {Date} d2 第二个日期
 * @return {number} 1:大于;0:等于;-1:小于
 */
let compareDate = function (d1, d2) {
    if (d1 && d2) {
        if (d1.getTime() > d2.getTime()) {
            return 1;
        } else if (d1.getTime() == d2.getTime()) {
            return 0;
        } else if (d1.getTime() < d2.getTime()) {
            return -1;
        }
    }
};

/**
 * 日期添加天数
 * @param {Date} date 日期
 * @param {number} dayNum 添加的天数
 * @return {Date}
 */
let addDay = function (date, dayNum) {
    if (isNotEmpty(date) && isNotEmpty(dayNum) && date instanceof Date && typeof dayNum == 'number') {
        date.setDate(date.getDate() + dayNum);
    } else {
        console.warn('日期或日期格式错误');
    }
    return date;
};

export default {
    getTime,
    passedTime,
    remainTime,
    format,
    strToDate,
    compareDate,
    addDay
}