/**
 * 脱敏工具类
 * create by gemini.liu
 */

/**
 * 姓名脱敏，暂不考虑复姓
 * @param {Object} userName
 * @param {Object} isMale
 */
let encryptedUserName=function(userName,isMale){
	isMale = isMale?isMale:true;
	/* console.log("userName="+userName.substr(0,1)); */
	return userName && userName.length>0 ? (userName.substr(0,1)+(isMale?"先生":"女士")):"";
}

/**
 * 电话号码脱敏
 * @param {Object} phone
 */
let encryptedPhone = function(phone){
	return phone && phone.length>10?phone.replace(/(\d{3})\d*(\d{4})/,'$1****$2'):"***";
}

/**
 * 邮箱脱敏
 * @param {Object} email
 */
let encryptedEmail = function(email){
	if(email==undefined || email==null){
		return "p**@***.com";
	}
	return encryptedCommon(email,1,email.indexOf("@"));
}


/**
 * 通用脱敏
 * @param {Object} str
 * @param {Object} beginLen
 * @param {Object} endLen
 */
let encryptedCommon = function(str, beginLen, endLen){
	var len = str.length;
	var firstStr = str.substr(0, beginLen);
	var lastStr = str.substr(endLen);
	var middleStr = str.substring(beginLen, len-Math.abs(endLen)).replace(/[\s\S]/ig, '*');
	return firstStr+middleStr+lastStr;

}

export default {
	encryptedUserName,
	encryptedPhone,
	encryptedEmail
}