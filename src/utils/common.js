/**
 * 判断字符串是否不为空
 * @param {string} str 字符串
 * @return {boolean} 
 */
let isNotEmpty = function (str) {
    if (str != '' && str != null && typeof str != 'undefined') {
        return true;
    }
    return false;
};

/**
 * 判断对象是否为空
 * @param {object} obj
 * @return {boolean}
 */
let isEmptyObject = function (obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
        return false
    return !Object.keys(obj).length
}

/**
 * 判断是否为true
 */
let isTrue = function(value, {zero = true, infinity = false, emptyString = false, emptyArray = false, emptyObject = false} = {}) {
	if(value === 0) return !!zero
	if(value === '') return !!emptyString
	if(value === Infinity) return !!infinity
	if(Array.isArray(value) && value.length === 0) return !!emptyArray
	if(value === null) return false
	if(typeof value === 'object' && Object.keys(value).length === 0) return !!emptyObject
	return !!value;
}

/**
 * 判断是否是数字
 * @param {object} n 
 * @return {boolean}
 */
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * 判断是否是数组
 * @param {object} obj 
 * @return {void}
 */
let isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * 克隆对象
 * @param {object} obj 
 * @return {object}
 */
let clone = function (obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [...obj];
        /* for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        } */
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("无法复制对象! 类型不支持");
}

/**
 * 获取操作系统
 * @return {string}
 */
const getOS = function () {
    var u = navigator.userAgent
    if (/iphone/i.test(u) || /ipad/i.test(u) || /ipod/i.test(u)) return 'ios'
    if (/android/i.test(u)) return 'android'
    if (/win/i.test(u) && /phone/i.test(u)) return 'windowsPhone'
    if (/mac/i.test(u)) return 'MacOSX'
    if (/win/i.test(u)) return 'windows'
    if (/linux/i.test(u)) return 'linux'
}


/**
 * 获取url参数
 * @param {string} name 参数名
 * @return {string}
 */
let getParame = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return '';
    }
};

/**
 * 生成任意长度随机字母数字组合
 * @param {boolean} flag 是否任意长度
 * @param {number} min 最小长度
 * @param {number} max 最大长度
 * @return {string}
 */
let randomWord = (flag = false, min, max) => {
    let str = "",
		pos,
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    if (flag) {
        range = Math.round(Math.random() * (max - min)) + min;// 任意长度
    }
    for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

/**
 * 生成uuid
 */
let UUID = function () {
    var s = [];
    var hexDigits = '0123456789abcdef';
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    return s.join('');
}

/**
 * img转base64
 * @param {string} url 
 * @param {function} callback 
 * @param {string} outputFormat 
 * @return {void}
 */
let ImgToBase64 = (url, callback, outputFormat) => {
    let targetWidth = 700;
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    let img = new Image()
    img.onload = () => {
        let scale = targetWidth / img.width
        canvas.width = scale > 1 ? img.width : targetWidth
        canvas.height = scale > 1 ? img.height : img.height * scale
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        let dataURL = canvas.toDataURL(outputFormat || 'image/png')
        callback.call(this, dataURL)
        canvas = null
    }
    img.src = url
}

export default {
    isNotEmpty,
    isEmptyObject,
	isNumber,
	isTrue,
    isArray,
    clone,
    getOS,
    getParame,
    randomWord,
	UUID,
	ImgToBase64
}