// 查询URL
var queryUrl = "admin/car/queryallcar.do";

var querydriverurl = "admin/driver/queryalldriver.do";

var unbinddriverurl ="admin/car/unbinddriver.do";

$(function(){
	// 隐藏其他组件
	$("#bdriverBox").hide();
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
	
	$("#fx_carno").textbox({
		required: true,
		validType:"length[1,20]",
		missingMessage:'车牌号不能为空！',
		invalidMessage:'车牌号在1-20位之间！',	
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
		  	{field:'carid',title:'车辆id',width:15,align:'left',sortable:true},
		  	{field:'carno',title:'车牌号',width:20,align:'left',sortable:true},
			
			{field:'carname',title:'车辆名称',width:20,align:'left',sortable:true},
		  	{field:'carlong',title:'车长（mm）',width:20,align:'left',sortable:true},
		  	{field:'carwidth',title:'车宽（mm）',width:20,align:'left',sortable:true},
		  	{field:'carheight',title:'车高（mm）',width:20,align:'left',sortable:true},	
		  	{field:'carweight',title:'车自重（吨）',width:20,align:'left',sortable:true},
		  	{field:'maxkzvolume',title:'车可容纳体积（L）',width:20,align:'left',sortable:true},
		  	{field:'maxkzweight',title:'车可容纳重量（吨）',width:20,align:'left',sortable:true},
		  	{field:'carmemo',title:'车辆描述',width:20,align:'left',sortable:true},
		  	{field:'carstatus',title:'车辆状态',width:20,align:'left',sortable:true},
		  	{field:'drivername',title:'司机姓名',width:20,align:'left',sortable:true},
		  	{field:'unbinddriver',title:'操作',width:20,align:'left',sortable:true,formatter:formateUnBindDriver}
	   		
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
	case '4':
		binddriver(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}



/**
 * 修改车辆
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
	    width:550,
	    height:450,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){	
	    	
	    			var carid = row.carid;
		    	 	modifyDataSave(righturl,rightid,carid);
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
 * 修改车辆信息保存
 * @param righturl
 * @param rightid
 * @param customid
 * @return
 */
function modifyDataSave(righturl,rightid,carid)
{

	var data = checkReturnData();
	data['rightid']=rightid;
	data['carid'] = carid;

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
 * 添加车辆
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
	    width:550,
	    height:450,
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

function checkReturnData()
{
	var data={};
	var carno = $("#fx_carno").val();
	var carname = $("#fx_carname").val();
	var cartype = $("#fx_cartype").combobox('getValue');
	var carwidth = $("#fx_carwidth").val();
	var carlong = $("#fx_carlong").val();
	var carheight = $("#fx_carheight").val();
	var carweight = $("#fx_carweight").val();
	
	var maxkzweight = $("#fx_maxkzweight").val();
	var maxkzvolume = $("#fx_maxkzvolume").val();
	var carstatus = $("#fx_carstatus").combobox('getValue');
	var carmemo = $("#fx_carmemo").val();
	

	data['tokenid']=getTokenid();
	
	data['carno']= carno;
	data['carname'] =carname;
	data['cartype'] =cartype;
	data['carwidth'] =carwidth;
	data['carlong']= carlong;
	data['carheight'] =carheight;
	data['carweight'] =carweight;
	data['maxkzweight'] =maxkzweight;
	data['maxkzvolume'] =maxkzvolume;
	data['carstatus'] =carstatus;
	data['carmemo'] =carmemo;

	return data;

}

/**
 * 添加内部分销商保存
 * @return
 */
function addDataSave(righturl,rightid)
{

	var data = checkReturnData();
	data['rightid']=rightid;
	
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
 * 车辆绑定司机
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function binddriver(title,righturl,rightid){
	
	var rows = $("#dgBox").datagrid('getSelections');
	if(rows.length==1)
	{
		
		var row = rows[0];
		
		if(row.driverid!="")
		{
			alert("该车辆已绑定司机，请先解绑！");
			return false;
		}
		var carid = row.carid;
		
		// 初始化加载数据
		$("#bdriverDg").datagrid({  
			url:querydriverurl,         //加载的URL
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
	    	columns:getDriverColumnsOpt(), // 列数据
	    	onLoadError : function() {
	    		error('数据加载失败！');
	    	}	
	    });  

		 //设置分页控件 
		$('#bdriverDg').datagrid('getPager').pagination({ 
	        beforePageText: '第',//页数文本框前显示的汉字 
	        afterPageText: '页    共 {pages} 页', 
	        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
	    }); 
		
		
		 $("#bdriverBox").show();
		 $("#bdriverBox").dialog({
			 title:'司机信息列表',
			 width: 1000,    
			 height:400,   
			 closed: false,    
			 cache: false,   
			 modal: true,
			 buttons:[
					  {
					   iconCls: 'icon-save',
					   text:'绑定',
					   handler: function(){
					 	
						  binddriversure(title,righturl,rightid,carid);
 
					   }
					  },
					  {
				 	   iconCls: 'icon-ok',
					   text:'关闭',
					   handler: function(){
			    	 	
				 			$("#bdriverBox").dialog('close');
			    	   }
			 		}]
		 })

		 $("#bdriverBox").window('center');
		
		
	}

	
}


/**
 * 车辆解绑司机
 * @return
 */
function unbinddriver(index)
{
	
	 var rows = $('#dgBox').datagrid('getRows');
	 var row = rows[index];
	 if(row.driver=="")
	 {
		 alert("车辆未绑定司机，无需解绑！");
		 return false;
	 }

	 var data = {};
	//data['rightid'] = rightid;
	data['tokenid'] = getTokenid();
	data['carid'] = row.carid;
	data['driverid'] = row.driverid;
	
	$.ajax( {
		url:unbinddriverurl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(retData){
			if(retData.retCode == successCode)
			{
				show(retData.retMsg);
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
 * 司机解绑车辆
 * @return
 */
function unbindcar(index)
{
	
	 var rows = $('#bdriverDg').datagrid('getRows');
	 var row = rows[index];
	 if(row.carid=="")
	 {
		 alert("司机未被车辆绑定，无需解绑！");
		 return false;
	 }

	 var data = {};
	//data['rightid'] = rightid;
	data['tokenid'] = getTokenid();
	data['carid'] = row.carid;
	data['driverid'] = row.driverid;
	
	$.ajax( {
		url:unbinddriverurl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(retData){
			if(retData.retCode == successCode)
			{
				show(retData.retMsg);
				searchOrReload();
				$("#bdriverDg").datagrid('reload');
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
 * 确认绑定司机
 * @param title
 * @param righturl
 * @param rightid
 * @param carid
 * @return
 */
function binddriversure(title,righturl,rightid,carid)
{
	var rows = $("#bdriverDg").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要绑定的司机！");
		return false;
	}
	if(rows.length>1)
	{
		alert("只能选择一个司机绑定！");
		return false;
	}
	
	row = rows[0];
	
	if(row.carid != "")
	{
		alert("您选择的司机已被其他车辆绑定，请重新选择或解绑该司机！");
		return false;
	}
	
	if(carid=="")
	{
		alert("未选中需要绑定的车辆！");
		return false;
	}
	
	var data = {};
	data['rightid'] = rightid;
	data['tokenid'] = getTokenid();
	data['carid'] = carid;
	data['driverid'] = row.driverid;
	
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
				searchOrReload();
				$("#bdriverDg").datagrid('reload');
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
 * 加载数据表格列表项
 * @return
 */
function getDriverColumnsOpt()
{
	var opt = 
		[[
		  	{field:'driverid',title:'司机id',width:15,align:'left',sortable:true},
		  	{field:'drivername',title:'司机姓名',width:15,align:'left',sortable:true},
		  	
		  	{field:'driverno',title:'证件编号',width:15,align:'left',sortable:true},
		  	{field:'driverlevel',title:'驾照级别',width:15,align:'left',sortable:true},
		  	{field:'driverstartdate',title:'证件开始日期',width:15,align:'left',sortable:true},
		  	{field:'validyear',title:'证件有效年',width:15,align:'left',sortable:true},
		  	{field:'sex',title:'性别',width:15,align:'left',sortable:true},
		  	{field:'idcardno',title:'身份证号',width:15,align:'left',sortable:true},
		  	{field:'birthday',title:'出生年月日',width:15,align:'left',sortable:true},
		  	{field:'driverphone',title:'联系电话',width:15,align:'left',sortable:true},
			{field:'familyaddress',title:'家庭住址',width:15,align:'left',sortable:true},
		  	{field:'driverstatus',title:'司机状态',width:15,align:'left',sortable:true},
		  	{field:'carno',title:'绑定车牌',width:15,align:'left',sortable:true},
			{field:'binddriver',title:'绑定状态',width:15,align:'left',sortable:true,formatter:formateBindDriver}
		  	
	   		
	   	]];
	   	return opt;
}
/**
 * 绑定格式化
 * @param val
 * @param row
 * @param index
 * @return
 */
function formateBindDriver(val,row,index)
{
	if(row.carid=="")
	{
		return "未绑定";
	}
	
    return "<a href='javascript:void(0);' onclick='unbindcar(" + index + ")'>解绑</a>";
}

function formateUnBindDriver(val,row,index)
{
	if(row.driverid=="")
	{
		return "未绑定";
	}
	
    return "<a href='javascript:void(0);' onclick='unbinddriver(" + index + ")'>解绑</a>";
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


	queryParams['tokenid'] = getTokenid();
	queryParams['carno'] = $("#carno").val();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
