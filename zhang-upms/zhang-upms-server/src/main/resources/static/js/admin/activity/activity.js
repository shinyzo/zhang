// 查询URL
var queryUrl = "admin/activity/query.do";

var queryprostockurl = "admin/product/querystock.do";
var queryAtydetailurl = "admin/activity/getactivitydetail.do";

var width =800;
var height=600;

$(function(){
	// 隐藏其他组件
	$("#operBox").hide();
	$("#atydtalBox").hide();
	$('#proBox').window('close');  // close a window  
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
    	onDblClickRow:onDblClickRow,
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
	
	// 加载产品分类数据

	$("#protypeid").combotree({
		url:'public/gettreeprotype.json',
		valueField:'protypeid',
		textField:'protypename',
		checkbox:true,
		lines:true,
		editable:false
	});

	
	$("#groupcorpid").combobox({
		url:'public/getDnCorp.json',
	    multiple:true,   
		valueField:'corpid',
		textField:'corpname',
		required:true,
		missingMessage:'请选择可见企业！'
	})

}

function initValidateBox()
{

	$('#aty_begintime').datetimebox({
		required:true,
		editable:false,
		missingMessage:'请选择活动开始时间！'
		
	});
	
	$('#aty_endtime').datetimebox({
		required:true,
		editable:false,
		missingMessage:'请选择活动结束时间！'
		
	});
	
	$('#fx_atypic').filebox({
		
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='atyfile']")[0], 'img', 'showpic');
		}
		
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
		  	{field:'atyid',title:'编号',width:15,align:'left',sortable:true},
		  	{field:'atytitle',title:'活动标题',width:20,align:'left',sortable:true},
		  	{field:'atybegintime',title:'开始时间',width:15,align:'left',sortable:true,formatter:parseTime},
		  	{field:'atyendtime',title:'结束时间',width:15,align:'left',sortable:true,formatter:parseTime},
		  	{field:'groupcorpid',title:'企业可见列表',width:20,align:'left',sortable:true},
		  	{field:'atyproductdetail',title:'活动产品详情',width:20,align:'left',formatter:formateAtyProductdetail},
		  	{field:'atypic',title:'活动图片',width:20,align:'left',sortable:true,formatter:formatepic},
		  	{field:'activestatus',title:'激活状态',width:20,align:'left',sortable:true,formatter:formateActiveStatus},
		  	{field:'atystatus',title:'活动状态',width:20,align:'left',sortable:true,formatter:formateStatus},
		  	
	   		
	   	]];
	   	return opt;
}

function formateActiveStatus(val)
{
	if(val=="0") return formateAddRed("未激活");
	if(val=="1") return formateAddGreen("已激活");
	if(val=="2") return formateAddOrange("已失效");
	return val;
}


function formateStatus(val)
{
	if(val=="0") return formateAddRed("未开始");
	if(val=="1") return formateAddGreen("进行中");
	if(val=="2") return "已结束";
	if(val=="3") return "人为失效";
 	return val;
}


function formatepic(val,row,index)
{	
	return "<a href='javascript:void(0);' onclick='javascript:showpic("+ index +")' >预览图片</a>";
}

function formatesetAtyProduct(val,row,index)
{	
	if(row.status=="0" || row.status=="5")
	{
		return "<a href='javascript:void(0);' onclick='javascript:setAtyProduct("+ index +")' >设置活动产品</a>";
	}
	
}





/**
 * 格式化展示活动产品详情
 * @param val
 * @param row
 * @param index
 * @return
 */
function formateAtyProductdetail(val,row,index)
{	
	return "<a href='javascript:void(0);' onclick='javascript:showAtyProductDetail("+ index +")' >活动产品详情</a>";
}

/**
 * 双击展示详情
 * @param index
 * @param row
 * @return
 */
function onDblClickRow(index,row)
{
	var rows = $('#dgBox').datagrid('getRows');
	var row = rows[index];
	
	
 
	
	var data={};
	data['tokenid'] = getTokenid();
	data['atyid'] = row.atyid;
	$.ajax({
			url:"admin/activity/ajaxloadatydetail.do",
			async:false,
			type:"post",
			data:data,
			dataType:'html',
			success:function(htmlcontent){
	
				$("#atydetail").html("").html(htmlcontent);
				$.parser.parse(('#atydetail'));
				
				
			},
			error:function(){
				error('系统错误,请稍后重试！');
			}
	});

	
	$("#prodg").datagrid({
		url:queryAtydetailurl,
		queryParams:{"tokenid":getTokenid(),"atyid":row.atyid},
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getAtyProductCols(), // 列数据
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
	}); 

}

/**
 * 展示活动产品详情
 * @param index
 * @return
 */
function showAtyProductDetail(index)
{
	var rows = $('#dgBox').datagrid('getRows');
	var row = rows[index];

	$("#atydtalBox").show();
	$("#atydtalBox").dialog({ 
	    title: '活动产品详情',    
	    width:1000,
	    height:450,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[
			    {
				 iconCls: 'icon-cancel',
				 text:'关闭',
				 handler: function(){	
			    	$("#atydtalBox").dialog('close');
			     }
		}]
	});
	
	$("#atydtalBox").window('center');
	
	// 获取已维护的产品数据
	var atyid = row.atyid;
	// 下面数据展示
	$("#atydtalDg").datagrid({
		url:queryAtydetailurl,
		queryParams:{"tokenid":getTokenid(),"atyid":atyid},
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getAtyProductCols(), // 列数据
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
	});  

}

/**
 * 展示广告牌图片
 * @param index
 * @return
 */
function showpic(index){
	
	var rows = $('#dgBox').datagrid('getRows');
	var row = rows[index];
	if(row.bannerpic!="")
	{
		var shopdatauploaddir =$("#shopdatauploaddir").val();
		var atydir = shopdatauploaddir +"activity/";
		$("#showBox").html("<img src='"+atydir+row.atypic+"' width='400px'>");
		$("#showBox").show();
		$("#showBox").dialog({ 
		    title:'预览图片',    
		    width:420,
		    height:320,
		    closed: false,    
		    cache: false,   
		    modal: false,
		    resizable:true,
		    buttons:[
				    {
					 iconCls: 'icon-cancel',
					 text:'关闭',
					 handler: function(){	
				    	$("#showBox").dialog('close');
				     }
			}]
		});
		
		$("#showBox").window('center');
		
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
		addData(title,righturl,rightid);
		break;
	case '2':
		modifyData(title,righturl,rightid);
		break;
	case '3':
		deleteData(title,righturl,rightid);
		break;
	case '4':
		yjdown(title,righturl,rightid);
		break;
	case '5':
		setAtyProduct(title,righturl,rightid);
		break;
	case '6':
		yjActive(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}
/**
 * 活动产品设置
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function setAtyProduct(title,righturl,rightid)
{
	var rows = $("#dgBox").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	
	if(rows.length>1)
	{
		alert("一次只能设置一个活动产品！");
		return false;
	}
	row = rows[0];
	var activestatus = row.activestatus;
	var atystatus = row.atystatus;
	if(activestatus!="0")
	{
		alert("未激活的活动才能进行产品设置！");
		return false;
	}
	
	//加载产品库
	$("#proBox").window('open');
	$("#proBox").window({
		  title: title, 
		  width:1100,
		  height:800,
		  closed: false,    
		  cache: false,   
		  modal: true,
		  resizable:true,
	})
	/**
	 * 加载产品库数据 产品状态为上架
	 */ 
	$("#proDg").datagrid({  
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
    	onSelect:onSelect,
    	toolbar:'#proKquery',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
    });  
	

	$('#proDg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 
	
	// 获取已维护的产品数据
	var atyid = rows[0].atyid;
	// 下面数据展示
	$("#atyDg").datagrid({
		url:queryAtydetailurl,
		queryParams:{"tokenid":getTokenid(),"atyid":atyid},
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
    	columns:getAtyProductCols(), // 列数据
		toolbar:"#atyBtn",
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
	});  
}



/**
 * 一键添加按钮
 * @return
 */
function addrow2temp()
{
	var rows = $('#proDg').datagrid('getSelections');
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
	var data = $("#atyDg").datagrid('getData');
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
		row.atycount = 1;
		row.singlebuycount = 0;
		row.havebuycount = 0;
		row.remaincount = row.atycount - row.havebuycount  ;
		row.atyprice = 0.01;
		row.productprice = row.productsaleprice;

		$("#atyDg").datagrid('appendRow',row);	
	}
}


function reload()
{
	$('#atyDg').datagrid('reload');
}
/**
 * 移除数据列
 * @return
 */
function removeit(){
	
	var rows = $('#atyDg').datagrid('getSelections');
	if (rows) 
	{
		for(var i=0;i<rows.length;i++)
		{
			var row = rows[i];
			if(row.havebuycount==0)
			{
				var rowIndex = $('#atyDg').datagrid('getRowIndex', row); 
				 
		        $('#atyDg').datagrid('deleteRow', rowIndex);  
			}
			else
			{
				show("包含已被抢购商品无法进行移除！");
			}
			   
		}
	}

}


function saveAtyProduct()
{
	
	$('#atyDg').datagrid('endEdit',editIndex);
	var atyRows = $('#dgBox').datagrid('getSelections');
	
	var rows = $('#atyDg').datagrid('getRows');
	
	var flag = true;
	var errormsg = "";
	$.each(rows,function(index,row){
		if(parseInt(row.atycount)<parseInt(row.havebuycount))
		{
			errormsg = "行"+(index+1)+",活动数量不能小于已抢数量！";
			flag = false;
		}
		
	})
	
	if(!flag)
	{
		alert(errormsg);
		return false;
	}
	
	var jsondata = JSON.stringify(rows);
	var data={};
	data['atyid']=atyRows[0].atyid;
	data['jsondata']=jsondata;
	data['tokenid'] = getTokenid();
	$.ajax({
			url:"admin/activity/saveatyproduct.do",
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
 * 加载数据表格列表项
 * @return
 */
function getAtyProductCols()
{
	var opt = 
		[[
		  	{field:'atyid',title:'活动编号',width:15,align:'left',sortable:true,hidden:true},
		  	{field:'productid',title:'产品编号',width:15,align:'left',sortable:true,hidden:true},
		  	{field:'productname',title:'产品名称',width:30,align:'left',sortable:true},		
	   		{field:'productprice',title:'产品原价',width:15,align:'left',sortable:true},
	   		{field:'atyprice',title:'活动价格',width:15,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:2,required:true}}}, 
	   		{field:'atycount',title:'活动数量',width:15,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,required:true}}}, 
	   		{field:'havebuycount',title:'已抢',width:15,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,required:true}}},
	   		{field:'remaincount',title:'剩余数量',width:15,align:'left',sortable:true,formatter:formateRemaincount},
	   		{field:'singlebuycount',title:'单企业限购数量(0:不限)',width:20,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,required:true}}}
	   	]];
	   	return opt;
}


function formateRemaincount(val,row,index)
{
	val = row.atycount -row.havebuycount;
	return val;
}

/**
 * 删除活动
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function deleteData(title,righturl,rightid)
{
	var rows = $("#dgBox").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	
	if(rows.length>1)
	{
		alert("仅允许操作单条记录！");
		return false;
	}
	
	row = rows[0];
	if(row.activestatus!="0")
	{
		alert("只能删除未激活的活动！");
		return false;	
	}

	$.messager.confirm('删除活动','确定要删除该活动吗？',function(result){
		
		if(result)
		{
			
			var data={};
			data['tokenid']=getTokenid();
			data['rightid']=rightid;
			data['atyid']= row.atyid;
			
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
 * 人为失效
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function yjdown(title,righturl,rightid)
{
	var rows = $("#dgBox").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	
	var atyidArray =[];
	$.each(rows,function(index,item){
		if(item.activestatus=="1")
		{
			atyidArray.push(item.atyid);
		}
	})
	
	if(atyidArray.length<=0)
	{
		alert("只能对已激活的活动进行失效，请重新选择！");
		return false;
		
	}
	
	var data={};
	data['tokenid']=getTokenid();
	data['rightid']=rightid;
	data['atyidlist']= atyidArray.join(',');
	
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

/**
 * 一键激活
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function yjActive(title,righturl,rightid)
{
	var rows = $("#dgBox").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	
	var atyidArray =[];
	$.each(rows,function(index,item){
		if(item.activestatus=="0")
		{
			atyidArray.push(item.atyid);
		}
	})
	
	if(atyidArray.length<=0)
	{
		alert("选择数据不符合激活标准！");
		return false;
	}
	var data={};
	data['tokenid']=getTokenid();
	data['rightid']=rightid;
	data['atyidlist']= atyidArray.join(',');
	
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



/**
 * 修改标签
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
	var activestatus = row.activestatus;
	var atystatus = row.atystatus;
	if(activestatus!="0")
	{
		alert("只能修改未激活的活动！");
		return false;
	}
	

	$("#operfm").form('load',row);
	
	$("#aty_begintime").datetimebox('setValue',parseTime(row.atybegintime));
	$("#aty_endtime").datetimebox('setValue',parseTime(row.atyendtime));
		
	$("#origntr").show();
	if(row.atypic!= "")
	{
		var shopdatauploaddir =$("#shopdatauploaddir").val();
		var atydir = shopdatauploaddir +"activity/";
		$("#orignimg").attr({"src":atydir+row.atypic});
	}
	
	// 设置选中
	if(row.groupcorpid=="" || row.groupcorpid=="ALL")
	{
		$("#allbtn").linkbutton({
			selected:true
		})
		
	}
	else
	{
		$("#partbtn").linkbutton({
			selected:true
		})
	}

	
	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:width,
	    height:height,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){	
	    	
	    			var atyid = row.atyid;
		    	 	modifyDataSave(righturl,rightid,atyid);
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
 * 所有企业可见
 * @return
 */
function setAll()
{
	$("#groupcorpid").combobox('loadData',"");
	$("#groupcorpid").combobox('setValue',"");
	$("#groupcorpid").combobox('setText',"ALL");

}
/**
 * 部分可见
 * @return
 */
function setPart()
{
	$("#groupcorpid").combobox('setValue',"");
	$("#groupcorpid").combobox('setText',"");
	$("#groupcorpid").combobox('reload');

}

/**
 * 修改标签信息保存
 * @param righturl
 * @param rightid
 * @param customid
 * @return
 */
function modifyDataSave(righturl,rightid,atyid)
{	
	if($("#operfm").form('validate'))
	{
		
		$("#operfm").form('submit',{
			url:righturl,
			ajax:true,
			onSubmit:function(param){
				param.rightid = rightid;
				param.tokenid = getTokenid();
				param.atyid = atyid;
			},
			success:function(retData){
				var retData = eval('(' + retData + ')');  
				if(retData.retCode == successCode)
				{
					show(retData.retMsg);
					searchOrReload();
					$("#operBox").dialog('close');
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
 * 添加标签
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addData(title,righturl,rightid)
{
	// 清空上次操作遗留数据
	$("#operfm").form('clear');
	$("#origntr").hide();
	$("#img").attr({"src":""});
	$("#groupcorpid").combobox('loadData',"");
	$("#groupcorpid").combobox('setValue',"");
	$("#groupcorpid").combobox('setText',"ALL");
	
	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:width,
	    height:height,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){			
		    	 	addDataSave(righturl,rightid);
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
 * 添加banner保存
 * @return
 */
function addDataSave(righturl,rightid)
{
	
	if($("#operfm").form('validate'))
	{
		var params = {};
		params['rightid'] = rightid;
		params['tokenid'] = getTokenid();
		$("#operfm").form('submit',{
			url:righturl,
			ajax:true,
			queryParams:params,
			onSubmit:function(param){
				param.rightid = rightid;
				param.tokenid = getTokenid();
			},
			success:function(retData){
				var retData = eval('(' + retData + ')');  
				if(retData.retCode == successCode)
				{
					show(retData.retMsg);
					searchOrReload();
					$("#operBox").dialog('close');
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
	if ($('#atyDg').datagrid('validateRow', editIndex)){
		$('#atyDg').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickCell(index, field){
	if (endEditing()){
		$('#atyDg').datagrid('selectRow', index)
				.datagrid('editCell', {index:index,field:field});
		editIndex = index;
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

	queryParams['atytitle'] = $('#atytitle').val();
	queryParams['activestatus'] = $('#activestatus').combobox('getValue');
	queryParams['atystatus'] = $('#status').combobox('getValue');
	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}


/**
 * 查询产品库产品
 * @return
 */
function searchproduct()
{
	var queryParams = $("#proDg").datagrid('options').queryParams;
	queryParams['productname'] = $("#productname").val();
	queryParams['productcode'] = $("#productcode").val();
	var protypeid = $("#protypeid").combobox('getValue');
	if(protypeid=="") protypeid = 0;
	queryParams['protypeid']= protypeid;
	queryParams['tokenid'] = getTokenid();
	$("#proDg").datagrid('options').queryParams = queryParams;
	$("#proDg").datagrid('reload');

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

