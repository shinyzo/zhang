// 查询URL
var queryUrl ="admin/order/querymycgorder.do";
// 采购单详情查询
var queryPurchasedetailUrl ="admin/order/queryprodetail.do";
// 采购单入库明细查询
var queryRkdetailurl ="admin/storage/queryRkdetail.do";
	
	
$(function(){
	
	$("#logBox").hide();
	$("#rkworkBox").hide();
	$("#warehouseBox").hide();
	$("#rkdtBox").hide();
	// 隐藏其他组件
	$("#begintime").datetimebox('setValue',formatterDate(new Date()));	
	$("#endtime").datetimebox('setValue',formatterTime(new Date()));	
	
	var begintime = $("#begintime").datetimebox('getValue');
	
	// 初始化加载数据
	$("#dg").datagrid({  
		url:queryUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"begintime":begintime,"issendstoragerk":"1"},
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		pagination:true,       // 显示分页
		singleSelect:true,     // 只能选中单行
		pageSize: pageSize,
		pageList:pageList,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getColumnsOpt(), // 列数据
    	toolbar:'#headBox',       // 工具栏
    	sortName:'ordertime',
    	sortOrder:'desc',
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
    });  

	 //设置分页控件 
	$('#dg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 
	
	
	initLoadingData();
	
	// 初始化表单验证
	initValidateBox();
	

});

function initLoadingData()
{
	$("#warehouseid").combobox({
		url:'public/getwarehouse.json',
		valueField:'warehouseid',
		textField:'warehousename',
		editable:false,
		formatter:function(row)
		{
			var warehouseStr = row.warehousename;
			if(row.openstatus=="Y")
			{
				warehouseStr += " (共享) ";	
			}
			
			warehouseStr += " (剩余容量："+row.lessvolumepercent+"%) ";
		
			return warehouseStr;
		}
	})
	
	$("#rkstatus").combobox({
		url:'public/getstatusparams.json',
		queryParams:{"type":"rkstatus"},
		valueField:'statuscode',
		textField:'statusval',
		loadFilter:function(data){
			return [{statusval:'--请选择入库状态--',statuscode:'',selected:"true"}].concat(data);
		}
	})

}


function initValidateBox()
{
	
	$("#warehouseid").combobox({
		required: true,
		validType:"comboxValidate['warehouseid']",
		missingMessage:'请选择仓库！',
		invalidMessage:'请选择仓库！'	
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
			{field:'orderno',title:'采购单号',width:27,align:'left',sortable:true},
			{field:'ordertime',title:'采购单日期',width:24,align:'left',sortable:true,formatter:parseTime},		  
		  	{field:'tcorpid',title:'供货商编号',width:20,align:'left',sortable:true,hidden:true},	
	   		{field:'tofullname',title:'供货商名称/企业',width:20,align:'left',sortable:true},
	   		{field:'orderfee',title:'采购单原始金额',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'payfee',title:'采购单折后金额(*)',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'havepayfee',title:'已付金额',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'remainfee',title:'待付金额',width:20,align:'left',sortable:true,formatter:formateRedAmountF2Y},
	   		{field:'orderstatus',title:'采购单状态',width:20,align:'left',sortable:true,formatter:formateOrderstatus},
	   		{field:'ordertype',title:'采购单类型',width:20,align:'left',sortable:true,formatter:formateOrdertype},
	   		{field:'issendstoragerk',title:'是否推送至仓库',width:20,align:'left',sortable:true,formatter:formateSendStorage},
	   		{field:'rkstatus',title:'入库状态',width:20,align:'left',sortable:true,formatter:formateRKStatus},

	   		{field:'ordermemo',title:'备注信息',width:20,align:'left'}, 
	   		{field:'rkdetail',title:'入库详情',width:15,align:'left',sortable:true,formatter:formaterkdetail},
	   		{field:'operlog',title:'操作日志',width:15,align:'left',formatter:formateoperlog}
	   		
	   	]];
	   	return opt;
}


/**
 * 采购单操作日志列头
 * @return
 */
function getPurchaseLogCols()
{
	var opt = 
		[[
		  	{field:'logid',title:'日志编号',width:10,align:'left',sortable:true},	
			{field:'orderno',title:'采购单号',width:25,align:'left',sortable:true},
			{field:'operuserid',title:'操作人员',width:15,align:'left',sortable:true},
			{field:'opertime',title:'操作时间',width:25,align:'left',sortable:true,formatter:parseTime},  
			{field:'opertype',title:'操作类型',width:20,align:'left',sortable:true},
	   		{field:'operdesc',title:'操作说明',width:20,align:'left',sortable:true}
	   	]];
	   	return opt;
}
/**
 * 入库详情列头
 * @return
 */
function getRkdetailCols()
{
	var opt = 
		[[
//		  	{field:'purchaseno',title:'采购单号',width:25,align:'left',sortable:true},
		  	{field:'rkno',title:'入库单号',width:20,align:'left',sortable:true},	
		  	{field:'rktime',title:'入库时间',width:25,align:'left',sortable:true,formatter:parseTime},  
		  	{field:'warehouseid',title:'仓库编号',width:20,align:'left',sortable:true,hidden:true},
		  	{field:'warehousename',title:'仓库名称',width:25,align:'left',sortable:true},
//		  	{field:'corpid',title:'企业id',width:20,align:'left',sortable:true},
			{field:'operuserid',title:'操作人员',width:15,align:'left',sortable:true},
			{field:'productid',title:'产品id',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'productname',title:'产品名称',width:25,align:'left',sortable:true},
			{field:'productcode',title:'产品编码',width:20,align:'left',sortable:true},
			{field:'rkcount',title:'入库数量',width:10,align:'left',sortable:true},
			{field:'rkstatus',title:'入库状态',width:10,align:'left',sortable:true,hidden:true}
	   	]];
	   	return opt;

}
/**
 * 采购单详情
 * @return
 */
function getPurchaseDetailCols(){
	
	var opt = 
		[[
		  	{field:'id',title:'编号',width:5,align:'left',sortable:true},	
			{field:'orderno',title:'采购单号',width:25,align:'left',sortable:true},
			{field:'productid',title:'产品编号',width:10,align:'left',sortable:true},
			{field:'productname',title:'产品名称',width:25,align:'left',sortable:true},
			{field:'totalprice',title:'采购总金额',width:15,align:'left',sortable:true},
			{field:'productprice',title:'采购单价',width:10,align:'left',sortable:true},
			{field:'buycount',title:'采购数量',width:10,align:'left',sortable:true},
			{field:'overrkcount',title:'已入库数量(*)',width:15,align:'left'},
			{field:'remainrkcount',title:'未入库数量(*)',width:15,align:'left',sortable:true,formatter:formateRemaincount},
			{field:'realrkcount',title:'批次入库数量(修改)',width:15,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,min:0}}}
	   	]];
	   	return opt;
	
}




/**
 * 格式化采购单状态
 * @param val
 * @return
 */
function formatePurchaseStatus(val)
{
	if(val==1) return "采购单已生效";
	if(val==2) return "采购单已取消";
	if(val==3) return "采购单未结清";
	if(val==4) return "采购单已结清";

}


/**
 * 查看日志格式化
 * @param value
 * @param row
 * @param index
 * @return
 */
function formateoperlog(value,row,index)
{
	return "<a href='javascript:void(0);' onclick='javascript:showpurchaselog("+index+")'>查看日志</a>";
}
/**
 * 查看详情格式化
 * @param value
 * @param rowData
 * @param index
 * @return
 */
function formaterkdetail(value,rowData,index)
{
	return "<a href='javascript:void(0);' onclick='showrkdetail(" + index + ")'>入库详情</a>";

}

/**
 * 查看入库详情
 * @param index
 * @return
 */
function showrkdetail(index)
{	
	 var rows = $('#dg').datagrid('getRows');
	 var row = rows[index];
	 var purchaseno = row.purchaseno;
	 
	 var queryParams={};
	 queryParams['orderno']=row.orderno;
	 queryParams['tokenid']=getTokenid();
	// 初始化加载数据
	 $("#rkdtDg").datagrid({  
		url:queryRkdetailurl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:queryParams,
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		pagination:true,       // 显示分页
		singleSelect:true,     // 只能选中单行
		pageSize: pageSize,
		pageList:pageList,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getRkdetailCols(), // 列数据
    	toolbar:'',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
	 });  

	 //设置分页控件 
	 $('#rkdtDg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
     }); 
 
	 $("#rkdtBox").show();
	 $("#rkdtBox").dialog({
		 title:'采购单-入库详情',
		 width: 1000,    
		 height:400,   
		 closed: false,    
		 cache: false,   
		 modal: true,
		 buttons:[{
			 	   iconCls: 'icon-ok',
				   text:'确定',
				   handler: function(){
		    	 	
			 			$("#rkdtBox").dialog('close');
		    	   }
		 		}]
	 })

	 $("#rkdtBox").window('center');

}


/**
 * 采购单入库作业
 * @param index
 * @return
 */
function rkwork(title,righturl,rightid)
{	
	 var rows = $('#dg').datagrid('getSelections');
	 
	 if(rows.length<=0)
	 {
		 alert("请选择要入库作业的采购单！");
		 return false;
		 
	 }
	 
	 if(rows.length>1){
		 
		 alert("单次仅能操作一个采购单！");
		 return false;
	 }
	 
	 var row = rows[0];
	 var rkstatus = row.rkstatus;
	 var orderno = row.orderno;
	 
	 var queryParams={};
	 queryParams['orderno']=orderno;
	 queryParams['tokenid']=getTokenid();
	// 初始化加载数据
	 $("#rkworkDg").datagrid({  
		url:queryPurchasedetailUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:queryParams,
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
    	columns:getPurchaseDetailCols(), // 列数据
    	toolbar:'#warehouseBox',       // 工具栏
    	onClickCell:onClickCell,
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
	 });  

	 //设置分页控件 
	 $('#rkworkDg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
     }); 
 
	 $("#rkworkBox").show();
	 $("#rkworkBox").dialog({
		 title:'采购单-入库作业',
		 width: 1100,    
		 height:450,   
		 closed: false,    
		 cache: false,   
		 modal: true,
		 buttons:[{
				   iconCls: 'icon-ok',
				   text:'批次入库',
				   handler: function()
				   {
			 			if(rkstatus=="0000")
			 			{
			 				alert("该采购单已入库完成，无法进行入库动作,请查看入库详情！");
			 				return false;
			 			}
			 			pcrk(title,righturl,rightid,orderno);
				   }
				  },
				  
				  {
				   iconCls: 'icon-ok',
				   text:'一键入库',
				   handler: function()
				   {
			 			if(rkstatus=="0000")
			 			{
			 				alert("该采购单已入库完成，无法进行入库动作,请查看入库详情！");
			 				return false;
			 			}
						yjrk(title,righturl,rightid,orderno);
				   }
				   },
							          
		          {
			 	   iconCls: 'icon-print',
				   text:'打印',
				   handler: function(){
		    	 	
			 			alert("打印中...");
		 			}
	 			  },
	 			  {
				 	   iconCls: 'icon-export',
					   text:'导出',
					   handler: function(){
			    	 	
				 			alert("导出中...");
			 			}
		 		  },
		          {
			 	   iconCls: 'icon-cancel',
				   text:'关闭',
				   handler: function(){
		    	 	
			 			$("#rkworkBox").dialog('close');
		    	   }
		 		}]
	 })

	 $("#rkworkBox").window('center');
	 
}

/**
 * 一键入库
 * @return
 */
function yjrk(title,righturl,rightid,orderno)
{
	 var rows = $("#rkworkDg").datagrid('getRows');		 
	  $.each(rows,function(index,row){
		  
		  var remainrkcount = row.remainrkcount;
		  if(parseFloat(remainrkcount)>0)
		  {
			  row.realrkcount = remainrkcount;
			  var rowIndex = $("#rkworkDg").datagrid('getRowIndex',row);
			  $("#rkworkDg").datagrid('refreshRow',rowIndex);
			  $("#rkworkDg").datagrid('selectRow',rowIndex);
		  }
		  
		  
	  });	
	  
	  rkAction(title,righturl,rightid,orderno);
}

/**
 * 入库动作
 * @return
 */
function rkAction(title,righturl,rightid,orderno)
{
	
	 if(!$("#warehousefm").form('validate'))
	 {
		 alert("请选择需要入库的仓库！");
		 return false;
		 
	 }
	
	 var rows = $("#rkworkDg").datagrid('getSelections');
		
	 if(rows.length<=0)
	 {
		alert("请选择要入库的数据！");
		return false;
		
	 }
 
	var data={};
	var warehouseid = $("#warehouseid").combobox('getValue');
	var warehousename = $("#warehouseid").combobox('getText');
	var tokenid = getTokenid();
	var rkjsondata = JSON.stringify(rows);	
	
	data['warehouseid'] = warehouseid;
	data['warehousename']=warehousename;
	data['tokenid']=tokenid;
	data['orderno']= orderno;
	data['rightid']=rightid;
	data['rkjsondata'] = rkjsondata;
	
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
				$("#rkworkDg").datagrid('reload');
				$("#dg").datagrid('reload');
				
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
 * 批次入库
 * @param title
 * @param righturl
 * @param rightid
 * @param purchaseno
 * @return
 */
function pcrk(title,righturl,rightid,orderno)
{
	

	var rows = $("#rkworkDg").datagrid('getSelections');
	
	if(rows.length<=0)
	{
		alert("无符合入库的记录！");
		return false;
		
	}
	$("#rkworkDg").datagrid('endEdit', editIndex);
    $.each(rows,function(index,row){
    	if(parseFloat(row.realrkcount)>0)
    	{
    		if(parseFloat(row.realrkcount) > parseFloat(row.remainrkcount))
    		{
    			row.realrkcount = row.remainrkcount;
    			var rowIndex = $("#rkworkDg").datagrid('getRowIndex',row);
    			 $("#rkworkDg").datagrid('refreshRow',rowIndex);
    		}
    		
    	}
    	else
    	{
    		// 无效数据 取消选择
    		var rowIndex = $("#rkworkDg").datagrid('getRowIndex',row);
    		$("#rkworkDg").datagrid('unselectRow',rowIndex);
    	}
   
    })
     
    rkAction(title,righturl,rightid,orderno);
}

/**
 * 展示采购单操作日志
 * @param index
 * @return
 */
function showpurchaselog(index)
{
	 var rows = $('#dg').datagrid('getRows');
	 var row = rows[index];
	 var purchaseno = row.purchaseno;
	 var queryParams={};
	 queryParams['purchaseno']=purchaseno;
	 queryParams['tokenid']=getTokenid();
	// 初始化加载数据
	 $("#logdg").datagrid({  
		url:logqueryUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:queryParams,
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		pagination:true,       // 显示分页
		singleSelect:true,     // 只能选中单行
		pageSize: pageSize,
		pageList:pageList,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getPurchaseLogCols(), // 列数据
    	toolbar:'',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
	 });  

	 //设置分页控件 
	 $('#logdg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
     }); 
 
	 $("#logBox").show();
	 $("#logBox").dialog({
		 title:'采购单-操作详情',
		 width: 700,    
		 height:400,   
		 closed: false,    
		 cache: false,   
		 modal: true,
		 buttons:[{
			 	   iconCls: 'icon-ok',
				   text:'确定',
				   handler: function(){
		    	 	
			 			$("#logBox").dialog('close');
		    	   }
		 		}]
	 })

	 $("#logBox").window('center');
	
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
		rkwork(title,righturl,rightid);
		break;

	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
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

	var queryParams = $("#dg").datagrid('options').queryParams;

	queryParams['begintime']=$("#begintime").datetimebox('getValue');
	queryParams['endtime']=$("#endtime").datetimebox('getValue');
	queryParams['orderno']=$("#orderno").val();
	
	$("#dg").datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
	// 隐藏其他组件
	$("#begintime").datetimebox('setValue',formatterDate(new Date()));	
	$("#endtime").datetimebox('setValue',formatterTime(new Date()));	
	
}

//datagrid 单击编辑单元格
$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			// 获取冻结列和非冻结列
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});
// 当点击下一个编辑框时校验上一个文本框内容是否合法
var editIndex = undefined;
function endEditing(_this){
	if (editIndex == undefined){return true}
	if ($(_this).datagrid('validateRow', editIndex)){
		
		$(_this).datagrid('selectRow',editIndex);
		$(_this).datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
//		var data ={};
//		
//		var rows = $(_this).datagrid('getRows');
//		$.each(rows,function(index,row){
//			var rowIndex = $(_this).datagrid('getRowIndex',row);
//			if(rowIndex==editIndex)
//			{
//				data = row;
//			}	
//		})
//		$(_this).datagrid('endEdit', editIndex);
//		if(parseFloat(data.realrkcount)>0 && parseFloat(data.realrkcount)<=  parseFloat(data.lessrkcount))
//		{
//			$(_this).datagrid('selectRow',editIndex);
//			
//			$(_this).datagrid('endEdit', editIndex);
//			editIndex = undefined;
//			return true;
//		}
//		else if( parseFloat(data.realrkcount)==0)
//		{
//			$(_this).datagrid('endEdit', editIndex);
//			editIndex = undefined;
//			return true;
//			
//		}else
//		{
//			$(_this).datagrid('beginEdit', editIndex);
//			return false;
//		}

		
		
	} else {
		return false;
	}
}



function onClickCell(index, field){
	if (endEditing(this)){
		$(this).datagrid('selectRow', index)
				.datagrid('editCell', {index:index,field:field});
		editIndex = index;
	}
}


