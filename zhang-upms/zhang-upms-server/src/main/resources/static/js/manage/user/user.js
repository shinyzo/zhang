// 基础数据维护
var dgId = "#dgTable";

var createDialog = "#createDialog";
var createForm = "#createForm";

var updateDialog = "#updateDialog";
var updateForm = "#updateForm";

var roleDialog = "#roleDialog";
var organizationDialog = "#organizationDialog";

var queryUrl = BASE_PATH + "/manage/user/list";
// 修改删除用的主键列
var primaryKey = "userId";

$(document).ready(function(){

    $(roleDialog).hide();

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
        case 'ROLE':
            roleData(title,rightUri,permissionId);
            break;
        case 'PERMISSION':
            permissionData(title,rightUri,permissionId);
            break;
        case 'ORGANIZATION':
            organizationData(title,rightUri,permissionId);
            break;
        default:
            alert('没有此操作类型对应的方法，请核查！');
            break;
    }
}

/**
 * 用户组织
 * @param title
 * @param rightUri
 * @param permissionId
 * @returns {boolean}
 */
function organizationData(title,rightUri,permissionId){
    var rows = $(dgId).datagrid('getSelections');
    if(rows.length <= 0)
    {
        alert("请选择需要操作的记录！");
        return false;
    }
    if(rows.length > 1)
    {
        alert("仅允许修改单条记录！");
        return false;
    }

    var id = rows[0][primaryKey];

    var rightUri = BASE_PATH + rightUri+"/" + id;

    $(organizationDialog).dialog({
        title: title,
        width: 800,
        height: 420,
        closed: false,
        cache: false,
        href: rightUri,
        buttons:[
            {
                iconCls: 'icon-save',
                text:'保存',
                handler: function(){
                    organizationDataSave(rightUri);
                }
            },
            {
                iconCls: 'icon-cancel',
                text:'取消',
                handler: function(){
                    $(organizationDialog).dialog('close');
                }
            }
        ]
    });

}


function organizationDataSave(rightUri){

    var nodes   = $("#organizationTree").tree('getChecked', ['checked','indeterminate']);
    if(nodes.length<=0)
    {
        alert("请选择组织节点！");

        return false;
    }

    var organizationIds = new Array();
    $.each(nodes,function(index,node){
        organizationIds.push(node.id);
    })

    var data = {};
    data['organizationIds'] = organizationIds.join(',');

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
                $(organizationDialog).dialog('close');
            }else
            {
                alert(result.msg);
            }

        }
    });

}

/**
 * 用户权限
 * @param title
 * @param rightUri
 * @param permissionId
 * @returns {boolean}
 */
function permissionData(title,rightUri,permissionId){
    var rows = $(dgId).datagrid('getSelections');
    if(rows.length <= 0)
    {
        alert("请选择需要操作的记录！");
        return false;
    }
    if(rows.length > 1)
    {
        alert("仅允许修改单条记录！");
        return false;
    }

    var rightUri = BASE_PATH + rightUri+"/"+rows[0][primaryKey];
    parent.addTab(title,rightUri,true);
}

/**
 * 用户角色
 * @param title
 * @param rightUri
 * @param permissionId
 * @returns {boolean}
 */
function roleData(title,rightUri,permissionId){
    var rows = $(dgId).datagrid('getSelections');
    if(rows.length <= 0)
    {
        alert("请选择需要操作的记录！");
        return false;
    }
    if(rows.length > 1)
    {
        alert("仅允许修改单条记录！");
        return false;
    }

    var rightUri = BASE_PATH + rightUri+"/"+rows[0][primaryKey];

    $("#roleSelect").combotree({
        method: 'GET',
        required: true,
        url: rightUri
    })

    $(roleDialog).show();

    $(roleDialog).dialog({
        title: title,
        width: 600,
        height: 320,
        closed: false,
        cache: false,
        buttons:[
            {
                iconCls: 'icon-save',
                text:'保存',
                handler: function(){
                    roleDataSave(rightUri);
                }
            },
            {
                iconCls: 'icon-cancel',
                text:'取消',
                handler: function(){
                    $(roleDialog).dialog('close');
                }
            }
        ]
    });
}

/***
 * 添加用户角色
 * @param rightUri
 * @returns {boolean}
 */
function roleDataSave(rightUri)
{
   var roleValues =  $('#roleSelect').combotree('getValues');
   if(roleValues.length <= 0)
   {
       alert("请选择用户角色");
       return false;
   }

   var data = {};
   data['roleId'] = roleValues.join(",");
    $.ajax({
        url: rightUri,
        async:false, // 同步
        type:"post",
        data: data,
        dataType:'json',
        success:function(result){
           // var result = eval('(' + result + ')');
            if (result.code == SUCCESS_CODE) {
                show(result.msg);
                $(roleDialog).dialog('close');
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

// 删除用户
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

    $.messager.confirm(title,"确认删除用户吗？",function(result){
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
 * 修改用户
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
    $(updateDialog).dialog({
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
                    $(updateDialog).dialog('close');
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
                $(updateDialog).dialog('close');
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
    $(createDialog).dialog({
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
						$(createDialog).dialog('close');
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
                $(createDialog).dialog('close');
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
		  	{field:'userId',title:'用户编号',width:10,align:'left',sortable:true},
            {field:'username',title:'用户名',width:15,align:'left',sortable:true},
            {field:'realname',title:'真实姓名',width:15,align:'left',sortable:true},
	   		{field:'avatar',title:'头像',width:15,align:'left',sortable:true},
            {field:'phone',title:'电话',width:15,align:'left',sortable:true},
            {field:'email',title:'邮箱',width:15,align:'left',sortable:true},
            {field:'sex',title:'性别',width:15,align:'left',sortable:true},
            {field:'locked',title:'是否锁定',width:15,align:'left',sortable:true},
            {field:'ctime',title:'创建时间',width:15,align:'left',sortable:true}
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

	$(dgId).datagrid('options').queryParams = queryParams;
	$(dgId).datagrid('reload');
}


function clearForm(){

    $('#queryForm').form('clear');
}

