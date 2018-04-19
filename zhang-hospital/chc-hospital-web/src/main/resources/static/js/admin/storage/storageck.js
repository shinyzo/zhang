// 查询URL
var queryUrl ="admin/order/querymysaleorder.do";
//销售单出库明细查询
var queryCkdetailurl ="admin/storage/queryCkdetail.do";

var queryprodetailurl = "admin/order/queryprodetail.do";
	
var cksaveurl = "";
var ckrightid = "";
var ckorderno = "";
$(function(){
	
	// 隐藏其他组件
	$("#ckdtBox").hide();
	$("#ckworkBox").hide();
	$("#warehouseBox").hide();
	$("#ckbtn").hide();
	
	$("#begintime").datetimebox('setValue',formatterDate(new Date()));	
	$("#endtime").datetimebox('setValue',formatterTime(new Date()));	
	
	var begintime = $("#begintime").datetimebox('getValue');
	

	// 初始化加载数据
	$("#dg").datagrid({  
		url:queryUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"begintime":begintime,"issendstorageck":"1"},
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

	$("#ckstatus").combobox({
		url:'public/getstatusparams.json',
		queryParams:{"type":"ckstatus"},
		valueField:'statuscode',
		textField:'statusval',
		loadFilter:function(data){
			return [{statusval:'--请选择出库状态--',statuscode:'',selected:"true"}].concat(data);
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
			{field:'orderno',title:'销售单号',width:25,align:'left',sortable:true},
			{field:'ordertime',title:'销售单日期',width:24,align:'left',sortable:true,formatter:parseTime},		  
		  	{field:'fcorpid',title:'分销商编号',width:20,align:'left',sortable:true,hidden:true},	
	   		{field:'fromfullname',title:'分销商名称/企业名称',width:25,align:'left',sortable:true},
	   		{field:'orderfee',title:'销售单原始金额(元)',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'payfee',title:'销售单折后金额(元)',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'havepayfee',title:'已付金额(元)',width:15,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'remainfee',title:'待付金额(元)',width:20,align:'left',sortable:true,formatter:formateRedAmountF2Y},
	   		{field:'orderstatus',title:'销售单状态',width:20,align:'left',sortable:true,formatter:formateOrderstatus},
	   		{field:'transstatus',title:'交易状态',width:20,align:'left',sortable:true,formatter:formatetransstatus},
	   		{field:'ordertype',title:'销售单类型',width:20,align:'left',sortable:true,formatter:formateOrdertype},
	   		{field:'issendstorageck',title:'是否推送至仓库',width:20,align:'left',sortable:true,formatter:formateSendStorage},
	   		{field:'ckstatus',title:'出库状态',width:15,align:'left',sortable:true,formatter:formateCkstatus},
	   		{field:'issendlogistic',title:'是否推送至物流',width:20,align:'left',sortable:true,formatter:formateSendLogistic},
	   		{field:'logisticstatus',title:'物流状态',width:15,align:'left',sortable:true,formatter:formateLogisticStatus},
	   		{field:'ckdetail',title:'出库详情',width:20,align:'left',sortable:true,formatter:formateCkdetail}
	   		
	   	]];
	return opt;
		
}

/**
 * 查看详情格式化
 * @param value
 * @param rowData
 * @param index
 * @return
 */
function formateCkdetail(value,rowData,index)
{
	return "<a href='javascript:void(0);' onclick='showckdetail(" + index + ")'>出库详情</a>";

}

/**
 * 查看出库详情
 * @param index
 * @return
 */
function showckdetail(index)
{	
	 var rows = $('#dg').datagrid('getRows');
	 var row = rows[index];
	 
	 var queryParams={};
	 queryParams['orderno']=row.orderno;
	 queryParams['tokenid']=getTokenid();
	// 初始化加载数据
	 $("#ckdtDg").datagrid({  
		url:queryCkdetailurl,
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
    	columns:getCkdetailCols(), // 列数据
    	toolbar:'',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
	 });  

	 //设置分页控件 
	 $('#ckdtDg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
     }); 
 
	 $("#ckdtBox").show();
	 $("#ckdtBox").dialog({
		 title:'销售单-出库详情',
		 width: 1000,    
		 height:400,   
		 closed: false,    
		 cache: false,   
		 modal: true,
		 buttons:[{
			 	   iconCls: 'icon-ok',
				   text:'确定',
				   handler: function(){
		    	 	
			 			$("#ckdtBox").dialog('close');
		    	   }
		 		}]
	 })

	 $("#ckdtBox").window('center');

}



/**
 * 出库详情列头
 * @return
 */
function getCkdetailCols()
{
	var opt = 
		[[
		  	{field:'ckno',title:'出库单号',width:20,align:'left',sortable:true},	
		  	{field:'cktime',title:'出库时间',width:25,align:'left',sortable:true,formatter:parseTime},  
		  	{field:'warehouseid',title:'仓库编号',width:10,align:'left',sortable:true,hidden:true},
		  	{field:'warehousename',title:'仓库名称',width:20,align:'left',sortable:true},
			{field:'operuserid',title:'操作人员',width:15,align:'left',sortable:true},	
			{field:'productid',title:'产品id',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'productname',title:'产品名称',width:20,align:'left',sortable:true},
	   		{field:'productcode',title:'产品编码',width:20,align:'left',sortable:true},
	   		{field:'ckcount',title:'出库数量',width:25,align:'left',sortable:true},
			{field:'ckstatus',title:'出库状态',width:10,align:'left',sortable:true,formatter:formateckstatus}
	   	]];
	   	return opt;

}

function formateckstatus(val)
{
	if(val=="1") return "已出库";
	if(val=="0" || val=="") return "待出库";
}

function getProdetailCols()
{
	var opt = 
		[[
		  	{field:'id',title:'编号',width:15,align:'left',sortable:true,hidden:true},	
		  	{field:'orderno',title:'订单号',width:25,align:'left',sortable:true},
			{field:'productid',title:'产品id',width:10,align:'left',sortable:true},
		  	{field:'productname',title:'产品名称',width:25,align:'left',sortable:true},	
			{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},  
	   		{field:'productprice',title:'销售价格(元)',width:15,align:'left',sortable:true},
			{field:'totalprice',title:'销售金额(元)',width:15,align:'left',sortable:true},	
	   		{field:'buycount',title:'购买数量',width:15,align:'left',sortable:true},
	   		{field:'overckcount',title:'已出库数量',width:15,align:'left',sortable:true},
	   		{field:'remainckcount',title:'未出库数量',width:15,align:'left',sortable:true,formatter:formateRemaincount},
	   		{field:'warehouseid',title:'选择仓库',width:35,align:'left',sortable:true,formatter:function(value,row){return row.warehousename;},editor:{type:'combobox'}},
	   		{field:'realckcount',title:'实际出库数量',width:15,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,min:0}}}
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
		ckwork(title,righturl,rightid);
		break;
	case '2':
		sendlogistic(title,righturl,rightid);
		break;

	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}


/**
 * 推送至物流作业
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function sendlogistic(title,righturl,rightid){
	
	 var rows = $('#dg').datagrid('getSelections');

	 if(rows.length>0)
	 { 
		 var ordernoArray =[];
		 $.each(rows,function(index,row){
			 
			 var isSendLogistic = row.issendlogistic;
			 var ckstatus  = row.ckstatus;
			 var orderType = row.ordertype; 
			 // 已推送且已取消的订单不进行推送,销售开单出库的订单无需推送
			 if(checkCanSend2Logistic(isSendLogistic,ckstatus,orderType))
			 {
				 ordernoArray.push(row.orderno);
			 }
			 else
			 {
				 $("#dg").datagrid('unselectRow',$("#dg").datagrid('getRowIndex',row));
				 
			 }
		 })
		 
		 if(ordernoArray.length==0)
		 {
			 alert("出库完成且未推送的销售单才能进行推送，没有符合推送规则的记录！");
			 return false;
		 }
		 
		var orderlist = ordernoArray.join(',');
		 
		var data={};
		data['tokenid']=getTokenid();
		data['rightid']= rightid;				
		data['orderlist']=orderlist;
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
 * 出库作业
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function ckwork(title,righturl,rightid){
	

	 var rows = $('#dg').datagrid('getSelections');
	 
	 if(rows.length<=0)
	 {
		 alert("请选择要出库的销售单！");
		 return false;
		 
	 }
	 
	 if(rows.length>1){
		 
		 alert("单次仅能操作一个销售单！");
		 return false;
	 }
	 
	 
	 var row = rows[0];
	 var ckstatus = row.ckstatus;
	
	 if(ckstatus=="0000")
	 {
		 $("#pcckbtn").linkbutton({disabled:true});
		 $("#yjckbtn").linkbutton({disabled:true}); 
	 }
	 else
	 {
		 $("#pcckbtn").linkbutton({disabled:false});
		 $("#yjckbtn").linkbutton({disabled:false}); 
	 }
	 
	 var orderno = row.orderno;
	 
	 var queryParams={};
	 queryParams['orderno']=orderno;
	 queryParams['tokenid']=getTokenid();
	// 初始化加载数据
	 $("#ckworkDg").datagrid({  
		url:queryprodetailurl,
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
	   	columns:getProdetailCols(), // 列数据
	   	toolbar:'#warehouseBox',
	   	onClickCell:onClickCell,
	   	onLoadError : function() {
	   		error('数据加载失败！');
	   	}
	 });  

	 //设置分页控件 
	 $('#ckworkDg').datagrid('getPager').pagination({ 
       beforePageText: '第',//页数文本框前显示的汉字 
       afterPageText: '页    共 {pages} 页', 
       displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 

	
	 $("#ckworkBox").show();
	 $("#ckworkBox").dialog({
		 title:'销售单-出库作业',
		 width: 1100,    
		 height:450,   
		 closed: false,    
		 cache: false,   
		 modal: true,
		 buttons:'#ckbtn'
	 })

	 $("#ckworkBox").window('center');
	 
	 ckorderno = orderno;
	 cksaveurl = righturl;
	 ckrightid = rightid;

}

/**
 * 批次出库
 * @return
 */
function pcck()
{
	var dg = $("#ckworkDg");
	endEditing(dg);
	
	var rowArray =[];
	var rows = $('#ckworkDg').datagrid('getSelections');
	$.each(rows,function(index,row){
	
		var warehouseid = row.warehouseid;
		var realckcount = parseFloat(row.realckcount);
		var remainckcount = parseFloat(row.remainckcount);
		var rowIndex = $('#ckworkDg').datagrid('getRowIndex',row);
		
		if(realckcount > 0 && warehouseid > 0)
		{
			if(realckcount > remainckcount)
			{
				row.realckount = remainckcount;
			}
			
			$('#ckworkDg').datagrid('selectRow',rowIndex);
			rowArray.push(row);
		}
		else
		{
			$('#ckworkDg').datagrid('unselectRow',rowIndex);
			
		}
	
	
	});
			
	if(rowArray.length<=0)
    {
    	alert("筛选后没有符合要求的记录，请重新填写！");
    	return false;
    	
    }
	
	 // 校验实际入库数与剩余入库数
    $.messager.confirm('出库确认',"有效数据为被选中的数据共"+rowArray.length+"，是否确认？",function(result){
    	
    	if(result)
    	{
    		var data={};
    		var tokenid = getTokenid();
    		var ckjsondata = JSON.stringify(rowArray);	
    		
    		data['tokenid']=tokenid;
    		data['orderno']= ckorderno;
    		data['rightid']= ckrightid;
    		data['ckjsondata'] = ckjsondata;
    		$.ajax( {
				url:cksaveurl,
				async:false,
				type:"post",
				data:data,
				dataType:'json',
				success:function(retData){
					if(retData.retCode == successCode)
					{
						show(retData.retMsg);
						$("#ckworkDg").datagrid('reload');
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
    	
    	
    })        
		
		

	
	
}

/**
 * 一键出库 ,将剩余未出库的进行一次性出库，无需填写数据
 * @return
 */
function yjck()
{
	var dg = $("#ckworkDg");
	endEditing(dg);

	var rows = $('#ckworkDg').datagrid('getRows');
	
	$.each(rows,function(index,row){
		
		var remainckcount = parseFloat(row.remainckcount);
		if(remainckcount>0)
		{
			var rowIndex = $('#ckworkDg').datagrid('getRowIndex',row);
			$('#ckworkDg').datagrid('selectRow',rowIndex);
			row.realckcount = row.remainckcount;
			$('#ckworkDg').datagrid('refreshRow',rowIndex);
		}
		
	})
	
    // 执行批次出库
    pcck();
    		
}


/**
 * 关闭出库对话框
 * @return
 */
function closeCk()
{
	$("#ckworkBox").dialog('close');
}

function exportCk(){
	alert("导出中...");
	
}

function printCk(){
	
	alert('打印中');
	
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
	queryParams['ckstatus']=$("#ckstatus").combobox('getValue');
	
	$("#dg").datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
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
		
		var ed = $(_this).datagrid('getEditor', {index:editIndex,field:'warehouseid'});
		var warehousename = $(ed.target).combobox('getText');
		$(_this).datagrid('getRows')[editIndex]['warehousename'] = warehousename;
		$(_this).datagrid('selectRow',editIndex);
		
		
		$(_this).datagrid('endEdit', editIndex);
		
		editIndex = undefined;
		return true;		
	} else {
		return false;
	}
}



function onClickCell(index, field){
	
	
	if(endEditing(this))
	{
		$(this).datagrid('beginEdit',index);

		// 获取当前行中的仓库对象
		var ed = $(this).datagrid('getEditor', {index:index,field:'warehouseid'});
		var productid = $(this).datagrid('getRows')[index]['productid'];
		$(ed.target).combobox({
			url:'public/getstockyproductid.json?productid='+productid,
			valueField:'warehouseid',
			textField:'warehousename',
			editable:false,
			formatter:function(row)
			{
				var warehouseStr = row.warehousename;	
				warehouseStr += " ("+row.availablestock +")";
				row.warehousename = warehouseStr;
				return row.warehousename;
			}
		})
		
		// 将编辑行改为当前行
		editIndex = index;
		
	}
	
}



