// 查询URL
var queryUrl = "admin/morecorp/dnquery.do";
var queryprostockurl = "admin/product/querystock.do";

$(function(){
	// 隐藏Box组件
	$("#helpBox").hide();
	$("#corpdetailBox").hide();
	$('#proBox').window('close');
	// 初始化加载数据
	initDataGrid();
	initData();
	// 初始化表单验证
	initValidateBox();
});

function initData()
{
	
	
	// 加载产品分类数据
	$("#protypeid").combobox({
		url:'public/getprotype.json',
		valueField:'protypeid',
		textField:'protypename'
	});


}


/**
 * 初始化加载数据
 * @return
 */
function initDataGrid()
{
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
		  	{field:'corpname',title:'企业名称',width:25,align:'left',sortable:true,editor:'text'},
		  	{field:'organizationcode',title:'组织机构代码证',width:20,align:'left',sortable:true},
	   		{field:'businesslicencecode',title:'营业执照号',width:20,align:'left',sortable:true},
	   		{field:'taxregistrationcode',title:'税务登记证',width:20,align:'left',sortable:true},
	   		{field:'artificialname',title:'法人姓名',width:20,align:'left',sortable:true},
	   		{field:'artificialidcard',title:'身份证号',width:20,align:'left',sortable:true,formatter:formateIdcardno},	
	   		{field:'corpphone',title:'联系电话',width:20,align:'left',sortable:false,formatter:formatePhone},
	   		{field:'corpaddress',title:'地址',width:25,align:'left',sortable:true},
	   		{field:'applystatus',title:'申请状态',width:20,align:'left',sortable:true,formatter:formateDncorpApplyStatus},
	   		{field:'corpstatus',title:'企业状态',width:20,align:'left',sortable:true,hidden:true}

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
		downAuditCorp(title,righturl,rightid);
		break;
	case '2':
		downCorpProduct(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}


//展示商户信息并审核
function downAuditCorp(title,righturl,rightid)
{
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
	
	var applystatus = rows[0].applystatus;
	
	if(applystatus=="1")
	{
		alert("您已审核通过该企业，无法再次进行审核！");
		return false;
	}
	
	
	$("#detailfm").form('load',rows[0]);
	var fcorpid = rows[0].corpid;
	$("#corpdetailBox").show();
	$("#corpdetailBox").dialog({
		  title: title,    
		    width:640,
		    height:460,
		    closed: false,    
		    cache: false,   
		    modal: true,
		    resizable:true,
		    buttons:[{
				iconCls: 'icon-ok',
				text:'通过',
				handler: function(){
		    		
		    		downAuditCorpSave(righturl,rightid,fcorpid,1);
		    	}
			},{
				iconCls: 'icon-cancel',
				text:'拒绝',
				handler: function(){
					downAuditCorpSave(righturl,rightid,fcorpid,2);
				}
			  }
			,{
				iconCls: 'icon-cancel',
				text:'取消',
				handler: function(){
					$('#corpdetailBox').dialog('close');
				}
			  }
		    ]
		
	})
	$("#corpdetailBox").window('center');// 水平垂直居中
	
}
// 审核企业保存
function downAuditCorpSave(righturl,rightid,fcorpid,applystatus)
{
	var data={};
	data['tokenid']=getTokenid();
	data['rightid']= rightid;
	data['fcorpid']= fcorpid;
	data['applystatus'] =applystatus;
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
				$("#corpdetailBox").dialog('close');
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


// 下游商品维护
function downCorpProduct(title,righturl,rightid)
{
	var rows = $('#dg').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	
	var applystatus = rows[0].applystatus;
	if(applystatus!="1")
	{
		alert("只有审核通过之后的企业才能进行产品价格维护！");
		return false;
	}
	
	
	/**
	 * 设置window大小并打开
	 */
	$("#proBox").window('open');
	$("#proBox").window({
		  title: title, 
		  width:1240,
		  height:800,
		  closed: false,    
		  cache: false,   
		  modal: true,
		  resizable:true,
	})
	$("#proBox").window('center');
	
	/**
	 * 加载产品库数据 产品状态为上架
	 */ 
	$("#proKdg").datagrid({  
		url:queryprostockurl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"productstatus":"0"},
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		pagination:true,       // 显示分页
		pageSize: pageSize,
		pageList:pageList,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getProductColums(), // 列数据
    	toolbar:'#proKquery',       // 工具栏
    	onSelect:onSelect,
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
    });  
	

	$('#proKdg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 
	

	var fcorpid = rows[0].corpid;
	// 下面数据展示
	$("#proTdg").datagrid({
		url:'admin/product/querydn.do',
		queryParams:{"tokenid":getTokenid(),"fcorpid":fcorpid,"isopenpage":"false"},
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	onClickCell: onClickCell,
//    	onClickRow: onClickRow,
    	columns:getDnproductColumns(), // 列数据
		toolbar:"#proTBtn",
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
	});  

}


/**
 * 加载数据表格列表项
 * @return
 */
function getProductColums()
{
	var opt = 
		[[
		  	{field:'productid',title:'产品编号',width:15,align:'left',sortable:true,hidden:true},
		  	{field:'productname',title:'产品名称',width:20,align:'left',sortable:true},
	   		{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
	   		{field:'protypeid',title:'产品分类ID',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'protypename',title:'产品分类名称',width:20,align:'left',sortable:true},
	   		{field:'brandid',title:'产品品牌ID',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'brandname',title:'产品品牌名称',width:20,align:'left',sortable:true},
	   		{field:'productbigimg',title:'产品图片',width:20,align:'left',sortable:true},
	   		{field:'productinprice',title:'产品进价',width:20,align:'left',sortable:true},
	   		{field:'productsaleprice',title:'销售价格',width:20,align:'left',sortable:true}, 
	   		{field:'productretailprice',title:'建议零售价',width:20,align:'left',sortable:true},   		
	   		{field:'tjavailablestock',title:'可用库存',width:20,align:'left',sortable:true} 		
	   	]];
	   	return opt;
}
/**
 * 查询产品库产品
 * @return
 */
function searchproduct()
{
	var queryParams = $("#proKdg").datagrid('options').queryParams;
	queryParams['productname'] = $("#productname").val();
	queryParams['productcode'] = $("#productcode").val();
	var protypeid = $("#protypeid").combobox('getValue');
	if(protypeid=="") protypeid = 0;
	queryParams['protypeid']= protypeid;
	queryParams['tokenid'] = getTokenid();
	$("#proKdg").datagrid('options').queryParams = queryParams;
	$("#proKdg").datagrid('reload');

}

/**
 * 清空产品产品库表单
 * @return
 */
function clearproduct()
{
	
	$("#proKqueryfm").form('clear');
	$("#protypeid").combobox('reload');
}





/**
 * 下游企业展示产品列
 * @return
 */
function getDnproductColumns()
{
	var opt = 
		[[
		  	{field:'productid',title:'产品编号',width:15,align:'left',sortable:true,hidden:true},
		  	{field:'productname',title:'产品名称',width:20,align:'left'},
	   		{field:'productcode',title:'产品条码',width:15,align:'left'},
	   		{field:'protypeid',title:'产品分类ID',width:20,align:'left',hidden:true},
	   		{field:'protypename',title:'产品分类名称',width:20,align:'left'},
	   		{field:'brandid',title:'产品品牌ID',width:20,align:'left',hidden:true},
	   		{field:'brandname',title:'产品品牌名称',width:20,align:'left'},
	   		{field:'productbigimg',title:'产品图片',width:20,align:'left',hidden:true},
	   		{field:'productinprice',title:'产品进价',width:20,align:'left'},
	   		{field:'productsaleprice',title:'销售价格',width:20,align:'left'},
	   		{field:'corpsaleprice',title:'企业价格',width:20,align:'left',editor:{type:'numberbox',options:{precision:2,required:true}},formatter:formatesaleprice},
	   		{field:'corpretailprice',title:'建议零售价',width:20,align:'left',formatter:formateretailprice,editor:{type:'numberbox',options:{precision:2,required:true}}}
	   		
	   	]];
	   	return opt;
	
}

function formatesaleprice(val,row,index)
{
	
	return val;
}

function formateretailprice(val,row,index)
{
	return val;
	
}

/**
 * 一键添加按钮
 * @return
 */
function addrow2temp()
{
	var rows = $('#proKdg').datagrid('getSelections');
	$.each(rows,function(index,row){
		
		onSelect(index,row);
	})
	
	
	
}


/**
 * 当选中一行或者，选中前面的复选框加入
 * @param index
 * @param row
 * @return
 */
function onSelect(index,row)
{
	var data = $("#proTdg").datagrid('getData');
	var isNeedAppend = true;
	if(data.total>0)
	{	
		for(var i=0;i<data.rows.length;i++)
		{
			var oneRow = data.rows[i];
			if(row.productid==oneRow.productid)
			{
				isNeedAppend = false;
				break;
			}
		}	
	}

	if(isNeedAppend)
	{
		row.corpsaleprice = row.productsaleprice;
		row.corpretailprice = row.productretailprice;
		$("#proTdg").datagrid('appendRow',row);	
	}
}


function dnproductsave()
{
	
	$('#proTdg').datagrid('endEdit',editIndex);
	
	var corprows = $('#dg').datagrid('getSelections');
	var fcorpid = corprows[0].corpid;
	
	var rows = $('#proTdg').datagrid('getRows');

	var projson = JSON.stringify(rows);
	var data={};
	data['fcorpid']=fcorpid;
	data['projson']=projson;
	data['tokenid'] = getTokenid();
	$.ajax({
			url:"admin/morecorp/dnproductsave.do",
			async:false,
			type:"post",
			data:data,
			dataType:'json',
			success:function(retData){
				if(retData.retCode == successCode)
				{
					show(retData.retMsg);
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



$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});

var editIndex = undefined;
function endEditing(){
	if (editIndex == undefined){return true}
	if ($('#proTdg').datagrid('validateRow', editIndex)){
		$('#proTdg').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field){
	if (endEditing()){
		$('#proTdg').datagrid('selectRow', index)
				.datagrid('editCell', {index:index,field:field});
		editIndex = index;
	}
}



/**
 * 关闭窗口
 * @return
 */
function closeWindow()
{
	$("#proBox").window('close');

}


function reload()
{
	$('#proTdg').datagrid('reload');
}
/**
 * 移除数据列
 * @return
 */
function removeit(){
	
	var rows = $('#proTdg').datagrid('getSelections');
	if (rows) 
	{
		for(var i=0;i<rows.length;i++)
		{
			 var rowIndex = $('#proTdg').datagrid('getRowIndex', rows[i]); 
	         $('#proTdg').datagrid('deleteRow', rowIndex);    
		}
	}

}



