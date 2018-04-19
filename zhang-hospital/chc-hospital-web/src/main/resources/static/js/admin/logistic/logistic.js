// 查询URL
var queryUrl = "admin/logistic/queryalllogistic.do";

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
		  	{field:'logisticid',title:'系统编号',width:15,align:'left',sortable:true},
		  	{field:'logisticname',title:'物流公司名称',width:20,align:'left',sortable:true},
		  	{field:'linkurl',title:'官方网页',width:20,align:'left',sortable:true},
		  	{field:'target',title:'跳转方式',width:20,align:'left',sortable:true},
		  	{field:'linkman',title:'联系人',width:20,align:'left',sortable:true},
		  	{field:'logisticphone',title:'联系电话',width:20,align:'left',sortable:true},
		  	{field:'logisticaddress',title:'地址',width:20,align:'left',sortable:true},
		  	{field:'status',title:'物流公司状态',width:20,align:'left',sortable:true}
	   		
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
 * 修改物流公司
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
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

	row = rows[0];
	$("#operfm").form('load',row);

	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:450,
	    height:350,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){	
	    	
	    			var logisticid = row.logisticid;
		    	 	modifyDataSave(righturl,rightid,logisticid);
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
 * 修改物流公司信息保存
 * @param righturl
 * @param rightid
 * @param customid
 * @return
 */
function modifyDataSave(righturl,rightid,logisticid)
{

	var data = checkReturnData();
	data['rightid']=rightid;
	data['logisticid'] = logisticid;

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
		error:function(){
			error('系统错误,请稍后重试！');
		}
	});	

}


/**
 * 添加物流公司
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
	    width:450,
	    height:350,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){			
		    	 	addDataSave(righturl,rightid);
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
 * 获取数据校验
 * @return
 */
function checkReturnData()
{
	var data={};
	var logisticname = $("#fx_logisticname").val();
	var linkurl = $("#fx_linkurl").val();
	var target = $("#fx_target").combobox('getValue');
	
	var linkman = $("#fx_linkman").val();
	var logisticphone = $("#fx_logisticphone").val();
	var status = $("#fx_status").combobox('getValue');
	var logisticaddress = $("#fx_logisticaddress").val();

	data['tokenid']=getTokenid();
	
	data['logisticname']= logisticname;
	data['linkurl'] = linkurl;
	data['target'] = target;
	data['linkman'] = linkman;
	data['logisticphone']= logisticphone;
	data['status'] = status;
	data['logisticaddress'] = logisticaddress;
	

	return data;

}



/**
 * 添加物流公司保存
 * @return
 */
function addDataSave(righturl,rightid)
{

	var data = checkReturnData();
	data['rightid']=rightid;
	
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
	queryParams['logisticname'] = $("#logisticname").val();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
