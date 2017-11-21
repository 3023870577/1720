requirejs.config({
    paths : {
        jquery : "jquery-1.11.3",
        cookie : "cookie"
    }
})
requirejs(["jquery", "cookie"], function ($, cookie){
    $(function(){
        //  	邮箱
		var flagemail = null;
		$(".username").blur(function(){
			var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
			var str = $(this).val();
			if(reg.test(str)){
				flagemail = true;
				$(this).next().css("display","none");
			}else{
				flagemail = false;
				$(this).next().css("display","block");
			}
		})
//		密码
		var flagepsd = null;
		$(".password").blur(function(){
			var reg = /^[a-z0-9_-]{6,20}$/;
			var str = $(this).val();
			if(reg.test(str)){
				flagepsd = true;
				$(this).next().css("display","none");
			}else{
				flagepsd = false;
				$(this).next().css("display","block");
			}
		})
//		验证码
		var flagecode = null;
		$(".writecode").blur(function(){
			var reg = /(63746)?/;
			var str = $(this).val();
			if(reg.test(str)){
				flagecode = true;
				$(this).parent().find($(".err")).css("display","none");
			}else{
				flagecode = false;
				$(this).parent().find($(".err")).css("display","block");
			}
		})
//		登录
		$(".login-btn").click(function(){
			var arr = [];
			console.log(flagemail);
			console.log(flagepsd);
			console.log(flagecode);
			if( flagemail && flagepsd && flagecode){
				var user = {
					username : $(".username").val(),
					password : $(".password").val()
				}
				arr = getCookie("userlist");
				if(arr.length!=0){
					for(var i = 0; i < arr.length; i ++){
						if(user.username == arr[i].username&&user.password == arr[i].password){
							alert("登录成功");
							setCookie("logineduser",JSON.stringify(user));
							//console.log(getCookie("logineduser"));
							location.href = "index.html";
							
						}else{
							alert("用户名不存在");
						}
					}
				}else{
					alert("用户未注册")
				}	
			}else{
				alert("用户名或密码不正确");
			}
		})
//		注册
		$(".btn").click(function(){
			location.href = "register.html";
		})
    })
})