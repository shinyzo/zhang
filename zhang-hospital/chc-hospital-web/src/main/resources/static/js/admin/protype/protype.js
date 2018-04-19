// 查询URL
var queryUrl = "admin/protype/query.do";

$(function(){
	// 隐藏其他组件
	$("#helpBox").hide();
	$("#protypeBox").hide();
	
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
	
	
	initLoadingData();
	// 初始化表单验证
	initValidateBox();
	
	$("#helpBtn").click(function(){
		
		$("#helpBox").show();
		$("#helpBox").dialog({ 
		    title: "按钮操作及权限说明",    
		    iconCls:'icon-help',
		    width:550,
		    height:380,
		    closed: false,    
		    cache: false,   
		    modal: false,
		    resizable:true,
		    buttons:[{
				iconCls: 'icon-ok',
				text:'确定',
				handler: function(){	
		    	 $("#helpBox").dialog('close');
		    	}
			}]
		}); 
		$("#helpBox").window('center');
	})
});

function initLoadingData()
{
	
//	$("#fxt_protypeid").combobox({
//		url:'public/getprotype.json',
//		valueField:'protypeid',
//		textField:'protypename',
//		loadFilter:function(data){
//			return [{corptypename:'--请选择商品类别--',protypeid:0,selected:"true"}].concat(data)
//		}
//		
//	})
	
	
	


}

function initValidateBox()
{
	$("#fx_protypename").textbox({
//		required: true,
		missingMessage:'请填写分类名称！',
		invalidMessage:'请填写分类名称！'
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
		  	{field:'protypeid',title:'分类编号',width:15,align:'left',sortable:true},
	   		{field:'protypename',title:'分类名称',width:15,align:'left',sortable:true},
	   		{field:'level',title:'分类级别',width:15,align:'left',sortable:true},
	   		{field:'protypelogo',title:'分类图标',width:20,align:'left',sortable:true},
	   		{field:'parentid',title:'父节点',width:20,align:'left',sortable:true},
	   		{field:'parentname',title:'父节点名称',width:20,align:'left',sortable:true,formatter:formateprotype}
	   	]];
	   	return opt;
}

function formateprotype(val,row,index)
{
	if(row.parentid=="0") return "根节点";
	return val;

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
	var rows = $("#dg").datagrid('getSelections');
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

	if(row.parentid=="0")
	{
		row.parentname="根节点";
	}
	
	$("#protypefm").form('load',row);
	$("#fx_level").textbox('setValue',parseInt(row.level)-1);
	var parentid = row.parentid;
	
	
	$("#fx_protypeid").tree({
		url:'public/gettreeprotype.json',
		valueField:'id',
		textField:'text',
		lines:true,
		cascadeCheck:false,
		onBeforeSelect:onBeforeSelect,
		onSelect : onSelect,
		onLoadSuccess:function(node, data){		
			var node = $(this).tree('find', parentid);
	
			$(this).tree("check", node.target);	
		}
	})
	
	
	$("#protypeBox").show();
	$("#protypeBox").dialog({ 
	    title: title,    
	    width:650,
	    height:480,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){	
	    	
	    			var protypename = $("#fx_protypename").val();
	    			var protypelogo = $("#fx_protypelogo").val();
	    			var parentid = $("#fx_parentid").val();
	    			var parentlevel = $("#fx_level").val();
	    			var protypeid = row.protypeid;
	    			
	    			if(parentlevel=="")
	    			{
	    				alert("请选择父节点！");
	    				return false;
	    			}
	    			
	    			if(parentlevel=="3")
	    			{
	    				alert("该分类无法进行添加子分类，最多支持三级子类！");
	    				return false;
	    			}
	    			
	    			if(parentid==protypeid)
	    			{
	    				alert("不能将自己的分类节点设为父节点！");
	    				return false;
	    			}
	    			
	    			var level = parseInt(parentlevel)+1;
		    	 	modifyDataSave(righturl,rightid,protypeid,protypename,protypelogo,parentid,level);
		    	 }
			    },
			    {
				 iconCls: 'icon-cancel',
				 text:'取消',
				 handler: function(){	
			    	$("#protypeBox").dialog('close');
			     }
		}]
	});
	
	$("#protypeBox").window('center');
	
}

/**
 * 选择节点之前判断当前节点的级别，提示用户操作
 * @param node
 * @return
 */
function onBeforeSelect(node)
{
	if(parseInt(node.level)>=3) 
	{
		show("该节点为三级子节点，无法添加子分类，请选择其他节点！");
		return false;
	}	

}
/**
 * 左侧分类节点选中
 * @param node
 * @return
 */
function onSelect(node)
{

	var cknodes = $(this).tree("getChecked");
	for(var i = 0 ; i < cknodes.length ; i++){
		$(this).tree("uncheck", cknodes[i].target);
	}
	//再选中改节点
	$(this).tree("check", node.target);
	
	$("#fx_parentname").textbox('setValue',node.text);
	$("#fx_parentid").textbox('setValue',node.id);
	$("#fx_level").textbox('setValue',parseInt(node.level));

}
/**
 * 修改商品分类保存
 * @param righturl
 * @param rightid
 * @param parentid
 * @param protypename
 * @param protypelogo
 * @param level
 * @return
 */
function modifyDataSave(righturl,rightid,protypeid,protypename,protypelogo,parentid,level)
{

	var data={};
	data['tokenid']=getTokenid();
	data['rightid']= rightid;
	data['protypeid']=protypeid;
	data['parentid']= parentid;
	data['protypename'] =protypename;
	data['protypelogo'] =protypelogo;
	data['level'] =level;
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
				$("#protypeBox").dialog('close');
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
 * 添加分类操作
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addData(title,righturl,rightid)
{
	$("#protypefm").form('clear');
	
	$("#fx_protypeid").tree({
		url:'public/gettreeprotype.json',
		valueField:'id',
		textField:'text',
		cascadeCheck:false,
		onlyLeafCheck:false,
		lines:true,
		onBeforeSelect:onBeforeSelect,
		onSelect : onSelect
	})
	
	$("#protypeBox").show();
	$("#protypeBox").dialog({ 
	    title: title,    
	    width:650,
	    height:480,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){	
	    			var protypename = $("#fx_protypename").val();
	    			var protypelogo = $("#fx_protypelogo").val();
	    			var parentid = $("#fx_parentid").val();
	    			var parentlevel = $("#fx_level").val();
	    			if(parentlevel=="")
	    			{
	    				alert("请选择父节点！");
	    				return false;
	    			}
	    			if(parentlevel=="3")
	    			{
	    				alert("该分类无法进行添加子分类，最多支持三级子类！");
	    				return false;
	    			}
	    			
	    			if(protypename=="")
	    			{
	    				alert("分类名称不能为空！");
	    				return false;
	    			}
	    			
	    			var level = parseInt(parentlevel)+1;
		    	 	addDataSave(righturl,rightid,parentid,protypename,protypelogo,level);
		    	 }
			    },
			    {
				 iconCls: 'icon-cancel',
				 text:'取消',
				 handler: function(){	
			    	$("#protypeBox").dialog('close');
			     }
		}]
	}); 
	$("#protypeBox").window('center');
}

/**
 * 添加商品分类
 * @return
 */
function addDataSave(righturl,rightid,parentid,protypename,protypelogo,level)
{
	
	
	var data={};
	data['tokenid']=getTokenid();
	data['rightid']= rightid;
	
	data['parentid']= parentid;
	data['protypename'] =protypename;
	data['protypelogo'] =protypelogo;
	data['level'] =level;
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
				$("#protypeBox").dialog('close');
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

	var queryParams = $("#dg").datagrid('options').queryParams;

	queryParams['protypename'] = $('#protypename').val();
	queryParams['level']=$('#level').combobox('getValue');
	queryParams['tokenid'] = getTokenid();
	
	$("#dg").datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
