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
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
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
 * 获取浏览器类型和版本
 * @param {boolean} versions 
 * @return {string}
 */
const getExplore = function (versions) {
    var sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
            (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
                (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
                    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
                        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
                            (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.ie) return versions ? ('IE: ' + sys.ie) : 'IE'
    if (sys.edge) return versions ? ('EDGE: ' + sys.edge) : 'EDGE'
    if (sys.firefox) return versions ? ('Firefox: ' + sys.firefox) : 'Firefox'
    if (sys.chrome) return versions ? ('Chrome: ' + sys.chrome) : 'Chrome'
    if (sys.opera) return versions ? ('Opera: ' + sys.opera) : 'Opera'
    if (sys.safari) return versions ? ('Safari: ' + sys.safari) : 'Safari'
    return 'Unkonwn'
}

/**
 * 
 * url参数转对象
 * @param  {String} url url
 * @return {object}
 */
let urlParamsToObj = function (url) {
    url = url == null ? window.location.href : url
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
        return {}
    }
    if (!search.includes('=')) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).
        replace(/"/g, '\\"').
        replace(/&/g, '","').
        replace(/=/g, '":"') + '"}');
}

/**
 *  对象参数添加到url上
 * @param {string} url url
 * @param {object} params 参数
 * @return {string} url
 */
let objToUrlParams = function (url, params) {
    if (url.includes('?')) {
        for (var p in params) {
            url += `&${p}=${params[p]}`
        }
    } else {
        url += '?_p';
        for (var p in params) {
            url += `&${p}=${params[p]}`
        }
    }
    return url
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
 * @return {string}
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

    var uuid = s.join('');
    return uuid;
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
    isEmptyObject,
    isArray,
    clone,
    getOS,
    getExplore,
    urlParamsToObj,
    objToUrlParams,
    getParame,
    randomWord
}