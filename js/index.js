define([
    'require',
    'jquery'
], function(require, $) {
    $(function(){
        //ajax方法请求公共的HTML文件
        $("#head").load("publick.html");
        // $(".banner").click(function(){
        //     alert("哈哈哈哈");
        // })
        var timer = setInterval(autoplay,2000);
        var index = 0;
        var $banList = $(".banner-list");
        var $banItem =  $(".banner-item");
        var $smallBanItem = $(".small-banner-item");
        var $smallBan = $(".small-banner");
        var $banner = $(".banner");
        //定时器
        function autoplay(){
            console.log(index);
            index ++;
            if (index == $banItem.size()){
                index = 0;
            }     
            $banItem.eq(index).animate({ "opacity": "1" }, 1000).siblings().animate({ "opacity": "0" }, 1000);
            $smallBanItem.eq(index).addClass("star").siblings().removeClass("star");
        }
        //鼠标移入移出
        $banner.mouseover(function(){
            clearInterval(timer);
            $smallBan.stop().animate({ "opacity": "1" }, 1000);
        })
        //鼠标移入图片列表
        $smallBanItem.mouseenter(function () {
            var i = $(this).index();
            // 记录当前图片下标
            index = i;
            $(this).addClass("star").siblings().removeClass("star");
            $banItem.eq(index).animate({ "opacity": "1" }, 1000).siblings().animate({ "opacity": "0" }, 1000);
        })
        // 移出
        $banner.mouseleave(function () {
            timer = setInterval(autoplay,2000);
            $smallBan.stop().animate({ "opacity": "0" }, 1000);
        })       
    })
    $(function(){
        var $leftBtn = $(".left-btn");
        var $rightBtn = $(".right-btn");
        var $hotList = $(".hot-list");  
        //右按钮 点击时让图片左移1120px(当前left值减去要移动的距离)
        $rightBtn.click(function(){
            // alert("hhhh"); 
            var $left = parseInt($hotList.css("left"));
            var $width = parseInt($(".hot-item").eq(0).innerWidth());
            if(Math.abs($left) >= 2280){
                $hotList.css("left","$left");
            }else{
                $hotList.animate({"left":$left - ($width * 4) + "px"},1000);
            }     
        })
        //左按钮 点击时让图片右移1120px
        $leftBtn.click(function(){
            var $left = parseInt($hotList.css("left"));
            var $width = parseInt($(".hot-item").eq(0).innerWidth());
            if($left >= 0){
                $hotList.css("left", "$left");
            }else{
                $hotList.animate({ "left":$left + ($width*4) + "px"},1000);
            }
            
        })
    })
});



