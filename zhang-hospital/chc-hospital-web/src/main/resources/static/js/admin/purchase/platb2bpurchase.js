// 查询URL
var queryUpproductUrl = "admin/product/queryup.do";

var queryUpcartUrl = 'admin/product/queryupcart.do';

var saveAddressUrl = "admin/corp/saveCorpaddress.do"

$(function(){

	$("#upproBox").hide();
	$("#proqueryBox").hide();
	$("#addressBox").hide();
	
	$("#upcorpbtn").linkbutton({"disabled":true});
	
	
	$("#corpid").tree({
		url:'public/getUpCorp.json',
		id:'corpid',
		text:'corpname',
		lines:true,
		loadFilter:function(data){
			$.each(data,function(index,item){	
				item.id = item.corpid;
				item.text= item.corpname;
			})
		
			return data;
		},
		onSelect:function(node){

			//
			$("#upcorpbtn").linkbutton({"disabled":false});
			loadCorpCartData(node.id);
		}
		
	})
	
		
	$("#corpaddressid").combobox({
		url:'public/getcorpaddress.json',
		valueField:'id',
		textField:'corpaddress',
		required:true,
		formatter:function(row){		
			row.corpaddress = row.corpaddress +"("+row.linkman+","+row.linkphone+")";
			return row.corpaddress;
		},
		onLoadSuccess:function(){
			var data = $(this).combobox('getData'); 
			for(var i=0;i<data.length;i++)
			{
				if(data[i]['isdefault']=="1")
				{
					$(this).combobox('select', data[i]['id']);
				}
				
			}	
		}
		
	})
	


	
	
	
	$('#productcode').textbox('textbox').keydown(function (e) {
    
		searchOrReload();

    });
	
	

	
	
});


function loadCorpCartData(corpid){
	
	$("#carDg").datagrid({  
		url:queryUpcartUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"tcorpid":corpid},
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
    	onClickCell:onClickCell,
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
    });  
	
	
	
}

/**
 * 加载上游企业维护的商品库
 * @return
 */
function loadingupproduct()
{
	
	// 初始化完成此处拿不到combox的value值 所有加载的数据不正确
	var node = $("#corpid").tree('getSelected');
	if(node==null)
	{
		alert("请选择一个上游企业！");
		return false;
	}
	
	var tcorpid = node.id;
	
	$("#upproBox").show();
	$("#upproBox").dialog({ 
		title:'上游企业产品库',
		width:1000,
		height:400,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    resizable:true,
	    buttons:[{
			iconCls: 'icon-ok',
			text:'关闭',
			handler: function(){	
	    	 $("#upproBox").dialog('close');
	    	}
		}]
	}); 
	$("#upproBox").window('center');
	// 初始化加载数据
	$("#upproDg").datagrid({  
		url:queryUpproductUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"tcorpid":tcorpid},
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
    	columns:getProColumnsOpt(), // 列数据
    	toolbar:'#proqueryBox',       // 工具栏
    	onSelect:onSelect,
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
    });  

	 //设置分页控件 
	$('#upproDg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 
	
	
	
	
}

function initLoadingData(){
	

	
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
			{field:'productname',title:'产品名称',width:20,align:'left',sortable:true},
			{field:'productsmallimg',title:'产品缩略图',width:20,align:'left',sortable:true,formatter:formatethumb},
			{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
			{field:'protypeid',title:'产品分类ID',width:20,align:'left',sortable:true,hidden:true},
			{field:'protypename',title:'产品分类名称',width:20,align:'left',sortable:true},
			{field:'brandid',title:'产品品牌ID',width:20,align:'left',sortable:true,hidden:true},
			{field:'brandname',title:'产品品牌名称',width:20,align:'left',sortable:true},
			{field:'corpretailprice',title:'建议企业零售价',width:20,align:'left',sortable:true},
			{field:'productsaleprice',title:'产品原价',width:20,align:'left',sortable:true}, 
			{field:'corpsaleprice',title:'产品现价(购买价格)',width:20,align:'left',sortable:true},
			{field:'buycount',title:'购买数量',width:20,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,min:1,required:true}}},
			{field:'totalprice',title:'金额',width:20,align:'left',sortable:true,formatter:calculateOneRowPrice}
			
			
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
	val = rowData.buycount * rowData.corpsaleprice;
	val = val.toFixed(2);
	rowData.totalprice = val;
	return val;	
}

/**
 * 加载数据表格列表项
 * @return
 */
function getProColumnsOpt()
{
	var opt = 
		[[
			{field:'productid',title:'产品编号',width:15,align:'left',sortable:true,hidden:true},
			{field:'productname',title:'产品名称',width:20,align:'left',sortable:true},
			{field:'productsmallimg',title:'产品缩略图',width:20,align:'left',sortable:true,formatter:formatethumb},
			{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
			{field:'protypeid',title:'产品分类ID',width:20,align:'left',sortable:true,hidden:true},
			{field:'protypename',title:'产品分类名称',width:20,align:'left',sortable:true},
			{field:'brandid',title:'产品品牌ID',width:20,align:'left',sortable:true,hidden:true},
			{field:'brandname',title:'产品品牌名称',width:20,align:'left',sortable:true},
			{field:'productsaleprice',title:'产品原价',width:20,align:'left',sortable:true}, 
			{field:'corpsaleprice',title:'产品现价',width:20,align:'left',sortable:true}, 
			{field:'corpretailprice',title:'建议企业零售价',width:20,align:'left',sortable:true}
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
			saveCart(title,righturl,rightid);
			break;
		case '2':
			removeCart(title,righturl,rightid);
			break;
		case '3':
			clearCart(title,righturl,rightid);
			break;
		case '4':
			buyCart(title,righturl,rightid);
			break;
		case '5':
			createb2bOrder(title,righturl,rightid);
			break;
		default:
			alert('没有此操作类型对应的方法，请核查！');
			break;
	}
}

/**
 * 切换显示和隐藏某列
 * @return
 */
function toggleThumb()
{
	var copts = $("#dgBox").datagrid('getColumnOption', "productsmallimg");
	if(copts.hidden)
	{
		$("#dgBox").datagrid('showColumn','productsmallimg');	
	}
	else
	{
		$("#dgBox").datagrid('hideColumn','productsmallimg');
	}
	
}

/**
 * 购物车结算
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function buyCart(title,righturl,rightid)
{
	
	var orderfee = reCompleteTotalPrice();
	
	alert(orderfee);
	
}


function createb2bOrder(title,righturl,rightid)
{

	var node = $("#corpid").tree('getSelected');
	if(node==null)
	{
		alert("请选择一个上游企业！");
		return false;
	}
	var tcorpid = node.id;
	
	var rows = $("#carDg").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要生成订单的产品！");
		return false;
	}
	
	var orderfee = calSelectionTotalAmount();
	$("#orderfee").html(orderfee);
	
	$("#addressBox").show();
	$("#addressBox").dialog({ 
		title:'采购单收货地址',
		width:480,
		height:200,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    resizable:true,
	    buttons:[{
					iconCls: 'icon-ok',
					text:'确认生成',
					handler: function(){	
	    				var corpaddressid = $("#corpaddressid").combobox('getValue');
	    				if(corpaddressid=="")
	    				{
	    					alert("您未选择收货地址，若您还未维护收货地址，请先添加！");
	    					return false;
	    				}
	    				
				    	var payfee = orderfee;
				    	var projsondata = JSON.stringify(rows);
				    	var data={};
				    	data['tokenid']=getTokenid();
				    	data['rightid']= rightid;
				    	data['orderfee'] = orderfee;
				    	data['payfee'] = payfee;
				    	data['projsondata'] = projsondata;
				    	data['corpaddressid']=corpaddressid;
				    	data['tcorpid']= tcorpid;
				    	
				    	$.ajax({
				    		url:righturl,
				    		async:false,
				    		type:"post",
				    		data:data,
				    		dataType:'json',
				    		success:function(retData){
				    			if(retData.retCode == successCode)
				    			{
				    				show(retData.retMsg);
				    				$("#addressBox").dialog('close');
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
	    		 }
	    		 ,{
						iconCls: 'icon-cancel',
						text:'关闭',
						handler: function(){	
				    	 $("#addressBox").dialog('close');
				        }
		    	}]
	}); 
	$("#addressBox").window('center');
	

	

}


/**
 * 重新计算总金额
 * @return
 */
function reCompleteTotalPrice()
{
	var rows = $("#carDg").datagrid('getRows');

	var totalamount =0;
	$.each(rows,function(index,row){

		rowprice = row.corpsaleprice * row.buycount;
		totalamount += rowprice;
	})
	totalamount = totalamount.toFixed(2);
	
	return totalamount;
}


/**
 * 重新计算总金额
 * @return
 */
function calSelectionTotalAmount()
{
	var rows = $("#carDg").datagrid('getSelections');

	var totalamount =0;
	$.each(rows,function(index,row){

		rowprice = row.corpsaleprice * row.buycount;
		totalamount += rowprice;
	})
	totalamount = totalamount.toFixed(2);
	
	return totalamount;
}

/**
 * 保存购物车
 * @return
 */
function saveCart(title,righturl,rightid)
{
	var node = $("#corpid").tree('getSelected');
	if(node==null)
	{
		alert("请选择一个上游企业！");
		return false;
	}
	var tcorpid = node.id;
	
	var rows = $('#carDg').datagrid('getRows');
	var projsondata = "";
	if(rows.length>0)
	{
		projsondata = JSON.stringify(rows);
	}
	
	
	var data={};
	data['tokenid']=getTokenid();
	data['rightid']= rightid;				
	data['projsondata']= projsondata;
	data['tcorpid']=tcorpid;
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
				$('#carDg').datagrid('reload');
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
 * 从购物车中移除多行
 * @return
 */
function removeCart(title,righturl,rightid)
{
	var rows = $('#carDg').datagrid('getSelections');
	if (rows) {
		
		// 遍历获取行索引然后移除
		$.each(rows,function(index,row){
			var rowIndex = $('#carDg').datagrid('getRowIndex', row);
			$('#carDg').datagrid('deleteRow', rowIndex);  	
		})   
	 } 
	
}

/**
 * 清空购物车，将购物车里的数据置为空即可
 * @return
 */
function clearCart(title,righturl,rightid)
{
	$('#carDg').datagrid('loadData',[]);
}


/**
 * 批量加入购物车
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function add2Cart()
{

	var rows = $('#upproDg').datagrid('getSelections');
	if(rows)
	{
		$.each(rows,function(index,row){
			
			addRow2Cart(row);
		})
		
	}
	
}

/**
 * 想购物车中添加数据
 * @param row
 * @return
 */
function addRow2Cart(row)
{
	var carRows = $("#carDg").datagrid('getRows');
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
		$('#carDg').datagrid('appendRow',row);
	}
	else
	{
		// 更新数据
		$('#carDg').datagrid('loadData',carRows);	
	}


}


function onSelect(index,row)
{
	
	//$(this).datagrid('selectRow',index);
	addRow2Cart(row);
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

	var queryParams = $("#upproDg").datagrid('options').queryParams;

	queryParams['productcode'] = $('#productcode').val();
	queryParams['productname'] = $('#productname').val();
	queryParams['tcorpid'] = $('#corpid').combobox('getValue');
	queryParams['tokenid'] = getTokenid();
	
	$("#upproDg").datagrid('options').queryParams = queryParams;
	$("#upproDg").datagrid('reload');
}

// 重置查询表单
function clearForm()
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
//当点击下一个编辑框时校验上一个文本框内容是否合法
var editIndex = undefined;
function endEditing(_this){
	if (editIndex == undefined){return true}
	if ($(_this).datagrid('validateRow', editIndex)){
		// 当点击下一行时重新计算金额
		$(_this).datagrid('endEdit', editIndex);
		//reCompleteTotalPrice();
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
