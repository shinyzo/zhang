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
				${corpInfo.corpName}
			</div>
			 
			<div class="exit">
				${user.loginName} , 上次登录时间： ${user.lastLoginTime!},上次登录IP:${user.lastLoginIp}
				<a href="javascript:void(0)" class="easyui-linkbutton" target="_self" onClick="javascript:logout();">
						安全退出
				</a>          		
			</div>		
		</div>
		
		<div data-options="region:'west',split:true,title:'菜单导航栏'" style="width:240px;">
			<div class="easyui-accordion" data-options="border:false,fit:true">
			<#list rights as pitem>
				<#if pitem.parentId=='0'>
                    <div title="${pitem.rightName}" data-options="iconCls:'icon-application-cascade'" style="padding:5px;">
						<#list rights as citem>
                            <ul class="easyui-tree">
								<#if citem.parentId == pitem.rightId>
                                    <li iconCls="icon-chart-organisation"><a href="javascript:void(0)" data-icon="icon-chart-organisation"  onclick="addTab('${citem.rightName}','${basepath}/${citem.requestUri}?rightid=${citem.rightId}','true')"  iframe="0">${citem.rightName}</a></li>
								</#if>
                            </ul>
						</#list>
                    </div>
				</#if>
			</#list>
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