var querypaymodeurl ="public/getpaymodebycorpid.json";
var orderpayurl = "admin/order/orderpreaprepay.do";
var surepayurl ="admin/order/surepay.do";

$(function(){
	
	$("#jsBox").hide();
	
	$("#balanceAmottr").hide();
	$("#balancePswdtr").hide();
	$("#balanceVerctr").hide();
	$("#alipay_mycode").hide();
	$("#alipay_corpcode").hide();
	$("#wxpaytr").hide();

	
	var accountid = $("#accountid").combobox('getValue');
	if(accountid!="")
	{
		loadPaymode(accountid);
	}
	
	
	$("#accountid").combobox({
		onChange:function(newValue,oldValue){
			loadPaymode(newValue);
		}
		
	})
	
	var remainfee = $("#remainfee").val();
	$('#realpayfee').numberbox({    
	    min:0,    
	    precision:2,
	    value:remainfee,
	    required:true
	});  	
	
	
	
});

/**
 * 加载账户对应的支付方式
 * @param accountid
 * @return
 */
function loadPaymode(accountid)
{

	var data = {};
	data['clienttype']='1';
	data['channeltype']='2';
	data['accountid']= accountid;
	data['corpid']=$("#tcorpid").val();
	
	$.ajax( {
		url:querypaymodeurl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(jsondata){
			
			var html = "";
			$.each(jsondata,function(index,json){
				
				if(index==0)
				{
					html+="<input type='radio' name='paymodeid' value="+json.paymodeid+" checked='checked'> "+json.paymodename;
				}
				else
				{
					html+="<input type='radio' name='paymodeid' value="+json.paymodeid+" > "+json.paymodename;
				}
				
			})
			$("#paymodelist").html(html);
		
		},
		error:function(){
			error('系统错误,请稍后重试！');
		}
	});
}


function orderpay(){
	
	var orderno = $("#orderno").val();
	var realpayfee = $("#realpayfee").val();
	var remainfee = $("#remainfee").val();
	var accountid = $("#accountid").combobox('getValue');
	var paymodeid = $("input:radio:checked").val();
	
	var openbalancepay = $("#openbalancepay").val();
	var balanceamount = $("#balanceamount").val();
	
	realpayfee = parseFloat(realpayfee);
	remainfee = parseFloat(remainfee);
	if(realpayfee<=0)
	{
		alert("支付金额不能小于等于0");
		return false;	
	}
	
	if(realpayfee>remainfee)
	{
		alert("支付金额不能大于未付金额！");
		return false;
	}
	
	if(accountid=="")
	{
		alert("请选择收款账户！");
		return false;
	}
	
	if(paymodeid=="")
	{
		alert("请选择支付方式！");
		return false;
	}
	
	if(paymodeid=="8")
	{
		if(openbalancepay!="1")
		{
			alert("您的余额支付已关闭，请先开启余额支付！");
			return false;
		}
		
		if(balanceamount!="")
		{
			balanceamount = parseFloat(balanceamount);
			if(realpayfee > balanceamount)
			{
				alert("你的余额不足以支付此支付金额，请充值或修改支付金额！");
				return false;	
			}
			
		}
		else
		{
			alert("您的可用余额不足，请先充值！");
		}	
	}
	
	
	var data = {};
	data['orderno']=orderno;
	data['realpayfee']=realpayfee;
	data['accountid']= accountid;
	data['tcorpid']=$("#tcorpid").val();
	data['paymodeid']= paymodeid;
	
	$.ajax( {
		url:orderpayurl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(retData){
			if(retData.retCode == successCode)
			{
				
				var paymodeid = retData.paymodeid;
				var paymodename= retData.paymodename;
				var orderfee = retData.orderfee;
				var payfee = retData.payfee;
				var realpayfee = retData.realpayfee;
				var ordertime = retData.ordertime;
				var remainfee = retData.remainfee;
				var accountno = retData.accountno;
				var accountname = retData.accoutname;
				var orderno = retData.orderno;
				var transno = retData.transno;
				var customname = retData.customname;
				var codeImage = retData.codeImage;
				
				$("#fx_orderno").html(orderno);
				$("#fx_transno").html(transno);
				$("#fx_ordertime").html(ordertime);
				$("#fx_accountno").html(accountno);
				$("#fx_accoutname").html(accountname);
				$("#fx_customname").html(customname);
				$("#fx_paymodename").html(paymodename);
				$("#fx_orderfee").html("￥ "+orderfee+" 元");
				$("#fx_payfee").html("￥ "+payfee+" 元");
				$("#fx_realpayfee").html("￥ "+payfee+" 元");
				$("#fx_remainfee").html("￥ "+remainfee+" 元");
				
				
				$("#balanceAmottr").hide();
				$("#balancePswdtr").hide();
				$("#balanceVerctr").hide();
				$("#alipay_mycode").hide();
				$("#alipay_corpcode").hide();
				$("#wxpaytr").hide();

				
				var height=420;
				// 支付宝
				if(paymodeid=="2")
				{
					height=460;
					$("#alipay_mycode").show();
				}
				
				if(paymodeid=="21")
				{
					height=600;
					$("#alipay_corpcode").show();
					$("#alipayimage").html("<img src="+ $("#alipaydir").val()+codeImage+" />");
					
				}
				
				if(paymodeid=="3" || paymodeid=="31")
				{
					height=600;
					$("#wxpaytr").show();
					$("#wxpayimage").html("<img src="+ $("#weixinpaydir").val()+codeImage+" />");
				} 
				
				if(paymodeid=="8")
				{
					height=520;
	
					$("#balanceAmottr").show();
					$("#balancePswdtr").show();
					$("#balanceVerctr").show();

					$("#fx_balanceamount").html(retData.balanceamount);
				}
			
				
				$("#jsBox").show();
				$("#jsBox").dialog({
					  title: '确认支付', 
					  width:740,
					  height:height,
					  closed: false,    
					  cache: false,   
					  modal: true,
					  resizable:true,
					  buttons:[{
						  		iconCls: 'icon-ok',
						  		text:'确认支付',
						  		handler: function(){	
						  			//
									$("#paybtn").linkbutton('disable');
									var balancepswd ="";
									var vercode ="";
									var paycode="";
									if(paymodeid=="8")
									{
										balancepswd = $("#balancepswd").val();
										vercode = $("#vercode").val();
										if(balancepswd=="")
										{
											alert("请输入支付密码！");
											return false;
										}
										if(vercode=="")
										{
											alert("请输入图片验证码！");
											return false;
										}
									}
									
									if(paymodeid=="2"){
										
										paycode = $("#mypaycode").val();
										
										if(paycode=="")
										{
											alert("请扫描或者输入手机支付二维码！");
											return false;
										}
										
									}
									
									surepay(surepayurl,orderno,transno,paymodeid,realpayfee,balancepswd,vercode,paycode);
					    		}
					  		   },
					           {
						  		iconCls: 'icon-cancel',
						  		text:'取消',
						  		handler: function(){	
					    	 		$("#jsBox").dialog('close');
					    		}
					  }]
				})
				
				
				$("#jsBox").window('center');
				
				
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
/**
 * 确认支付
 */
function surepay(surepayurl,orderno,transno,paymodeid,realpayfee,balancepswd,vercode,paycode)
{
	
	var data={};
	data['orderno']=orderno;
	data['transno']=transno;
	data['paymodeid']=paymodeid;
	data['realpayfee']=realpayfee;
	data['balancepswd']=balancepswd;
	data['vercode']=vercode;
	data['paycode']=paycode;

	$.ajax({
		url:surepayurl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(retData){
			if(retData.retCode == successCode)
			{
				alert(retData.retMsg);
				$("#jsBox").dialog('close');
				
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

