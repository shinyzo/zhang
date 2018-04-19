// 查询URL
var queryproducturl = "admin/product/query.do";

//var queryproducturl ="admin/storage/querytjstock.do";


$(function(){
	// 隐藏其他组件
	
	$("#productBox").hide();
	$("#productQueryBox").hide();
	
	// 初始化加载数据
	$("#dgBox").datagrid({  
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid()},
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		singleSelect:false,     // 只能选中单行
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getColumnsOpt(), // 列数据
    	toolbar:'#headBox',       // 工具栏
    	onDblClickRow:onDblClickRow,
    	onClickCell:onClickCell,
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
    });  

//	 //设置分页控件 
//	$('#dgBox').datagrid('getPager').pagination({ 
//        beforePageText: '第',//页数文本框前显示的汉字 
//        afterPageText: '页    共 {pages} 页', 
//        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
//    }); 
//	
	
	initLoadingData();
	
	// 初始化表单验证
	initValidateBox();
	
	$("#ordertime").datetimebox('setValue',formatterTime(new Date()));
	$("#payfee").numberbox('setValue',"0.00");
	
});

function initLoadingData()
{
	$("#supplierid").combobox({
		url:'public/getsupplier.json',
		valueField:'supplierid',
		textField:'suppliername',
		editable:false,
		formatter:function(row){
		
			return row.suppliername+" ("+row.supplieruser+") ";
		}	
	})
	

//	$("#warehouseid").combobox({
//		url:'public/getwarehouse.json',
//		valueField:'warehouseid',
//		textField:'warehousename',
//		editable:false,
//		formatter:function(row)
//		{
//			if(row.warehousetype==2)
//			{
//				row.warehousename = row.warehousename+" (共享) ";	
//			}
//			
//				row.warehousename = row.warehousename+" (剩余容量："+row.lessvolumepercent+"%) ";
//		
//			return row.warehousename;
//		}
//	})

}


function initValidateBox()
{
	
	$("#supplierid").combobox({
		required: true,
		validType:"comboxValidate['supplierid']",
		missingMessage:'请选择供货商！',
		invalidMessage:'请选择供货商！'
	})
	
	$('#ordertime').datetimebox({
		required:true,
		missingMessage:'请选择采购单日期!'		
	});
	
//	
	
}
/**
 * 加载商品库数据
 * @return
 */
function loadproduct(){
	
	// 初始化加载数据
	$("#protypeid").combobox({
		url:'public/getprotype.json',
		valueField:'protypeid',
		textField:'protypename',
		loadFilter:function(data){
			return [{protypename:'--请选择产品类别--',protypeid:0,selected:"true"}].concat(data)
		}
	});
	
	$("#brandid").combobox({
		url:'public/getbrand.json',
		valueField:'brandid',
		textField:'brandname',
		loadFilter:function(data){
			return [{brandname:'--请选择品牌类别--',brandid:0,selected:"true"}].concat(data)
		}
	});
	

	$("#productBox").dialog({
		title:"产品库商品",
		width:1100,
		height:450,
	    modal: true,
	    closed: false,    
	    cache: false,   
		buttons:[{
					iconCls: 'icon-ok',
					text:'一键加入',
					handler: function(){	
						var rows = $("#productdg").datagrid('getSelections');
						if(rows)
						{
							$.each(rows,function(index,row){
								
								onSelect(index,row);
							})	
						}
	   	    		}
				},
		         {
					iconCls: 'icon-cancel',
				     text:'关闭',
				     handler: function(){	
						$("#productBox").dialog('close');
		    	     }
		        }]
	})
	$("#productBox").show();
	$('#productBox').window('center');
	
	
	
	// 初始化加载数据
	$("#productdg").datagrid({  
		url:queryproducturl,         //加载的URL
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
    	columns:getProductColumns(), // 列数据
    	toolbar:'#productQueryBox',       // 工具栏
//    	onClickRow:onClickRow,
    	onSelect:onSelect,
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
	
}
/**
 * 当选中一行或者，选中前面的复选框加入
 * @param index
 * @param row
 * @return
 */
function onSelect(index,row)
{
	var data = $("#dgBox").datagrid('getData');
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
		row.buycount = 1;
		$("#dgBox").datagrid('appendRow',row);	
		reCompleteTotalPrice();
	}
}

function onDblClickRow(index,row)
{
	$(this).datagrid('deleteRow',index);
	reCompleteTotalPrice();
	
}
/**
 * 重新计算总金额
 * @return
 */
function reCompleteTotalPrice()
{
	var rows = $("#dgBox").datagrid('getRows');

	var totalamount =0;
	$.each(rows,function(index,row){

		rowprice = row.productinprice * row.buycount;
		totalamount += rowprice;
	})
	totalamount = totalamount.toFixed(2);
	$("#orderfee").html(totalamount);
	$("#payfee").numberbox('setValue',totalamount);
}


/**
 * 加载数据表格列表项
 * @return
 */
function getProductColumns()
{

	var opt = 
		[[
		  	{field:'productid',title:'产品编号',width:15,align:'left',sortable:true,hidden:true},
		  	{field:'productsmallimg',title:'产品缩略图',width:20,align:'left',sortable:true,formatter:formatethumb},
		  	{field:'productname',title:'产品名称',width:20,align:'left',sortable:true},	
	   		{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
	   		{field:'protypeid',title:'产品分类ID',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'protypename',title:'产品分类名称',width:20,align:'left',sortable:true},
	   		{field:'brandid',title:'产品品牌ID',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'brandname',title:'产品品牌名称',width:20,align:'left',sortable:true},
	   		{field:'productinprice',title:'产品进价',width:20,align:'left',sortable:true},
	   		{field:'productsaleprice',title:'销售价格',width:20,align:'left',sortable:true}, 
	   		{field:'productretailprice',title:'建议零售价',width:20,align:'left',sortable:true},
	   		{field:'productstatus',title:'产品状态',width:20,align:'left',formatter:formatProductStatus}
	   		
	   	]];
	   	return opt;
}

/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{

	var opt = 
		[[
		  	{field:'productid',title:'产品编号',width:15,align:'left',sortable:true,hidden:true},
		  	{field:'productsmallimg',title:'产品缩略图',width:20,align:'left',sortable:true,formatter:formatethumb},
		  	{field:'productname',title:'产品名称',width:20,align:'left',sortable:true},	
	   		{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
	   		{field:'protypeid',title:'产品分类ID',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'protypename',title:'产品分类名称',width:20,align:'left',sortable:true},
	   		{field:'brandid',title:'产品品牌ID',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'brandname',title:'产品品牌名称',width:20,align:'left',sortable:true},
	   		{field:'productinprice',title:'采购价格(E)',width:20,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:2,min:0.01,required:true}}},
	   		{field:'buycount',title:'采购数量(E)',width:20,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,min:1,required:true}}},
	   		{field:'totalprice',title:'采购金额',width:20,align:'left',sortable:true,formatter:calculateOneRowPrice}, 
	   		{field:'productsaleprice',title:'销售价格',width:20,align:'left',sortable:true,hidden:true}, 
	   		{field:'productretailprice',title:'建议零售价',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'productstatus',title:'产品状态',width:20,align:'left',sortable:true,hidden:true}
	   		
	   	]];
	   	return opt;
}

/**
 * 自动计算单行金额
 * @param val
 * @param rowData
 * @return
 */
function calculateOneRowPrice(val,rowData)
{
	val = rowData.buycount * rowData.productinprice;
	val = val.toFixed(2);
	rowData.totalprice = val;
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
		createInnerPurchase(title,righturl,rightid);
		break;
	case '2':
		printview(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}




/**
 * 创建内部采购单
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function createInnerPurchase(title,righturl,rightid){
	
	if($("#queryfm").form('validate'))
	{
		var rows = $("#dgBox").datagrid('getRows');
		if(rows.length>0)
		{	
			$('#dgBox').datagrid('acceptChanges');
			// 去修改前的金额
			var payfee = $("#payfee").val();
			reCompleteTotalPrice();
			var orderfee = $("#orderfee").html();
			if(payfee=="")
			{	
				payfee = orderfee;
			}
			
			var projsondata = JSON.stringify(rows);	
			var data={};
			data['tokenid']=getTokenid();
			data['rightid']= rightid;
			
			data['supplierid'] = $("#supplierid").combobox('getValue');
			data['ordertime']=$("#ordertime").datetimebox('getValue');
			data['orderfee']= orderfee;
			data['payfee'] = payfee;
			
			data['projsondata']=projsondata;
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
						// 清空列表数据
						var rows = $("#dgBox").datagrid('getRows');
						$("#dgBox").datagrid('loadData',[]);
						$("#orderfee").html("0.00");
						$("#payfee").numberbox('setValue',"0.00");
						
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
		else
		{
			alert("您还没有选择添加产品哦，请去产品库中选择产品..");
			
		}
		
		
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
function searchproduct(){

	var queryParams = $("#productdg").datagrid('options').queryParams;

	queryParams['productname'] = $('#productname').val();
	queryParams['productcode'] = $('#productcode').val();
	var protypeid = $('#protypeid').combobox('getValue');
	var brandid = $('#brandid').combobox('getValue');
	if(protypeid=="") protypeid =0 ;
	queryParams['protypeid'] =protypeid;
	queryParams['brandid'] =brandid;
	queryParams['tokenid'] = getTokenid();
	
	$("#productdg").datagrid('options').queryParams = queryParams;
	$("#productdg").datagrid('reload');
}

// 重置查询表单
function clearproductform()
{
	$("#productfm").form('clear');
	$('#brandid').combobox('reload');
	$('#protypeid').combobox('reload');
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
// 当点击下一个编辑框时校验上一个文本框内容是否合法
var editIndex = undefined;
function endEditing(_this){
	if (editIndex == undefined){return true}
	if ($(_this).datagrid('validateRow', editIndex)){
		// 当点击下一行时重新计算金额
		$(_this).datagrid('endEdit', editIndex);
		reCompleteTotalPrice();
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

//function onClickCell(index,field,value){  
//    $(this).datagrid('beginEdit', index);  
//    var ed = $(this).datagrid('getEditor', {index:index,field:field});  
//}   

