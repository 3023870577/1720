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
                console.log($top);
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