// 查询URL



$(function(){
	
	$("#orignpswdtr").hide();
	$("#newpswdtr").hide();
	$("#confirmpswdtr").hide();
	$("#vercodetr").hide();
	$("#btntr").hide();

	// 初始化表单验证
	initValidateBox();
	
});

function strartpay()
{
	//未开启开启
	$("#opertype").val("1");
	$("#newpswdtr").show();
	$("#confirmpswdtr").show();
	$("#vercodetr").show();
	$("#btntr").show();
}


function openpay()
{
	// 关闭到开启
	$("#opertype").val("2");
	$("#orignpswdtr").show();
	$("#vercodetr").show();
	$("#btntr").show();
	
}

// 关闭支付
function closepay(openpayflag)
{
	$("#orignpswd").textbox("setValue","");
	$("#newpswd").textbox("setValue","");
	$("#confirmpswd").textbox("setValue","");
	$("#opertype").val("3");
	
	
	
	$("#newpswdtr").hide();
	$("#confirmpswdtr").hide();
	
	
	$("#orignpswdtr").show();
	$("#vercodetr").show();
	$("#btntr").show();

}
//  修改支付密码
function modifypaypswd(openpayflag)
{
	$("#opertype").val("4");
	
	$("#orignpswd").textbox("setValue","");
	$("#newpswd").textbox("setValue","");
	$("#confirmpswd").textbox("setValue","");
	

	$("#orignpswdtr").show();
	$("#newpswdtr").show();
	$("#confirmpswdtr").show();
	$("#vercodetr").show();
	$("#btntr").show();

	
}


function initValidateBox()
{
	// 验证
	$("#orignpswd").textbox({  
	    required: true, 
	    validType:'length[6,20]',
	    missingMessage:"请输入原始支付密码！",
	    invalidMessage:'密码长度不得小于6位！'
	})
	
	$("#newpswd").textbox({  
	    required: true, 
	    validType:'length[6,20]',
	    missingMessage:"请输入支付密码！",
	    invalidMessage:'支付密码长度不得小于6位！'
	})
	$("#confirmpswd").textbox({  
		validType:"same['newpswd']",
	    required: true,    
	    missingMessage:"请输入确认密码！",
	    invalidMessage:"两次输入的密码不一致！"
	})
	
//	$("#vercode").textbox({  
//	    required: true,   
//	    validType:'length[4,4]',
//	    missingMessage:"请输入验证码！",
//	    invalidMessage:'验证码长度须为4位！'
//	})

}








/**
 * 按钮操作
 * @param title
 * @param opttype
 * @param righturl
 * @return
 */
function btnopt(opttype,title,righturl,rightid)
{
	switch (opttype) {
	case '1':
		modifybalance(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}
/**
 * 修改并保存支付密码
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function modifybalance(title,righturl,rightid){
	
	
	var opertype = $("#opertype").val();
	
	var orignpswd = $("#orignpswd").textbox('getValue');
	var newpswd = $("#newpswd").textbox('getValue');
	var confirmpswd = $("#confirmpswd").textbox('getValue');
	var vercode = $("#vercode").textbox('getValue');
	
	var data={};
	data['opertype']=opertype;
	data['vercode']=vercode;
	data['rightid']=rightid;
	data['tokenid']=getTokenid();
	
	//1： 第一次开通支付  
	if(opertype=="1")
	{
		if(newpswd=="")
		{
			alert("请输入支付密码！");
			return false;
		}	
		if(confirmpswd=="")
		{
			alert("请输入确认密码！");
			return false;
		}	
		if(newpswd.length<6)
		{
			alert("支付密码不得少于6位！");
			return false;
			
		}
		
		if(newpswd!=confirmpswd)
		{
			alert("支付密码和确认密码不一致！");
			return false;
		}	
		data['newpswd'] = newpswd;
	}
	
	//4：修改支付密码
	if(opertype=="4")
	{
		
		// 关闭到开启
		if(orignpswd=="")
		{
			alert("请输入原始支付密码！");
			return false;
		}	
		
		if(newpswd=="")
		{
			alert("请输入支付密码！");
			return false;
		}	
		if(confirmpswd=="")
		{
			alert("请输入确认密码！");
			return false;
		}	
		if(newpswd.length<6)
		{
			alert("支付密码不得少于6位！");
			return false;
			
		}
		
		if(newpswd!=confirmpswd)
		{
			alert("支付密码和确认密码不一致！");
			return false;
		}	
		
		data['orignpswd']=orignpswd;
		data['newpswd'] = newpswd;

	}
	
	// 2: 关闭到开启支付  3：开启到关闭
	if(opertype=="2" || opertype=="3")
	{
		// 关闭到开启
		if(orignpswd=="")
		{
			alert("请输入原始支付密码！");
			return false;
		}	
		if(orignpswd.length<6)
		{
			alert("支付密码不得少于6位！");
			return false;
			
		}
		data['orignpswd'] = orignpswd;	
	}
	
	
	if(vercode=="")
	{
		alert("请输入验证码！");
		return false;
	}
	
	// 密码加密传输

	$.ajax( {
		url:righturl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(retData){
			if(retData.retCode == successCode)
			{
				show(retData.retMsg);
				refreshTab();
			}
			else if(retData.retCode == loginTimeoutCode)
			{
				alert(retData.retMsg);
				top.location.href = loginUrl;
			}
			else
			{
				alert(retData.retMsg);
			}
		},
		error:function(){
			error('系统错误,请稍后重试！');
		}
	});
	
	
}




