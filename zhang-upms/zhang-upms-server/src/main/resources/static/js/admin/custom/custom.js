// 查询URL
var queryUrl = "admin/custom/query.do";

$(function(){
	// 隐藏其他组件
	$("#operBox").hide();
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
		pageSize: pageSize,
		pageList:pageList,
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
	
	// 初始化表单验证
	initValidateBox();
	
});

function initValidateBox()
{
	
	$("#fx_customname").textbox({
		required: true,
		validType:"length[1,40]",
		missingMessage:'请填写分销商企业名称！',
		invalidMessage:'请填写分销商企业名称！',	
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
		  	{field:'customid',title:'分销商编号',width:10,align:'left',sortable:true},
			{field:'customname',title:'分销商企业名称',width:15,align:'left',sortable:true},
			{field:'customuser',title:'分销商姓名',width:15,align:'center',sortable:true},
			{field:'customphone',title:'联系方式',width:15,align:'left',sortable:true},
			{field:'customaddress',title:'地址',width:20,align:'left'},
			{field:'customtype',title:'分销商类型',width:10,align:'left',sortable:true},
		  	{field:'custommemo',title:'分销商简介',width:15,align:'left'}
		  
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
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}


/**
 * 修改内部供货商
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function modifyData(title,righturl,rightid)
{
	var rows = $("#dgBox").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	
	if(rows.length>1)
	{
		alert("仅允许修改单条记录！");
		return false;
	}

	row = rows[0];
	$("#operfm").form('load',row);

	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:420,
	    height:300,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){	
	    	
	    			var customid = row.customid;
		    	 	modifyDataSave(righturl,rightid,customid);
		    	 }
			    },
			    {
				 iconCls: 'icon-cancel',
				 text:'取消',
				 handler: function(){	
			    	$("#operBox").dialog('close');
			     }
		}]
	});
	
	$("#operBox").window('center');
	
}


/**
 * 修改内部分销商保存
 * @param righturl
 * @param rightid
 * @param customid
 * @return
 */
function modifyDataSave(righturl,rightid,customid)
{

	var customname = $("#fx_customname").val();
	var customuser = $("#fx_customuser").val();
	var customphone = $("#fx_customphone").val();
	var customaddress = $("#fx_customaddress").val();
	var custommemo = $("#fx_custommemo").val();
	
	var data={};
	data['tokenid']=getTokenid();
	data['rightid']= rightid;
	data['customid']=customid;
	
	data['customname']= customname;
	data['customuser'] = customuser;
	data['customphone'] =customphone;
	data['customaddress'] =customaddress;
	data['customtype']= '1';
	data['custommemo']= custommemo;
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
	});	

}


/**
 * 添加内部分销商
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addData(title,righturl,rightid)
{
	$("#operfm").form('clear');

	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:420,
	    height:300,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){			
		    	 	addDataSave(righturl,rightid);
		    	 }
			    },
			    {
				 iconCls: 'icon-cancel',
				 text:'取消',
				 handler: function(){	
			    	$("#operBox").dialog('close');
			     }
		}]
	}); 
	$("#operBox").window('center');
}

/**
 * 添加内部分销商保存
 * @return
 */
function addDataSave(righturl,rightid)
{
	var customname = $("#fx_customname").val();
	var customuser = $("#fx_customuser").val();
	var customphone = $("#fx_customphone").val();
	var customaddress = $("#fx_customaddress").val();
	var custommemo = $("#fx_custommemo").val();
	
	var data={};
	data['tokenid']=getTokenid();
	data['rightid']= rightid;
	
	data['customname']= customname;
	data['customuser'] =customuser;
	data['customphone'] =customphone;
	data['customaddress'] =customaddress;
	data['customtype']= '1';
	data['custommemo']= custommemo;
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
	});	
	
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

	queryParams['customname'] = $('#customname').val();
	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
