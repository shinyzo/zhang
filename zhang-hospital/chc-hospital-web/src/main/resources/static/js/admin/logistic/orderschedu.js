// 查询URL
var queryUrl ="admin/order/querymysaleorder.do";
var queryprodetailurl = "admin/order/queryprodetail.do";
var carQueryUrl = "admin/car/queryallcar.do";

var map;

$(function(){
	// 隐藏其他组件

	// 加载百度地图
	loadingBdmap();

	$("#proBox").hide();
	
	$("#begintime").datetimebox('setValue',formatterDate(new Date()));	
	$("#endtime").datetimebox('setValue',formatterTime(new Date()));	
	
	var begintime = $("#begintime").datetimebox('getValue');
	
	var queryParams={};
	queryParams['tokenid']=getTokenid();
	queryParams['begintime']=begintime;
	queryParams['ordertypelist']="BB,NA";
	queryParams['issendlogistic']="1";
	// 初始化加载数据
	$("#dg").datagrid({  
		url:queryUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:queryParams,
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		singleSelect:false,     // 只能选中单行
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getColumnsOpt(), // 列数据
    	showFooter:true,
    	sortName:'orderstatus',
    	sortOrder:'asc',
    	onSelect:onSelect,
    	onUnselect:onUnselect,
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
    });  

//	 //设置分页控件 
//	$('#dg').datagrid('getPager').pagination({ 
//        beforePageText: '第',//页数文本框前显示的汉字 
//        afterPageText: '页    共 {pages} 页', 
//        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
//    }); 
//	
	
	// 初始化加载数据
	$("#cardg").datagrid({  
		url:carQueryUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"isOpenpage":"false"},
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		singleSelect:false,     // 只能选中单行
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getCarColumnsOpt(), // 列数据
    	sortName:'carstatus',
    	sortOrder:'asc',
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

	$("#corpid").combobox({
		url:'public/getDnCorp.json',
		valueField:'corpid',
		textField:'corpname',
		loadFilter:function(data){
			return [{corpname:'--请选择下游企业--',corpid:'',selected:"true"}].concat(data);
		}
	})

	
	
}


function initValidateBox()
{
	
	
}
/**
 * 加载百度地图
 * @return
 */
function loadingBdmap(){
	
	map = new BMap.Map("mapBox");
	var point = new BMap.Point(110.362306,20.030644);
	map.centerAndZoom(point, 15);
	
	var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮
	/*缩放控件type有四种类型:
	BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮*/
	map.addControl(top_left_control);        
	map.addControl(top_left_navigation);     
	map.addControl(top_right_navigation);
	
}

/**
 * 加载数据表格列表项
 * @return
 */
function getCarColumnsOpt()
{
	var opt = 
		[[
		  	{field:'carid',title:'车辆id',width:15,align:'left',sortable:true},
		  	{field:'carno',title:'车牌号',width:20,align:'left',sortable:true},
		  	{field:'carstatus',title:'车辆状态',width:20,align:'left',sortable:true,formatter:formateCarStatus},
		  	{field:'schedustatus',title:'调度状态',width:20,align:'left',sortable:true,formatter:formateScheduStatus},
		  	{field:'drivername',title:'绑定司机',width:20,align:'left',sortable:true},
		  	{field:'driverphone',title:'联系电话',width:20,align:'left',sortable:true}   	 	
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
			{field:'orderno',title:'销售单号',width:25,align:'left',sortable:true},
			{field:'ordertype',title:'订单类型',width:20,align:'left',sortable:true,formatter:formateOrdertype},
	   		{field:'orderstatus',title:'订单状态',width:20,align:'left',sortable:true,formatter:formateOrderstatus}   		
	   	]];
	   	return opt;
}




function getProdetailCols()
{
	var opt = 
		[[
		  	{field:'id',title:'编号',width:15,align:'left',sortable:true,hidden:true},	
		  	{field:'orderno',title:'订单号',width:25,align:'left',sortable:true},
			{field:'productid',title:'产品id',width:10,align:'left',sortable:true},
		  	{field:'productname',title:'产品名称',width:25,align:'left',sortable:true},	
			{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},  
	   		{field:'productprice',title:'销售价格(元)',width:15,align:'left',sortable:true},
			{field:'totalprice',title:'销售金额(元)',width:15,align:'left',sortable:true},
			{field:'buycount',title:'购买数量',width:15,align:'left',sortable:true},
			{field:'overckcount',title:'已出库数量',width:15,align:'left',sortable:true},	
	   	]];
	   	return opt;
}

function loadOrderInfo(index,row)
{
	$("#fx_orderno").html(row.orderno);
	$("#fx_ordertime").html(row.ordertime);
	$("#fx_fcorpid").html(row.fcorpid);
	$("#fx_fromfullname").html(row.fromfullname);
	$("#fx_orderfee").html(row.orderfee);
	$("#fx_payfee").html(row.payfee);
	
	$("#fx_havepayfee").html(row.havepayfee);
	$("#fx_remainfee").html(row.remainfee);
	$("#fx_linkman").html(row.linkman);
	$("#fx_useraddress").html(row.useraddress);
	$("#fx_userphone").html(row.userphone);
	$("#fx_logisticstatus").html(row.logisticstatus);

}

function loadProductDetail(index,row)
{

	 var orderno = row.orderno;	 
	 
	 var queryParams={};
	 queryParams['orderno']=orderno;
	 queryParams['tokenid']=getTokenid();
	// 初始化加载数据
	 $("#prodg").datagrid({  
		url:queryprodetailurl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:queryParams,
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
    	columns:getProdetailCols(), // 列数据
    	toolbar:'',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
	 });  

	 //设置分页控件 
	 $('#prodg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
     }); 
		
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
		sureSchedu(title,righturl,rightid);
		break;
	case '2':
		sendtostorage(title,righturl,rightid);
		break;
	case '4':
		showSelectedOverlay(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}


function sureSchedu(title,righturl,rightid){
	
	var rows = $("#dg").datagrid('getSelections');
	var carRows = $("#cardg").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要调度的订单！");
		return false;
	}
	
	if(carRows.length<=0)
	{
		alert("请选择调度车辆！");
		return false;
	}
	
	if(carRows.length>1)
	{
		alert("只能选择单辆车进行调度！");
		return false;
	}
	
	var car = carRows[0];
	
	if(car.driverid=="")
	{
		alert("该车辆未进行司机关联，请先进行司机绑定！");
		return false;
	}
	
	orderArray = [];
	$.each(rows,function(index,item){
		orderArray.push(item.orderno);
	})
	
	
	var data={};
	data['ordernolist'] = orderArray.join(",");
	data['carid']=car.carid;
	data['carno']=car.carno;
	data['driverid']=car.driverid;
	data['drivername']=car.drivername;
	data['driverphone']=car.driverphone;
	data['tokenid'] = getTokenid();
	data['rightid'] = rightid;
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
				$("#dg").datagrid('reload');
				$("#cardg").datagrid('reload');
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
 * 在地图上展示订单信息
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function showSelectedOverlay(title,righturl,rightid){
	
	var rows = $("#dg").datagrid('getSelections');
	map.clearOverlays(); 
	if(rows.length>0)
	{
		var marker =null;
		$.each(rows,function(index,row){
			
			var point = new BMap.Point(row.lng,row.lat);
			
			addOverlay(point,row);
		})	
	}
}

/**
 * 选中添加锚点
 * @param index
 * @param row
 * @return
 */
function onSelect(index,row)
{
	
	var point = new BMap.Point(row.lng,row.lat);
	addOverlay(point,row);	
	
	loadProductDetail(index,row);
	loadOrderInfo(index,row);
	
	
	
}

function onUnselect(index,row)
{
	showSelectedOverlay("","","");
}
/**
 * 添加覆盖物
 * @param point
 * @param row
 * @return
 */
function addOverlay(point,row)
{
	  var marker = new BMap.Marker(point);
	  map.addOverlay(marker);
	  marker.addEventListener("click", function(e){   
		 var opts = {    
				 width : 250,     // 信息窗口宽度    
				 height: 150,     // 信息窗口高度    
				 title : "订单信息"  // 信息窗口标题   
		 }    
		 var content="";
		 content += "订单号："+row.orderno+"\r\n";
		 content += "收货人："+row.linkman + "\r\n";
		 content += "联系电话："+row.userphone +"\r\n";
		 content += "收货地址："+row.useraddress;
	
		 var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象    
		 map.openInfoWindow(infoWindow, point);      // 打开信息窗口
	 })	
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


	queryParams['begintime']=$("#begintime").datetimebox('getValue');
	queryParams['endtime']=$("#endtime").datetimebox('getValue');
	
	queryParams['orderno']=$("#orderno").val();
	queryParams['fcorpid']= $("#corpid").combobox('getValue');
	
	
	$("#dg").datagrid('options').queryParams = queryParams;
	$("#dg").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');

	$("#begintime").datetimebox('setValue',formatterDate(new Date()));	
	$("#endtime").datetimebox('setValue',formatterTime(new Date()));
	
	$("#corpid").combobox('reload');
	
}

function carSearch()
{

	var queryParams = $("#cardg").datagrid('options').queryParams;
	queryParams['carno']=$("#carno").val();

	$("#cardg").datagrid('options').queryParams = queryParams;
	$("#cardg").datagrid('reload');
}

