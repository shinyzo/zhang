// 查询URL
var queryUrl = "admin/resource/query.do";
var queryResourceDetailUrl = "admin/resource/queryDetail.do";

$(function(){
	// 隐藏其他组件
	$("#operBox").hide();
	$("#pswdRow").hide();
	$("#picBox").hide();
	$("#resBox").hide();
	$("#resHeadBox").hide();
	
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
	

	
	$("input:radio[name='isneedpassword']").click(function(){
		
		if($(this).val()=="1")
		{	
			$("#password").textbox({
				value:"",
				validType:"length[6,20]",
				missingMessage:'请输入密码！',
				invalidMessage:'密码应在6-20个字符之间！'
			});
			$("#pswdRow").show();
			
		}
		else
		{
			$("#password").textbox('setValue',"");
			$("#pswdRow").hide();
			$("#orignRow").hide();
			
		}
		
		
		
	})
	
	


});

function initValidateBox()
{
	$("#fx_resourcename").textbox({
		required: true,
		validType:"length[2,20]",
		missingMessage:'请填写资源库名称！',
		invalidMessage:'资源库名称应在2-20个字符之间！'
	})
	
	$("#fx_openstatus").combobox({
		required: true,
		missingMessage:'请选择可访问权限！'
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
		  	{field:'resourceid',title:'资源id',width:15,align:'left',sortable:true},
		  	{field:'resourcename',title:'资源库名称',width:20,align:'left',sortable:true},
		  	{field:'createuserid',title:'资源库创建者',width:15,align:'left',sortable:true},
		  	{field:'corpid',title:'所属企业id',width:20,align:'left',sortable:true},
		  	{field:'createtime',title:'创建时间',width:20,align:'left',sortable:true},
		  	{field:'lastupdatetime',title:'最后修改时间',width:20,align:'left',sortable:true},
		  	{field:'capacity',title:'占有容量(M兆)',width:20,align:'left',sortable:true},
		  	{field:'openstatus',title:'开放权限',width:20,align:'left',sortable:true,formatter:formateOpenStatus},
		  	{field:'isneedpassword',title:'密码访问',width:20,align:'left',sortable:true,formatter:formateNeedPswd},
		  	{field:'resourcedesc',title:'资源库描述',width:20,align:'left',sortable:true}
	   		
	   	]];
	   	return opt;
}

function getResColumnsOpt()
{
	var opt = 
		[[
		  	{field:'resourceid',title:'资源id',width:10,align:'left',sortable:true},
		  	{field:'resuuid',title:'资源uuid',width:30,align:'left',sortable:true},
		  	{field:'resfilename',title:'资源名称',width:15,align:'left',sortable:true},
		  	{field:'rescode',title:'资源编码',width:15,align:'left',sortable:true},
		  	{field:'rescapacity',title:'资源大小',width:15,align:'left',sortable:true},
		  	{field:'contenttype',title:'资源类型',width:15,align:'left',sortable:true},
		  	{field:'operuserid',title:'上传者',width:15,align:'left',sortable:true},
		  	{field:'createtime',title:'创建时间',width:15,align:'left',sortable:true}
	   	]];
	return opt;
}

function formateOpenStatus(val)
{
	if(val=="0") return "仅自己可见";
	if(val=="1") return "全平台开放";
	if(val=="2") return "企业内部可见";
	if(val=="3") return "企业内部及关联下游企业可见";
	return val;

}

function formateNeedPswd(val)
{
	if(val=="1") return '1-是';
	if(val=="0") return '0-否';
	return val;

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
		resourceManage(title,righturl,rightid);
		break;
	case '4':
		addpictureData(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}

/**
 * 资源库管理
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function resourceManage(title,righturl,rightid)
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
	var row = rows[0];
	var resourceid = row.resourceid;

	// 初始化加载数据
	$("#resDg").datagrid({  
		url:queryResourceDetailUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"resourceid":resourceid},
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
    	columns:getResColumnsOpt(), // 列数据
    	toolBar:'#resHeadBox',
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
    });  

	 //设置分页控件 
	$('#resDg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 

	$("#resBox").show();
	$("#resBox").dialog({ 
	    title: title,    
	    width:1000,
	    height:500,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
				 {
					iconCls: 'icon-remove',
					text:'删除',
					handler: function(){	
					 	alert("正在移除");
					}
					 
				 },
				 {
					iconCls: 'icon-remove',
					text:'修改保存',
					handler: function(){	
					 	alert("正在保存");
					}
					 
				 },
		         {
					iconCls: 'icon-cancel',
					text:'关闭',
					handler: function(){	
			    	 	$("#resBox").dialog('close');
			    	}
					 
		         }]
	});
	
	$("#resBox").window('center');
}

/**
 * 上传资源库图片
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addpictureData(title,righturl,rightid)
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

	var row = rows[0];
	var id = row.resourceid;
	
	$("#picfm").form('load',row);
	$("#fileList").html("");
	$("#picBox").show();
	$("#picBox").dialog({ 
	    title: title,    
	    width:1000,
	    height:500,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
				
		         {
					iconCls: 'icon-cancel',
					text:'关闭',
					handler: function(){	
			    	 	$("#picBox").dialog('close');
			    	}
					 
		         }]
	});
	
	$("#picBox").window('center');

}



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

	var row = rows[0];
	var id = row.resourceid;	
	
	$("#operfm").form('load',row);
	$("#password").textbox('setValue',"");
	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:500,
	    height:350,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
		         {
					iconCls: 'icon-save',
					text:'修改保存',
					handler: function(){	
			    	 
		        	 	addOrModifyDataSave(righturl,rightid,id);
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
 * 添加或修改保存数据
 * @param righturl
 * @param rightid
 * @param id
 * @return
 */
function addOrModifyDataSave(righturl,rightid,id)
{
	
	if($("#operfm").form('validate'))
	{
		$("#operfm").form('submit',{
			url:righturl,
			ajax:true,
			onSubmit:function(param){
				param.rightid = rightid;
				param.tokenid = getTokenid();
				param.resourceid = id;
			},
			success:function(retData){
				var retData = eval('(' + retData + ')');  
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
			onLoadError:function(){
				error('系统错误,请稍后重试！');
			}
			
		})

	}
}

/**
 * 新增资源
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
	    width:500,
	    height:350,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
		         {
					iconCls: 'icon-save',
					text:'保存',
					handler: function(){	
			    	 
		        	 	addOrModifyDataSave(righturl,rightid,0);
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
 * 查询或重新加载组件
 * @param goodCode
 * @param goodName
 * @param goodTypeName
 * @param goodState
 * @return
 */
function searchOrReload(){

	var queryParams = $("#dgBox").datagrid('options').queryParams;

	queryParams['resourcename'] = $('#resourcename').val();
	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
