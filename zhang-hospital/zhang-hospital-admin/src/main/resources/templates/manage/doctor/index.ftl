<#assign basepath="${request.contextPath}">
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

    <title>医师管理</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">

    <#include "/inc/header.ftl" />

</head>

<body>

    <div id="query_container">
        <div id="query_box">
            <form id="query_form">
                <table>
                    <tr>
                        <td >系统名称：</td>
                        <td ><input type="text" class="easyui-textbox" id="name" /></td>
                        <td  >
                            <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-search" onclick="searchOrReload()">查询</a>
                            <a href="javascript:void(0);" class="easyui-linkbutton" onclick="clearForm()">重置</a>
                        </td>
                    </tr>
                </table>
            </form>
        </div>

        <div id="btnBox">
        <#list buttonPermissions as item>
            <@shiro.hasPermission name="${item.permissionValue}">
                <a href="javascript:void(0)"
                   onclick="btnopt('${item.name}','${item.uri}'),'${item.permissionId}'"
                   class="easyui-linkbutton" data-options="iconCls:'${item.icon}'">
                ${item.name},${item.permissionId}
                </a>
            </@shiro.hasPermission>
        </#list>
        </div>
    </div>


    <div  class="easyui-panel" title="系统列表">
        <table id="dgBox">


        </table>
    </div>


    <#include "/inc/footer.ftl"/>
    <script type="text/javascript" src="${basepath}/static/js/manage/doctor/doctor.js"></script>

</body>
</html>
