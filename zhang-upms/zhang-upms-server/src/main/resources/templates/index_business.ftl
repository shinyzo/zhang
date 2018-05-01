
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>首页</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<#include "/inc/header.ftl" />
	</head>
	<body class="easyui-layout">

		<div data-options="region:'north',border:true,minHeight:70" style="height:72px">
			
			<div class="logo" style="font-size:22px;font-weight:bold;">
				企萌科技后台管理平台(<span class="system_name"></span>)
			</div>


			<div class="rightC">

					<select class="easyui-combobox" id="system_switch" style="width:172px;">
						<#list upmsSystems as upmsSystem>
                            <#if upmsSystem_index == 0>
                                <option value="${upmsSystem.systemId},${upmsSystem.basepath},${upmsSystem.title}" system="${upmsSystem.basepath}" selected="selected">${upmsSystem.title}</option>
                            <#else >
                                <option value="${upmsSystem.systemId},${upmsSystem.basepath},${upmsSystem.title}" system="${upmsSystem.basepath}">${upmsSystem.title}</option>
                            </#if>
						</#list>
					</select>
					<@shiro.user>
						欢迎您，<@shiro.principal/>
					</@shiro.user>

                <a class="easyui-linkbutton" href="javascript:void(0);" onclick="logout()">安全退出</a>

			</div>		
		</div>
		
		<div data-options="region:'west',split:true,title:'菜单导航栏'" style="width:240px;">

			<div class="easyui-accordion menu_accordion"  data-options="border:false,fit:true">


			</div>
		</div>
		
			

		<div data-options="region:'south',border:true" style="height:50px;">

			<p style="text-align:center;width:100%;height:25px;line-height:25px;">版权所有：企萌科技有限公司 CopyRight@2016-2018 </p>

		</div>
		<div region="center">
			<div id="tab_area">

			</div>
		</div>

		<#include "/inc/footer.ftl"/>
        <script type="text/javascript" src="${basepath}/static/js/manage/index_business.js"></script>

	</body>
</html>

