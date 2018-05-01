<#assign basepath="${request.contextPath}">
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>统一登录平台</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">

    <#include "/inc/header.ftl"/>
    <link rel="stylesheet" type="text/css" href="${basepath}/static/style/login.css">
</head>
<body>
    <div id="login">
        <form id="loginfm">
            <table>
                <tr>
                    <td>用户名：</td>
                    <td><input  type="text" class="easyui-textbox w152" name="loginName" id="loginname" value="admin"   data-options="iconCls:'icon-man'" /></td>
                </tr>
                <tr>
                    <td>密 码：</td>
                    <td><input type="password"  class="easyui-textbox w152" name="loginPass" id="loginpass" value="123456"  data-options="iconCls:'icon-lock'" /></td>
                </tr>
                <tr>
                    <td>验证码：</td>
                    <td><input  type="text" class="easyui-textbox w152" name="vercode" value="1111"  id="vercode" /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><image src="${basepath}/loadvercode" onclick="refreshVercode(this)"/></td>
                </tr>
            </table>
        </form>
    </div>

    <div id="btn">
        <a href="javascript:void(0)" class="easyui-linkbutton"  id="loginBtn" >登  录</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" id="resetBtn" >重  置</a>
    </div>

    <#include "/inc/footer.ftl"/>
    <script type="text/javascript" src="${basepath}/static/js/manage/login.js"></script>
</body>
</html>

