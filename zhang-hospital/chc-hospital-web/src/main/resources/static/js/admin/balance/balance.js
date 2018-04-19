// 查询URL
var queryUrl = "admin/balance/query.do";

$(function(){
	// 隐藏其他组件
	
	$('#begintime').datebox('setValue', formatterDate(new Date()));
	$('#endtime').datebox('setValue', formatterDate(new Date()));
	
	var queryParams ={};
	queryParams['begintime']= $("#begintime").datebox('getValue');
	queryParams['endtime']= $("#endtime").datebox('getValue');
	queryParams['tokenid']= getTokenid();
	
	// 初始化加载数据
	$("#dgBox").datagrid({  
		url:queryUrl,         //加载的URL
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
    	columns:getColumnsOpt(), // 列数据
    	toolbar:'#headBox',       // 工具栏
    	sortName:'opertime',
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
	
	// 初始化表单验证
	initValidateBox();
	
});

function initValidateBox()
{
	
//	$("#fx_corptypeid").combobox({
//		required: true,
//		validType:"comboxValidate['fx_corptypeid']",
//		missingMessage:'请选择企业分类！',
//		invalidMessage:'请选择企业分类！',	
//	})

}



/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'logid',title:'日志编号',width:15,align:'left'},
		  	{field:'opertime',title:'操作时间',width:25,align:'left',sortable:true,order:'desc'},
		  	{field:'operuserid',title:'操作人员',width:20,align:'left',sortable:true},
		  	{field:'operip',title:'操作ip',width:20,align:'left',sortable:true},
		  	{field:'lastbalance',title:'上次余额',width:20,align:'left',sortable:true,formatter:formateF2Y},
		  	{field:'opertype',title:'操作类型',width:15,align:'left',sortable:true,formatter:formateOpertype},
		  	{field:'variablebalance',title:'变动余额',width:20,align:'left',sortable:true,formatter:formateF2Y},
			{field:'balanceamount',title:'当前余额',width:20,align:'left',sortable:true,formatter:formateF2Y},
			{field:'operdesc',title:'操作说明',width:20,align:'left',sortable:true},
			{field:'memo',title:'备注',width:60,align:'left',sortable:true}
	   	]];
	   	return opt;
}
/**
 * 余额变动格式化
 * @param val
 * @param rowData
 * @return
 */
function formateVBalance(val,rowData)
{
	if(rowData.opertype==1)
	{
		return "<span style='color:green;font-weight:bold'> +"+val+"</span>";
		
	}
	else
	{
		return "<span style='color:red;font-weight:bold'> "+val+"</span>";
		
	}

}

function formateOpertype(val)
{
	if(val==1) return "<span style='color:green;font-weight:bold'>入账</span>";;
	if(val==2) return "<span style='color:red;font-weight:bold'>支出</span>";

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
 * 查询或重新加载组件
 * @param goodCode
 * @param goodName
 * @param goodTypeName
 * @param goodState
 * @return
 */
function searchOrReload(){

	var queryParams = $("#dgBox").datagrid('options').queryParams;

	queryParams['begintime'] = $('#begintime').datebox('getValue');
	queryParams['endtime'] = $('#endtime').datebox('getValue');
	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
