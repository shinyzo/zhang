// 基础数据维护

$(document).ready(function(){
	
});

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
			modifyData(title,righturl,rightid);
			break;
		default:
			alert("无此操作类型对应的方法!");
			break;
	}

}

function modifyData(title,righturl,rightid)
{
	
	var nickname = $("#nickname").textbox('getValue');
	var uqq = $("#uqq").textbox('getValue');
	var uaddress = $("#uaddress").textbox('getValue');
	var uphone = $("#uphone").textbox('getValue');
	var data = {};
	data['nickname'] = nickname;
	data['uqq'] = uqq;
	data['uaddress'] = uaddress;
	data['uphone'] = uphone;
	
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
				refreshCurrTab();
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



