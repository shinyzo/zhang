<#assign basepath="${request.contextPath}">
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>首页</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
        <link rel="stylesheet" type="text/css" href="${basepath}/static/easyui-1.4.4/themes/bootstrap/easyui.css">
        <link rel="stylesheet" type="text/css" href="${basepath}/static/easyui-1.4.4/themes/icon.css">
        <link rel="stylesheet" type="text/css" href="${basepath}/static/style/layout.css">
	</head>
	<body class="easyui-layout">

		<div data-options="region:'north',border:true,minHeight:70" style="height:72px">
			
			<div class="logo" style="font-size:22px;font-weight:bold;">
				111111
			</div>


			<div class="rightC">

					<select class="easyui-combobox" style="width:172px;">
						<#list systemList as item>
							<option value="${item.systemId}">${item.title}</option>
						</#list>
					</select>

					<a class="easyui-linkbutton" href="${basepath}/manage/logout">安全退出</a>

			</div>		
		</div>
		
		<div data-options="region:'west',split:true,title:'菜单导航栏'" style="width:240px;">
			<div class="easyui-accordion" data-options="border:false,fit:true">

			</div>
		</div>
		
			

		<div data-options="region:'south',border:true" style="height:50px;">

			<p style="text-align:center;width:100%;height:25px;line-height:25px;">11111</p>

		</div>
		<div region="center">
			<div id="tab_area">

			</div>
		</div>
		
	</body>


</html>

<script>var BASE_PATH = "${basepath}"</script>
<script type="text/javascript" src="${basepath}/static/easyui-1.4.4/jquery.min.js"></script>
<script type="text/javascript" src="${basepath}/static/easyui-1.4.4/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${basepath}/static/easyui-1.4.4/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${basepath}/static/easyui-1.4.4/extend/easyui-extend-validate.js"></script>

<script type="text/javascript" src="${basepath}/static/js/framework/jquery.cookie.js"></script>
<script type="text/javascript" src="${basepath}/static/js/framework/jquery-form.js"></script>

<script type="text/javascript" src="${basepath}/static/js/common/global.js"></script>
<script type="text/javascript" src="${basepath}/static/js/common/common.js"></script>
<script type="text/javascript" src="${basepath}/static/js/admin/index_business.js"></script>