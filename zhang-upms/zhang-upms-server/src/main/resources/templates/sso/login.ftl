<#assign basepath="${request.contextPath}">
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>登录</title>
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">

    <link rel="stylesheet" type="text/css" href="${basepath}/static/easyui-1.4.4/themes/bootstrap/easyui.css">
    <link rel="stylesheet" type="text/css" href="${basepath}/static/easyui-1.4.4/themes/icon.css">
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

    <script>var BASE_PATH = "${basepath}"</script>
    <script>var BACK_URL = '${param.backurl}';</script>
    <script type="text/javascript" src="${basepath}/static/easyui-1.4.4/jquery.min.js"></script>
    <script type="text/javascript" src="${basepath}/static/easyui-1.4.4/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="${basepath}/static/js/framework/jquery-form.js"></script>
    <script type="text/javascript" src="${basepath}/static/js/common/global.js"></script>
    <script type="text/javascript" src="${basepath}/static/js/common/common.js"></script>
    <script type="text/javascript" src="${basepath}/static/js/admin/login.js"></script>
    <script>
        <#if param.forceLogout == 1>
                alert('您已被强制下线！');
        top.location.href = '${basepath}/sso/login';
        </#if>
        //解决iframe下系统超时无法跳出iframe框架的问题
        if (window != top){
            top.location.href = location.href;
        }
    </script>

</body>
</html>

