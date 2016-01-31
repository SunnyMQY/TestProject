//define(function (require, exports) {
//    var util = require('util');
//    var $ = require('jquery');
//    console.log($);
//    $(function () {
//        alert('ddd');
//        alert(util.minus(2, 34));
//    });
//});

seajs.use(['jquery', 'util'], function ($, util) {
    $(function () {
        alert(util.minus(5, 3));
    });
});