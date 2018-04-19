// 查询URL
var queryUrl = "admin/storage/querydbbill.do";
var queryDbDetailUrl ="admin/storage/querydbdetail.do";
	
$(function(){

	//初始化开始日期和结束日期设为当天
	$("#dbwork").hide();
	var begintime = formateStartTime();
	var endtime = formateEndTime();
	$("#begintime").datetimebox('setValue',begintime);	
	$("#endtime").datetimebox('setValue',endtime);	
	
	$("#db").datagrid({  
		url:queryUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"begintime":begintime,"endtime":endtime},
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
    	toolbar:"#headBox",
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
    });  

	 //设置分页控件 
	$('#db').datagrid('getPager').pagination({ 
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


}


function initValidateBox()
{
	

	
}


/**
 * 调拨单列
 * @return
 */
function getColumnsOpt()
{

	var opt = 
		[[
			{field:'dbno',title:'调拨单号',width:20,align:'left',sortable:true},
			{field:'fwarehouseid',title:'来源仓库id',width:10,align:'left',sortable:true},
			{field:'fwarehousename',title:'来源仓库名称',width:10,align:'left',sortable:true},
			{field:'twarehouseid',title:'目标仓库id',width:10,align:'left',sortable:true},
			{field:'twarehousename',title:'目标仓库名称',width:10,align:'left',sortable:true},
			{field:'opertime',title:'操作时间',width:20,align:'left',sortable:true},
			{field:'operuserid',title:'操作人员',width:15,align:'left',sortable:true},
			{field:'status',title:'状态',width:15,align:'left',sortable:true,formatter:formateDbStatus},
			{field:'memo',title:'备注',width:15,align:'left',sortable:true}	
	   	]];
	   	return opt;
}

/**
 * 调拨单产品明细列
 * @return
 */
function getDbProColumnsOpt(){
	
	var opt = 
		[[
			{field:'dbno',title:'调拨单号',width:20,align:'left',sortable:true},
			{field:'productid',title:'产品id',width:15,align:'left',sortable:true},
			{field:'productname',title:'产品名称',width:30,align:'left',sortable:true},
			{field:'productcode',title:'产品条码',width:20,align:'left',sortable:true},
			{field:'dbcount',title:'调拨总数量',width:15,align:'left',sortable:true},
			{field:'havedbcount',title:'已调拨数量',width:15,align:'left',sortable:true},
			{field:'havefreecount',title:'已释放数量',width:15,align:'left',sortable:true},
			{field:'remaincount',title:'剩余数量',width:15,align:'left',sortable:true,formatter:formateRemaincount},
			{field:'realdbcount',title:'确认调拨数量',width:15,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,min:0}}},
			{field:'realfreecount',title:'确认释放数量',width:15,align:'left',sortable:true,editor:{type:'numberbox',options:{precision:0,min:0}}}
	   	]];
	   	return opt;
	
	
}

function formateDbStatus(val){
	
	if(val==0) return "待调拨";
	if(val==1) return "部分调拨";
	if(val==2) return "调拨完成";
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
		dbwork(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}

/**
 * 调拨作业
 * @return
 */
function dbwork(title,righturl,rightid)
{
	var rows = $("#db").datagrid('getSelections');
    if(rows.length<=0)
    {
    	alert("请选择调拨作业的单号！");
    	return false;
    }
    row = rows[0];
    var dbno = row.dbno;
    var fwarehouseid = row.fwarehouseid;
    var fwarehousename = row.fwarehousename;
    var twarehouseid = row.twarehouseid;
    var twarehousename = row.twarehousename;
    
    $("#fwarehouseid").html(fwarehouseid+"-"+fwarehousename);
    $("#twarehouseid").html(twarehouseid+"-"+twarehousename);
    
    $("#dbpro").datagrid({  
		url:queryDbDetailUrl,
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid(),"dbno":dbno},
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
    	columns:getDbProColumnsOpt(), // 列数据
    	onClickCell:onClickCell,
    	toolbar:"#dbhead",
    	sortName:'remaincount',
    	sortOrder:'desc',
    	onLoadError : function() {
    		error('数据加载失败！');
    	}
    });  

	 //设置分页控件 
	$('#dbpro').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    });
    
	
	 $("#dbwork").show();
	 $("#dbwork").dialog({
		 title:'调拨单明细',
		 width: 1000,    
		 height:400,   
		 closed: false,    
		 cache: false,   
		 modal: true,
		 buttons:[
				  {
				    iconCls: 'icon-ok',
				    text:'批次处理',
				    handler: function(){
					  	$("#dbpro").datagrid('endEdit', editIndex);
						pcdb(righturl,rightid,dbno,fwarehouseid,fwarehousename,twarehouseid,twarehousename);
				    }
				  },
		          {
			 	    iconCls: 'icon-ok',
				    text:'一键调拨',
				    handler: function(){
					  	$("#dbpro").datagrid('endEdit', editIndex);
			 			yjdb(righturl,rightid,dbno,fwarehouseid,fwarehousename,twarehouseid,twarehousename);
		    	   }
		 		},
		 		{
			 	   iconCls: 'icon-edit',
				   text:'一键释放',
				   handler: function(){	
		 				$("#dbpro").datagrid('endEdit', editIndex);
		 				yjfree(righturl,rightid,dbno,fwarehouseid,fwarehousename,twarehouseid,twarehousename);
		    	   }
			 	},	 		
		 		{
			 	   iconCls: 'icon-cancel',
				   text:'取消',
				   handler: function(){	 			
		 				$("#dbwork").dialog('close'); 			
		    	   }
			 	}]
	 })

	 $("#dbwork").window('center');
}

/**
 * 批次调拨
 * @param righturl
 * @param rightid
 * @param fwarehouseid
 * @param twarehouseid
 * @return
 */
function pcdb(righturl,rightid,dbno,fwarehouseid,fwarehousename,twarehouseid,twarehousename){
	var rows = $("#dbpro").datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要批次调拨的产品！");
		return false;
	}
	
	var rowArray = [];
	$.each(rows,function(index,row){
		var realfreecount = row.realfreecount;
		var realdbcount = row.realdbcount;
		var remaincount = row.remaincount;

		if(parseInt(realfreecount) + parseInt(realdbcount) > parseInt(remaincount) || parseInt(realfreecount) + parseInt(realdbcount)<=0 )
		{
			var rowIndex = $('#dbpro').datagrid('getRowIndex',row);
			$('#dbpro').datagrid('unselectRow',rowIndex);
		}
		else
		{
			rowArray.push(row.productid+"~"+realfreecount+"~"+realdbcount);
		}
	})
	
	if(rowArray.length<=0)
	{
		alert("选中的数据不符合规则，请修改！");
		return false;
	}
	var dbjsondata = rowArray.join(",");
	senddbRequest(righturl,rightid,dbno,fwarehouseid,fwarehousename,twarehouseid,twarehousename,dbjsondata);
}

/**
 * 一键调拨
 * @param righturl
 * @param rightid
 * @param fwarehouseid
 * @param twarehouseid
 * @return
 */
function yjdb(righturl,rightid,dbno,fwarehouseid,fwarehousename,twarehouseid,twarehousename){
	
	var rows = $("#dbpro").datagrid('getRows');
	
	var rowArray = [];
	$.each(rows,function(index,row){
		var realfreecount = row.realfreecount;
		var realdbcount = row.realdbcount;
		var remaincount = row.remaincount;
		if(remaincount > 0)
		{
			row.realdbcount = row.remaincount;
			var rowIndex = $('#dbpro').datagrid('getRowIndex',row);
			$('#dbpro').datagrid('selectRow',rowIndex);
			$('#dbpro').datagrid('refreshRow',rowIndex);
			rowArray.push(row.productid+"~"+0+"~"+remaincount);
		}
	
	})
	if(rowArray.length<=0)
	{
		alert("选中的数据不符合规则，请修改！");
		return false;
	}
	var dbjsondata = rowArray.join(",");
	senddbRequest(righturl,rightid,dbno,fwarehouseid,fwarehousename,twarehouseid,twarehousename,dbjsondata);
}

/**
 * 一键释放
 * @param righturl
 * @param rightid
 * @param fwarehouseid
 * @param twarehouseid
 * @return
 */
function yjfree(righturl,rightid,dbno,fwarehouseid,fwarehousename,twarehouseid,twarehousename){
	
	var rows = $("#dbpro").datagrid('getRows');
	var rowArray = [];
	$.each(rows,function(index,row){
		var realfreecount = row.realfreecount;
		var realdbcount = row.realdbcount;
		var remaincount = row.remaincount;
		if(remaincount>0)
		{
			row.realfreecount = row.remaincount;
			var rowIndex = $('#dbpro').datagrid('getRowIndex',row);
			$('#dbpro').datagrid('selectRow',rowIndex);
			$('#dbpro').datagrid('refreshRow',rowIndex);
			rowArray.push(row.productid+"~"+remaincount+"~"+0);
		}
	})
	
	if(rowArray.length<=0)
	{
		alert("选中的数据不符合规则，请修改！");
		return false;
	}
	var dbjsondata = rowArray.join(",");
	senddbRequest(righturl,rightid,dbno,fwarehouseid,fwarehousename,twarehouseid,twarehousename,dbjsondata);
}

/**
 * 发送调拨请求
 * @param righturl
 * @param rightid
 * @param fwarehouseid
 * @param twarehouseid
 * @param dbjsondata
 * @return
 */
function senddbRequest(righturl,rightid,dbno,fwarehouseid,fwarehousename,twarehouseid,twarehousename,dbjsondata){

	var data={};
	data['tokenid']=getTokenid();
	data['rightid']= rightid;	
	data['dbno']= dbno;	
	data['fwarehouseid']= fwarehouseid;
	data['fwarehousename']=fwarehousename;
	data['twarehousename']=twarehousename;
	data['twarehouseid']= twarehouseid;
	data['dbjsondata']= dbjsondata;
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
				$('#dbpro').datagrid('reload');
				$("#db").datagrid('reload');
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

function searchOrReload(){

	var queryParams = $("#db").datagrid('options').queryParams;
	queryParams['tokenid']=getTokenid();
	queryParams['dbno']=$("#dbno").textbox('getValue');
	queryParams['begintime']=$("#begintime").textbox('getValue');
	queryParams['endtime']=$("#endtime").textbox('getValue');
	
	$("#db").datagrid('options').queryParams = queryParams;
	$("#db").datagrid('reload');
}

function clearForm(){
	$("#queryfm").form('clear');

	$("#begintime").datetimebox('setValue',formateStartTime());	
	$("#endtime").datetimebox('setValue',formateEndTime());	

	
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




