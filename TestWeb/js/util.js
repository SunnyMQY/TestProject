//为金额加千分符
function format(amount) {
    if (amount.indexOf(",") < 0) amount = amount.replace(/(\d+)(\d{3})$/, "$1,$2");
    else if (amount.indexOf(",") > 3) amount = amount.replace(/(\d{3}),/, ",$1,");
    if (amount.indexOf(",") > 3) return arguments.callee(amount);
    else return amount;
}
//格式化浮点数位
function format(decimals, precision) {
    precision = precision || 2;
    precision = precision < 0 ? 2 : precision;
    if (decimals.length == precision) return decimals;
    if (decimals.length < precision) {
        decimals += "0";
        if (decimals.length < precision) return arguments.callee(decimals, precision);
        else return decimals;
    } else {
        return (decimals.substr(0, precision) - 0) + ((decimals.substr(precision, 1) - 0) > 4 ? 1 : 0);
    }
}