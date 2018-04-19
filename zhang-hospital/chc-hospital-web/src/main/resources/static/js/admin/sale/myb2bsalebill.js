// 查询URL
var queryUrl ="admin/order/querymysaleorder.do";
var querypaydetailurl = "admin/order/querymysalebillpaydetail.do";
var queryprodetailurl = "admin/order/queryprodetail.do";

$(function(){
	// 隐藏其他组件

	$("#proBox").hide();
	$("#payBox").hide();
	$("#helpBox").hide();
	
	$("#begintime").datetimebox('setValue',formatterDate(new Date()));	
	//$("#endtime").datetimebox('setValue',formatterTime(new Date()));	
	
	var begintime = $("#begintime").datetimebox('getValue');
	
	// 初始化加载数据
	$("#dg").datagrid({  
		url:queryUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"begintime":begintime,"ordertype":"BB"},
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
    	showFooter:true,
    	sortName:'ordertime',
    	sortOrder:'desc',
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
		    width:600,
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
	})

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
	

	$("#transstatus").combobox({
		url:'public/getstatusparams.json',
		queryParams:{"type":"transstatus"},
		valueField:'statuscode',
		textField:'statusval',
		loadFilter:function(data){
			return [{statusval:'--请选择支付状态--',statuscode:'',selected:"true"}].concat(data);
		}
	})
	
	$("#orderstatus").combobox({
		url:'public/getstatusparams.json',
		queryParams:{"type":"orderstatus"},
		valueField:'statuscode',
		textField:'statusval',
		loadFilter:function(data){
			return [{statusval:'--请选择订单状态--',statuscode:'',selected:"true"}].concat(data);
		}
	})

}


function initValidateBox()
{
	
//	$("#warehouseid").combobox({
//		required: true,
//		validType:"comboxValidate['warehouseid']",
//		missingMessage:'请选择仓库！',
//		invalidMessage:'请选择仓库！',	
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
			{field:'orderno',title:'销售单号',width:25,align:'left',sortable:true},
			{field:'ordertime',title:'销售单日期',width:24,align:'left',sortable:true,formatter:parseTime},		  
		  	{field:'fcorpid',title:'下游企业名称',width:20,align:'left',sortable:true,hidden:true},	
	   		{field:'fromfullname',title:'分销商名称',width:15,align:'left',sortable:true},
	   		{field:'orderfee',title:'订单金额(元)',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'payfee',title:'折后金额(元)',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'havepayfee',title:'已付金额(元)',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'remainfee',title:'待付金额(元)',width:20,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'orderstatus',title:'销售单状态',width:20,align:'left',sortable:true,formatter:formateOrderstatus},
	   		{field:'transstatus',title:'交易状态',width:20,align:'left',sortable:true,formatter:formatetransstatus},
	   		{field:'linkman',title:'收货人',width:20,align:'left',sortable:true},
	   		{field:'useraddress',title:'收货地址',width:20,align:'left',sortable:true},
	   		{field:'userphone',title:'联系电话',width:20,align:'left',sortable:true},
	   		{field:'ordertype',title:'销售单类型',width:20,align:'left',sortable:true,formatter:formateOrdertype},
	   		
	   		{field:'issendstorageck',title:'是否推送至仓库',width:20,align:'left',sortable:true,formatter:formateSendStorage},
	   		{field:'ckstatus',title:'出库状态',width:20,align:'left',sortable:true,formatter:formateCkstatus},
	   		{field:'orderdetail',title:'销售单详情',width:15,align:'left',sortable:true,formatter:formateSalebilldetail},
	   		{field:'paylog',title:'支付详情',width:15,align:'left',formatter:formatePaydetail}
	   		
	   	]];
	   	return opt;
}




function getPaydetailCols()
{
	var opt = 
		[[
		  	{field:'msgdatetime',title:'消息时间',width:25,align:'left',sortable:true,formatter:parseTime},	
		  	{field:'orderno',title:'订单号',width:15,align:'left',sortable:true,hidden:true},
			{field:'transno',title:'交易号',width:30,align:'left',sortable:true},
		  	{field:'operuserid',title:'操作人员',width:10,align:'left',sortable:true},	
			{field:'payfee',title:'交易金额(元)',width:15,align:'left',sortable:true,formatter:formateF2Y},  
			{field:'transfee',title:'到账金额(元)',width:15,align:'left',sortable:true,formatter:formateF2Y},
	   		{field:'paymodeid',title:'支付方式id',width:20,align:'left',sortable:true,hidden:true},
			{field:'paymodename',title:'支付方式名称',width:20,align:'left',sortable:true},
			{field:'transstatus',title:'交易状态',width:20,align:'left',sortable:true,formatter:formatetransstatus},
			{field:'transtime',title:'交易时间',width:25,align:'left',sortable:true,formatter:parseTime},
			{field:'lastupdatetime',title:'最后修改时间',width:20,align:'left',sortable:true,formatter:parseTime,hidden:true}
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
			{field:'overckcount',title:'已出库数量',width:15,align:'left',sortable:true,hidden:true}
	   	]];
	   	return opt;
}


function formatePaydetail(val,row,index)
{
	return "<a href='javascript:void(0);' onclick='javascript:showpaydetail("+index+")'>支付详情</a>";

}

function formateSalebilldetail(val,row,index)
{
	return "<a href='javascript:void(0);' onclick='javascript:showproductdetail("+index+")'>产品详情</a>";

}

function showproductdetail(index)
{
	 var rows = $('#dg').datagrid('getRows');
	 var row = rows[index];
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
	 
	 
	 $("#proBox").show();
	 $("#proBox").dialog({
		 title:'销售单-支付详情',
		 width: 1000,    
		 height:400,   
		 closed: false,    
		 cache: false,   
		 modal: true,
		 buttons:[{
			 	   iconCls: 'icon-ok',
				   text:'确定',
				   handler: function(){
		    	 	
			 			$("#proBox").dialog('close');
		    	   }
		 		}]
	 })

	 $("#proBox").window('center');
	
}
/**
 * 展示支付详情列表
 * @param index
 * @return
 */
function showpaydetail(index)
{
	 var rows = $('#dg').datagrid('getRows');
	 var row = rows[index];
	 var orderno = row.orderno;	 
	 
	 var queryParams={};
	 queryParams['orderno']=orderno;
	 queryParams['tokenid']=getTokenid();
	// 初始化加载数据
	 $("#paydg").datagrid({  
		url:querypaydetailurl,
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
    	columns:getPaydetailCols(), // 列数据
    	toolbar:'',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
	 });  

	 //设置分页控件 
	 $('#paydg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
     }); 
	 
	 
	 $("#payBox").show();
	 $("#payBox").dialog({
		 title:'销售单-支付详情',
		 width: 1000,    
		 height:400,   
		 closed: false,    
		 cache: false,   
		 modal: true,
		 buttons:[{
			 	   iconCls: 'icon-ok',
				   text:'确定',
				   handler: function(){
		    	 	
			 			$("#payBox").dialog('close');
		    	   }
		 		}]
	 })

	 $("#payBox").window('center');


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
		auditOrder(title,righturl,rightid);
		break;
	case '2':
		sendtostorage(title,righturl,rightid);
		break;
	case '3':
		orderprint(title,righturl,rightid);
		break;
    case '4':
        order2Cart(title,righturl,rightid);
        break;
    case '5':
        orderAgain(title,righturl,rightid);
        break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}


function orderprint(title,righturl,rightid){

    var rows = $("#dg").datagrid('getSelections');

    if(rows.length<=0)
    {
        alert("请选择需要打印的销售单！");
        return false;
    }


    if(rows.length >1)
    {
        alert("仅能选择一个销售单进行打印！");
        return false;
    }

    orderno = rows[0].orderno;

    publicorderprint(title,righturl,rightid,orderno);
}



function order2Cart(title,righturl,rightid){

    var rows = $("#dg").datagrid('getSelections');

    if(rows.length<=0)
    {
        alert("请选择需要加入购物车的订单！");
        return false;
    }


    if(rows.length >1)
    {
        alert("仅能选择一个订单！");
        return false;
    }

    orderno = rows[0].orderno;
    var data={};
    data['tokenid']=getTokenid();
    data['rightid']= rightid;
    data['orderno']= orderno;
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



function orderAgain(title,righturl,rightid){

    var rows = $("#dg").datagrid('getSelections');

    if(rows.length<=0)
    {
        alert("请选择需要生成的原始订单！");
        return false;
    }


    if(rows.length >1)
    {
        alert("仅能选择一个订单！");
        return false;
    }

    orderno = rows[0].orderno;
    var data={};
    data['tokenid']=getTokenid();
    data['rightid']= rightid;
    data['orderno']= orderno;
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



function sendtostorage(title,righturl,rightid){
	
	 var rows = $('#dg').datagrid('getSelections');

	 if(rows.length>0)
	 { 
		 var ordernoArray =[];
		 $.each(rows,function(index,row){
			 
			 var issendstorageck = row.issendstorageck;
			 var orderstatus = row.orderstatus;
			 // 未推送且订单审核生效之后才会进行订单推送
			 if(issendstorageck ==0 && orderstatus=='0003')
			 {
				 ordernoArray.push(row.orderno);
			 }
			 else
			 {
				 $("#dg").datagrid('unselectRow',$("#dg").datagrid('getRowIndex',row));
				 
			 }
		 })
		 
		 if(ordernoArray.length==0)
		 {
			 alert("未推送且订单审核生效之后才能进行推送,请核查！");
			 return false;
		 }
		 
		var orderlist = ordernoArray.join(',');
		 
		var data={};
		data['tokenid']=getTokenid();
		data['rightid']= rightid;				
		data['orderlist']=orderlist;
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
	 else
	{
		 alert('请选择需要操作的记录！');
		 return false;		 
	}
	
	
}

/**
 * 审核订单
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function auditOrder(title,righturl,rightid){
	
	var rows = $("#dg").datagrid('getSelections');
	
	if(rows.length<=0)
	{
		alert("请选择需要审核的订单！");
		return false;
	}
	
	if(rows.length>1)
	{
		alert("一次仅能审核一个订单！");
		return false;
		
	}
	
	var row = rows[0];
	var orderstatus = row.orderstatus;
	
	if(orderstatus=="0002")
	{
		alert("订单已被取消，无法进行审核！");
		return false;
	}
	
	if(orderstatus!="0001")
	{
		alert("订单已处于作业状态，无法再次进行审核！");
		return ;
		
	}

	var ispass="1";
	

	
	$.messager.confirm('订单审核',"确认审核通过?",function(result){
		
		if(result)
		{
			var data={};
			data['tokenid']=getTokenid();
			data['orderno']=row.orderno;
			data['ispass']="1";
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
	queryParams['transstatus']=$("#transstatus").combobox('getValue');
	queryParams['orderstatus']=$("#orderstatus").combobox('getValue');
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
	$("#transstatus").combobox('reload');
	$("#orderstatus").combobox('reload');
	
}



