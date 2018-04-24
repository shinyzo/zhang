// 查询URL
var queryUrl = "admin/account/query.do";

$(function(){
	// 隐藏其他组件
//	$("#operBox").hide();
//	$("#helpBox").hide();
	
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
		  	{field:'accountid',title:'账户编号',width:15,align:'left',sortable:true},
		  	{field:'accountname',title:'账户名称',width:20,align:'left',sortable:true},
		  	{field:'accountno',title:'银行账户',width:15,align:'left',sortable:true,formatter:formateAccountno},
		  	{field:'accounttype',title:'账户类型',width:20,align:'left',sortable:true,hidden:true},
		  	{field:'accountalias',title:'账户类型',width:20,align:'left',sortable:true},
		  	{field:'bankid',title:'银行编号',width:20,align:'left',sortable:true},
		  	{field:'bankname',title:'开户行',width:20,align:'left',sortable:true},
		  	{field:'paymodelist',title:'支持支付方式',width:20,align:'left',sortable:true},
		  	{field:'accountstatus',title:'账户状态',width:20,align:'left',sortable:true,formatter:formateAccountStatus},
		  	{field:'accountmemo',title:'备注',width:20,align:'left',sortable:true}
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
 * 查询或重新加载组件
 * @param goodCode
 * @param goodName
 * @param goodTypeName
 * @param goodState
 * @return
 */
function searchOrReload(){

	var queryParams = $("#dgBox").datagrid('options').queryParams;

	queryParams['accountname'] = $('#accountname').val();
	queryParams['accountstatus'] = $('#accountstatus').combobox('getValue');
	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
