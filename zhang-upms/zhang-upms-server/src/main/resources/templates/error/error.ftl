<#assign basepath="${request.contextPath}">
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>错误页面</title>
</head>
<body>

    errorcode: <#if errorCode??>${errorCode}</#if>
    errmsg:    <#if errorMsg??>${errorMsg}</#if>

</body>
</html>