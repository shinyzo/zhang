// 查询URL
var queryProductUrl = "admin/product/query.do";
var queryProRelationUrl ="admin/product/queryrelation.do";

$(function(){

	
	$("#upheadBox").hide();
	$("#searchBox").hide();
	
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
			loadUpProRelation(node.id);
			loadMyproduct(node.id);
		}
		
	})
	

	
	
});


function loadUpProRelation(corpid){
	
	$("#upproDg").datagrid({  
		url:queryProRelationUrl,         //加载的URL
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
    	toolbar:'#upheadBox',       // 工具栏
    	pageSize: pageSize,
		pageList:pageList,
    	pagination:true,       // 显示分页
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

function loadMyproduct(tcorpid)
{
	$("#proDg").datagrid({  
		url:queryProductUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"tcorpid":tcorpid},
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		singleSelect:true,     // 只能选中单行
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getProColumnsOpt(), // 列数据
    	toolbar:'#searchBox',       // 工具栏
    	pageSize: pageSize,
		pageList:pageList,
    	pagination:true,       // 显示分页
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
    });  
	
	 //设置分页控件 
	$('#proDg').datagrid('getPager').pagination({ 
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
			{field:'tpid',title:'产品编号',width:15,align:'left',sortable:true},
			{field:'tproductname',title:'产品名称',width:20,align:'left',sortable:true},
			{field:'tproductcode',title:'产品条码',width:15,align:'left',sortable:true},
			{field:'isrelation',title:'是否关联',width:20,align:'left',sortable:true,formatter:isrelation},
			{field:'fpid',title:'关联产品ID',width:20,align:'left',sortable:true},
			{field:'fproductname',title:'关联产品名称',width:20,align:'left',sortable:true},
			{field:'fproductcode',title:'关联产品条码',width:20,align:'left',sortable:true}

	   	]];
	   	return opt;
}

function isrelation(val,row,index)
{
	if(parseInt(val) > 0)
	{
		return "已关联";
	}
	
	return "";
}


function removeRelation(){
	
	
	
}


/**
 * 加载数据表格列表项
 * @return
 */
function getProColumnsOpt()
{
	var opt = 
		[[
			{field:'productid',title:'产品编号',width:15,align:'left',sortable:true},
			{field:'productname',title:'产品名称',width:20,align:'left',sortable:true},
			{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
			{field:'productinprice',title:'产品进价',width:15,align:'left',sortable:true},
			{field:'productsaleprice',title:'产品售价',width:15,align:'left',sortable:true},
			{field:'remark',title:'备注',width:15,align:'left',sortable:true}
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
			oneRelation(title,righturl,rightid);
			break;
		case '2':
			removeCart(title,righturl,rightid);
			break;
		case '3':
			codeRelation(title,righturl,rightid);
			break;
		case '4':
			yjremoveRelation(title,righturl,rightid);
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
 * 条码映射策略
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function codeRelation(title,righturl,rightid)
{
	 var node = $("#corpid").tree('getSelected');
	 var tcorpid = node.id;
	 if(tcorpid=="")
	 {
		 alert("请选择上游企业!");
		 return false;
	 }
	 var rows = $('#upproDg').datagrid('getSelections');
	 if(rows.length<=0)
	 {
		 alert("请选择需要执行策略的上游产品！");
		 return false;
		 
	 }
	 

	 var tpids = [];

	 $.each(rows,function(index,row){
		 if(row.fpid<=0)
		 {
			 tpids.push(row.tpid);
		 }	
	})
	
	if(tpids.length<=0)
	{
		alert("选项中没有符合的产品,请重新选择！");
		return false;	
	}

	
	$.messager.confirm('条码关联策略确认','是否采用条码策略进行映射?',function(result){
			
		if(result)
		{
			var data={};
			data['tokenid']=getTokenid();
			data['rightid']= rightid;				
			data['tcorpid']= tcorpid;
			data['tpids']= tpids.join(",");
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
						$("#upproDg").datagrid('reload');
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

function yjremoveRelation(title,righturl,rightid){
	 var node = $("#corpid").tree('getSelected');
	 var tcorpid = node.id;
	 if(tcorpid=="")
	 {
		 alert("请选择上游企业!");
		 return false;
	 }
	 
	 
	 var rows = $('#upproDg').datagrid('getSelections');
	 
	 var tpids = [];
	 $.each(rows,function(index,row){
		 tpids.push(row.productid);
	})

	var data={};
	 data['tokenid']=getTokenid();
	 data['rightid']= rightid;				
	 data['tcorpid']= tcorpid;
	 data['tpids']= tpids.join(",");
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
				$("#upproDg").datagrid('reload');
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

function oneRelation(title,righturl,rightid)
{
	
	 var node = $("#corpid").tree('getSelected');
	 var tcorpid = node.id;
	 if(tcorpid=="")
	 {
		 alert("请选择上游企业!");
		 return false;
	 }
	
	 var uprows = $('#upproDg').datagrid('getSelections');
	 var dnrows = $('#proDg').datagrid('getSelections');
	 if(uprows.length<=0)
	 {
		 alert("请选择需要关联的上游产品！");
		 return false;
	 }
	 if(uprows.length>1)
	 {
		 alert("单一映射仅能选择一个产品！");
		 return false;
	 }
	 if(dnrows.length>1)
	 {
		 alert("单一映射仅能选择一个我的产品！");
		 return false;
	 }

	 uprow = uprows[0];
	 if(uprow.fpid > 0)
	 {
		 alert("该产品已映射，请先解除或选择其他产品！");
		 return false;
	 }
	 
	 var fpid = "";
	 if(dnrows.length==1)
	 {
		 fpid = dnrows[0].productid;
	 }
	 

	 var data={};
	 data['tokenid']=getTokenid();
	 data['rightid']= rightid;				
	 data['tcorpid']= tcorpid;
	 data['tpid']= uprow.tpid;
	 data['fpid']= fpid;
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
				$("#upproDg").datagrid('reload');
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

	var queryParams = $("#proDg").datagrid('options').queryParams;

	queryParams['productcode'] = $('#productcode').val();
	queryParams['productname'] = $('#productname').val();	
	queryParams['tokenid'] = getTokenid();
	
	$("#proDg").datagrid('options').queryParams = queryParams;
	$("#proDg").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#proqueryfm").form('clear');
}



