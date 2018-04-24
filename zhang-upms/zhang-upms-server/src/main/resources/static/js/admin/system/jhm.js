// 查询URL
var queryUrl = "admin/system/queryjhm.do";
var queryDhdetailurl = "admin/system/queryjhdetail.do";

$(function(){
	// 隐藏其他组件
	$("#addBox").hide();
	$("#batBox").hide();
	$("#dhBox").hide();
	$("#dhDtBox").hide();
	$("#jhmImageBox").hide();
	
	$("#file0").filebox({
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='myfiles']")[0], "pic0", '');
		}
		
	});

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
		  	{field:'id',title:'id',width:15,align:'left',sortable:true},
		  	{field:'corpid',title:'企业id',width:15,align:'left',sortable:true},
		  	{field:'jhpre',title:'激活码前缀',width:15,align:'left',sortable:true},
			{field:'jhcode',title:'激活码',width:40,align:'left',sortable:true},
			{field:'iscreatebarcode',title:'条形码',width:40,align:'left',sortable:true,formatter:foramteBarcode},
			{field:'jhamount',title:'面额',width:10,align:'left',sortable:true},
			{field:'dhcount',title:'可兑换总数',width:15,align:'left',sortable:true},
			{field:'remaindhcount',title:'剩余可兑次数',width:15,align:'left',sortable:true},
			{field:'havedhcount',title:'已兑换次数',width:15,align:'left',sortable:true},
			{field:'dhbegintime',title:'兑换开始时间',width:25,align:'left',sortable:true},
			{field:'dhendtime',title:'兑换结束时间',width:25,align:'left',sortable:true},
			{field:'status',title:'状态',width:15,align:'left',sortable:true},
			{field:'memo',title:'备注',width:25,align:'left',sortable:true},
			{field:'dhdetail',title:'兑换详情',width:25,align:'left',sortable:true,formatter:formateDhDetail}
	   	]];
	   	return opt;
}

function getDhdetailCols()
{
	var opt = 
		[[
		  	{field:'corpid',title:'企业id',width:15,align:'left',sortable:true},
		  	{field:'operuserid',title:'操作人员',width:15,align:'left',sortable:true},
		  	{field:'jhuser',title:'兑换用户',width:15,align:'left',sortable:true},
		  	{field:'jhphone',title:'联系电话',width:15,align:'left',sortable:true},
		  	{field:'opertime',title:'兑换时间',width:15,align:'left',sortable:true},
		  	{field:'jhcardno',title:'身份证号',width:15,align:'left',sortable:true},
		  	{field:'memo',title:'备注',width:15,align:'left',sortable:true}
	   	]];
	   	return opt;
}

function foramteBarcode(value,rowData,index)
{
	if(value=="1")
	{
		var jhcodedir = $("#jhcodedir").val();
		var jhcodepng = rowData.jhcode+"_bar.png";
		
		return "<img src='"+jhcodedir+"/"+jhcodepng+"' />";
	}
	
	return "";

}


function formateDhDetail(value,rowData,index)
{
	return "<a href='javascript:void(0);' onclick='showDhDetail(" + index + ")'>兑换详情</a>";

}

/**
 * 查看兑换详情
 * @param index
 * @return
 */
function showDhDetail(index)
{	
	 var rows = $('#dgBox').datagrid('getRows');
	 var row = rows[index];
	 var jhcode = row.jhcode;
	 
	 var queryParams={};
	 queryParams['jhcode']=row.jhcode;
	 queryParams['tokenid']=getTokenid();
	// 初始化加载数据
	 $("#dhDtDg").datagrid({  
		url:queryDhdetailurl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:queryParams,
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		singleSelect:true,     // 只能选中单行
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getDhdetailCols(), // 列数据
    	toolbar:'',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
	 });  

	
 
	 $("#dhDtBox").show();
	 $("#dhDtBox").dialog({
		 title:'激活码兑换详情',
		 width: 1000,    
		 height:400,   
		 closed: false,    
		 cache: false,   
		 modal: true,
		 buttons:[{
			 	   iconCls: 'icon-ok',
				   text:'确定',
				   handler: function(){
		    	 	
			 			$("#dhDtBox").dialog('close');
		    	   }
		 		}]
	 })

	 $("#dhDtBox").window('center');

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
		addBatchData(title,righturl,rightid);
		break;
	case '3':
		dhjhm(title,righturl,rightid);
		break;
	case '4':
		createJhmImage(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}


function createJhmImage(title,righturl,rightid)
{
	var rows = $("#dgBox").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择生成激活码图片的数据！");
		return false;
	}
	var ids = [];
	$.each(rows,function(index,item){
		ids.push(item.jhcode);
	})
	ids = ids.join(',');
	
	$("#jhmImageBox").show();
	$("#jhmImageBox").dialog({ 
	    title: title,    
	    width:800,
	    height:450,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
		         {
					iconCls: 'icon-save',
					text:'确认生成',
					handler: function(){	
		        	 	createImage(righturl,rightid,ids);
				 	}
		         },
		         {
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){	
			    	 	$("#jhmImageBox").dialog('close');
			    	}
					 
		         }]
	});
	
	$("#jhmImageBox").window('center');

}

function createImage(righturl,rightid,ids){
	
	if($("#operfm").form('validate'))
	{
		$("#operfm").form('submit',{
			url:righturl,
			ajax:true,
			onSubmit:function(param){
				param.rightid = rightid;
				param.tokenid = getTokenid();
				param.jhcodelist = ids;
			},
			success:function(retData){
				var retData = eval('(' + retData + ')');  
				if(retData.retCode == successCode)
				{
					show(retData.retMsg);
					$("#jhmImageBox").dialog('close');
					
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

function dhjhm(title,righturl,rightid)
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
	var id = row.jhcode;	

	$("#dhfm").form('load',row);
	$("#dhbegintime").datetimebox('setValue',parseTime(row.dhbegintime));
	$("#dhendtime").datetimebox('setValue',parseTime(row.dhendtime));
	
	$("#dhBox").show();
	$("#dhBox").dialog({ 
	    title: title,    
	    width:500,
	    height:350,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
		         {
					iconCls: 'icon-save',
					text:'确认兑换',
					handler: function(){	
			    	 
		        	 	addOrModifyDataSave(righturl,rightid,id);
				 	}
		         },
		         {
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){	
			    	 	$("#dhBox").dialog('close');
			    	}
					 
		         }]
	});
	
	$("#dhBox").window('center');

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
	
	if($("#dhfm").form('validate'))
	{
		$("#dhfm").form('submit',{
			url:righturl,
			ajax:true,
			onSubmit:function(param){
				//param.jhcode =id;
				param.rightid = rightid;
				param.tokenid = getTokenid();
			},
			success:function(retData){
				var retData = eval('(' + retData + ')');  
				if(retData.retCode == successCode)
				{
					show(retData.retMsg);
					$("#dhBox").dialog('close');
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
 * 批量生成激活码
 * @param righturl
 * @param rightid
 * @param id
 * @return
 */
function addBatchJhm(righturl,rightid)
{
	
	if($("#batfm").form('validate'))
	{
		$("#batfm").form('submit',{
			url:righturl,
			ajax:true,
			onSubmit:function(param){
				param.rightid = rightid;
				param.tokenid = getTokenid();
			},
			success:function(retData){
				var retData = eval('(' + retData + ')');  
				if(retData.retCode == successCode)
				{
					show(retData.retMsg);
					$("#batBox").dialog('close');
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

function addDataJhm(righturl,rightid)
{
	
	if($("#addfm").form('validate'))
	{
		$("#addfm").form('submit',{
			url:righturl,
			ajax:true,
			onSubmit:function(param){
				param.rightid = rightid;
				param.tokenid = getTokenid();
				param.flag="1";
			},
			success:function(retData){
				var retData = eval('(' + retData + ')');  
				if(retData.retCode == successCode)
				{
					show(retData.retMsg);
					$("#addBox").dialog('close');
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
 * 手动生成
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addData(title,righturl,rightid)
{
	
	$("#addfm").form('clear');
	
	$("#addBox").show();
	$("#addBox").dialog({ 
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
			    	 
		        	 	addDataJhm(righturl,rightid);
				 	}
		         },
		         {
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){	
			    	 	$("#addBox").dialog('close');
			    	}
					 
		         }]
	});
	
	
	$("#addBox").window('center');
	
}

/**
 * 系统自动生成
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addBatchData(title,righturl,rightid)
{
	
	$("#batfm").form('clear');
	
	$("#batBox").show();
	$("#batBox").dialog({ 
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
			    	 
		        	 	addBatchJhm(righturl,rightid);
				 	}
		         },
		         {
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){	
			    	 	$("#batBox").dialog('close');
			    	}
					 
		         }]
	});
	
	
	$("#batBox").window('center');
	
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

	queryParams['jhpre'] = $('#jhpre').val();
	queryParams['jhcode'] = $('#jhcode').val();
	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
