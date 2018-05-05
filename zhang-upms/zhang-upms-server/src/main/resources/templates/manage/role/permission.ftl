<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

    <title>组织管理</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">

    <#include "/inc/header.ftl"/>
    <style>
        .title{
            height:30px;
            line-height:30px;
            pading:10px;
            font-size:13px;
            font-weight: bold;
            width:220px;
            color:#2aabd2;
        }
        #sysPermissionContainer{
            width:90%;
            margin:10px 0 10px 20px;
        }

        .permissionContent{
            width:200px;
            margin:0 10px 0 10px;
            float:left;
        }

    </style>
</head>

<body>
<div id="permissionMain" class="easyui-panel" title="角色权限分配">
    <table>
        <tr>
            <td>角色ID：</td> <td><input type="text" id="roleId" class="easyui-textbox"  value="${upmsRole.roleId}"></td>
            <td>角色名称：</td> <td><input type="text" class="easyui-textbox"  value="${upmsRole.title}"></td>
            <td>
                <input type="hidden" id="system" value="${upmsSystems?size}">
            </td>
            <td width="20"></td>
            <td colspan="2"> <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="submitRolePermission()">保存</a></td>

        </tr>

    </table>

    <div id="sysPermissionContainer">
        <#list upmsSystems as upmsSystem>
            <div id="permission" class="permissionContent">
                <li>
                    <span class="title"> &gt;&gt; ${upmsSystem.title}</span>
                    <ul  class="easyui-tree permissionTree_${upmsSystem_index}" data-options="url:'${basepath}/manage/permission/role/${upmsRole.roleId}?id=${upmsSystem.systemId}',
                        method:'get',
                        checkbox:true,
                        lines:true,
                        cascadeCheck:false
                    ">

                    </ul>
                </li>
            </div>

        </#list>
    </div>


</div>

<#include "/inc/footer.ftl"/>
<script type="text/javascript">
//    var url = BASE_PATH + "/manage/permission/role/"+$("#roleId").val();
//    $(function(){
//        $('#permissionTree').tree({
//            url: url,
//            method: 'get',
//            checkbox:true,
//            lines:true,
//            cascadeCheck:false // 加载的时候不启用层叠选中
//        });
//    })

    function submitRolePermission(){

        var uri = BASE_PATH + "/manage/role/permission/"+$("#roleId").textbox('getValue');
        var systemSize = $("#system").val();
        if(systemSize <= 0) return;

        var ids = new Array();
        for(var i=0;i<systemSize;i++)
        {
            var nodes = $("#permission .permissionTree_" + i).tree('getChecked', ['checked','indeterminate']);

            $.each(nodes,function(index,node){
                if(!node.attributes){ // 非系统节点
                    ids.push(node.id);
                }
            })
        }

        if(ids.length <= 0)
        {
            alert("请选择权限数据！");
            return false;
        }


        var data = {};
        data['permissionids'] = ids.join(',');

        $.ajax({
            url : uri,
            data: data,
            type : 'POST',
            async: false,
            dataType : "json",
            success : function(result) {
                if(result.code == SUCCESS_CODE)
                {
                    show(result.msg);
                    //$(permissionDialog).dialog('close');
                    // parent.closeCurrentTab();

                }else
                {
                    alert(result.msg);
                }

            }
        });
    }


</script>



</body>
</html>