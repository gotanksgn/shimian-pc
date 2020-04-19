/**
 * 正则表达式封装
 */
let Regexp ={
    /**
     * 
     * 判断是否为邮箱地址
     * @param  {string}  str 待验证字符串
     * @return {boolean} 
     */
    isEmail(str) {
        var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        return reg.test(str);
    },
    /**
     * 判断是否是手机号码
     * @param  {string}  str 待验证字符串
     * @return {boolean} 
     */
    isMobilePhone(str) {
        var reg = /(^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9]|19[0-9])\d{8}$)/;
        return reg.test(str);
    },
    /**
     * 判断是否是身份证
     * @param  {string}  str 待验证字符串
     * @return {boolean} 
     */
    idCard(str) {
        var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        return reg.test(str);
    },
    /**
     * 判断是否是url
     * @param  {string}  str 待验证字符串
     * @return {boolean} 
     */
/*    isUrl(str) {
        var reg = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return reg.test(str);
    }, */
    /**
     * 判断是否是日期
     * @param  {string}  str 待验证字符串
     * @return {boolean} 
     */
    isDate(str) {
        var reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
        return reg.test(str);
    },
    /**
     * 判断是否包含中文
     * @param  {string}  str 待验证字符串
     * @return {boolean} 
     */
    isIncludeCn(str) {
        var reg = /[\u4E00-\u9FA5]/;
        return reg.test(str);
    },
    /**
     * 判断用户名4-16位（字母，数字，下划线，减号）
     * @param  {string}  str 待验证字符串
     * @return {boolean} 
     */
    isUserName(str) {
        var reg = /^[a-zA-Z0-9_-]{4,16}$/;
        return reg.test(str);
    },
}

export default Regexp