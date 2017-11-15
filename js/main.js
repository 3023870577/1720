requirejs.config({
    paths : {
        jquery : "jquery-1.11.3",
        index : "index"
    }
})
requirejs(["jquery","index"],function($,index){
    // $("body").css("background","red");
})