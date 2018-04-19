// 查询URL
var queryUrl = BASE_PATH + "/manage/corp/query";

$(function(){
	// 隐藏其他组件
	$("#operBox").hide();
	$("#userBox").hide();
	$("#helpBox").hide();
	
	// 初始化加载数据
	$("#dgBox").datagrid({  
		url:queryUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid()},
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		pagination:true,       // 显示分页
		singleSelect:false,     // 只能选中单行
		pageSize:PAGE_SIZE,
		pageList:PAGE_LIST,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getColumnsOpt(), // 列数据
    	toolbar:'#headBox',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
    });  

	 //设置分页控件 
	$('#dgBox').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 
	
	initLoadingData();
	// 初始化表单验证
	initValidateBox();
	
	$("#helpBtn").click(function(){
		
			$("#helpBox").show();
			$("#helpBox").dialog({ 
			    title: "按钮操作及权限说明",    
			    iconCls:'icon-help',
			    width:550,
			    height:380,
			    closed: false,    
			    cache: false,   
			    modal: false,
			    resizable:true,
			    buttons:[{
					iconCls: 'icon-ok',
					text:'确定',
					handler: function(){	
			    	 $("#helpBox").dialog('close');
			    	}
				}]
		}); 
	})
});



function initLoadingData()
{

    $("#fx_corptypeid").combobox({
        url:BASE_PATH + '/manage/corptype/list',
        valueField:'corptypeId',
        textField:'corptypeName',
        loadFilter:function(data){
            return [{corptypeName:'--请选择企业类别--',corptypeId:0,selected:"true"}].concat(data)
        }
    })
	

}


function initValidateBox()
{
    $("#fx_corptypeid").combobox({
        required: true,
        validType:"comboxValidate['fx_corptypeid']",
        missingMessage:'请选择企业分类！',
        invalidMessage:'请选择企业分类！'
    })

	
}



/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'applyDate',title:'申请日期',width:15,align:'left',sortable:true},
            {field:'corpid',title:'企业账号',width:15,align:'left',sortable:true},
            {field:'corpName',title:'企业名称',width:30,align:'left',sortable:true},
            {field:'businessCode',title:'营业执照号',width:15,align:'left',sortable:true},
            {field:'idCardNo',title:'身份证号',width:15,align:'left',sortable:true},
            {field:'artificialName',title:'法人姓名',width:15,align:'left',sortable:true},
            {field:'corpPhone',title:'联系电话',width:15,align:'left',sortable:true},
            {field:'corpAddress',title:'地址',width:15,align:'left',sortable:true},
            {field:'corptypeId',title:'行业类别',width:15,align:'left',sortable:true},
            {field:'signStartDate',title:'签约开始日期',width:15,align:'left',sortable:true},
            {field:'signEndDate',title:'签约到期日期',width:15,align:'left',sortable:true},
            {field:'corpStatus',title:'企业状态',width:15,align:'left',sortable:true},
            {field:'isopen',title:'是否开放企业',width:15,align:'left',sortable:true}
	   	]];
	   	return opt;
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
		addData(title,righturl,rightid);
		break;
	case '2':
		modifyData(title,righturl,rightid);
		break;
	case '3':
		deleteData(title,righturl,rightid);
		break;
	case '4':
		addCorpUser(title,righturl,rightid);
		break;
	case '5':
		auditCorp(title,righturl,rightid);
		break;
	case '6':
		lockCorp(title,righturl,rightid);
		break;
	case '7':
		unlockCorp(title,righturl,rightid);
		break;
	case '8':
		changeAuth(title,righturl,rightid);
		break;
	case '9':
		resetPswd(title,righturl,rightid);
		break;
	case '10':
		deleteData(title,righturl,rightid);
		break;
	case '11':
		signcorp(title,righturl,rightid);
		break;
		
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}

/**
 * 权限变更
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function changeAuth(title,righturl,rightid)
{
	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	if(rows.length > 1)
	{
		alert("只允许操作一条记录！");
		return false;
	}
	
	var corpid= rows[0].corpid;
	var status = rows[0]['corpStatus'];


	$("#fxt_roleid").combobox({
		url:BASE_PATH + '/manage/role/list',
		valueField:'roleId',
		textField:'roleName',
		onLoadSuccess:function(){
			 var val = $(this).combobox('getData');  
	         for (var item in val[0]) {  
	             if (item == 'roleId') {
	                 $(this).combobox('select', val[0][item]);  
	             }  
	         }  
		}
	});
	
	var corpid = rows[0]['corpid'];
	
	$("#userfm").form('load',rows[0]);
	$("#userBox").show();
	$("#userBox").dialog({ 
	    title: title,    
	    width: 400,    
	    height:200,   
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
	     {
			iconCls: 'icon-ok',
			text:'权限变更',
			handler: function(){
	    		changeAuthSave(righturl,rightid,corpid);
	    	}
		}
		,{
			iconCls: 'icon-cancel',
			text:'取消',
			handler: function(){
				$("#userBox").dialog('close');
			}
		  }
		]

	}); 

}

/**
 * 权限变更保存
 * @param righturl
 * @param rightid
 * @return
 */
function changeAuthSave(righturl,rightid,corpid)
{
	if($("#userfm").form('validate'))
	{
		var data={};
		data['corpid']=corpid;
		data['tokenid']=getTokenid();
		data['rightid']= rightid;
		data['corpid']= $("#fxt_corpid").val();
		data['roleId'] =$('#fxt_roleid').combobox('getValue');
		$.ajax( {
			url:righturl,
			async:false,
			type:"post",
			data:data,
			dataType:'json',
			success:function(retData){
				if(retData.code == SUCCESS_CODE)
				{
					show(retData.msg);
					$("#userBox").dialog('close');
					searchOrReload();
				}
				else if(retData.code == LOGINTIMEOUT_CODE)
				{
					alert(retData.msg);
					top.location.href = LOGIN_URL;
				}
				else
				{
					alert(retData.msg);
				}
			},
			error:function(){
				error('系统错误,请稍后重试！');
			}
		});
		
	}

}

/**
 * 密码重置
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function resetPswd(title,righturl,rightid)
{
	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	if(rows.length > 1)
	{
		alert("只允许操作一条记录！");
		return false;
	}
	

	var corpid = rows[0]['corpid'];
	if(corpid=="")
	{
		alert("该企业还未进行账号开通，无法进行密码重置！");
		return false;
	}

	
	$.messager.confirm(title,'密码重置将会设为平台初始密码，确定重置吗?',function(result){
		if(result)
		{
			var data={};
			data['tokenid']=getTokenid();
			data['rightid']= rightid;
			data['corpid']=corpid;
			$.ajax( {
				url:righturl,
				async:false,
				type:"post",
				data:data,
				dataType:'json',
				success:function(retData){
                    if(retData.code == SUCCESS_CODE)
                    {
                        show(retData.msg);
                        searchOrReload();
                    }
                    else if(retData.code == LOGINTIMEOUT_CODE)
                    {
                        alert(retData.msg);
                        top.location.href = LOGIN_URL;
                    }
                    else
                    {
                        alert(retData.msg);
                    }
				},
				error:function(){
					error('系统错误,请稍后重试！');
				}
			});
			
			
		}
		
		
	});

}

/**
 * 企业解锁
 * @return
 */
function unlockCorp(title,righturl,rightid)
{
	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	if(rows.length > 1)
	{
		alert("只允许操作一条记录！");
		return false;
	}

	var corpid = rows[0]['corpid'];
	
	$.messager.confirm(title,'解锁该企业，则该企业下的所有用户均会解除解锁状态，确认解锁码?',function(result){
		if(result)
		{
			var data={};
			data['tokenid']=getTokenid();
			data['rightid']= rightid;
			data['corpid']=corpid;
			$.ajax( {
				url:righturl,
				async:false,
				type:"post",
				data:data,
				dataType:'json',
				success:function(retData){
                    if(retData.code == SUCCESS_CODE)
                    {
                        show(retData.msg);
                        searchOrReload();
                    }
                    else if(retData.code == LOGINTIMEOUT_CODE)
                    {
                        alert(retData.msg);
                        top.location.href = LOGIN_URL;
                    }
                    else
                    {
                        alert(retData.msg);
                    }
				},
				error:function(){
					error('系统错误,请稍后重试！');
				}
			});
			
			
		}
		
		
	});
	
	
}

/**
 * 锁定企业
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function lockCorp(title,righturl,rightid)
{
	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	if(rows.length > 1)
	{
		alert("只允许操作一条记录！");
		return false;
	}

	var corpid = rows[0]['corpid'];
	$.messager.confirm(title,'锁定状态该企业下的所有用户均无法登陆系统，确定要锁定该企业吗?',function(result){
		if(result)
		{
			var data={};
			data['tokenid']=getTokenid();
			data['rightid']= rightid;
			data['corpid']=corpid;
			$.ajax( {
				url:righturl,
				async:false,
				type:"post",
				data:data,
				dataType:'json',
				success:function(retData){
                    if(retData.code == SUCCESS_CODE)
                    {
                        show(retData.msg);
                        searchOrReload();
                    }
                    else if(retData.code == LOGINTIMEOUT_CODE)
                    {
                        alert(retData.msg);
                        top.location.href = LOGIN_URL;
                    }
                    else
                    {
                        alert(retData.msg);
                    }
				},
				error:function(){
					error('系统错误,请稍后重试！');
				}
			});
			
			
		}
		
		
	});
	
}


/**
 * 企业审核之前加载数据
 * @param rightid
 * @param title
 * @param righturl
 * @return
 */
function auditCorp(title,righturl,rightid)
{
	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	if(rows.length > 1)
	{
		alert("只允许操作一条记录！");
		return false;
	}
	
	var status = rows[0]['corpstatus'];
	if(status != "0001" && status != "0002")
	{
		alert("该企业状态无法进行审核！");
		return false;
	}
	
	
	var id = rows[0]['id'];
	$("#operfm").form('load',rows[0]);	 
	$('#fx_signstartdate').datebox('setValue', parseTime(rows[0]['signstartdate']));
	$('#fx_signenddate').datebox('setValue', parseTime(rows[0]['signenddate']));
	
	$("#operBox").show();
	$("#operBox").dialog({ 
		    title: title,    
		    width: 800,    
		    height:380,   
		    closed: false,    
		    cache: false,   
		    modal: true,
		    buttons:[
		     {
				iconCls: 'icon-ok',
				text:'通过',
				handler: function(){
		    		auditCorpSave(righturl,rightid,id,"0003");
		    		
		    	}
			},{
				iconCls: 'icon-cancel',
				text:'拒绝',
				handler: function(){
					auditCorpSave(righturl,rightid,id,"0002");
				}
			  }
			,{
				iconCls: 'icon-cancel',
				text:'取消',
				handler: function(){
					$('#operBox').dialog('close');
				}
			  }
			]

	}); 
	
	$("#operBox").window('center');
}

/**
 * 企业审核保存
 * @param righturl
 * @param rightid
 * @param id
 * @param status
 * @return
 */
function auditCorpSave(righturl,rightid,id,status)
{
	
	if($("#operfm").form('validate'))
	{
		var data={};
		data['rightid']=rightid;
		data['tokenid']= getTokenid();
		data['corpstatus']= status;
		var options ={
				url:righturl,
				async:false,
				type:"post",
				data:data,
				dataType:'json',
				success:function(retData){
					if(retData.retCode == successCode)
					{
						show(retData.retMsg);
						$("#operBox").dialog('close');
						searchOrReload();
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
			};
			$("#operfm").ajaxSubmit(options); 
		
	}
	
	

}

/**
 * 开通企业账户之前加载数据
 * @param rightid
 * @param title
 * @param righturl
 * @return
 */
function addCorpUser(title,righturl,rightid)
{
	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	if(rows.length > 1)
	{
		alert("只允许操作一条记录！");
		return false;
	}
	
	var corpid=rows[0]['corpid'];
	
	if(corpid != "")
	{
		alert('该企业已开通登录账号!');
		return false;
	}

	$("#fxt_corpid").textbox('setValue',"");
	
	var id = rows[0]['id'];
	$("#userBox").show();
	$("#userBox").dialog({ 
		    title: title,    
		    width: 400,    
		    height:200,   
		    closed: false,    
		    cache: false,   
		    modal: true,
		    buttons:[
		     {
				iconCls: 'icon-save',
				text:'保存',
				handler: function(){
		    		addCorpUserSave(righturl,rightid,id);	
		    	}
			}
			,{
				iconCls: 'icon-cancel',
				text:'取消',
				handler: function(){
					$("#userBox").dialog('close');
				}
			  }
			]

	}); 
	
	$("#userBox").window('center');
}


/**
 * 
 * 企业用户及权限开通保存
 * @param righturl
 * @param rightid
 * @param id
 * @return
 */
function addCorpUserSave(righturl,rightid,id)
{	
	
	if($("#userfm").form('validate'))
	{
		var data={};
		data['id']=id;
		data['tokenid']=getTokenid();
		data['rightid']= rightid;
		data['corpid']= $("#fxt_corpid").val();
		data['roleid'] =$('#fxt_roleid').combobox('getValue');
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
					$("#userBox").dialog('close');
					searchOrReload();
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

/**
 * 添加数据之前加载数据
 * @param title
 * @param righturl
 * @return
 */
function addData(title,righturl,rightid)
{
	// 将表单数据清空,防止上次操作的数据遗留
	$("#operfm").form('clear');
	$('#fx_signstartdate').datebox('setValue', formatterDate(new Date()));
	$('#fx_signenddate').datebox('setValue', formatterDate(new Date()));
	
	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width: 800,    
	    height: 380,   
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[{
			iconCls: 'icon-save',
			text:'保存',
			handler: function(){
	    		addDataSave(righturl,rightid);
	    	}
		},{
			iconCls: 'icon-cancel',
			text:'取消',
			handler: function(){
				$("#operBox").dialog('close');
			}
		}]
	
	}); 
	 
}

/**
 * 修改之前加载数据
 * @return
 */
function modifyData(title,righturl,rightid)
{
	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要修改的记录！");
		return false;
	}
	if(rows.length > 1)
	{
		alert("只允许修改一条记录！");
		return false;
	}

	
     if (rows) 
     {
    	 // 赋值
    	 $('#operfm').form('load',rows[0]); 
    	 var signStartDate = rows[0]['signStartDate'];
    	 var signEndDate = rows[0]['signEndDate'];
    	 $('#fx_signstartdate').datebox('setValue',signStartDate);
    	 $('#fx_signenddate').datebox('setValue',signEndDate);
    	 // 部分不可更改项目
         $("#fx_corpid").textbox('textbox').attr('readonly',true);
         $("#fx_businesslicencecode").textbox('disable');
         $("#fx_signstartdate").datebox('disable');
         $("#fx_signenddate").datebox('disable');
    	 // 展示对话框

    	 $("#operBox").show();
    	 $("#operBox").dialog({ 
    		    title: title,    
    		    width: 800,    
    		    height:380,   
    		    closed: false,    
    		    cache: false,   
    		    modal: true,
    		    buttons:[{
    				iconCls: 'icon-ok',
    				text:'修改',
    				handler: function(){
    		    		modifyDataSave(righturl,rightid);
    		    	}
    			},{
    				iconCls: 'icon-cancel',
    				text:'取消',
    				handler: function(){
    				 	$('#operfm').form('reset');
    					$('#operBox').dialog('close');
    				}
    			}]

    	}); 
    	$("#operBox").window('center');
     }
	
}


/**
 * 企业续签
 * @return
 */
function signcorp(title,righturl,rightid)
{
	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要修改的记录！");
		return false;
	}
	if(rows.length > 1)
	{
		alert("只允许修改一条记录！");
		return false;
	}
	
	var corpstatus = rows[0]['corpstatus'];
	if(corpstatus != "0005" && corpstatus != "0000")
	{
		alert('该企业状态无法续签！');
		return false;
	}
	
  // 赋值
	 $('#operfm').form('load',rows[0]); 

	 $("#fx_corptypeid").combobox('disable');
	
	 $("#fx_corpname").textbox('disable');
	 $("#fx_businesslicencecode").textbox('disable');
	 $("#fx_taxregistrationcode").textbox('disable');
	 $("#fx_organizationcode").textbox('disable');
	 $("#fx_artificialname").textbox('disable');
	 $("#fx_artificialidcard").textbox('disable');
	 $('#fx_signstartdate').datebox('disable');
	 $("#fx_corpphone").textbox('disable');
	 $("#fx_corpaddress").textbox('disable');
	 var signstartdate = rows[0]['signstartdate'];
	 var signenddate = rows[0]['signenddate'];

	$('#fx_signstartdate').datebox('setValue',parseTime(signstartdate));
	$('#fx_signenddate').datebox('setValue',parseTime(signenddate) );
	 // 展示对话框
	 var id = rows[0].id;
	 var corpid = rows[0].corpid;
	 
	 var openstatus = $("#operfm input:radio:checked").val();
	 if(openstatus=="") openstatus ="0";
	 $("#operBox").show();
	 $("#operBox").dialog({ 
		    title: title,    
		    width: 800,    
		    height:380,   
		    closed: false,    
		    cache: false,   
		    modal: true,
		    buttons:[{
				iconCls: 'icon-ok',
				text:'确认续签',
				handler: function(){
		    		signcorpsave(righturl,rightid,corpid,id,openstatus);
		    	}
			},{
				iconCls: 'icon-cancel',
				text:'取消',
				handler: function(){
					$('#operBox').dialog('close');
				}
			}]

	}); 
	$("#operBox").window('center');
  
}



/**
 * 签约保存
 * @return
 */
function signcorpsave(righturl,rightid,corpid,id,openstatus)
{
	if($("#operfm").form('validate'))
	{
		var data={};
		data['rightid']= rightid;
		data['signenddate'] = $("#fx_signenddate").combobox('getValue');
		data['id'] = id;
		data['corpid']=corpid;
		data['openstatus'] = openstatus;
		data['tokenid'] = getTokenid();
		var options = {
				url :righturl,
				async :false,
				type :'post',
				data:data,
				dataType:'json',
				success:function(retData){
					if(retData.retCode == successCode)
					{
						show(retData.retMsg);
						$("#operBox").dialog('close');
						searchOrReload();
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
			};
		
		$("#operfm").ajaxSubmit(options); 
		
	}


}

/**
 * 添加数据保存
 * @param righturl
 * @return
 */
function addDataSave(righturl,rightid)
{
	if($("#operfm").form('validate'))
	{		
		
		var data={};
		data['corptypeId'] =  $("#fx_corptypeid").combobox('getValue');
		data['signStartDate'] =  $("#fx_signstartdate").datebox('getValue');
		data['signEndDate'] =  $("#fx_signenddate").datebox('getValue');
		
		data['corpName'] =  $("#fx_corpname").textbox('getValue');
        data['corpid'] =  $("#fx_corpid").textbox('getValue');
		data['businessCode'] =  $("#fx_businesslicencecode").textbox('getValue');
		data['taxRegisterCode'] =  $("#fx_taxregistrationcode").textbox('getValue');
		data['organizationCode'] =  $("#fx_organizationcode").textbox('getValue');
		data['artificialName'] =  $("#fx_artificialname").textbox('getValue');
		data['idCardNo'] =  $("#fx_artificialidcard").textbox('getValue');
		
		data['corpPhone'] =  $("#fx_corpphone").textbox('getValue');
		data['corpAddress'] =  $("#fx_corpaddress").textbox('getValue');
		
		data['rightid'] = rightid;
		
		var openStatus =  $("#operfm input:radio:checked").val();
		if(openStatus=="") openStatus="0";
		data['openStatus'] = openStatus;
	
		$.ajax ({
				url : righturl,
				async :false,
				data:data,
				type :'post',
				dataType:'json',
				success:function(retData){
					if(retData.code == SUCCESS_CODE)
					{
						show(retData.msg);
						$("#operBox").dialog('close');
						searchOrReload();
					}
					else if(retData.code == LOGINTIMEOUT_CODE)
					{
						alert(retData.msg);
						top.location.href = LOGIN_URL;
					}
					else
					{
						alert(retData.msg);
					}
				},
				error:function(){
					error('系统错误,请稍后重试！');
				}
				
		});
			
	}
}

/**
 * 修改保存
 * @return
 */
function modifyDataSave(righturl,rightid)
{
	if($("#operfm").form('validate'))
	{
		var options = {
				url :righturl,
				async :false,
				type :'post',
				data:{"tokenid":getTokenid(),"rightid":rightid},
				dataType:'json',
				success:function(retData){
					if(retData.code == SUCCESS_CODE)
					{
						show(retData.msg);
						$("#operBox").dialog('close');
						searchOrReload();
					}
					else if(retData.code == LOGINTIMEOUT_CODE)
					{
						alert(retData.msg);
						top.location.href = LOGIN_URL;
					}
					else
					{
						alert(retData.msg);
					}
				},
				error:function(){
					error('系统错误,请稍后重试！');
				}
			};
		
		$("#operfm").ajaxSubmit(options); 
		
	}


}




/**
 * 查询或重新加载组件
 * @param goodCode
 * @param goodName
 * @param goodTypeName
 * @param goodState
 * @return
 */
function searchOrReload(){

	var queryParams = $("#dgBox").datagrid('options').queryParams;
	queryParams['corpid'] = $("#corpid").textbox('getValue');
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}





// 重置查询表单
function clearForm()
{
	
	$("#queryfm").form('reset');
	$("#corptypeid").combobox('reload');
}
