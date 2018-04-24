<#assign basepath="${request.contextPath}">
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>${sys.web_name}-商户管理</title>
   
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
	  			<form id="queryfm">
		  			<table>
						<tr>
							<td >企业帐号：</td>
							<td ><input type="text" class="easyui-textbox" id="corpid" /></td>
							<td >企业名称：</td>
							<td ><input type="text" class="easyui-textbox" id="corpname"/></td>
							<td >企业类型：</td>
							<td >	
								<select class="easyui-combobox" name="corptypeid" id="corptypeid"  style="width:172px;">
									
								</select>
					        </td>
							<td  >企业状态：</td>
					        <td >
					        	<select class="easyui-combobox" name="corpstatus" id="corpstatus" style="width:172px;">
									
								</select>
					        </td>	
						</tr>
						<tr>
							<td  >营业执照号：</td>
					        <td ><input type="text" class="easyui-textbox" id="businesslicencecode" /></td>
					        <td  >法人姓名：</td>
					        <td ><input type="text" class="easyui-textbox" id="artificialname" /></td>
					        <td  >法人身份证号：</td>
					        <td ><input type="text" class="easyui-textbox" id="artificialidcard" onkeydown="checkKey()"/></td>
					        <td  >
					        	<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-search" onclick="searchOrReload()">查询</a>
					        	<a href="javascript:void(0);" class="easyui-linkbutton" onclick="clearForm()">重置</a>
					        </td>
					        <td ></td>
						</tr>
					
						
					</table>
				</form>
	  		</div>
	  	
	  		<div id="btnBox">
	  			<#list btnlist as btn>
					<a href="javascript:void(0)" onclick="btnopt('${btn.operType}','${btn.rightName}','${basepath}/${btn.requestUri}','${btn.rightId}')" class="easyui-linkbutton" data-options="iconCls:'${btn.rightClass}'">${btn.rightName}</a>
				</#list>
					<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-help'" id="helpBtn" alt="帮助及说明">帮助文档</a>
			</div>
		</div>

		
		<div  class="easyui-panel" title="企业信息列表">
			<table id="dgBox">
				
	
			</table>
		</div>
		
		
		<!-- 修改和新增企业信息-->
		<div id="operBox">
			<form id="operfm">
  			<table class="tab3" style="padding:20px 30px;">
				
				<tr>
					<td  >企业分类：</td>
					<td >
						<select class="easyui-combobox" id="fx_corptypeid" name="corptypeId"   style="width:220px;">
							<option value="0" selected="selected">--请选择企业分类--</option>
						</select>
						<font color="red">*</font>
					</td>

				</tr>
                <tr>
                    <td  >企业名称：</td>
                    <td ><input type="text" id="fx_corpname" class="easyui-textbox" style="width:220px;" name="corpName"/><font color="red"> *</font></td>

                    <td  width="10"></td>
                    <td  >登录账号：</td>
                    <td ><input type="text" id="fx_corpid" class="easyui-textbox" style="width:220px;" name="corpid"/><font color="red"> *</font></td>

                </tr>
				<tr>
					<td  >营业执照号：</td>
					<td  ><input type="text"   id="fx_businesslicencecode" style="width:220px;" class="easyui-textbox" name="businessCode" /><font color="red"> *</font></td>
					<td  width="10"></td>
					<td  >税务登记证：</td>
					<td  ><input type="text" id="fx_taxregistrationcode" style="width:220px;" class="easyui-textbox" name="taxRegisterCode"  /><font color="red"> *</font></td>
				</tr>
				<tr>
					<td  >组织机构代码证：</td>
					<td  ><input type="text" id="fx_organizationcode" style="width:220px;" class="easyui-textbox" name="organizationCode" /><font color="red"> *</font></td>
					<td  width="10"></td><td><input type="hidden" name="id" value="0" /></td>
				
				</tr>
				
				<tr>
					<td  >法人姓名：</td>
					<td  ><input type="text" id="fx_artificialname" style="width:220px;" class="easyui-textbox" name="artificialName" /><font color="red"> *</font></td>
					<td  width="10"></td>
					<td  >法人身份证号：</td>
					<td  ><input type="text" id="fx_artificialidcard" style="width:220px;" class="easyui-textbox" name="idCardNo" /><font color="red"> *</font></td>
					
				</tr>
				
				<tr>
					<td  >联系电话：</td>
					<td  ><input type="text" id="fx_corpphone" style="width:220px;" class="easyui-textbox" name="corpPhone"/></td>
					<td  width="10"></td>
					<td  >公司地址：</td>
					<td  ><input type="text" id="fx_corpaddress" style="width:220px;" class="easyui-textbox" name="corpAddress"/></td>
					<td  ></td>
					<td  ></td>
				</tr>
				<tr>
					<td  >开始日期：</td>
					<td  ><input class="easyui-datebox"  name="signStartDate" id="fx_signstartdate"  value="" style="width:220px"></td>
					<td  width="10"></td>
					<td  >结束日期：</td>
					<td  ><input class="easyui-datebox" name="signEndDate" id="fx_signenddate"  value="" style="width:220px">
						
					</td>
				</tr>
				<tr>
					<td  >是否平台内开放：</td>
					<td  >
						<input type="radio" name="openStatus" value="1" checked="checked">是
						<input type="radio" name="openStatus" value="0" >否
					 </td>
				
				</tr>
			</table>
			</form>
		</div>
		
		
		
	
		
		<!--用户开通及操作权限-->
		<div id="userBox">
			<form id="userfm">
			<table class="tab2">
				<tr>
					<td>登录账号：</td>
					<td ><input type="text"  class="easyui-textbox" name="corpid" id="fxt_corpid"/><span color="red"> *</span></td>
					
				</tr>
				<tr>
					<td>用户权限：</td>
					<td >
						<select class="easyui-combobox" name="roleid" id="fxt_roleid" style="width:172px;">
							
								
						</select>
						<font color="red">*</font>
					</td>	
				</tr>
			</table>
			</form>
		</div>
	
	
		<div id="helpBox">
			<p><strong>1、企业新增 ：</strong> 任何状态下均可以新增企业</p>
			<p><strong>2、企业修改 ：</strong> 锁定状态及企业到期状态无法进行修改</p>
			<p><strong>3、企业审核 ：</strong> 只能处理 待审核，审核未通过，审核通过三种状态</p>
			<p><strong>4、账号开通 ：</strong> 只有 审核通过的企业才能进行账号开通</p>
			<p><strong>5、权限变更 ：</strong> 只有账号开通且正常的企业才能进行权限变更</p>
			<p><strong>6、企业锁定 ：</strong> 只有账号开通且正常的企业才能进行企业锁定</p>
			<p><strong>7、企业解锁 ：</strong> 解锁被锁定的企业</p>
			<p><strong>8、密码重置 ：</strong> 账号开通且正常的企业才能进行密码重置</p>
			<p><strong>9、企业删除 ：</strong> 所有状态均可删除，一旦删除对该企业下的所有用户锁定，且无法恢复，谨慎操作</p>
			<p><strong>10、企业延期：</strong> 对签约到期的企业进行续签并解锁，到期的企业会系统会自动进行账号锁定</p>
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

<script type="text/javascript" src="${basepath}/static/js/admin/corp/corp.js"></script>