// 基础数据维护
var gId = "#dg_container";
var queryUrl = BASE_PATH + "/manage/role/query";

$(document).ready(function(){
	
	$("#roleBox").hide();
	
	$(gId).datagrid({  
		url:queryUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid()},
    	striped:true,          //是否显示斑马线效果
		rownumbers:true,       // 显示行号
		remotesort: true,
		singleSelect:false,
		pagination:true,       // 显示分页
		pageSize: PAGE_SIZE,
		pageList:PAGE_LIST,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				// //自适应大小
    	fitColumns:true,        //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,            //超出列宽自动截取
    	columns:getColumnsOpt(),
    	toolbar:'#headBox',
    	onLoadError : function() {
        	alert('数据加载失败!');
    	}
    });  

	 //设置分页控件 
	$('#dgBox').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 
});
/**
 * Enter键监听
 * @return
 */
function checkKey(){
	if(event.keyCode=='13'){
		searchOrReload();
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
		default:
			alert("无此操作类型对应的方法!");
			break;
	}
	
	
}
/**
 * 添加数据
 * @param title
 * @param righturl
 * @return
 */
function addData(title,righturl,rightid)
{
	
	$('#rolefm').form('clear');
	
	$("#roleTree").tree({
		 url:BASE_PATH + "/manage/right/querytree",
		 checkbox:true
	 })
	
	
	$("#roleBox").show();
	$("#roleBox").dialog({ 
	    title: title,    
	    width: 800,    
	    height:600,   
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
			     {
					iconCls: 'icon-save',
					text:'保存',
					handler: function(){
			    	 
			    	 	addRoleSave(righturl,rightid);
			    	}
				},
				{
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){
						$('#roleBox').dialog('close');
					}
				  }
				]

	}); 
	
	$("#roleBox").window('center');
 
}


function addRoleSave(righturl,rightid){
	
	var fx_rolename = $("#fx_rolename").val();
	var nodes = $("#roleTree").tree('getChecked');
	var imnodes = $('#roleTree').tree('getChecked', 'indeterminate');
	
	if(fx_rolename=="")
	{
		alert("角色名称不能为空！");
		return false;
	}
	
	var length = nodes.length+imnodes.length;
	if(length<=0)
	{
		alert("请选择菜单权限！");
		return false;
	}
	

	var rightidArray =[];
	$.each(nodes,function(index,item){
		rightidArray.push(item.id);
	})
	
	$.each(imnodes,function(index,item){
		rightidArray.push(item.id);
	})
	
	var rightidlist = rightidArray.join(",");
	var data={};
	data['rightIds']=rightidlist;
	data['rightid']=rightid;
	data['tokenid']=getTokenid();
	data['roleName']=fx_rolename;
	
	$.ajax( {
		url:righturl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(retData){
			if(retData.code == SUCCESS_CODE)
			{
				show(retData.msg);
				$("#roleBox").dialog('close');
				searchOrReload();
			}
			else if(retData.code == LOGINTIMEOUT_CODE)
			{
				alert(retData.msg);
				top.location.href = loginUrl;
			}
			else
			{
				alert(retData.msg);
			}
		},
		error:function(){
			error('系统错误,请稍后重试！');
		}
	});
	
}

/**
 * 修改数据
 * @return
 */
function modifyData(title,righturl,rightid)
{
	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要修改的记录！");
		return false;
	}
	
	if(rows.length>1)
	{
		alert("只允许修改一条记录！");
		return false;
	}
	if(rows[0]['ifmodify']=='1')
	{
		alert('该角色权限不可修改!');
		return false;
	}
	$('#rolefm').form('clear');
	$('#rolefm').form('load',rows[0]);
	var data={};
	var modifyRoleid =  rows[0]['roleId'];
	var rightidlist =rows[0]['rightidlist'];
	var rightidArray = rightidlist.split(",");
	$("#roleTree").tree({
		 url:BASE_PATH + "/manage/right/querytree",
		 checkbox:true,
		 loadFilter:function(data,parent)
		 {
			$.each(data,function(index,item){
				var fistid = item.id;
				var childrendata = item.children;
				if(childrendata.length>0)
				{
					$.each(childrendata,function(index1,item1){
						
						var sndid = item1.id;
						var trddata = item1.children;
						if(trddata.length>0)
						{
							$.each(trddata,function(index2,item2){
								var trdid = item2.id;
								if(rightidArray.indexOf(trdid)>=0)
								{
									item2.checked=true;
								}
							
							})	
						}
						else
						{
							// 没有子节点，选中自己
							if(rightidArray.indexOf(sndid)>=0)
							{
								item1.checked=true;
							}
						}
					})
					
				}
				else
				{
					// 没有子节点，选中自己
					if(rightidArray.indexOf(fistid)>=0)
					{
						item.checked=true;
					}
				}
			})
			return data;
		 }
	})
	
	$("#roleBox").show();
	$("#roleBox").dialog({ 
	    title: title,    
	    width: 800,    
	    height:600,   
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
			     {
					iconCls: 'icon-save',
					text:'保存',
					handler: function(){
			    	 
			    	 	modifyRoleSave(righturl,rightid,modifyRoleid);
			    	}
				},
				{
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){
						$("#roleTree").tree({data:[]});
						$('#roleBox').dialog('close');
					}
				  }
				]

	}); 
	$("#roleBox").window('center');
	
	
}


/**
 * 修改保存
 * @return
 */
function modifyRoleSave(righturl,rightid,roleid)
{

	var fx_rolename = $("#fx_rolename").val();
	var nodes = $("#roleTree").tree('getChecked');
	var imnodes = $('#roleTree').tree('getChecked', 'indeterminate');
	
	if(fx_rolename=="")
	{
		alert("角色名称不能为空！");
		return false;
	}
	
	var length = nodes.length+imnodes.length;
	if(length<=0)
	{
		alert("请选择菜单权限！");
		return false;
	}
	

	var rightidArray =[];
	$.each(nodes,function(index,item){
		rightidArray.push(item.id);
	})
	
	$.each(imnodes,function(index,item){
		rightidArray.push(item.id);
	})
	
	var rightidlist = rightidArray.join(",");
	var data={};
	data['rightIds']=rightidlist;
	data['rightid']=rightid;
	data['tokenid']=getTokenid();
	data['roleName']=fx_rolename;
	data['roleId']=roleid;
	$.ajax( {
		url:righturl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(retData){
			if(retData.code == SUCCESS_CODE)
			{
				show(retData.msg);
				$("#roleBox").dialog('close');
				searchOrReload();
			}
			else if(retData.code == LOGINTIMEOUT_CODE)
			{
				alert(retData.msg);
				top.location.href = LOGIN_URL;
			}
			else
			{
				alert(retData.msg);
			}
		},
		error:function(){
			error('系统错误,请稍后重试！');
		}
	});

}


/**
 * 删除数据
 * @return
 */
function deleteData(title,righturl,rightid)
{
	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要删除的记录！");
		return false;
	}

	$.messager.confirm(title,'确定要删除该角色吗?',function(result){
		if(result)
		{

			var roleids=[];
			for(var i=0; i<rows.length; i++)
			{
				var ifdelete = rows[i]['ifdelete'];
				if(ifdelete!='1')
				{
					roleids.push(rows[i]['roleId']);
				}
			}
			var data={};
			data['roleIds']=roleids.join(",");
			data['tokenid']=getTokenid();
			$.ajax( {
				url:righturl,
				async:false,
				type:"post",
				data:data,
				dataType:'json',
				success:function(retData){
					if(retData.code == SUCCESS_CODE)
					{
						alert(retData.msg);
						searchOrReload();
					}
					else if(retData.code == LOGINTIMEOUT_CODE )
					{
						alert(retData.msg);
						top.location.href = LOGIN_URL;
					}
					else
					{
						alert(retData.msg);
					}
				},
				error:function(){
					alert('系统错误,请稍后重试！');
				}
			});
			
		}
	})
	

	
	
}



/**
 * 展示列项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'roleId',title:'角色编号',width:10,align:'left',sortable:true},
	   		{field:'roleName',title:'角色名称',width:15,align:'left',sortable:true},
	   		{field:'ifmodify',title:'可否修改',width:10,align:'left',sortable:true,
	   			formatter: function(value,row,index){
					if (value=="1"){
						return "不可修改";
					} else {
						return "可以修改";
					}
	   			}

	   		},
	   		{field:'ifdelete',title:'可否删除',width:10,align:'left',sortable:true,
	   			formatter: function(value,row,index){
					if (value=="1"){
						return "不可删除";
					} else {
						return "可以删除";
					}
	   			}
			},
	   		{field:'rightidlist',title:'菜单编号列表',width:60,align:'left'}
	   	]];
	   	return opt;
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
	
	queryParams['roleName'] = $("#rolename").val();
	queryParams['tokenid'] = getTokenid();

	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}


