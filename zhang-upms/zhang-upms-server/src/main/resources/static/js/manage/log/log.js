// 基础数据维护
var dgId = "#dgBox";

var createBox = "#createBox";
var createForm = "#createForm";

var updateBox = "#updateBox";
var updateForm = "#updateForm";

var queryUrl = BASE_PATH + "/manage/log/list";
// 修改删除用的主键列
var primaryKey = "logId";

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
    	toolbar:'#queryContainer',
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


    initValidateBox();
});

function initValidateBox(){


}

/**
 * 按钮操作
 * @param title
 * @param opttype
 * @param righturl
 * @return
 */
function btnopt(operType,title,rightUri,permissionId)
{
    switch (operType){
        case 'DELETE':
            deleteData(title,rightUri,permissionId);
            break;
        default:
            alert('没有此操作类型对应的方法，请核查！');
            break;
    }
}

function deleteData(title,rightUri,permissionId){

    var rows = $(dgId).datagrid('getSelections');
    if(rows.length<=0)
    {
        alert("请选择需要操作的记录！");
        return false;
    }
    var ids = new Array();
    for (var i in rows) {
        ids.push(rows[i][primaryKey]);
    }
    var requestUrl = BASE_PATH + rightUri+"/"+ids.join("-") ;

    $.messager.confirm(title,"确认删除日志吗？",function(result){
        if(result)
        {
            $.ajax( {
                url: requestUrl,
                async:false,
                type:"get",
                data: {},
                dataType:'json',
                success:function(result){
                    // var result = eval('(' + result + ')');
                    if (result.code == SUCCESS_CODE) {
                        show(result.msg);
                        searchOrReload();
                    }
                    else {
                        alert(result.msg);
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
 * 展示列项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'logId',title:'日志编号',width:10,align:'left',sortable:true},
            {field:'username',title:'操作用户',width:15,align:'left',sortable:true},
	   		{field:'ip',title:'IP地址',width:15,align:'left',sortable:true},
            {field:'description',title:'标题',width:15,align:'left',sortable:true},
            {field:'startTime',title:'开始时间',width:15,align:'left',sortable:true},
            {field:'spendTime',title:'耗时ms',width:15,align:'left',sortable:true},
            {field:'basePath',title:'请求路径',width:15,align:'left',sortable:true},
            {field:'uri',title:'uri',width:15,align:'left',sortable:true},
            {field:'method',title:'请求方式',width:15,align:'left',sortable:true},
            {field:'parameter',title:'请求参数',width:15,align:'left',sortable:true},
            {field:'userAgent',title:'客户端类型',width:15,align:'left',sortable:true},
            {field:'result',title:'处理结果',width:15,align:'left',sortable:true},
            {field:'permissions',title:'权限',width:15,align:'left',sortable:true}
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
	
	queryParams['username'] = $("#username").val();
    queryParams['ip'] = $("#ip").val();
    queryParams['description'] = $("#title").val();


    $(dgId).datagrid('options').queryParams = queryParams;
	$(dgId).datagrid('reload');
}


function clearForm(){

    $('#queryForm').form('clear');
}

