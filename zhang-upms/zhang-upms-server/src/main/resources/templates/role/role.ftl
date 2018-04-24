<#assign basepath="${request.contextPath}">
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>${sys.web_name}-角色管理</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">

    <link rel="stylesheet" type="text/css" href="${basepath}/static/easyui-1.4.4/themes/bootstrap/easyui.css">
    <link rel="stylesheet" type="text/css" href="${basepath}/static/easyui-1.4.4/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="${basepath}/static/style/layout.css">



</head>
  
  <body>
		<div id="headBox">
		  <div id="queryBox">
		  		<table>
		  			<tr>
						<td >角色名称：</td>
						<td><input type="text" class="easyui-textbox" id="rolename"/></td>
						<td><a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-search" onclick="searchOrReload()">查询</a></td>
					</tr>
		  		</table>
		  </div>
	
		  <div id="btnBox">
			<#list btnlist as btn>
                <a href="javascript:void(0)" onclick="btnopt('${btn.operType}','${btn.rightName}','${basepath}/${btn.requestUri}','${btn.rightId}')" class="easyui-linkbutton" data-options="iconCls:'${btn.rightClass}'">${btn.rightName}</a>
			</#list>
		  </div>
		</div>
  
	  <div  class="easyui-panel" title="数据列表">
	  	<table id="dgBox">
			
	
		</table>
	  </div>
	  
	  <div id="roleBox">
	  		<form id="rolefm">	  
	  		<table>
	  			<tr><td>角色名称：</td><td><input type="text" class="easyui-textbox" id="fx_rolename" name="roleName" data-options="required:true,missingMessage:'请输入角色名称！'"/></td></tr>
	  			<tr><td>角色权限：</td></tr>
	  			<tr>
	  				<td></td>
	  				<td>
	  			  	 	<div id="roleTree"></div>
	  				</td>
	  			</tr>
	  		</table>
	  		</form>
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

<script type="text/javascript" src="${basepath}/static/js/admin/role/role.js"></script>