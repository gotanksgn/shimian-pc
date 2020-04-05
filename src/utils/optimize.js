//性能优化
/**
 * 判断浏览器是否支持webP格式图片
 * @return {boolean}
 */
let isSupportWebP = () => {
    return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
}

/**
 * 替换webP
 * @param {string} attr 
 * @return {void}
 */
let loadWebP = (attr = 'data-webp') => {
    window.onload = function () {
        if (isSupportWebP()) {
            var $img = document.getElementsByTagName('img');
            for (var i = 0; i < $img.length; i++) {
                $img[i].setAttribute('src', $img[i].getAttribute(attr));
            }
        }
    }
}

/**
 * 防抖动
 * @param {function} func 要执行的函数 
 * @param {number} delay 间隔时间
 * @return {function}
 */
let debounce = (func, delay) => {
    let timer = null;
    return function () {
        // 通过this和arguments获取函数的作用域和变量
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(context, args);
        }, delay);
    }
}

/**
 * 节流
 * @param {function} func 要执行的函数 
 * @param {number} delay 间隔时间
 * @returns {function}
 */
let throttle = (func, delay) => {
    let timer = null;
    let startTime = Date.now();

    return function () {
        let curTime = Date.now();
        let remaining = delay - (curTime - startTime);
        let context = this;
        let args = arguments;

        clearTimeout(timer);
        if (remaining <= 0) {
            func.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(func, remaining);
        }
    }
}

export default {
    isSupportWebP,
    loadWebP,
    debounce,
    throttle
}