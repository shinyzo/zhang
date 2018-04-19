// 查询URL
var querymypurchaseUrl ="admin/order/inner/querymypurchase.do";
var logqueryUrl        ="admin/order/innner/logquery.do";
var queryprodetailUrl ="admin/order/queryprodetail.do";
	
	
$(function(){
	// 隐藏其他组件
	
	$("#logBox").hide();
	$("#dtalBox").hide();
	$("#payBox").hide();
	$("#helpBox").hide();
	
	$("#begintime").datetimebox('setValue',formatterDate(new Date()));	
	$("#endtime").datetimebox('setValue',formatterTime(new Date()));	
	
	var begintime = $("#begintime").datetimebox('getValue');
	
	// 初始化加载数据
	$("#dgBox").datagrid({  
		url:querymypurchaseUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"begintime":begintime},
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
    	showFooter:true,
    	sortName:'ordertime',
    	onSelect:onSelect,
    	sortOrder:'desc',
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
	$("#supplierid").combobox({
		url:'public/getsupplier.json',
		valueField:'supplierid',
		textField:'suppliername',
		editable:false,
		loadFilter:function(data){
			return [{suppliername:'--请选择供货商--',supplierid:"",supplieruser:"",selected:"true"}].concat(data);
		},
		formatter:function(row){
			return row.suppliername+" ("+row.supplieruser+") ";
		}	
	})
	


}


function initValidateBox()
{

	
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
		  	{field:'tcorpid',title:'供货商编号',width:10,align:'left',sortable:true,hidden:true},	
	   		{field:'tofullname',title:'供货商名称',width:25,align:'left',sortable:true},
	   		{field:'orderfee',title:'采购单原始金额(元)',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'payfee',title:'采购单折后金额(元)',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'havepayfee',title:'已付金额(元)',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'remainfee',title:'待付金额(元)',width:20,align:'left',sortable:true,formatter:formateRedAmountF2Y},
	   		{field:'orderstatus',title:'采购单状态',width:20,align:'left',sortable:true,formatter:formateOrderstatus},
	   		{field:'ordertype',title:'采购单类型',width:20,align:'left',sortable:true,formatter:formateOrdertype},
	   		{field:'issendstoragerk',title:'是否推送至仓库',width:20,align:'left',sortable:true,formatter:formateSendStorage},
	   		{field:'rkstatus',title:'入库状态',width:15,align:'left',sortable:true,formatter:formateRKStatus},
	   		{field:'msgdatetime',title:'采购单生成时间',width:25,align:'left',sortable:true,formatter:parseTime},
	   		{field:'ordermemo',title:'备注信息',width:20,align:'left'}
	   		
	   	]];
	   	return opt;
}


function onSelect(index,row){

	 var orderno = row.orderno;	 
	 var queryParams={};
	 queryParams['orderno']=orderno;
	 queryParams['tokenid']=getTokenid();
	// 初始化加载数据
	 $("#prodg").datagrid({  
		url:queryprodetailUrl,
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
    	columns:getPurchaseDetailCols(), // 列数据
    	toolbar:'',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
	 });  

	 //设置分页控件 
	 $('#prodg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
     }); 
	 
	 
	 
}



/**
 * 采购单日志列头
 * @return
 */
function getPurchaseLogCols()
{
	var opt = 
		[[
		  	{field:'logid',title:'日志编号',width:10,align:'left',sortable:true},	
			{field:'purchaseno',title:'采购单号',width:15,align:'left',sortable:true},
			{field:'operuserid',title:'操作人员',width:15,align:'left',sortable:true},
			{field:'opertime',title:'操作时间',width:25,align:'left',sortable:true,formatter:parseTime},  
			{field:'opertype',title:'操作类型',width:20,align:'left',sortable:true},
	   		{field:'operdesc',title:'操作说明',width:20,align:'left',sortable:true}
	   	]];
	   	return opt;
}


function getPurchaseDetailCols(){
	
	var opt = 
		[[
		  	{field:'id',title:'编号',width:10,align:'left',sortable:true},	
			{field:'orderno',title:'采购单号',width:27,align:'left',sortable:true},
			{field:'productid',title:'产品编号',width:15,align:'left',sortable:true},
			{field:'productname',title:'产品名称',width:25,align:'left',sortable:true},
			{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
			{field:'productprice',title:'采购单价',width:15,align:'left',sortable:true},			
			{field:'buycount',title:'采购数量',width:15,align:'left',sortable:true},
			{field:'totalprice',title:'采购金额',width:15,align:'left',sortable:true},
			{field:'overrkcount',title:'已入库数量',width:15,align:'left',sortable:true,hidden:true}
	   	]];
	   	return opt;
	
}
/**
 * 
 * @return
 */
function getPurchasePayLogCols(){
	
	var opt = 
		[[
		  	{field:'id',title:'编号',width:10,align:'left',sortable:true},	
			{field:'补录日期',title:'补录日期',width:15,align:'left',sortable:true},
			{field:'交付人',title:'交付人',width:15,align:'left',sortable:true},
			{field:'交付地点',title:'交付地点',width:15,align:'left',sortable:true},
			{field:'交付金额',title:'交付金额',width:15,align:'left',sortable:true},
			{field:'支付方式',title:'支付方式',width:15,align:'left',sortable:true},
			{field:'支付凭据',title:'支付凭据',width:15,align:'left',sortable:true},
			{field:'备注信息',title:'备注信息',width:15,align:'left',sortable:true}
	   	]];
	   	return opt;
	
}


function formatePaydetail(val,row,index)
{
	return "<a href='javascript:void(0);' onclick='javascript:showpaydetail("+index+")'>付款详情</a>";

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
function formatepurchasedetail(value,rowData,index)
{
	return "<a href='javascript:void(0);' onclick='showpurchasedetail(" + index + ")'>查看详情</a>";

}
/**
 * 显示采购单详情
 * @param index
 * @return
 */
function showpurchasedetail(index)
{	
	 var rows = $('#dgBox').datagrid('getRows');
	 var row = rows[index];
	 var orderno = row.orderno;
	 
	 var queryParams={};
	 queryParams['orderno']=orderno;
	 queryParams['tokenid']=getTokenid();
	// 初始化加载数据
	 $("#dtaldg").datagrid({  
		url:queryprodetailUrl,
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
    	columns:getPurchaseDetailCols(), // 列数据
    	toolbar:'',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
	 });  

	 //设置分页控件 
	 $('#dtaldg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
     }); 
 
	 $("#dtalBox").show();
	 $("#dtalBox").dialog({
		 title:'采购单-产品明细',
		 width: 1000,    
		 height:400,   
		 closed: false,    
		 cache: false,   
		 modal: true,
		 buttons:[{
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
			 	   iconCls: 'icon-ok',
				   text:'确定',
				   handler: function(){
		    	 	
			 			$("#dtalBox").dialog('close');
		    	   }
		 		}]
	 })

	 $("#dtalBox").window('center');
	 
	 
	 
}


function showpurchaselog(index)
{
	 var rows = $('#dgBox').datagrid('getRows');
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
		cancelPurchase(title,righturl,rightid);
		break;
	case '2':
		addPayLog(title,righturl,rightid);
		break;
	case '3':
		sendtostorage(title,righturl,rightid);
		break;
	case '5':
		orderprint(title,righturl,rightid);
		break;
		
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}


function orderprint(title,righturl,rightid){
	
	var rows = $("#dgBox").datagrid('getSelections');
	
	if(rows.length<=0)
	{
		alert("请选择需要打印的销售单！");
		return false;
	}
	
	
	if(rows.length >1)
	{
		alert("仅能选择一个销售单进行打印！");
		return false;
	}
	
	orderno = rows[0].orderno;
	
	publicorderprint(title,righturl,rightid,orderno);
	
	
}


/**
 * 付款补录
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addPayLog(title,righturl,rightid){
	
	var rows = $('#dgBox').datagrid('getSelections');
	 
	if(rows.length<=0)
	{
		alert('请选择需要操作的记录！');
		return false;
	}
 	if(rows.length>1)
	{
		alert("只能操作一条记录！");
		return false;
	}
 	 var row = rows[0];
	 var purchaseno = rows[0].purchaseno;
	 var purchasestatus = rows[0].purchasestatus;
	 
	 if(purchasestatus=="1" || purchasestatus=="3")
	 {
		 var queryParams={};
		 queryParams['purchaseno']=purchaseno;
		 queryParams['tokenid']=getTokenid();
		// 初始化加载数据
		 $("#paydg").datagrid({  
			url:"",
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
	    	columns:getPurchasePayLogCols(), // 列数据
	    	toolbar:'',       // 工具栏
	    	onLoadError : function() {
	    		error('数据加载失败！');
	    	}
		 });  
		 
		 
		 
		 $("#payBox").show();
		 $("#payBox").dialog({
			 title:'采购单-付款补录',
			 width: 700,    
			 height:400,   
			 closed: false,    
			 cache: false,   
			 modal: true,
			 buttons:[{
				 	   iconCls: 'icon-ok',
					   text:'确定',
					   handler: function(){
			    	 	
				 			$("#payBox").dialog('close');
			    	   }
			 		}]
		 })
		 
		 

		 $("#payBox").window('center');
		 
	 }
	 else
	 {
		 alert("该采购单已结清或被取消无法进行补录！");
		 
	 }
	 
	
}



/**
 * 发送采购单至仓库
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function sendtostorage(title,righturl,rightid)
{
	 var rows = $('#dgBox').datagrid('getSelections');

	 if(rows.length>0)
	 {

		 
		 var ordernoArray =[];
		 $.each(rows,function(index,row){
			 
			 var issendstoragerk = row.issendstoragerk;
			 var orderstatus = row.orderstatus;
			 // 已推送且已取消的订单不进行推送
			 if(issendstoragerk ==0 && orderstatus =="0001")
			 {
				 ordernoArray.push(row.orderno);
			 }
			 
		 })
		 
		 if(ordernoArray.length==0)
		 {
			 alert("选择项中没有符合推送规则的采购单,具体推送规则请查看帮助文档！");
			 return false;
		 }
		 
		var ordernolist = ordernoArray.join(',');
		 
		var data={};
		data['tokenid']=getTokenid();
		data['rightid']= rightid;				
		data['ordernolist']=ordernolist;
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
	 else
	{
		 alert('请选择需要操作的记录！');
		 return false;		 
	}
	
}


/**
 * 采购单取消
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function cancelPurchase(title,righturl,rightid)
{
	 var rows = $('#dgBox').datagrid('getSelections');
	 
	 if(rows.length<=0)
	 {
		 alert('请选择需要操作的记录！');
		 return false;
	 }
	 
	 if(rows.length>1)
	 {
		alert("只能操作一条记录！");
		return false;
	 }
	 
	 var row = rows[0];
	 var orderno = rows[0].orderno;
	 var orderstatus = rows[0].orderstatus;
	 var issendstoragerk = rows[0].issendstoragerk;
	 // 
	 if(orderstatus=="0001" && issendstoragerk==0)
	 {
		 $.messager.confirm(title,"确认取消采购单编号：["+orderno+"]吗？",function(result){
			 
			 if(result)
			 {
				var data={};
				data['tokenid']=getTokenid();
				data['rightid']= rightid;				
				data['orderno']=orderno;
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
			 
		 })
		
	 }
	 else
	 {
		 
		 alert('该采购单状态不允许取消,只有刚生效且未推送的采购单才允许取消！');
		 return false;
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

	var supplierid = $("#supplierid").combobox('getValue');	
	queryParams['tcorpid']=supplierid;
	queryParams['begintime']=$("#begintime").datetimebox('getValue');
	queryParams['endtime']=$("#endtime").datetimebox('getValue');
	queryParams['orderno']=$("#orderno").val();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
	$("#supplierid").combobox('reload');
	$("#begintime").datetimebox('setValue',formatterDate(new Date()));	
	$("#endtime").datetimebox('setValue',formatterTime(new Date()));	
}



