// define([
//     'require',
//     'jquery'
// ], function(require, $) {
//     $(function () {
//         var $li = $(".float-right");
//         $li.click(function () {
//             alert("hhhh");
//         })
//     })
// });
//目前没什么用  可删
define(function(){
    return{
        mouseClick : function(){
            var $li = $(".float-right");
            $li.click(function () {
                alert("hhhh");
            })
        }
    };
})