var queryUrl = "admin/user/queryuser.do";


$(document).ready(function(){
	
	
	// 隐藏其他组件


	// 初始化加载数据
	$("#dg").datagrid({  
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
	$('#dg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 
	
});



/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'id',title:'id',width:15,align:'left',sortable:true},
		  	{field:'loginname',title:'登录账号',width:15,align:'left',sortable:true},
		  	{field:'usertype',title:'用户类型',width:15,align:'left',sortable:true},
		  	{field:'uphone',title:'联系电话',width:15,align:'left',sortable:true},
		  	{field:'uqq',title:'QQ',width:15,align:'left',sortable:true},
		  	{field:'uaddress',title:'地址',width:15,align:'left',sortable:true},
		  	{field:'ustatus',title:'用户状态',width:15,align:'left',sortable:true},
		  	{field:'roleid',title:'权限id',width:15,align:'left',sortable:true},
		  	{field:'lastlogintime',title:'最后登录时间',width:15,align:'left',sortable:true},
		  	{field:'lastloginip',title:'最后登录ip',width:15,align:'left',sortable:true},
		  	{field:'logincount',title:'登录次数',width:15,align:'left',sortable:true}
		  
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
			modifyData(title,righturl,rightid);
			break;
		default:
			alert("无此操作类型对应的方法!");
			break;
	}

}


function searchOrReload(){

	var queryParams = $("#dg").datagrid('options').queryParams;

	queryParams['loginname'] = $('#loginname').val();
	queryParams['tokenid'] = getTokenid();
	
	$("#dg").datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('reload');
}


