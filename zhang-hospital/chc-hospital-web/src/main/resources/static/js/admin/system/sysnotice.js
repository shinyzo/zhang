// 查询URL
var queryUrl = "admin/notice/querynotice.do";

$(function(){
	// 隐藏其他组件
	$("#operBox").hide();

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
//		invalidMessage:'请选择企业分类！'
//	})
	
//	$("#fx_resourcename").textbox({
//		required: true,
//		validType:"length[2,20]",
//		missingMessage:'请填写资源库名称！',
//		invalidMessage:'资源库名称应在2-20个字符之间！'
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
		  	{field:'id',title:'id',width:5,align:'left',sortable:true},
		  	{field:'title',title:'标题',width:20,align:'left',sortable:true},
		  	{field:'content',title:'内容',width:45,align:'left',sortable:true},
		  	{field:'groupcorpid',title:'可见权限',width:15,align:'left',sortable:true},
		  	{field:'noticestarttime',title:'开始时间',width:15,align:'left',sortable:true},
		  	{field:'noticeendtime',title:'结束时间',width:15,align:'left',sortable:true},
		  	{field:'level',title:'级别',width:5,align:'left',sortable:true},
		  	{field:'status',title:'状态',width:5,align:'left',sortable:true},
		  	{field:'opertime',title:'操作时间',width:15,align:'left',sortable:true}
		  	
		  	
	   		
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




function modifyData(title,righturl,rightid)
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

	var row = rows[0];
	var id = row.resourceid;	
	
	$("#operfm").form('load',row);
	$("#password").textbox('setValue',"");
	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:500,
	    height:350,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
		         {
					iconCls: 'icon-save',
					text:'修改保存',
					handler: function(){	
			    	 
		        	 	addOrModifyDataSave(righturl,rightid,id);
				 	}
		         },
		         {
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){	
			    	 $("#operBox").dialog('close');
			    	}
					 
		         }]
	});
	
	$("#operBox").window('center');

}



/**
 * 添加或修改保存数据
 * @param righturl
 * @param rightid
 * @param id
 * @return
 */
function addOrModifyDataSave(righturl,rightid,id)
{
	
	if($("#operfm").form('validate'))
	{
		$("#operfm").form('submit',{
			url:righturl,
			ajax:true,
			onSubmit:function(param){
				param.rightid = rightid;
				param.tokenid = getTokenid();
				param.resourceid = id;
			},
			success:function(retData){
				var retData = eval('(' + retData + ')');  
				if(retData.retCode == successCode)
				{
					show(retData.retMsg);
					$("#operBox").dialog('close');
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
			onLoadError:function(){
				error('系统错误,请稍后重试！');
			}
			
		})

	}
}

/**
 * 新增品牌
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addData(title,righturl,rightid)
{
	
	$("#operfm").form('clear');
	
	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:500,
	    height:350,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
		         {
					iconCls: 'icon-save',
					text:'保存',
					handler: function(){	
			    	 
		        	 addOrModifyDataSave(righturl,rightid,0);
				 	}
		         },
		         {
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){	
			    	 $("#operBox").dialog('close');
			    	}
					 
		         }]
	});
	
	
	$("#operBox").window('center');
	
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

	queryParams['resourcename'] = $('#resourcename').val();
	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
