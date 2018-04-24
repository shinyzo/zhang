// 查询URL
var queryUrl ="admin/storage/querystock.do"
var stockmin = "-999999999";
var stockmax = " 999999999";	
$(function(){


	// 初始化加载数据
	$("#dgBox").datagrid({  
		url:queryUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"stockmin":stockmin,"stockmax":stockmax},
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
    	sortName:'warehouseid',
    	sortOrder:'asc',
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
	
	
	initLoadingData();
	
	// 初始化表单验证
	initValidateBox();
	

});

function initLoadingData()
{
	$("#warehouseid").combobox({
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
		}
	})

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
			{field:'fcorpid',title:'存放企业id',width:15,align:'left',sortable:true},
			{field:'corpname',title:'存放企业名称',width:15,align:'left',sortable:true},
			{field:'productid',title:'产品id',width:15,align:'left',sortable:true},
			{field:'productname',title:'产品名称',width:15,align:'left',sortable:true},
			{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
			{field:'availablestock',title:'可用库存',width:15,align:'left',sortable:true},
			{field:'frozestock',title:'冻结库存',width:15,align:'left',sortable:true},
			{field:'stock',title:'总库存',width:15,align:'left',sortable:true}
	   		
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
		rkwork(title,righturl,rightid);
		break;

	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
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

	var warehouseid = $("#warehouseid").combobox('getValue');
	var warehousetype = $("#warehousetype").combobox('getValue');
	var productname = $("#productname").val();
	var productcode = $("#productcode").val();
	var stockmin = $("#stockmin").val();
	var stockmax = $("#stockmax").val();

	if(warehouseid=="" ) warehouseid=0;
	queryParams['warehouseid'] = warehouseid;
	queryParams['warehousetype'] = warehousetype;
	
	if(stockmin=="") stockmin = "-999999999";
	if(stockmax=="") stockmax = "999999999";
	
	queryParams['stockmin'] = stockmin;
	queryParams['stockmax'] = stockmax;
	queryParams['productname'] = productname;
	queryParams['productcode'] = productcode;
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearform()
{
	$("#queryfm").form('clear');
	
}



