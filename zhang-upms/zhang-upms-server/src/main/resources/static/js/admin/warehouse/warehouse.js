// 查询URL
var queryUrl = "admin/warehouse/query.do";

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
	
	$("#fx_warehousename").textbox({
		required: true,
		validType:"length[2,40]",
		missingMessage:'请输入仓库名称！',
		invalidMessage:'仓库名称在2-40位之间！',	
	})
	
	$("#fx_warehousename").textbox({
		required: true,
		validType:"length[2,40]",
		missingMessage:'请输入仓库名称！',
		invalidMessage:'仓库名称在2-40位之间！',	
	})
	
	$("#fx_width").numberbox({
		required:true,
		precision:1,
		value:0.1,
		min:0.1,
		missingMessage:'请填写仓库宽度！',
		validType:'length[1,12]',
		invalidMessage:'仓库宽度1-12个字符之间!'
	});
	$("#fx_length").numberbox({
		required:true,
		precision:1,
		value:0.1,
		min:0.1,
		missingMessage:'请填写仓库长度！',
		validType:'length[1,12]',
		invalidMessage:'仓库长度1-12个字符之间!'
	});
	
	$("#fx_height").numberbox({
		required:true,
		precision:1,
		value:1,
		min:0.1,
		missingMessage:'请填写仓库高度！',
		validType:'length[1,12]',
		invalidMessage:'仓库高度1-12个字符之间!'
	});
	
	$("#fx_volume").numberbox({
		required:true,
		precision:3,
		value:0.001,
		min:0.001,
		missingMessage:'请填写仓库容量！',
		validType:'length[1,12]',
		invalidMessage:'仓库容量1-12个字符之间!'
	});
	
	$("#fx_lessvolume").numberbox({
		required:true,
		precision:3,
		value:0.001,
		min:0.001,
		missingMessage:'请填写仓库剩余容量！',
		validType:'length[1,12]',
		invalidMessage:'仓库剩余容量1-12个字符之间!'
	});
	
	$("#fx_warehousetype").combobox({
		required:true,
		missingMessage:'请选择仓库类型！',
		validType:"comboxValidate['fx_warehousetype']",
		invalidMessage:'请选择仓库类型!'
	});
	
	$("#fx_warehousestatus").combobox({
		required:true,
		missingMessage:'请填写仓库状态！',
		validType:"comboxValidate['fx_warehousestatus']",
		invalidMessage:'请填写仓库状态!'
	});

}



/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'warehouseid',title:'仓库编号',width:15,align:'left',sortable:true},
		  	{field:'warehousename',title:'仓库名称',width:20,align:'left',sortable:true},
		  	{field:'volume',title:'仓库体积（立方米）',width:15,align:'left',sortable:true},
		  	{field:'lessvolumepercent',title:'仓库剩余容量（百分比）',width:20,align:'center',sortable:true,formatter:formateVpercent},
		  	{field:'length',title:'仓库长度(米)',width:20,align:'left',sortable:true},
		  	{field:'width',title:'仓库宽度（米）',width:20,align:'left',sortable:true},
		  	{field:'height',title:'仓库高度（米）',width:20,align:'left',sortable:true},
		  	{field:'openstatus',title:'是否共享',width:20,align:'left',sortable:true,formatter:formateOpenWare},
		  	{field:'warehousetype',title:'仓库类型',width:20,align:'left',sortable:true,formatter:formateWarehouseType},
		  	{field:'warehouseAddress',title:'仓库地址',width:20,align:'left',sortable:true},
		  	{field:'warehouseuser',title:'仓库联系人',width:20,align:'left',sortable:true},
		  	{field:'warehousephone',title:'联系电话',width:20,align:'left',sortable:true},
		  	{field:'warehousestatus',title:'仓库状态',width:20,align:'left',sortable:true,formatter:formateWarehouseStatus},
		  	{field:'warehousememo',title:'仓库描述',width:30,align:'left',sortable:true}
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
 * 修改车辆
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
	    width:625,
	    height:510,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){	
	    	
	    			var id = row.warehouseid;
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
 * 添加数据
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addData(title,righturl,rightid)
{
	$("#operfm").form('clear');
	$("#fx_width").numberbox('setValue','0.1');
	$("#fx_length").numberbox('setValue','0.1');
	$("#fx_height").numberbox('setValue','0.1');
	$("#fx_volume").numberbox('setValue','0.001');
	$("#fx_lessvolume").numberbox('setValue','0.001');
	
	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:625,
	    height:510,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
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
				param.warehouseid = id;
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
 * 查询或重新加载组件
 * @param goodCode
 * @param goodName
 * @param goodTypeName
 * @param goodState
 * @return
 */
function searchOrReload(){

	var queryParams = $("#dgBox").datagrid('options').queryParams;

	queryParams['warehousename'] = $('#warehousename').val();
	queryParams['warehousetype'] = $('#warehousetype').combobox('getValue');
	queryParams['openstatus'] = $('#openstatus').combobox('getValue');
	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
