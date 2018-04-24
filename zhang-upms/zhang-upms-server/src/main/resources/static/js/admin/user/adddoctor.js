$(document).ready(function(){
	
	
	initValidBox();
	$("#faceimg").filebox({
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='files']")[0], "faceShowImg", '');
		}
		
	});
	$("#qafca_cert_img").filebox({
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='files']")[1], "qafcaShowImg", '');
		}
		
	});
	$("#pract_cert_img").filebox({
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='files']")[2], "practShowImg", '');
		}
		
	});
	
});


function initValidBox()
{
	$("#doctorName").textbox({
		required: true,
		validType:"length[1,40]",
		missingMessage:'请填写医师姓名！',
		invalidMessage:'医师姓名1-40位之间！',	
	})

	$("#idcardno").textbox({
		required: true,
		validType:"length[15,18]",
		missingMessage:'请填写身份证号！',
		invalidMessage:'身份证号15-18位之间！',	
	})
	
	$("#personalPhone").numberbox({
		required: true,
		validType:"length[7,11]",
		missingMessage:'请填写个人联系电话！',
		invalidMessage:'个人联系电话7-11位之间！',	
	})
	
	$("#qafca_cert_no").textbox({
		required: true,
		validType:"length[6,18]",
		missingMessage:'请填写资格证书编号！',
		invalidMessage:'资格证书编号6-18位之间！',	
	})
	
	$("#pract_cert_no").textbox({
		required: true,
		validType:"length[6,18]",
		missingMessage:'请填写执业证书编号！',
		invalidMessage:'执业证书编号6-18位之间！',	
	})
	
	$("#qafca_cert_sign_time").datebox({
		required: true	
	})
	
	$("#pract_cert_register_time").datebox({
		required: true	
	})
	

	$('#faceimg').filebox({    
	    buttonText: '选择照片', 
	    buttonAlign: 'right',
	    width:'500'
	})
	$('#qafca_cert_img').filebox({    
	    buttonText: '选择证书', 
	    buttonAlign: 'right',
	    width:'240'
	})
	
	$('#pract_cert_img').filebox({    
	    buttonText: '选择证书', 
	    buttonAlign: 'right',
	    width:'240'
	})
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
		addDataSave(righturl,rightid);
		break;

	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}

function addDataSave(righturl,rightid)
{
	
	if($("#operfm").form('validate'))
	{
		$("#operfm").form('submit',{
			url:righturl,
			ajax:true,
			onSubmit:function(param){
				param.rightid = rightid;
				param.tokenid = getTokenid();
			},
			success:function(retData){
				var retData = eval('(' + retData + ')');  
				if(retData.retCode == successCode)
				{
					show(retData.retMsg);
					/**
					 * tokenid未刷新，会出现鉴权失败
					 */
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
			onLoadError:function(){
				error('系统错误,请稍后重试！');
			}
			
		})

	}

}


