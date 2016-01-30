define(function (require, exports) {
    function caculate(num1, num2, cacul) {
        /// <summary>
        /// 内部方法，浮点运算
        /// </summary>
        /// <param name="num1" type="decimal">数值1</param>
        /// <param name="num2" type="decimal">数值2</param>
        /// <param name="cacul" type="function">运算算法函数</param>
        /// <returns type="decimal">返回浮点型运算结果</returns>
        if (num1 !== void 0 && num2 !== void 0) {
            num1 = $.trim(num1 += '');
            num2 = $.trim(num2 += '');
            var numberPattern = /^-?\d+(.\d+)?$/,
                intPattern = /^-?\d+$/,
                reg1,
                reg2;
            if (num1.match(intPattern) && num2.match(intPattern))
                return cacul(num1, num2, 1);
            if ((reg1 = numberPattern.exec(num1)) && (reg2 = numberPattern.exec(num2))) {
                var reg11 = reg1[1],
                    reg21 = reg2[1],
                    precision1 = reg11 ? reg11.length - 1 : 0,
                    precision2 = reg21 ? reg21.length - 1 : 0,
                    multiple = Math.pow(10, Math.max(precision1, precision2));
                return cacul(num1 * multiple, num2 * multiple, multiple)
            }
            return console.log('无效数字！') || '';
        }
        return console.log('未知变量！') || '';
    }

    exports.minus = function (num1, num2) {
        /// <summary>
        /// 浮点型减法运算
        /// </summary>
        /// <param name="num1" type="decimal">数值1</param>
        /// <param name="num2" type="decimal">数值2</param>
        return caculate(num1, num2, function (n1, n2, m) {
            return (n1 - n2) / m;
        });
    };
    exports.add = function (num1, num2) {
        /// <summary>
        /// 浮点型加法运算
        /// </summary>
        /// <param name="num1" type="decimal"></param>
        /// <param name="num2" type="decimal"></param>
        return caculate(num1, num2, function (n1, n2, m) {
            return (n1 + n2) / m;
        });
    };
    exports.devide = function (num1, num2) {
        /// <summary>
        /// 浮点型除法运算
        /// </summary>
        /// <param name="num1" type="decimal">数值1</param>
        /// <param name="num2" type="decimal">数值2</param>
        return caculate(num1, num2, function (n1, n2) {
            return (n1 * n2);
        });
    };
    exports.multiply = function (num1, num2) {
        /// <summary>
        /// 浮点型乘法运算
        /// </summary>
        /// <param name="num1" type="decimal">数值1</param>
        /// <param name="num2" type="decimal">数值2</param>
        return caculate(num1, num2, function (n1, n2, m) {
            return n1 * n2 / m * m;
        });
    };
});