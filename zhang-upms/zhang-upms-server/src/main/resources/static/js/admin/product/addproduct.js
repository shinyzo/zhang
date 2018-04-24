
$(function(){

	initLoadingData();
	
	$("#file0").filebox({
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='myfiles']")[0], "pic0", '');
		}
		
	});
	$("#file1").filebox({
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='myfiles']")[1], "pic1", '');
		}
		
	});
	$("#file2").filebox({
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='myfiles']")[2], "pic2", '');
		}
		
	});
	$("#file3").filebox({
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='myfiles']")[3], "pic3", '');
		}
		
	});
	$("#file4").filebox({
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='myfiles']")[4], "pic4", '');
		}
		
	});
	
	
	
	
});


function initLoadingData()
{
	// 初始化加载数据
	$("#protypeid").tree({
		url:'public/gettreeprotype.json',
		valueField:'protypeid',
		textField:'protypename',
		onSelect:onSelect
	});
	
	$("#fx_brandid").combobox({
		url:'public/getbrand.json',
		valueField:'brandid',
		textField:'brandname',
		loadFilter:function(data){
			return [{brandname:'--请选择品牌类别--',brandid:0,selected:"true"}].concat(data);
		}
	});
	
	$("#fx_productname").textbox({
		required:true,
		missingMessage:'请填写产品名称！',
		validType:'length[2,40]',
		invalidMessage:'产品名称在2-40个字符之间!'
	});
	
	$("#fx_productsaleprice").numberbox({
		required:true,
		missingMessage:'请填写产品销售价格！',
		validType:'length[1,12]',
		invalidMessage:'产品销售价格1-12个字符之间!'
	});
	
	$("#fx_productinprice").numberbox({
		required:true,
		missingMessage:'请填写产品进价！',
		validType:'length[1,12]',
		invalidMessage:'产品进价1-12个字符之间!'
	});
	
	$("#fx_productretailprice").numberbox({
		required:true,
		missingMessage:'请填写产品建议零售价！',
		validType:'length[1,12]',
		invalidMessage:'产品建议零售价1-12个字符之间!'
	});
	
	
	
	$("#fx_productcode").textbox({
		required:true,
		missingMessage:'请填写产品条码！',
		validType:'length[1,40]',
		invalidMessage:'产品条码应在1-40个字符之间!'
	});
	
	
	

}

function onSelect(node)
{
	var cknodes = $(this).tree("getSelected");

	if(node.id!="0")
	{
		$("#fx_protypeid").val(node.id);
		$("#fx_protypename").textbox('setValue',node.text);
	}
	


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
		if($("#fx_protypeid").val()=="")
		{
			alert("请选择产品分类！");
			return false;
		}

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

