<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

    <title>权限资源管理</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">

    <#include "/inc/header.ftl"/>
</head>

<body>

    <div id="queryContainer">
        <div id="queryBox">
            <form id="queryForm">
                <table>
                    <tr>
                        <td >选择系统：</td>
                        <td >
                            <select id="systemid" class="easyui-combobox w172" id="type">
                                <option value="0">请选择系统</option>
                                <#list upmsSystems as upmsSystem>
                                    <option value="${upmsSystem.systemId}">${upmsSystem.title}</option>
                                </#list>
                            </select>
                        </td>

                        <td >菜单类型：</td>
                        <td >
                            <select class="easyui-combobox w172" id="type">
                                <option value="0">请选择菜单类型</option>
                                <option value="1">一级菜单</option>
                                <option value="2">二级菜单</option>
                                <option value="3">按钮</option>
                            </select>
                        </td>
                        <td >权限名称：</td>
                        <td ><input type="text" class="easyui-textbox" id="name" /></td>
                        <td  >
                            <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-search" onclick="searchOrReload()">查询</a>
                            <a href="javascript:void(0);" class="easyui-linkbutton" onclick="clearForm()">重置</a>
                        </td>
                    </tr>
                </table>
            </form>
        </div>

        <div id="buttonBox">
            <#list buttonPermissions as item>
                <@shiro.hasPermission name="${item.permissionValue}">
                    <a href="javascript:void(0)"
                       onclick="btnopt('${item.opertype!}','${item.name!}','${item.uri!}'),'${item.permissionId!}'"
                       class="easyui-linkbutton" data-options="iconCls:'${item.icon}'">
                        ${item.name}
                    </a>
                </@shiro.hasPermission>
            </#list>

        </div>
    </div>


    <div  class="easyui-panel" title="权限资源列表">
        <table id="dgBox">


        </table>
    </div>

    <div id="createBox"></div>
    <div id="updateBox"></div>


    <#include "/inc/footer.ftl"/>
    <script type="text/javascript" src="${basepath}/static/js/manage/permission/permission.js"></script>

</body>
</html>
