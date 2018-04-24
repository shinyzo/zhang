// 查询URL
var queryUrl = "admin/banner/query.do";

var width =1500;
var height=800;

$(function(){
	// 隐藏其他组件
	$("#operBox").hide();

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
	
	$('#fx_bannerpic').filebox({
		onChange:function(newValue,oldValue){			
			 PreviewImage($("input[name='bannerfile']")[0], 'img', 'showpic');
		}
		
	});
	
	
});

function initLoadingData()
{
	$("#position").combobox({
		url:'public/getadvposition.json',
		valueField:'positionid',
		textField:'title',
		required: true,
		missingMessage:'请选择广告位！',
		validType:'comboxValidate["position"]',
		validMessage:'请选择广告位置！',
		onChange:function(newValue,oldValue){
		
			var width = 0;
			var height= 0;
			var img = "";
			var data = $(this).combobox('getData');
			$.each(data,function(index,item){
				if(item.positionid==newValue)
				{
					img = item.examplepic;
					width = item.width;
					height= item.height;
				}
			})
			
			$("#examplewh").html("最佳尺寸："+width+"px * " +height+"px");
			$("#exampleimg").html("<img src='shop/image/example/"+img+"' width='1200px'>");
		}
	})
	
	$("#linktype").combobox({
		onChange:function(newValue,oldValue){
		
			if(newValue=="1")
			{
				$("#fx_linkurl").textbox({disabled:true});
				
			}
			else{
				$("#fx_linkurl").textbox({disabled:false});
			}
		}
	})

}

function initValidateBox()
{
	$("#position").combobox({
		required: true,
		missingMessage:'请选择广告位！',
	
	})
	
}



/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'bannerid',title:'编号',width:15,align:'left',sortable:true},
		  	{field:'bannertitle',title:'标题',width:20,align:'left',sortable:true},
		  	{field:'linkurl',title:'链接地址',width:15,align:'left',sortable:true},
		  	{field:'linktype',title:'链接类型',width:15,align:'left',sortable:true,formatter:formatelinktype},
		  	{field:'skiptype',title:'跳转方式',width:20,align:'left',sortable:true},
		  	{field:'position',title:'位置',width:20,align:'left',sortable:true},
		  	{field:'bannerpic',title:'图片预览',width:20,align:'left',sortable:true,formatter:formatepic},
		  	{field:'sort',title:'排序',width:20,align:'left',sortable:true},
		  	{field:'isshow',title:'是否展示',width:20,align:'left',sortable:true,formatter:formateisshow}
	   		
	   	]];
	   	return opt;
}

function formateisshow(val)
{
	if(val=="1") return "启用";
	return "下架";
}

function formatelinktype(val)
{
	if(val=="1") return "内部链接";
	if(val=="2") return "外部链接";
	return val;
}


function formatepic(val,row,index)
{	
	return "<a href='javascript:void(0);' onclick='javascript:showpic("+ index +")' >预览图片</a>";
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
		var bannerdir = shopdatauploaddir +"banner/";
		$("#showBox").html("<img src='"+bannerdir+row.bannerpic+"' width='1200px'>");
		$("#showBox").show();
		$("#showBox").dialog({ 
		    title:'预览图片',    
		    width:1220,
		    height:320,
		    closed: false,    
		    cache: false,   
		    modal: false,
		    resizable:true,
		    buttons:[
				    {
					 iconCls: 'icon-cancel',
					 text:'取消',
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
		yjupdate(title,righturl,rightid,'1');
		break;
	case '5':
		yjupdate(title,righturl,rightid,'0');
		break;
		
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}

/**
 * 删除广告牌
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
	
	var banneridArray =[];
	$.each(rows,function(index,item){
		
		banneridArray.push(item.bannerid);
	})

	$.messager.confirm('删除广告牌','确认删除广告牌吗？',function(result){
		
		if(result)
		{
			
			var data={};
			data['tokenid']=getTokenid();
			data['rightid']=rightid;
			data['banneridlist']=banneridArray.join(',');
			
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
 * 删除广告牌
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function yjupdate(title,righturl,rightid,isshow)
{
	var rows = $("#dgBox").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	
	var banneridArray =[];
	$.each(rows,function(index,item){
		
		banneridArray.push(item.bannerid);
	})
	var data={};
	data['tokenid']=getTokenid();
	data['rightid']=rightid;
	data['isshow'] = isshow;
	data['banneridlist']=banneridArray.join(',');
	
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
	$("#operfm").form('load',row);

	if(row.bannerpic!="")
	{
		var shopdatauploaddir =$("#shopdatauploaddir").val();
		var bannerdir = shopdatauploaddir +"banner/";
		$("#img").attr({"src":bannerdir+row.bannerpic});
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
	    	
	    			var bannerid = row.bannerid;
		    	 	modifyDataSave(righturl,rightid,bannerid);
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
 * 修改标签信息保存
 * @param righturl
 * @param rightid
 * @param customid
 * @return
 */
function modifyDataSave(righturl,rightid,bannerid)
{	
	if($("#operfm").form('validate'))
	{
		
		$("#operfm").form('submit',{
			url:righturl,
			ajax:true,
			onSubmit:function(param){
				param.rightid = rightid;
				param.tokenid = getTokenid();
				param.bannerid = bannerid;
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
	
	$("#img").attr({"src":""});
	$("#exampleimg").html("");
	$("#examplewh").html("");
	
	
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

function checkReturnData()
{
	var data={};
	var bannertitle = $("#fx_tagname").val();
	var linkurl = $("#fx_clickcount").val();	
	var linktype = $("#fx_linktype").val();
	var position = $("#fx_position").val();		
	
	var isshow = $('input:radio:checked').val();
	var sort = $("#fx_sort").val();
	
	

	data['tokenid']=getTokenid();
	
	data['bannertitle']= bannertitle;
	data['linkurl'] = linkurl;
	data['linktype'] = linktype;
	data['position'] = position;
	data['isshow'] = isshow;
	data['sort'] = sort;

	return data;

}

/**
 * 添加banner保存
 * @return
 */
function addDataSave(righturl,rightid)
{
	
	if($("#operfm").form('validate'))
	{
		
		$("#operfm").form('submit',{
			url:righturl,
			ajax:true,
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
//
//	var data = checkReturnData();
//	data['rightid']=rightid;
//	
//	$.ajax( {
//		url:righturl,
//		async:false,
//		type:"post",
//		data:data,
//		dataType:'json',
//		success:function(retData){
//			if(retData.retCode == successCode)
//			{
//				show(retData.retMsg);
//				$("#operBox").dialog('close');
//				searchOrReload();
//			}
//			else if(retData.retCode == loginTimeoutCode)
//			{
//				alert(retData.retMsg);
//				top.location.href = loginUrl;
//			}
//			else
//			{
//				alert(retData.retMsg);
//			}
//		},
//		error:function(){
//			error('系统错误,请稍后重试！');
//		}
//	});	
	
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

	queryParams['bannertitle'] = $('#bannertitle').val();
	queryParams['isshow'] = $('#isshow').combobox('getValue');
	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
