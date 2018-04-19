// 查询URL
var queryUrl = "admin/morecorp/queryopencorp.do";

$(function(){
	// 隐藏Box组件
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
		singleSelect:true,     // 只能选中单行
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
	
	initData();
	// 初始化表单验证
	initValidateBox();
});

function initData()
{



}


function initValidateBox()
{
	
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
	queryParams['corpname'] = $("#corpname").val();
	queryParams['corpid'] = $("#corpid").val();
	queryParams['tokenid'] = getTokenid();
	$("#dg").datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('reload');
}

//重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}

/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'corpid',title:'企业账号',width:15,align:'left',sortable:true},
		  	{field:'corplogo',title:'企业LOGO',width:15,align:'left',sortable:true,formatter:formateCorplogo},
		  	{field:'corpname',title:'企业名称',width:25,align:'left',sortable:true},
		  	{field:'organizationcode',title:'组织机构代码证',width:20,align:'left',sortable:true},
	   		{field:'businesslicencecode',title:'营业执照号',width:20,align:'left',sortable:true},
	   		{field:'taxregistrationcode',title:'税务登记证',width:20,align:'left',sortable:true},
	   		{field:'artificialname',title:'法人姓名',width:20,align:'left',sortable:true},
	   		{field:'artificialidcard',title:'身份证号',width:20,align:'left',sortable:true,formatter:formateIdcardno},	
	   		{field:'corpphone',title:'联系电话',width:20,align:'left',sortable:false,formatter:formatePhone},
//	   		{field:'corpaddress',title:'地址',width:30,align:'left',sortable:true},
	   		{field:'applystatus',title:'申请状态',width:20,align:'left',sortable:true,formatter:formateUpcorpApplyStatus}
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
	case '2':
		apply2Corpxy(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}



/**
 * 申请成为该企业的下游即采购商
 */
function apply2Corpxy(title,righturl,rightid){
	
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	if(rows.length > 1)
	{
		alert("只允许操作一条记录！");
		return false;
	}
	
	var applystatus = rows[0]['applystatus'];
	if(applystatus=="0")
	{
		alert("您的申请记录已提交，请等待企业审核！");
		return false;
	}
	if(applystatus=="1")
	{
		alert("您已通过企业审核，可以去订购企业商品啦！");
		return false;
	}
	
	var tcorpid = rows[0]['corpid'];
	
	var data={};

	data['tokenid']=getTokenid();
	data['rightid']= rightid;
	data['tcorpid']= tcorpid;
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




