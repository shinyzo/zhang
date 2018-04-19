// 查询URL
var queryUrl = "admin/logistic/queryorderschedu.do";
var queryOrderDetailUrl="admin/order/queryprodetail.do";
var queryScheduOrderDetailUrl="admin/logistic/queryScheduOrderDetail.do";

$(function(){
	// 隐藏其他组件
	$("#scheduBox").hide();
	$("#orderBox").hide();
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
	

}



/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'scheduid',title:'调度id',width:15,align:'left',sortable:true},
		  	{field:'schedutime',title:'调度时间',width:15,align:'left',sortable:true},
		  	{field:'carid',title:'车辆id',width:15,align:'left',sortable:true},
		  	{field:'carno',title:'车牌号',width:15,align:'left',sortable:true},
		  	{field:'driverid',title:'司机id',width:15,align:'left',sortable:true},
		  	{field:'drivername',title:'司机姓名',width:15,align:'left',sortable:true},
		  	{field:'driverphone',title:'联系电话',width:15,align:'left',sortable:true},
		  	{field:'schedustatus',title:'调度状态',width:15,align:'left',sortable:true,formatter:formateScheduStatus},
		  	{field:'schedudetail',title:'调度详情',width:15,align:'left',sortable:true,formatter:formateScheduDetail}
		  	
	   	]];
	   	return opt;
}

function getScheduOrderCols()
{
	var opt = 
		[[
		  	{field:'scheduid',title:'调度id',width:15,align:'left',sortable:true},
		  	{field:'orderno',title:'订单号',width:15,align:'left',sortable:true}	,
		  	{field:'status',title:'状态',width:15,align:'left',sortable:true},
		  	{field:'orderdetail',title:'订单详情',width:15,align:'left',sortable:true,formatter:formateOrderDetail},
		  	{field:'memo',title:'备注',width:15,align:'left',sortable:true}
	   	]];
	   	return opt;
}

/**
 * 订单明细
 * @param val
 * @param row
 * @param index
 * @return
 */
function formateOrderDetail(val,row,index)
{
	
	return "<a href='javascript:void(0)' onclick='showOrderDetail("+index+")'>订单详情</a>";
}



function formateScheduDetail(val,row,index)
{
	
	return "<a href='javascript:void(0)' onclick='showScheduDetail("+index+")'>调度详情</a>";
}


function showOrderDetail(index)
{
	var rows = $('#scheduDg').datagrid('getRows');
	var row = rows[index];

	$("#orderBox").show();
	$("#orderBox").dialog({ 
	    title: '订单明细',    
	    width:800,
	    height:450,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[
			    {
				 iconCls: 'icon-cancel',
				 text:'关闭',
				 handler: function(){	
			    	$("#orderBox").dialog('close');
			     }
		}]
	});
	
	$("#orderBox").window('center');
	
	// 获取已维护的产品数据
	var orderno = row.orderno;
	// 下面数据展示
	$("#orderDg").datagrid({
		url:queryOrderDetailUrl,
		queryParams:{"tokenid":getTokenid(),"orderno":orderno},
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				   // 自适应大小，为true数据不展示
    	fitColumns:true,           //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,               //超出列宽自动截取
    	columns:getOrderProCols(), // 列数据
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
	});  
	
}
function showScheduDetail(index)
{
	var rows = $('#dgBox').datagrid('getRows');
	var row = rows[index];

	$("#scheduBox").show();
	$("#scheduBox").dialog({ 
	    title: '调度详情',    
	    width:1000,
	    height:450,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[
				{
					 iconCls: 'icon-ok',
					 text:'确认调度',
					 handler: function(){	
						$("#scheduBox").dialog('close');
				    }
				},
				{
					 iconCls: 'icon-remove',
					 text:'调度撤回',
					 handler: function(){	
				   		$("#scheduBox").dialog('close');
				    }
				},
			    {
				 iconCls: 'icon-cancel',
				 text:'关闭',
				 handler: function(){	
			    	$("#scheduBox").dialog('close');
			     }
		}]
	});
	
	$("#scheduBox").window('center');
	
	// 获取已维护的产品数据
	var scheduid = row.scheduid;
	// 下面数据展示
	$("#scheduDg").datagrid({
		url:queryScheduOrderDetailUrl,
		queryParams:{"tokenid":getTokenid(),"scheduid":scheduid},
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getScheduOrderCols(), // 列数据
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
	});  
}

function getOrderProCols(){
	
	var opt = 
		[[
		  	{field:'id',title:'编号',width:10,align:'left',sortable:true},	
			{field:'orderno',title:'订单号',width:27,align:'left',sortable:true},
			{field:'productid',title:'产品编号',width:15,align:'left',sortable:true},
			{field:'productname',title:'产品名称',width:25,align:'left',sortable:true},
			{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},	
			{field:'buycount',title:'数量',width:15,align:'left',sortable:true}
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
		sureSchedu(title,righturl,rightid);
		break;
	case '2':
		sureSchedu(title,righturl,rightid);
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
 * 修改物流公司
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function sureSchedu(title,righturl,rightid)
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

	var scheduid = rows[0].scheduid;
	var data={};
	data['scheduid']=scheduid;
	data['tokenid'] = getTokenid();
	data['rightid'] = rightid;
	$.ajax({
		url:righturl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(retData){
			if(retData.retCode == successCode)
			{
				show(retData.retMsg);
				$("#dgBox").datagrid('reload');
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


	queryParams['tokenid'] = getTokenid();
//	queryParams['logisticname'] = $("#logisticname").val();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
