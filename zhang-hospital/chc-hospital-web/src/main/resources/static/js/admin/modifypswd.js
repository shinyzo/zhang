$(function(){
	
	// 验证 
	$("#oldpswd").textbox({
		required:true,
		missingMessage:'请输入原始密码！',
		validType:'length[6,16]',
		invalidMessage:'密码长度不得小于6位！'
	})
	
	$("#newpswd").textbox({
		required:true,
		missingMessage:'请输入新密码！',
		validType:'length[6,16]',
		invalidMessage:'密码长度不得小于6位！'
	})
	
	
	$("#renewpswd").textbox({
		required:true,
		missingMessage:'请再次输入新密码！',
		validType:"same['newpswd']",
		invalidMessage:'两次密码输入不一致！'
	})
	
	
})


/**
 * 按钮操作
 * @param title
 * @param opttype
 * @param righturl
 * @return
 */
function btnopt(opttype,title,righturl,rightid)
{
	switch (opttype){
		case '1':
			modifypswd(title,righturl,rightid);
			break;
		default:
			alert('没有此操作类型对应的方法，请核查！');
			break;
	}
}
/**
 * 修改密码
 */
function modifypswd(title,righturl,rightid)
{
	if($('#modifypswdfm').form('validate'))
	{
		var oldpswd = $("#oldpswd").val();
		var newpswd = $("#newpswd").val();

		var data={};
		data['oldpswd'] = oldpswd;
		data['newpswd'] = newpswd;
		data['tokenid'] = getTokenid();
		data['rightid'] = rightid;
		$.ajax({
			url:righturl,
			async:false,
			type:"post",
			data:data,
			dataType:'json',
			success:function(retData){
				if(retData.retCode == successCode)
				{
					show(retData.retMsg);
					$("#modifypswdfm").form('clear');
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

}