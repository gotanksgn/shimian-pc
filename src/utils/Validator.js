// TODO js表单验证

var rules = {
    isNotEmpty(value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },
    // 限制最小长度
    minLength(value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg;
        }
    },
    // 手机号码格式
    mobileFormat(value, errorMsg) {
        var reg = /(^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$)/;
        if (!reg.test(value)) {
            return errorMsg;
        }
    },
    idCard(value, errorMsg) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test(value)) {
            return errorMsg;
        }
    },
    isAgree(value, errorMsg) {
        if (!value) {
            return errorMsg;
        }
    }
}
var Validator = function () {
    this.cache = [];  // 保存效验规则
};
Validator.prototype.add = function (value, rule, errorMsg) {
    var str = rule.split(":");
    this.cache.push(function () {
        // str 返回的是 minLength:6
        var ruleName = str.shift();
        str.unshift(value); // 把input的value添加进参数列表
        str.push(errorMsg);  // 把errorMsg添加进参数列表
        return rules[ruleName].apply(value, str);
    });
};
Validator.prototype.validate = function () {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var msg = validatorFunc();
        if (msg) {
            return msg;
        }
    }
};
