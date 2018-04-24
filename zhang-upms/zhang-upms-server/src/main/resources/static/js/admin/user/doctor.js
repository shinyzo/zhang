var queryUrl = "admin/doctor/querydoctor.do";


$(document).ready(function(){
	
	
	// 隐藏其他组件
	$("#addUserBox").hide();

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
		  	{field:'doctorId',title:'id',width:10,align:'left',sortable:true},
		  	{field:'loginname',title:'登录账号',width:10,align:'left',sortable:true},
		  	{field:'doctorName',title:'姓名',width:15,align:'left',sortable:true},
		  	{field:'sex',title:'性别',width:10,align:'left',sortable:true},
		  	{field:'idcardno',title:'身份证号',width:15,align:'left',sortable:true},
		  	{field:'qafcaCertNo',title:'资格证书编号',width:15,align:'left',sortable:true},
		  	{field:'qafcaCertSignTime',title:'发证日期',width:15,align:'left',sortable:true},
		  	{field:'practCertNo',title:'执业证书编号',width:15,align:'left',sortable:true},
		  	{field:'practCertRegisterTime',title:'注册日期',width:15,align:'left',sortable:true},
		  	{field:'hospital',title:'医院',width:15,align:'left',sortable:true},
		  	{field:'subject',title:'科室',width:15,align:'left',sortable:true},
		  	{field:'level',title:'职务级别',width:15,align:'left',sortable:true},
		  	{field:'collegeName',title:'毕业院校',width:15,align:'left',sortable:true},
		  	{field:'workage',title:'工作年限',width:15,align:'left',sortable:true},
		  	{field:'officePhone',title:'办公电话',width:15,align:'left',sortable:true},
		  	{field:'personalPhone',title:'个人电话',width:15,align:'left',sortable:true},
		  	{field:'status',title:'状态',width:15,align:'left',sortable:true}
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
			addUserAuthen(title,righturl,rightid);
			break;
		default:
			alert("无此操作类型对应的方法!");
			break;
	}

}

/**
 * 开通用户
 * @return
 */
function addUserAuthen(title,righturl,rightid){
	
	$('#userfm').form('clear');
	
	
	$("#fxt_roleid").combobox({
		url:'public/getroles.json',
		valueField:'roleid',
		textField:'rolename'
	})
	
	
	
	$("#addUserBox").show();
	$("#addUserBox").dialog({ 
	    title: title,    
	    width: 400,    
	    height:300,   
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
			     {
					iconCls: 'icon-save',
					text:'保存',
					handler: function(){
			    	 
			    	 	addRoleSave(righturl,rightid);
			    	}
				},
				{
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){
						$('#addUserBox').dialog('close');
					}
				  }
				]

	}); 
	
	$("#addUserBox").window('center');
	
	
}



function searchOrReload(){

	var queryParams = $("#dg").datagrid('options').queryParams;

	queryParams['doctorName'] = $('#doctorName').val();
	queryParams['idcardno']   = $('#idcardno').val();
	queryParams['personalPhone']   = $('#personalPhone').val();
	
	queryParams['tokenid'] = getTokenid();
	
	$("#dg").datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('reload');
}


