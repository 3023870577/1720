requirejs.config({
    paths : {
        jquery : "jquery-1.11.3",
        cookie : "cookie"
    }
})
requirejs(["jquery","cookie"], function ($,cookie){
    $(function () {
        //ajax方法请求公共的HTML文件
        $("#head").load("publick.html .header",function(){
            var $wineWrap = $(".nav-down");
            var $winetit = $(".nav-down-con");
            $winetit.mouseenter(function(){
                $(this).find($(".nav-down")).stop().css({ "z-index": "5" }).animate({ "height": "164px" },500);
            })
            $wineWrap.mouseenter(function () {
                $(this).stop().css({ "z-index": "5" }).animate({ "height": "164px" }, 500);
            })
            $wineWrap.mouseleave(function () { 
                $wineWrap.stop().animate({ "height": "0" }, 500);
            })
            $winetit.mouseleave(function () {
                $wineWrap.stop().animate({ "height": "0" }, 500);
            })
            // 顶部悬浮
            $(window).scroll(function(){
                var $top = $(document).scrollTop();
                 console.log($top);
                var $nav = $(".position-content");
                if($top >= 200){
                    $nav.css({"position":"fixed","top":"0","width":"100%"});
                }else{
                    $nav.css({ "position": "relative", "top": "null", "width": "100%" })
                }
            })  
//          用户登录和注册部分
			$(".login").click(function(){
				location.href = "login.html";
			})
			$(".register").click(function(){
				location.href = "register.html"
			})
			$(".sigout").click(function(){
				$(".login-0").css("display","block");
            	$(".logined").css("display","none");
                removeCookie("logineduser");
                console.log(getCookie("logineduser"));
			})
            var str = getCookie("logineduser");
            if(str.length != 0){
            	$(".login-0").css("display","none");
            	$(".logined").css("display","block");
            	$(".user").html(str.username);
            }else{
                $(".login-0").css("display", "block");
                $(".logined").css("display", "none");
            }
        });
        // 轮播图
        var timer = setInterval(autoplay, 3000);
        var index = 0;
        var $banList = $(".banner-list");
        var $banItem = $(".banner-item");
        var $smallBanItem = $(".small-banner-item");
        var $smallBan = $(".small-banner");
        var $banner = $(".banner");
        //定时器
        function autoplay() {
            //console.log(index);
            index++;
            if (index == $banItem.size()) {
                index = 0;
            }
            $banItem.eq(index).animate({ "opacity": "1" }, 1500).siblings().animate({ "opacity": "0" }, 1500);
            $smallBanItem.eq(index).addClass("star").siblings().removeClass("star");
        }
        //鼠标移入移出
        $banner.mouseover(function () {
            clearInterval(timer);
            $smallBan.stop().animate({ "opacity": "1" }, 1500);
        })
        //鼠标移入图片列表
        $smallBanItem.mouseenter(function () {
            var i = $(this).index();
            // 记录当前图片下标
            index = i;
            $(this).addClass("star").siblings().removeClass("star");
            $banItem.stop().eq(index).animate({ "opacity": "1" }, 1500).siblings().animate({ "opacity": "0" }, 1500);
        })
        // 移出
        $banner.mouseleave(function () {
            timer = setInterval(autoplay, 3000);
            $smallBan.stop().animate({ "opacity": "0" }, 1500);
        })
    })
    // 人气推荐
    $(function () {
        var $leftBtn = $(".left-btn");
        var $rightBtn = $(".right-btn");
        var $hotList = $(".hot-list");
        
        var toggle = true;   
        var toggler = true;  
        //右按钮 点击时让图片左移1120px(当前left值减去要移动的距离)
        $rightBtn.click(function () {
            // alert("hhhh");
            if (toggle) { 
                toggle = false;
                var $left = parseInt($hotList.css("left"));
                var $width = parseInt($(".hot-item").eq(0).innerWidth());
                if (Math.abs($left) >= 2280) {
                    $hotList.css("left", "$left");
                    toggle = true;
                } else {
                    $hotList.animate({ "left": $left - ($width * 4) + "px" }, 1000,function(){
                        toggle = true;
                    });
                }   
            }
        })
        // var toggler = true;    
        //左按钮 点击时让图片右移1120px
        $leftBtn.click(function () {
            console.log(toggler)
            if(toggler){
                toggler = false;
                var $left = parseInt($hotList.css("left"));
                var $width = parseInt($(".hot-item").eq(0).innerWidth());
                if ($left >= 0) {
                    $hotList.css("left", "$left");
                    toggler = true;
                } else {
                    $hotList.animate({ "left": $left + ($width * 4) + "px" }, 1000,function(){
                        toggler = true;
                    });
                }
            }  
        })  
    })
    // 美酒部分
    $(function () {
        var $wineClass = $(".wine-classify");
        var $wineListCon = $(".wine-list-content");
        $wineClass.mouseenter(function () {
            // alert("hhh");
            var index = $(this).index();
            $(this).addClass("wine-cur").siblings().removeClass("wine-cur");
            $wineListCon.eq(index).css("display", "block").siblings().css("display", "none");
        })
    })

    //公共尾部  
    $(function(){
        // ajax请求公共html文件
        $("#footer").load("publick.html .footer");
    })

    //float-tag
    $(function(){
        // ajax请求公共右部的固定内容，同时在回调函数里添加事件，不然会找不到
        $("#float-tag").load("publick.html .float-tag",function(){
            var $li = $(".float-right");
            var $hide = $(".hide");
            var $btn = $(".btn");
            $li.mouseenter(function(){
                $(this).find($hide).css("display", "block");
            }).mouseleave(function(){
                $(this).find($hide).css("display", "none");
            })
            // 点击返回顶部
            $btn.click(function(){
                $("body,html").animate({ scrollTop: 0 },1000);
            })
        });
    })
    // ajak部分
    $(function () {
        $.getJSON("../mossel.json", function (res) {
            // alert(res.index.logo.length);
            // 轮播图
            var $bannerList = $(".banner-list");
            var $bannerItem = $(".banner-item img");
            for (var i = 0; i < $bannerItem.length; i++) {
                $bannerItem.eq(i).attr("src", "../image/index-img/" + res.index.banner[i]);
            }
            var $smallBanItem = $(".small-banner-item img");
            for (var i = 0; i < $bannerItem.length; i++) {
                $smallBanItem.eq(i).attr("src", "../image/index-img/" + res.index.smallbanner[i]);
            }
            // title部分
            var $titleItem = $(".title-item img");
            for (var i = 0; i < $titleItem.length; i++) {
                $titleItem.eq(i).attr("src", "../image/index-img/" + res.index.title[i]);
            }
            // 人气推荐
            var $hotItem = $(".hot-item img");
            for (var i = 0; i < $hotItem.length; i++) {
                $hotItem.eq(i).attr("src", "../image/index-img/" + res.index.hot[i]);
            }
            // 美酒部分
            var $wineItem = $(".wine-item img");
            for (var i = 0; i < $wineItem.length; i++) {
                $wineItem.eq(i).attr("src", "../image/index-img/" + res.index.wine[i]);
            }
            var $goods = $(".goods-pro img");
            for (var i = 0; i < $goods.length; i++) {
                $goods.eq(i).attr("src", "../image/index-img/" + res.index.goods[i]);
            }
            var $topic = $(".topic-item img");
            for (var i = 0; i < $topic.length; i++) {
                $topic.eq(i).attr("src", "../image/index-img/" + res.index.topic[i]);
            }
            var $taste = $(".taste-pro img");
            for (var i = 0; i < $taste.length; i++) {
                $taste.eq(i).attr("src", "../image/index-img/" + res.index.dream[i]);
            }
            var $tastePeo = $(".taste-pro-price img");
            for (var i = 0; i < $tastePeo.length; i++) {
                $tastePeo.eq(i).attr("src", "../image/index-img/" + res.index.dream[i + 3]);
            }
        })
    })
})