// gulp文件导入
var gulp = require("gulp");

//布置一个任务
gulp.task("say", function () {
    console.log("说一段神话");
});

//布置一个任务
gulp.task("sing", function () {
    console.log("话说那么一家");
});

//布置一个默认任务
gulp.task("default", ["say", "sing"], function () {
    console.log("默认任务执行");
})