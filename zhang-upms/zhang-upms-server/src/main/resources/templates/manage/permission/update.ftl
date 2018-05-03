<div id="updateDialog">
    <form id="updateForm" method="post">
        <table class="tab3" >
            <tr>
                <td>系统ID：</td>
                <td><input type="text" name="systemId" id="fx_systemid" value="${permission.systemId!}" readonly="readonly" class="easyui-textbox" /></td>
                <td width="10px"></td>
                <td>父级菜单：</td>
                <td><input type="text" name="pid" id="fx_pid" value="${permission.pid!}"  readonly="readonly" class="easyui-textbox" /></td>
            </tr>

            <tr>
                <td>菜单级别：</td>
                <td>
                    <#if permission.type==1>
                        一级菜单
                    <#elseif permission.type==2>
                        二级菜单
                    <#else>
                    按钮
                    </#if>
                </td>
            </tr>

            <tr>
                <td>权限名称：</td>
                <td><input type="text" name="name" value="${permission.name!}" id="fx_name" class="easyui-textbox" /></td>
                <td width="10px"></td>
                <td>icon：</td>
                <td><input type="text" name="icon" value="${permission.icon!}"   class="easyui-textbox" /></td>
            </tr>
            <tr>
                <td>操作方法：</td>
                <td colspan="4"><input type="text" value="${permission.opertype!}"  name="opertype" class="easyui-textbox w172" /> (仅按钮需要设置，与前端JS匹配)</td>
            </tr>

            <tr>
                <td>请求uri：</td>
                <td colspan="4"><input type="text" name="uri" value="${permission.uri!}"  id="fx_uri" class="easyui-textbox w172" /> (二级菜单及按钮需配置与后台mapping匹配)</td>
            </tr>
            <tr>
                <td>权限值：</td>
                <td colspan="4"><input type="text" name="permissionValue" value="${permission.permissionValue!}"   class="easyui-textbox w172" /> (xxx:mmm:ccc)</td>
            </tr>


            <tr>
                <td>状态：</td>
                <td>
                    <#if permission.status ==1 >
                        <input type="radio" name="status" checked="checked" value="1"  />启用
                        <input type="radio" name="status" value="0"  />关闭
                    <#else>
                        <input type="radio" name="status" value="1"  />启用
                        <input type="radio" name="status"  checked="checked" value="0"  />关闭
                    </#if>

                </td>
            </tr>
        </table>

    </form>
</div>
<script type="text/javascript">
    $(function(){
        $("#fx_name").textbox({
            required: true,
            validType: 'length[2,40]',
            missingMessage:"请输入权限名称！",
            invalidMessage:'权限名称须在2-40位之间！'
        })
    })

</script>