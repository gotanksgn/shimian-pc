let PRODUCT_NAME = 'ty';

let store = {
    set(type, key, value) {
        if (type.getItem(PRODUCT_NAME) == null) {
            type.setItem(PRODUCT_NAME, '{}')
        }
        if (type.getItem(PRODUCT_NAME) != null) {
            let tempParamObj = JSON.parse(type.getItem(PRODUCT_NAME))
            tempParamObj[key] = value
            type.setItem(PRODUCT_NAME, JSON.stringify(tempParamObj))
        }
    },
    get(type, key) {
        let tempParamObj = JSON.parse(type.getItem(PRODUCT_NAME))
        if (tempParamObj == null) {
            return undefined
        } else {
            return tempParamObj[key]
        }
    },
    del(type, key) {
        if (type.getItem(PRODUCT_NAME) != null) {
            let tempParamObj = JSON.parse(type.getItem(PRODUCT_NAME))
            delete tempParamObj[key]
            type.setItem(PRODUCT_NAME, JSON.stringify(tempParamObj))
        }
    },
    clear(type) {
        type.removeItem(PRODUCT_NAME)
    }
}
/**
 * sessionStorage封装
 */
export let sstore = {
    /**
     * 添加
     * @param {string} key key
     * @param {string} value 值
     * @return {void}
     */
    set: function (key, value) {
        store.set(window.sessionStorage, key, value)
    },
    /**
     * 获取
     * @param {string} key key
     * @return {object}
     */
    get: function (key) {
        return store.get(window.sessionStorage, key)
    },
    /**
     * 删除
     * @param {string} key key
     * @return {void}
     */
    del: function (key) {
        store.del(window.sessionStorage, key)
    },
    /**
     * 清除
     * @return {void}
     */
    clear: function () {
        store.clear(window.sessionStorage)
    }
}

/**
 * localStorage封装
 */
export let lstore = {
    /**
     * 添加
     * @param {string} key key
     * @param {object} value 值
     * @return {void}
     */
    set: function (key, value) {
        store.set(window.localStorage, key, value)
    },
    /**
     * 获取
     * @param key key
     * @return {object}
     */
    get: function (key) {
        return store.get(window.localStorage, key)
    },
    /**
     * 删除
     * @param key key
     * @return {void}
     */
    del: function (key) {
        store.del(window.localStorage, key)
    },
    /**
     * 清除
     * @return {void}
     */
    clear: function () {
        store.clear(window.localStorage)
    }
}



/**
 * cookie封装
 */
export let cookie = {
    /**
     * 设置cookie key的值
     * @param {string} key key
     * @param {string} value 值
     * @param {number} time 失效时间
     * @return {void}
     */
    set: function (key, value, time) {
        if (key == undefined) {
            return;
        }
        if (time !== undefined) {
            let d = new Date();
            d.setTime(d.getTime() + time * 1000 * 60 * 60 * 24);
            document.cookie = key + "=" + value + ";expires=" + d.toGMTString();
        } else {
            document.cookie = key + "=" + value;
        }
    },
    /**
     * 获取cookie指定key值
     * @param {string} key key
     * @return {string}
     */
    get: function (key) {
        let index = document.cookie.indexOf(key);
        let returnValue;
        if (index !== -1) {
            let tIndex = document.cookie.indexOf(";", index);
            let target = document.cookie.substring(index, tIndex);
            let returnValue = decodeURIComponent(target.replace(key + "=", ""))
        }
        return returnValue;
    },
    /**
     * 删除cookie
     * @param {string} key key
     * @return {void}
     */
    del: function (key) {
        let d = new Date();
        document.cookie = key + "=;expires=" + d.toGMTString();
    }
}