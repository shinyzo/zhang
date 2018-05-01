

$(function(){
	
	$("#login").dialog({
		title:"后台登录",
		width:400,
		height:250,
		modal:true,
		buttons:'#btn'
	});


    // 回车事件
    $('#loginname, #loginpass').keypress(function (event) {
        if (13 == event.keyCode) {
            ajaxLogin();
        }
    });
	
	// 登录按钮
	$("#loginBtn").click(function(){
        ajaxLogin();
	});
	
	
	// 重置按钮
	$("#resetBtn").click(function(){
		
		$('#loginfm').form('clear');
	})
	
	initValidateBox();
})

function ajaxLogin(){
    // 校验验证是否通过
    if(!$("#loginfm").form('validate')){
        return false;
    }
    var data={};
    var options ={
        url:SSO_LOGIN_AUTHEN,
        async:true,
        type:"post",
        data:data,
        dataType:'json',
        success:function(resultData){
            if(resultData.code == SUCCESS_CODE)
            {
                // 解决ie多一层目录的问题，location都将基础项目路径加上

                // var basepath = $("#basepath").val();
                // var indexurl = BASE_PATH+"/manage/index";
                location.href = resultData.data;
                //window.open('index.do','_self');
            }
            else
            {
                alert(resultData.msg);
            }
        },
        error:function(){
            alert('系统错误,请稍后重试！');
        }
    };
    $("#loginfm").ajaxSubmit(options);
}


function initValidateBox()
{
	// 验证
	$("#loginname").textbox({  
	    required: true,    
	    missingMessage:"请输入用户名！"
	})
	
	// 验证
	$("#loginpass").textbox({  
	    required: true,    
	    missingMessage:"请输入用户密码！"
	})
	
	$("#vercode").textbox({  
	    required: true,   
	    validType:'length[4,4]',
	    missingMessage:"请输入验证码！",
	    invalidMessage:'验证码长度须为4位！'
	})
}

