<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

    <title>用户管理</title>

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
                        <td >用户名：</td>
                        <td ><input type="text" class="easyui-textbox" id="username" /></td>
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


    <div  class="easyui-panel" title="用户列表">
        <table id="dgTable">


        </table>
    </div>

    <div id="createDialog"></div>
    <div id="updateDialog"></div>
    <div id="roleDialog">
        <table class="tab3" >
            <tr>
                <td>选择角色：</td>
                <td>
                    <select id="roleSelect" class="easyui-comboboxtree" data-options="multiple:true"  style="width:200px;">

                    </select>
                </td>
            </tr>
        </table>
    </div>
    <div id="organizationDialog"></div>


    <#include "/inc/footer.ftl"/>
    <script type="text/javascript" src="${basepath}/static/js/manage/user/user.js"></script>

</body>
</html>
