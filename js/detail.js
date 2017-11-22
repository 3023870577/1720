requirejs.config({
    paths : {
        jquery : "jquery-1.11.3",
        cookie : "cookie"
    }
})
requirejs(["jquery","cookie"],function($,cookie){
    $(function(){
        //ajax方法请求公共的HTML文件
        $("#head").load("publick.html .header", function () {
            var $wineWrap = $(".nav-down");
            var $winetit = $(".nav-down-con");
            $winetit.mouseenter(function () {
                $(this).find($(".nav-down")).stop().css({ "z-index": "5" }).animate({ "height": "164px" }, 500);
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
            $(window).scroll(function () {
                var $top = $(document).scrollTop();
                // console.log($top);
                var $nav = $(".position-content");
                if ($top >= 200&&$top<=800) {
                    $nav.css({ "position": "fixed", "top": "0", "width": "100%" });
                } else {
                    $nav.css({ "position": "relative", "top": "null", "width": "100%" })
                }
            })
            //          用户登录和注册部分
            $(".login").click(function () {
                location.href = "login.html";
            })
            $(".register").click(function () {
                location.href = "register.html"
            })
            $(".sigout").click(function () {
                $(".login-0").css("display", "block");
                $(".logined").css("display", "none");
                removeCookie("logineduser");
                console.log(getCookie("logineduser"));
            })
            var str = getCookie("logineduser");
            if (str.length != 0) {
                $(".login-0").css("display", "none");
                $(".logined").css("display", "block");
                $(".user").html(str.username);
            } else {
                $(".login-0").css("display", "block");
                $(".logined").css("display", "none");
            }
        });    
    })
    // 页面本身的效果
    $(function(){
        $(window).scroll(function(){
            var $top = $(document).scrollTop();
            var $nav = $(".detail-nav");
            if($top > 800){
                $nav.css({ "position": "fixed", "top": "-50px","box-shadow": "0 1px 1px #eee" });
                $(".nav-buy-btn").css("display","block");
            }else{
                $nav.css({ "position": "relative", "top": "null" })
                $(".nav-buy-btn").css("display", "none");
            }
        })
    })
    // 产品相册
    $(function(){
        var $prevBtn = $(".prev");
        var $nextBtn = $(".next");
        var $li = $(".thumb-list li"); 
        // 下按钮
        var toggle = true;
        var toggler = true;
        $nextBtn.click(function(){
            if(toggle){
                toggle = false;
                var $top = parseInt($(".thumb-list").css("margin-top"));
                if(Math.abs($top) >= 152){
                    $(".thumb-list").css("margin-top",$top);
                    toggle = true;
                }else{
                    $(".thumb-list").animate({"margin-top":$top - 76 + "px"},500,function(){
                        toggle = true;
                    });
                }
            }  
        })
        // 上按钮
        $prevBtn.click(function(){
            if(toggler){
                toggler = false;
                var $top = parseInt($(".thumb-list").css("margin-top"));
                if (Math.abs($top) <= 0) {
                    $(".thumb-list").css("margin-top", $top);
                    toggler = true;
                } else {
                    $(".thumb-list").animate({ "margin-top": $top + 76 + "px" }, 500,function(){
                        toggler = true; 
                    });
                }
            }
            
        })
        var $pro = $(".pro-album-preview img");
        var $proImg = $(".pro-album-big img");
        var $mask = $(".mask");
        var $bigMask = $(".big-mask");
        // 小图
        $li.mouseenter(function(){
            var $index = $(this).index();
            $(this).addClass("act").siblings().removeClass("act");
            $pro.eq($index).addClass("active").siblings().removeClass("active");
            $proImg.eq($index).addClass("active").siblings().removeClass("active");
        })
        //中图
        $bigMask.mouseover(function(e){
            $(".pro-album-big").css("display","block");
            $mask.css("display", "block");
            var e = e || event;
        })
        //放大镜效果
        $bigMask.mousemove(function(e){
            var e = e || event;
            var left = e.pageX - $(this).offset().left - $mask.outerWidth()/2;
            var top = e.pageY - $(this).offset().top - $mask.outerHeight()/2;  
            var maxL = $(".pro-album-preview").outerWidth() - $mask.outerWidth();
            var maxT = $(".pro-album-preview").outerHeight() - $mask.outerHeight()
            left = Math.min(maxL , Math.max(0,left));
            top = Math.min(maxT , Math.max(0,top));
            $mask.css({"left":left,"top":top});
            var percentX = left/($bigMask.outerWidth() - $mask.outerWidth());
            var percentY = top/($bigMask.outerHeight() - $mask.outerHeight());
            var bigLeft = percentX * ($proImg.outerWidth() - $(".pro-album-big").outerWidth());
            var bigTop = percentY * ($proImg.outerHeight() - $(".pro-album-big").outerHeight());
            $proImg.css({"left":-bigLeft,"top":-bigTop});
        })

        $bigMask.mouseout(function(){
            $(".pro-album-big").css("display", "none");
            $mask.css("display", "none");
        })
    })
    $(function(){
        var $increaseBtn = $(".btn-increase");
        var $decreaseBtn = $(".btn-decrease");
        var $buyNum = $(".buy-num");
        var $val = $buyNum.val();
        var $pri = $(".action-price").html();
        $increaseBtn.click(function(){
            $buyNum.attr({"value":++$val});
            $(".action-price").html($val*$pri+".00");
        })
        $decreaseBtn.click(function () {
            if($val ==1){
                $buyNum.attr({ "value": $val });
                $(".action-price").html($val * $pri + ".00");
            }else{
                $buyNum.attr({ "value": --$val });
                $(".action-price").html($val * $pri + ".00");
            }
            
        })
    })
    // 锚点导航
    $(function(){
        $(".list-item").hover(function(){
            $(this).find($("a")).css("color","#d92a4b");
        },function(){
            $(this).find($("a")).css("color", "#333333");
        })
        $(".list-item").click(function(){
            $(this).addClass("cur").siblings().removeClass("cur");
        })
    })
    //公共尾部  
    $(function () {
        // ajax请求公共html文件
        $("#footer").load("publick.html .footer");
    })

    //float-tag
    $(function () {
        // ajax请求公共右部的固定内容，同时在回调函数里添加事件，不然会找不到
        $("#float-tag").load("publick.html .float-tag", function () {
            var $li = $(".float-right");
            var $hide = $(".hide");
            var $btn = $(".btn");
            $li.mouseenter(function () {
                $(this).find($hide).css("display", "block");
            }).mouseleave(function () {
                $(this).find($hide).css("display", "none");
            })
            // 点击返回顶部
            $btn.click(function () {
                $("body,html").animate({ scrollTop: 0 }, 1000);
            })
        });
    })
})