// 查询URL
var queryUrl = "admin/storage/querystockproductinfo.do";

	
$(function(){

	
	$("#dcHeadBar").hide();
	$("#drHeadBar").hide();
	// 初始化加载数据
	$("#dr").datagrid({  
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		singleSelect:false,     // 只能选中单行
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getdbColumnsOpt(), // 列数据
    	onClickCell:onClickCell,
    	toolbar:"#drHeadBar",
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
    });  
	
	initLoadingData();
	
	// 初始化表单验证
	initValidateBox();
	

});

function initLoadingData()
{
	$("#dcwarehouseid").combobox({
		required:true,
		url:'public/getwarehouse.json',
		valueField:'warehouseid',
		textField:'warehousename',
		editable:false,
		formatter:function(row){
			if(row.openstatus=="Y")
			{
				row.warehousename = row.warehousename+" (共享) ";	
			}
			
			row.warehousename = row.warehousename+" (剩余容量："+row.lessvolumepercent+"%) ";
		
			return row.warehousename;
		},
		onChange:function(newValue,oldValue){
			loadStockData(newValue);
			$("#dr").datagrid('loadData',[]);
		}
	
	})
	
	
	$("#drwarehouseid").combobox({
		required:true,
		url:'public/getwarehouse.json',
		valueField:'warehouseid',
		textField:'warehousename',
		editable:false,
		formatter:function(row)
		{
			if(row.openstatus=="Y")
			{
				row.warehousename = row.warehousename+" (共享) ";	
			}
			
			row.warehousename = row.warehousename+" (剩余容量："+row.lessvolumepercent+"%) ";
		
			return row.warehousename;
		},
		onChange:function(newValue,oldValue){
			var dcwarehouseid = $("#dcwarehouseid").combobox('getValue');
			
			if(dcwarehouseid==newValue)
			{
				alert("调入仓库不能与调出仓库一致,请选择其他仓库！");
				return false;
			}
		}
	})

}


function loadStockData(warehouseid){
	
	$("#dc").datagrid({  
		url:queryUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"warehouseid":warehouseid},
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
    	toolbar:"#dcHeadBar",
    	onSelect:onSelect,
    	sortName:'warehouseid',
    	sortOrder:'asc',
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
    });  

	 //设置分页控件 
	$('#dc').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    });
	
}


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
			{field:'warehouseid',title:'仓库编号',width:10,align:'left',sortable:true},
			{field:'warehousename',title:'仓库名称',width:20,align:'left',sortable:true},
//			{field:'fcorpid',title:'存放企业id',width:15,align:'left',sortable:true},
			{field:'productid',title:'产品id',width:15,align:'left',sortable:true},
			{field:'productname',title:'产品名称',width:15,align:'left',sortable:true},
			{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
			{field:'availablestock',title:'可用库存',width:15,align:'left',sortable:true},
			{field:'frozestock',title:'冻结库存',width:15,align:'left',sortable:true}
//			{field:'stock',title:'总库存',width:15,align:'left',sortable:true}
	   		
	   	]];
	   	return opt;
}


function getdbColumnsOpt()
{

	var opt = 
		[[
			{field:'warehouseid',title:'仓库编号',width:10,align:'left',sortable:true},
			{field:'warehousename',title:'仓库名称',width:20,align:'left',sortable:true},
//			{field:'fcorpid',title:'存放企业id',width:15,align:'left',sortable:true},
			{field:'productid',title:'产品id',width:15,align:'left',sortable:true},
			{field:'productname',title:'产品名称',width:15,align:'left',sortable:true},
			{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
			{field:'availablestock',title:'可用库存',width:15,align:'left',sortable:true},
			{field:'dbcount',title:'调拨数量',width:15,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,min:1}}},	   		
	   	]];
	   	return opt;
}



function onSelect(index,row)
{
	
	add2Cart(index,row);
}

/**
 * 加入购物车
 * @param index
 * @param row
 * @return
 */
function add2Cart(index,row)
{	
	var data =$("#dr").datagrid('getData');
	var isNeedAppend = true;
	if(data.total>0)
	{
		var carRows  = data.rows;
		$.each(carRows,function(index,crow){
			
			if(crow.productid == row.productid && crow.warehouseid == row.warehouseid)
			{
				crow.dbcount = crow.dbcount +1;
				isNeedAppend = false;
			}
		})
	}
	if(isNeedAppend)
	{
		row.dbcount = 1;

		$('#dr').datagrid('appendRow',row);
	}
	else
	{
		// 更新数据
		$('#dr').datagrid('loadData',carRows);	
	}
	
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
		createdbbill(title,righturl,rightid);
		break;
	case '2':
		removedata(title,righturl,rightid);
		break;

	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}

/**
 * 生成调拨单
 * @return
 */
function createdbbill(title,righturl,rightid)
{
	var fwarehouseid = $("#dcwarehouseid").combobox('getValue');
    var twarehouseid = $("#drwarehouseid").combobox('getValue');

    if(fwarehouseid=="")
    {
    	alert("来源仓库不能为空！");
    	return false;	
    }
    if(twarehouseid=="")
    {
    	alert("目标仓库不能为空！");
    	return false;
    }
    if(fwarehouseid==twarehouseid)
    {
    	alert("来源仓库与目标仓库一致！");
    	return false;
    }
    

    var rows = $("#dr").datagrid('getRows');
    if(rows.length<=0)
    {
    	alert("请选择需要调入目标仓库的数据！");
    	return false;
    }
    var dbjsondata = [];
	$.each(rows,function(index,row){	
		dbjsondata.push(row.productid+"~"+row.dbcount);
	})
    var data={};
	data['tokenid']=getTokenid();
	data['fwarehouseid']= fwarehouseid;
	data['twarehouseid']= twarehouseid;
	data['rightid']= rightid;
	data['dbjsondata'] = dbjsondata.join(",");
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
 * 移除数据
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function removedata(title,righturl,rightid)
{
	var rows = $("#dr").datagrid('getSelections');

	$.each(rows,function(index,row){	
		var rowIndex = $('#dr').datagrid('getRowIndex',row);
		$('#dr').datagrid('deleteRow',rowIndex);
	})
}


function searchOrReload(){

	var queryParams = $("#dc").datagrid('options').queryParams;

	var warehouseid = $("#dcwarehouseid").combobox('getValue');
	
	var productname = $("#productname").val();
	var productcode = $("#productcode").val();

	if(warehouseid=="" ) warehouseid  =0;
	
	queryParams['warehouseid'] = warehouseid;
	queryParams['tokenid']=getTokenid();
	queryParams['productname'] = productname;
	queryParams['productcode'] = productcode;
	
	$("#dc").datagrid('options').queryParams = queryParams;
	$("#dc").datagrid('reload');
}


//datagrid 单击编辑单元格
$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			// 获取冻结列和非冻结列
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
//当点击下一个编辑框时校验上一个文本框内容是否合法
var editIndex = undefined;
function endEditing(_this){
	if (editIndex == undefined){return true}
	if ($(_this).datagrid('validateRow', editIndex)){
		
		$(_this).datagrid('selectRow',editIndex);
		$(_this).datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;	
	} else {
		return false;
	}
}



function onClickCell(index, field){
	if (endEditing(this)){
		$(this).datagrid('selectRow', index)
				.datagrid('editCell', {index:index,field:field});
		editIndex = index;
	}
}




