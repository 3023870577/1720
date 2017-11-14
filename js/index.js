$(function(){
    $("#head").load("publick.html");
    // $(".banner").click(function(){
    //     alert("哈哈哈哈");
    // })
    var timer = setInterval(autoplay,2000);
    var index = 0;
    var $banList =  $(".banner-item");
    function autoplay(){
        index ++;
        if(index == $banList.size()){
            index = 0;
        }     
        $banList.eq(index).addClass("star").siblings().removeClass("star") 
    }  
})