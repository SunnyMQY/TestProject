function minus(num1, num2) {
    /// <summary>减法运算</summary>
    /// <param name="num1" type="Number">数值1</param>
    /// <param name="num2" type="Number">数值2</param>
    return caculate(num1, num2, function (n1, n2, m) { return (n1 - n2) / m; });
}

function plus(num1, num2) {
    /// <summary>加法运算</summary>
    /// <param name="num1" type="Number">数值1</param>
    /// <param name="num2" type="Number">数值2</param>
    return caculate(num1, num2, function (n1, n2, m) { return (n1 + n2) / m; });
}

function times(num1, num2) {
    /// <summary>乘法运算</summary>
    /// <param name="num1" type="Number">数值1</param>
    /// <param name="num2" type="Number">数值2</param>
    return caculate(num1, num2, function (n1, n2, m) { return (n1 * n2) / (m * m); });
}

function devide(num1, num2) {
    /// <summary>除法运算</summary>
    /// <param name="num1" type="Number">数值1</param>
    /// <param name="num2" type="Number">数值2</param>
    return caculate(num1, num2, function (n1, n2) { return n1 / n2; });
}

function caculate(num1, num2, cacul) {
    if (num1 !== void 0 && num2 !== void 0 && num1 != null && num2 != null) {
        num1 = $.trim(num1 += '');
        num2 = $.trim(num2 += '');
        var numberPattern = /^-?\d+(.\d+)?$/, intPattern = /^-?\d+$/,
            precision1, precision2, multiple, reg1, reg2;
        if (num1.match(intPattern) && num2.match(intPattern))       //整数运算
            return cacul((num1 - 0), (num2 - 0), 1);
        if ((reg1 = numberPattern.exec(num1)) && (reg2 = numberPattern.exec(num2))) {  //浮点运算
            precision1 = reg1[1] != void 0 && reg1[1] != "" ? reg1[1].length - 1 : 0;
            precision2 = reg2[1] != void 0 && reg2[1] != "" ? reg2[1].length - 1 : 0;
            multiple = Math.pow(10, Math.max(precision1, precision2));
            return cacul(num1 * multiple, num2 * multiple, multiple);
        } return console.log("无效数字！") || "";
    } return console.log("未知的变量！") || "";
}







// #region Array Extension


// #region 数组类型检查(主要针对IE9以下版本)
if (!Array.isArray) {
    Array.isArray = function (arg) {
        /// <summary>判断要检查的对象是否为数组类型</summary>
        /// <param name="arg">要检查的对象</param>
        /// <returns>返回是否为数组类型</returns>
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
// #endregion 数组类型检查


// #region 数组过滤(主要针对IE9以下版本)
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisArg */) {
        "use strict";
        if (this === void 0 || this === null) throw new TypeError();

        var t = Object(this), len = t.length >>> 0;
        if (typeof fun !== "function") throw new TypeError();

        var result = [], thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];
                if (fun.call(thisArg, val, i, t))
                    result.push(val);
            }
        }
        return result;
    };
}
// #endregion 数组过滤(主要针对IE9以下版本)


// #region 获取数组索引
if (!Array.prototype.getItemIndex) {
    Array.prototype.getItemIndex = function (fun /*, thisArg */) {
        "use strict";
        if (this === void 0 || this === null) throw new TypeError();
        if (typeof fun !== "function") throw new TypeError();

        var index = -1;
        this.filter(function (item, idx) { if (index === -1 && fun(item, index)) index = idx; });
        return index;
    };
}
// #endregion 获取数组索引


// #endregion Array Extension



// #region String Extension


// #region 删除字符串两端的空白字符(主要针对IE9以下版本)
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        /// <summary>删除字符串两端的空白字符</summary>
        return this.replace(/^\s+|\s+$/g, '');
    }
}
// #endregion


// #region 字符串模板格式化
String.format = function (template/*,arg1...argn*/) {
    /// <summary>字符串模板格式化</summary>
    /// <param name="arg1...argN">要替换的字符</param>
    var result = template, regex;
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            regex = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            result = result.replace(regex, arguments[i]);
        }
    }
    return result;
};
// #endregion


// #region 字符串模板格式化
String.prototype.format = function () {
    /// <summary>字符串模板格式化</summary>
    /// <param name="arg1...argN">要替换的字符</param>
    var result = this, regex;
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            regex = new RegExp('\\{' + i + '\\}', 'gm');
            result = result.replace(regex, arguments[i]);
        }
    }
    return result;
};
// #endregion


// #region 字符串金额格式化
String.prototype.formatMoney = function (precision) {
    /// <summary>金额字符串格式化</summary>
    /// <param name="precision">金额小数位数</param>
    var money = this.toString(),
        regex = /^(-?\d+)(.(\d+))?$/,
        integer = money.replace(regex, "$1"),
        decimals = money.replace(regex, "$3");
    if (money.match(regex)) {
        precision = (precision = (precision || 2)) < 0 ? 2 : precision;
        decimals = (function (d, p) {
            /// <summary>金额小数位超过位数四舍五入，不够位数自动补全</summary>
            if (d.length == p) return d;
            if (d.length < p) {
                d += "0";
                if (d.length < p) return arguments.callee(d, p);
                return d;
            }
            return (d.substr(0, p) - 0) + ((d.substr(p, 1) - 0) > 4 ? 1 : 0);
        })(decimals, precision);
        if ((decimals += '').length > precision) {
            integer = (((integer -= 0) + (integer > 0 ? 1 : -1)) + '');
            decimals = (decimals + '').substr(1);
        }
        integer = (function (i) {
            /// <summary>金额整数位每隔3位加千分符</summary>
            var commaIndex = i.indexOf("-") === 0 ? 4 : 3;
            if (i.indexOf(",") < 0) i = i.replace(/(\d+)(\d{3})$/, "$1,$2");
            else if (i.indexOf(",") > commaIndex) i = i.replace(/(\d{3}),/, ",$1,");
            if (i.indexOf(",") > commaIndex) return arguments.callee(i);
            return i;
        })(integer);
        return String.format("￥ {0}.{1}", integer, decimals);
    }
    return money;
};
// #endregion


// #region 时间字符串格式化
String.prototype.formatDate = function (format) {
    /// <summary>时间字符串格式化</summary>
    /// <param name="format">时间格式(yyyy-MM-dd hh:mm:ss)</param>
    return (new Date(this.toString()) + "" !== "Invalid Date" ? new Date(this.toString()) : new Date()).format(format);
};
// #endregion


// #endregion String Extension



// #region Date Extension


// #region 日期格式化
Date.prototype.format = function (format) {
    /// <summary>日期格式化</summary>
    /// <param name="format">时间格式(yyyy-MM-dd hh:mm:ss)</param>
    format = format || "yyyy-MM-dd";
    var o = {
        "M+": this.getMonth() + 1,                      //month
        "d+": this.getDate(),                           //day
        "h+": this.getHours(),                          //hour
        "m+": this.getMinutes(),                        //minute
        "s+": this.getSeconds(),                        //second
        "q+": Math.floor((this.getMonth() + 3) / 3),    //quarter
        "S": this.getMilliseconds()                     //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};
// #endregion 日期格式化


// #endregion