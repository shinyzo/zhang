// 基础数据维护
var queryUrl = "admin/right/query.do";

$(document).ready(function(){
	$("#dgBox").treegrid({  
		url:queryUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid()},
    	striped:true,          //是否显示斑马线效果
		rownumbers:true,       // 显示行号
		remotesort: true,
		pagination:true,       // 显示分页
		pageSize: pageSize,
		pageList:pageList,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				// //自适应大小
    	fitColumns:true,        //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,            //超出列宽自动截取
    	singleSelect:true,
    	columns:getColumnsOpt(),
    	sortName:'sort',
    	sortOrder:'asc',
    	idField:'rightid',
    	treeField:'rightname',
    	toolbar:'#headBox',
    	onLoadError : function() {
        	alert('数据加载失败!');
    	},
    	onBeforeLoad: function(row,param){   
            if (!row) {    // load top level rows  
                param.parentid = 0;    // set id=0, indicate to load new page rows  
            }  
            else{
            	param.parentid = row.rightid;
            }
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
 * 展示列项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'rightid',title:'菜单编号',width:10,align:'left',sortable:true},
	   		{field:'rightname',title:'菜单名称',width:15,align:'left',sortable:true,editor:{type:'textbox',options:{required:true}}},
	   		{field:'changedrightid',title:'变更后菜单编号(不填则不修改主ID)',width:15,align:'left',sortable:true,editor:'textbox'},
	   		{field:'rightclass',title:'菜单ICON',width:15,align:'left',sortable:true,editor:'textbox'},
	   		{field:'righttype',title:'菜单类型(1:菜单,2：按钮)',width:15,align:'left',sortable:true,editor:{type:'textbox',options:{required:true}}},
	   		{field:'opttype',title:'操作类型(不建议修改)',width:15,align:'left',sortable:true,editor:{type:'textbox'}},
	   		{field:'parentid',title:'父菜单id',width:15,align:'left',sortable:true,editor:{type:'textbox',options:{required:true}}},
	   		{field:'actionname',title:'Action(慎重修改)',width:25,align:'left',sortable:true,editor:'textbox'},
	   		{field:'sort',title:'排序',width:15,align:'left',sortable:true,editor:'numberbox'}
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
			addright(title,righturl,rightid);
			break;
		case '2':
			editright(title,righturl,rightid);
			break;
		case '3':
			saveright(title,righturl,rightid);
			break;
		case '4':
			deleterightsave(title,righturl,rightid);
			break;
		default:
			alert("无此操作类型对应的方法!");
			break;
	}

}

function addright(title,righturl,rightid){
	
	var rows = $("#dgBox").treegrid('getSelections');
	
	var rowsize = rows.length;
	
	if(rowsize<=0)
	{
		alert("请选择操作节点！");
		return false;	
	}
	
	if(rowsize>1)
	{
		alert("最多只能选择一个节点！");
		return false;	
	}
	
	if(rowsize==1)
	{
		
		var node = rows[0];
		// 在该父节点下 插入一行
		$('#dgBox').treegrid('append',{
			parent: node.rightid,  // the node has a 'id' value that defined through 'idField' property
			data: [{
				rightid:'',
				rightname:'',
				parentid:node.rightid,
				sort:'255'
			}]
		});
	}
	
	
}




/**
 * 删除
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function deleterightsave(title,righturl,rightid)
{
	
	
	alert('暂不允许进行菜单的删除，你可以对菜单进行调整！');
	
	
	
	
}

var lastIndex = undefined;

/**
 * 修改菜单
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function editright(title,righturl,rightid)
{

	var rows = $("#dgBox").treegrid('getSelections');
	
	if(rows.length<=0)
	{
		alert("请选择要被修改的记录！");
		return false;
	}
	if(rows.length>1)
	{
		alert("只能修改一条记录！");
		return false;
	}
	
	var row = rows[0];
	
	var currIndex = row.rightid;  
	if(lastIndex==undefined)
	{
		$('#dgBox').treegrid('beginEdit', currIndex);
		lastIndex = currIndex;
		
	}
	else if(lastIndex !=currIndex)
	{		
		$('#dgBox').treegrid('endEdit', lastIndex);
		$('#dgBox').treegrid('beginEdit', currIndex);
		
		lastIndex = currIndex;		
	}
	else
	{
		$('#dgBox').treegrid('beginEdit', currIndex);
		
	}
	
}

function saveright(title,righturl,rightid)
{	
	var rows = $("#dgBox").treegrid('getSelections');
	
	if(rows.length<=0)
	{
		alert("请选择要被修改的记录！");
		return false;
	}
	if(rows.length>1)
	{
		alert("只能修改一条记录！");
		return false;
	}
	
	var row = rows[0];
	// 现将当前行结束编辑在取值
	$("#dgBox").treegrid('endEdit',lastIndex);


	var orignrightid = row.rightid;
	var changedrightid = row.changedrightid;
	var rightname = row.rightname;
	var rightclass = row.rightclass;
	var righttype = row.righttype;
	var parentid = row.parentid;
	var actionname = row.actionname;
	var sort = row.sort;
	
	var data={};
	data['orignrightid']=orignrightid;
	data['changedrightid']=changedrightid;
	data['rightname']=rightname;
	data['rightclass']=rightclass;
	data['righttype']=righttype;	
	data['opttype']=row.opttype;
	data['parentid']=parentid;
	data['actionname']=actionname;
	data['sort']=sort;
	
	data['rightid'] = rightid;
	data['tokenid'] = getTokenid();
	
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
				//searchOrReload();
			}
			else if(retData.retCode == loginTimeoutCode)
			{
				alert(retData.retMsg);
				top.location.href = loginUrl;
			}
			else
			{
				alert(retData.retMsg);
				$("#dgBox").treegrid('beginEdit',lastIndex);
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

	var queryParams = $("#dgBox").treegrid('options').queryParams;
	
	queryParams['rightname'] = $("#rightname").val();
	queryParams['orignrightid'] = $("#rightid").val();
	queryParams['tokenid'] = getTokenid();

	$("#dgBox").treegrid('options').queryParams = queryParams;
	$("#dgBox").treegrid('reload');
}
