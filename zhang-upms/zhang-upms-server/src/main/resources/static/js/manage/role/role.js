// 基础数据维护
var dgId = "#dgBox";

var createBox = "#createBox";
var createForm = "#createForm";

var updateBox = "#updateBox";
var updateForm = "#updateForm";

var permissionBox = "#permissionBox";

var queryUrl = BASE_PATH + "/manage/role/list";
var primaryKey = "roleId";

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
        case 'ADD':
            addData(title,rightUri,permissionId);
            break;
        case 'UPDATE':
            updateData(title,rightUri,permissionId);
            break;
        case 'DELETE':
            deleteData(title,rightUri,permissionId);
            break;
        case 'PERMISSION':
            permissionData(title,rightUri,permissionId);
            break;
        default:
            alert('没有此操作类型对应的方法，请核查！');
            break;
    }
}


function permissionData(title,rightUri,permissionId){
    var rows = $(dgId).datagrid('getSelections');
    if(rows.length<=0)
    {
        alert("请选择需要操作的记录！");
        return false;
    }
    var rightUri = BASE_PATH + rightUri+"/"+rows[0][primaryKey];
    $(permissionBox).dialog({
        title: title,
        width: 600,
        height: 320,
        closed: false,
        cache: false,
        href: rightUri,
        modal: true,
        buttons:[
            {
                iconCls: 'icon-save',
                text:'保存',
                handler: function(){
                     addPermissionSave(rightUri);
                }
            },
            {
                iconCls: 'icon-cancel',
                text:'取消',
                handler: function(){
                    $(permissionBox).dialog('close');
                }
            }
        ]
    });
}


function addPermissionSave(rightUri) {
    var nodes = $('#permissionTree').tree('getChecked', ['checked','indeterminate']);
    if(nodes.length<=0)
    {
        alert("请选择权限数据！");
        return false;
    }
    console.log(nodes);
    var ids = new Array();
    $.each(nodes,function(index,node){
        if(!node.attributes){ // 非系统节点
            ids.push(node.id);
        }
    })

    var data = {};
    data['permissionids'] = ids.join(',');

    $.ajax({
        url : rightUri,
        data: data,
        type : 'POST',
        async: false,
        dataType : "json",
        success : function(result) {
            if(result.code == SUCCESS_CODE)
            {
                show(result.msg);
                $(permissionBox).dialog('close');

            }else
            {
                alert(result.msg);
            }

        }
    });

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

    $.messager.confirm(title,"确认删除角色吗？",function(result){
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
 * 加载修改页面
 * @param title
 * @param rightUri
 * @param permissionId
 * @returns {boolean}
 */
function updateData(title,rightUri,permissionId){

    var rows = $(dgId).datagrid('getSelections');
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

    var rightUri = BASE_PATH + rightUri+"/"+rows[0][primaryKey];
    $(updateBox).dialog({
        title: title,
        width: 600,
        height: 320,
        closed: false,
        cache: false,
        href: rightUri,
        modal: true,
        buttons:[
            {
                iconCls: 'icon-save',
                text:'保存',
                handler: function(){
                    updateDataSave(rightUri);
                }
            },
            {
                iconCls: 'icon-cancel',
                text:'取消',
                handler: function(){
                    $(updateBox).dialog('close');
                }
            }
        ]
    });

}

/**
 * 修改数据保存
 * @param rightUri
 * @returns {boolean}
 */
function updateDataSave(rightUri) {

    if (!$("#updateForm").form('validate')) {
        return false;
    }
    $(updateForm).form('submit', {
        url: rightUri,
        ajax: true,
        dataType: 'json',
        onSubmit: function (param) {

        },
        success: function (result) {
            var result = eval('(' + result + ')');
            if (result.code == SUCCESS_CODE) {
                show(result.msg);
                $(updateBox).dialog('close');
                searchOrReload();
            }
            else {
                alert(result.msg);
            }
        },
        onLoadError: function () {
            error('系统错误,请稍后重试！');
        }

    })
}

/**
 * 添加数据
 * @param title
 * @param righturl
 * @return
 */
function addData(title,rightUri,permissionId)
{

	var rightUri = BASE_PATH + rightUri;
    $(createBox).dialog({
        title: title,
        width: 600,
        height: 320,
        closed: false,
        cache: false,
        href: rightUri,
        modal: true,
        buttons:[
				{
					iconCls: 'icon-save',
					text:'保存',
					handler: function(){
						addDataSave(rightUri);
					}
				},
            	{
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){
						$(createBox).dialog('close');
					}
            	}
        ]
    });

}


function addDataSave(rightUri) {

    if(!$(createForm).form('validate'))
    {
		return false;
    }
    $(createForm).form('submit',{
        url:rightUri,
        ajax:true,
        dataType:'json',
        onSubmit:function(param){

        },
        success:function(result){
            var result = eval('(' + result + ')');
            if(result.code == SUCCESS_CODE)
            {
                show(result.msg);
                $(createBox).dialog('close');
                searchOrReload();
            }
            else
            {
                alert(result.msg);
            }
        },
        onLoadError:function(){
            error('系统错误,请稍后重试！');
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
            {field:'name',title:'权限名称',width:15,align:'left',sortable:true},
            {field:'title',title:'角色名称',width:15,align:'left',sortable:true},
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
	
	queryParams['title'] = $("#title").val();

	$(dgId).datagrid('options').queryParams = queryParams;
	$(dgId).datagrid('reload');
}


function clearForm(){

    $('#queryForm').form('clear');
}

