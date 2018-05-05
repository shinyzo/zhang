// 基础数据维护
var dgId = "#dgTable";



var queryUrl = BASE_PATH + "/manage/session/list";
// 修改删除用的主键列
var primaryKey = "id";

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
        case 'FORCELOGOUT':
            forceLogout(title,rightUri,permissionId);
            break;
        default:
            alert('没有此操作类型对应的方法，请核查！');
            break;
    }
}

function forceLogout(title,rightUri,permissionId){

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
    var requestUrl = BASE_PATH + rightUri+"/"+ids.join(",") ;

    $.messager.confirm(title,"确认强制会话退出吗？",function(result){
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
		  	{field:'id',title:'sessionid',width:10,align:'left',sortable:true},
            {field: 'startTimestamp', title: '创建时间', sortable: true, align: 'center'},
            {field: 'lastAccessTime', title: '最后访问时间'},
            {field: 'expired', title: '是否过期', align: 'center'},
            {field: 'host', title: '访问者IP', align: 'center'},
            {field: 'userAgent', title: '用户标识', align: 'center'},
            {field: 'status', title: '状态', align: 'center'}
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
	$(dgId).datagrid('reload');
}


function clearForm(){

    $('#queryForm').form('clear');
}

