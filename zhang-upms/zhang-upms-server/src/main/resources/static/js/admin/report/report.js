// 查询URL
var tjQueryUrl ="admin/report/tjreportquery.do";

	
	
$(function(){
	// 隐藏其他组件

	
//	$("#begintime").datetimebox('setValue',formatterDate(new Date()));	
//	$("#endtime").datetimebox('setValue',formatterTime(new Date()));	
	var tjtype = $('#tjtype').combobox('getValue');
	 
	
	// 初始化加载数据
	$("#dgBox").datagrid({  
		url:tjQueryUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"tjtype":tjtype},
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
    	sortName:'productid',
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
	
	

});

function initLoadingData()
{
	

	


}


function initValidateBox()
{
	$("#tjtype").combobox({
		required: true,
		validType:"comboxValidate['tjtype']",
		missingMessage:'请选择统计类型！',
		invalidMessage:'请选择统计类型！'
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
		  	{field:'fcorpid',title:'下游企业ID',width:27,align:'left',sortable:true}	,	
			{field:'productid',title:'产品编号',width:27,align:'left',sortable:true}	,	
			{field:'productname',title:'产品名称',width:27,align:'left',sortable:true},
			{field:'productcode',title:'产品条码',width:27,align:'left',sortable:true},
			{field:'totalcount',title:'产品数量',width:27,align:'left',sortable:true},
			{field:'totalprice',title:'产品总价',width:27,align:'left',sortable:true}
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
		queryExport(title,righturl,rightid);
		break;
		
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}



function queryExport(title,righturl,rightid){
	var tjtype = $("#tjtype").combobox('getValue');	
	var begintime = $("#begintime").datetimebox('getValue');
	var endtime = $("#endtime").datetimebox('getValue');
	righturl += "?tjtype="+tjtype+"&begintime="+begintime+"&endtime="+endtime;
	window.open(righturl);
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

	var tjtype = $("#tjtype").combobox('getValue');	
	if(null == tjtype){
		tjtype = 1;
	}
	queryParams['tjtype']=tjtype;
	queryParams['begintime']=$("#begintime").datetimebox('getValue');
	queryParams['endtime']=$("#endtime").datetimebox('getValue');
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
	$("#tjtype").combobox('reload');

}



