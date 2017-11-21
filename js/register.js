requirejs.config({
    paths: {
        jquery: "jquery-1.11.3",
        cookie: "cookie"
    }
})
requirejs(["jquery","cookie"], function ($,cookie) {
    $(function () {
//  	邮箱
		var flagemail = null;
		$(".email").blur(function(){
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
		$(".psd").blur(function(){
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
//		确认密码
		var confirm = null;
		$(".confirm").blur(function(){
			var str = $(this).val();
			var strp = $(".psd").val();
			if(str == strp){
				confirm = true;
				$(this).next().css("display","none");
			}else{
				confirm = false;
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
//		邮箱验证码
		var emailcode = null;
		$(".mailcode").blur(function(){
			var reg = /(abc123)/;
			var str = $(this).val();
			if(reg.test(str)){
				emailcode = true;
				$(this).parent().find($(".err")).css("display","none");
			}else{
				emailcode = false;
				$(this).parent().find($(".err")).css("display","block");
			}
		})
//		注册
		var $regBtn = $(".reg-btn");
		$regBtn.click(function(){
			var arr = [];	
//			console.log(flagemail);
//			console.log(flagepsd);
//			console.log(confirm);
//			console.log(flagecode);
//			console.log(emailcode);
			if(flagemail && flagepsd && confirm && flagecode && emailcode){
				arr = getCookie("userlist");
				console.log(arr);
				//利用开关控制是否向cookie中存信息
				var flag = true;
				//创建用户对象
				
				var userInfo = {
					username : $(".email").val(),
					password : $(".psd").val(),
				}
				if(arr.length != 0){
					for(var i = 0;i < arr.length; i ++){
						if(userInfo.username == arr[i].username){
							alert("用户名已存在");
							flag = false;
							break;
						}
					}
				}
				if(flag){
					arr.push(userInfo);
//					setTimeout(function(){
//						alert("注册成功,将跳转到登录页面");
//						location.href = "login.html";
//					},1000);
				}
				console.log(arr);
				//将用户信息存入到cookie
				setCookie("userlist",JSON.stringify(arr));
				console.log(getCookie());
			}else{
				alert("用户信息填写不完整");
			}
		})
//		登录
		$(".hasaccount").click(function(){
			location.href = "login.html";
		})
    })
})


