<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

    <title>角色管理</title>

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
                        <td >角色名称：</td>
                        <td ><input type="text" class="easyui-textbox" id="title" /></td>
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


    <div  class="easyui-panel" title="角色列表">
        <table id="dgBox">


        </table>
    </div>

    <div id="createBox"></div>
    <div id="updateBox"></div>


    <#include "/inc/footer.ftl"/>
    <script type="text/javascript" src="${basepath}/static/js/manage/role/role.js"></script>

</body>
</html>
