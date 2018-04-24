// 查询URL
var queryProductUrl = "admin/storage/querytjstock.do";

	
$(function(){
	
	$("#proBox").hide();
	$("#proquery").hide();
	$("#jsBox").hide();
	

	
	// 初始化加载数据
	$("#dg").datagrid({  
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
    	columns:getColumnsOpt(), // 列数据
    	toolbar:"#headBox",
    	onClickCell:onClickCell,
    	onDblClickRow:onDblClickRow,
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
    });  
	
	
	initLoadingData();
	
	
	// 回车查询商品
	$("#productcode").textbox('textbox').keyup(function (e) {
		
		if(e.keyCode==13){
			
			searchproduct();
			//sm2Cart();
		}	
    });
	
	$("#productname").textbox('textbox').keyup(function (e) {
		
		if(e.keyCode==13){
			searchproduct();
		}	
    });
	

	
	$('#payamount').numberbox({    
	    min:0,    
	    precision:2,
	    value:0.00
	});  	
});

/**
 * 选择时候加入购物车
 * @param index
 * @param row
 * @return
 */
function onSelect(index,row)
{
	
	add2Cart(index,row);
}

/**
 * 扫码加入购物车
 * @return
 */
function sm2Cart()
{
	var rows = $("#prodg").datagrid("getRows");
	$.each(rows,function(index,row){
		
		add2Cart(index,row);
		
	})
}

/**
 * 加入购物车
 * @param index
 * @param row
 * @return
 */
function add2Cart(index,row)
{	
	

	
	var carRows = $("#dg").datagrid('getRows');
	var isNeedAppend = true;
	if(carRows.length>0)
	{
		for(var i=0;i<carRows.length;i++)
		{
			var productid = carRows[i].productid;
			// 同一个产品则数量自增 
			if(productid==row.productid)
			{	
				carRows[i].buycount = parseFloat( carRows[i].buycount) +1;
				isNeedAppend = false;
			}			
		}
	}
	
	if(isNeedAppend)
	{
		row.buycount = 1;
		$('#dg').datagrid('appendRow',row);
	}
	else
	{
		// 更新数据
		$('#dg').datagrid('loadData',carRows);	
	}

	// 重新计算金额
	reCompleteTotalAmount();
}

/**
 * 重新计算总金额
 * @return
 */
function reCompleteTotalAmount()
{
	var rows = $("#dg").datagrid("getRows");
	if(rows.length > 0)
	{
		var orderamount = 0;
		$.each(rows,function(index,row){
			
			var totalprice = parseFloat(row.buycount) * parseFloat(row.productsaleprice);
			orderamount += totalprice ;
			
		})

		orderamount = orderamount.toFixed(2);
		$("#orderamount").html(orderamount);
		$("#payamount").numberbox('setValue',orderamount);
	}	
	else
	{
		$("#orderamount").html("0.00");
		$("#payamount").numberbox('setValue',"0.00");
	}
}

/**
 * 双击删除一行，并减少金额
 * @param index
 * @param row
 * @return
 */
function onDblClickRow(index,row){

	$("#dg").datagrid('deleteRow',index);
	reCompleteTotalAmount();
}


function initLoadingData(){
	
	$("#customid").combobox({
		url:'public/getcustom.json',
		valueField:'customid',
		textField:'customname',
		editable:false,
		loadFilter:function(data){
			$(this).combobox('select', data[0]['customid']);
			return data;
		}
		
	})

}

/**
 * 加载企业产品库
 * @return
 */
function loadproduct()
{	
	/**
	 * 加载产品库数据 产品状态为上架
	 */ 

	var stockmin = "-999999999";
	var stockmax = " 999999999";
	

	$("#prodg").datagrid({  
		url:queryProductUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"productstatus":"0","stockmin":stockmin,"stockmax":stockmax},
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
    	toolbar:"#proquery",       // 工具栏
    	onSelect:onSelect,
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
    });  
	

	$('#prodg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 
	
	
	/**
	 * 设置window大小并打开
	 */
	$("#proBox").show();
	$("#proBox").dialog({
		  title: '仓库产品库', 
		  width:1100,
		  height:450,
		  closed: false,    
		  cache: false,   
		  modal: true,
		  resizable:true,
		  buttons:[{
			  		iconCls: 'icon-cancel',
			  		text:'关闭',
			  		handler: function(){	
		    	 		$("#proBox").dialog('close');
		    		}
		  }]
	})
	
	
	$("#proBox").window('center');
}

/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
			{field:'productid',title:'产品编号',width:10,align:'left',sortable:true},
//		  	{field:'productsmallimg',title:'产品缩略图',width:'10%',align:'left',sortable:true,formatter:formatethumb},
		  	{field:'productname',title:'产品名称',width:25,align:'left',sortable:true},	
	   		{field:'productcode',title:'产品条码',width:25,align:'left',sortable:true},
//	   		{field:'protypeid',title:'产品分类ID',width:'10%',align:'left',sortable:true,hidden:true},
	   		{field:'protypename',title:'产品分类名称',width:'10%',align:'left',sortable:true,hidden:true},
//	   		{field:'brandid',title:'产品品牌ID',width:'10%',align:'left',sortable:true,hidden:true},
	   		{field:'brandname',title:'产品品牌名称',width:'10%',align:'left',sortable:true,hidden:true},
	   		{field:'productsaleprice',title:'销售价格(E)',width:20,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:2,min:0.01,required:true}}}, 
	   		{field:'buycount',title:'购买数量(E)',width:20,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,min:1,required:true}}},
	   		{field:'totalprice',title:'金额',width:20,align:'left',formatter:formateMoney,sortable:true},
	   		{field:'tjtotalstock',title:'库存总数',width:20,align:'left',sortable:true},
	   		{field:'tjavailablestock',title:'可用库存',width:20,align:'left',sortable:true}
	   	]];
	   	return opt;
}
/**
 * 格式化计算单行金额
 * @param val
 * @param row
 * @return
 */
function formateMoney(val,row)
{
	var totalprice = row.buycount * row.productsaleprice;
	totalprice = totalprice.toFixed(2);
	row.totalprice = totalprice;
	return row.totalprice ;
}
/**
 * 获取商品列头
 * @return
 */
function getProductColums(){
	
	var opt = 
		[[
		  
			{field:'productid',title:'产品编号',width:15,align:'left',sortable:true},
//		  	{field:'productsmallimg',title:'产品缩略图',width:15,align:'left',sortable:true,formatter:formatethumb},
		  	{field:'productname',title:'产品名称',width:20,align:'left',sortable:true},	
	   		{field:'productcode',title:'产品条码',width:20,align:'left',sortable:true},
//	   		{field:'protypeid',title:'产品分类ID',width:10,align:'left',sortable:true,hidden:true},
	   		{field:'protypename',title:'产品分类名称',width:20,align:'left',sortable:true,hidden:true},
//	   		{field:'brandid',title:'产品品牌ID',width:15,align:'left',sortable:true,hidden:true},
	   		{field:'brandname',title:'产品品牌名称',width:15,align:'left',sortable:true,hidden:true},
	   		{field:'productsaleprice',title:'销售单价',width:15,align:'left',sortable:true},
	   		{field:'tjavailablestock',title:'可用库存数',width:'10%',align:'left',sortable:true},
	   		{field:'tjtotalstock',title:'实际库存数',width:15,align:'left',sortable:true}
	   		
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
		cretesalebill(title,righturl,rightid);
		break;

	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}




function cretesalebill(title,righturl,rightid)
{
	
	var rows = $("#dg").datagrid('getRows');
	
	if(rows.length<=0)
	{
		alert("购物车里没有商品！");
		return false;
	}

	// 先把正在编辑的cell结束掉,重新计算金额
	$("#dg").datagrid('endEdit',editIndex);
	reCompleteTotalAmount();

	var orderfee =   parseFloat( $("#orderamount").html());
	var payfee =     parseFloat( $("#payamount").numberbox('getValue'));	
	if(payfee=="" || payfee <= 0)
	{
		alert("折后金额不能为空或小于等于0！");
		return false;
	}
	
	if(payfee > orderfee)
	{
		alert("折后金额不得大于订单金额！");
		$("#payamount").numberbox('setValue',orderfee);
		return false;	
	}

	
	// 禁用按钮
	
	var projsondata = JSON.stringify(rows);	
	var data={};
	data['rightid'] = rightid;
	data['tokenid'] = getTokenid();
	data['customid'] = $("#customid").combobox('getValue');
	data['projsondata'] = projsondata;
	data['orderfee'] = orderfee;
	data['payfee'] = payfee;

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
				// 清空产品
				$("#dg").datagrid('loadData',[]);
				reCompleteTotalAmount();
				
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
 * 搜索商品
 * @return
 */
function searchproduct()
{
	var queryParams = $("#prodg").datagrid('options').queryParams;
	
	queryParams['productname'] = $("#productname").textbox('getValue');
	queryParams['productcode'] = $("#productcode").textbox('getValue');
	
	queryParams['tokenid'] = getTokenid();
	$("#prodg").datagrid('options').queryParams = queryParams;
	$("#prodg").datagrid('reload');
}
/**
 * 清除表单
 * @return
 */
function clearproduct()
{
	
	$("#proqueryfm").form('clear');
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
	if ($(_this).datagrid('validateRow', editIndex))
	{
		$(_this).datagrid('endEdit', editIndex);
		reCompleteTotalAmount();
		editIndex = undefined;		
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


