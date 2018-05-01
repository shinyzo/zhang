// 基础数据维护
var dgId = "#dgBox";
var queryUrl = BASE_PATH + "/manage/system/list";

$(document).ready(function(){

	$(dgId).datagrid({
		url:queryUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{},
		method:'GET',
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
    	toolbar:'#query_container',
    	onLoadError : function() {
        	alert('数据加载失败!');
    	}
    });  

	 //设置分页控件 
	$(dgId).datagrid('getPager').pagination({
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
	

 
}


function addRoleSave(righturl,rightid){

	
}

/**
 * 修改数据
 * @return
 */
function modifyData(title,righturl,rightid)
{

	
	
}


/**
 * 修改保存
 * @return
 */
function modifyRoleSave(righturl,rightid,roleid)
{



}


/**
 * 删除数据
 * @return
 */
function deleteData(title,righturl,rightid)
{


	
	
}



/**
 * 展示列项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'systemId',title:'系统编号',width:10,align:'left',sortable:true},
            {field:'name',title:'系统Id',width:15,align:'left',sortable:true},
            {field:'title',title:'系统名称',width:15,align:'left',sortable:true},
            {field:'basepath',title:'项目地址',width:15,align:'left',sortable:true},
            {field:'icon',title:'ICON',width:15,align:'left',sortable:true},
            {field:'banner',title:'banner',width:15,align:'left',sortable:true},
            {field:'theme',title:'样式颜色',width:15,align:'left',sortable:true},
            {field:'status',title:'状态',width:15,align:'left',sortable:true},
	   		{field:'description',title:'描述',width:15,align:'left',sortable:true},
            {field:'ctime',title:'创建时间',width:15,align:'left',sortable:true},
            {field:'orders',title:'排序',width:15,align:'left',sortable:true}
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

	var queryParams = $(dgId).datagrid('options').queryParams;
	
	queryParams['name'] = $("#name").val();

	$(dgId).datagrid('options').queryParams = queryParams;
	$(dgId).datagrid('reload');
}


