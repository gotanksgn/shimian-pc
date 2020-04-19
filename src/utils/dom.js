import optimize from './optimize'
/**
 * 是否有指定样式
 * @param {object} ele dom节点
 * @param {string} cls class名称
 * @return {boolean}
 */
let hasClass = function (ele, cls) {
    return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * 为指定的dom元素添加样式
 * @param {object} ele dom节点
 * @param {string} cls class名称
 * @return {void}
 */
let addClass = function (ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
}
/**
 * 删除指定dom元素的样式
 * @param {object} ele dom节点
 * @param {string} cls class名称
 * @return {void}
 */
let removeClass = function (ele, cls) {
    if (hasClass(ele, cls)) {
        let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        ele.className = ele.className.replace(reg, " ");
    }
}
/**
 * 如果存在(不存在)，就删除(添加)一个样式
 * @param {object} ele dom节点
 * @param {string} cls class名称
 * @return {void}
 */
let toggleClass = function (ele, cls) {
    if (hasClass(ele, cls)) {
        removeClass(ele, cls);
    } else {
        addClass(ele, cls);
    }
}

/**
 * 获取滚动条距离顶部的距离
 * @return {number}
 */
let getScrollTop = function () {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

/**
 * 获取元素的距离文档的位置
 * @param {object} ele dom节点
 * @return {number}
 */
let offset = function (ele) {
    if (!isDOMElement(ele)) {
        throw '不是dom对象'
    }
    var pos = {
        left: 0,
        top: 0
    };
    while (ele) {
        pos.left += ele.offsetLeft;
        pos.top += ele.offsetTop;
        ele = ele.offsetParent;
	};
    return pos;
}

/**
 * 设置滚动条距顶部的距离
 * @param {number} value 距离
 * @return {void}
 */
let setScrollTop = function (value) {
    window.scrollTo(0, value);
}

var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

/**
 * 平滑滚动到指定位置
 * @param {number} to 距离顶部的距离
 * @param {number} duration 滚动的时间
 * @return {void}
 */
let smoothScroll = function (to, duration) {
    if (duration < 0) {
        setScrollTop(to);
        return;
    }
    let diff = to - getScrollTop();
    if (diff === 0) return;
    let step = diff / duration * 10;
    requestAnimFrame(
        function () {
            if (Math.abs(step) > Math.abs(diff)) {
                setScrollTop(getScrollTop() + diff);
                return;
            }
            setScrollTop(getScrollTop() + step);
            if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
                return;
            }
            smoothScroll(to, duration - 16);
        }
    );
}

/**
 * 当元素滚动到顶部时固定元素
 * @param {object} ele dom节点
 * @return {void}
 */
let pin = function (ele) {
    if (!isDOMElement(ele)) {
        throw '不是dom对象'
    }
    let mTop = ele.offsetTop;
    window.onscroll = optimize.throttle(function () {
        let sTop = getScrollTop()
        if (mTop - sTop <= 0) {
            ele.style.left = 0;
            ele.style.top = 0;
            ele.style.position = 'fixed';
        } else {
            ele.style.left = 'unset';
            ele.style.top = 'unset';
            ele.style.position = 'relative';
        }
    }, 20)
}

/**
 * 判断是否是dom对象
 * @param {object} obj 
 * @return {boolean}
 */
let isDOMElement = function (obj) {
    return !!(obj && typeof window !== 'undefined' && (obj === window || obj.nodeType));
}

export default {
    hasClass,
    addClass,
    removeClass,
    toggleClass,
    getScrollTop,
    setScrollTop,
    offset,
    smoothScroll,
    pin,
    isDOMElement
}