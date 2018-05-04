<div id="permissionDialog">
    <table>
        <tr>
            <td></td><td><input type="text" id="roleId" class="easyui-textbox" value="${upmsRole.roleId}"></td>
            <td></td><td><input type="text" class="easyui-textbox"  value="${upmsRole.name}"></td>
            <td></td>    <td><input type="text" class="easyui-textbox"  value="${upmsRole.title}"></td>
        </tr>
    </table>
    <ul id="permissionTree">

    </ul>

</div>


<script type="text/javascript">
    var url = BASE_PATH + "/manage/permission/role/"+$("#roleId").val();
    $(function(){
        $('#permissionTree').tree({
            url: url,
            method: 'get',
            checkbox:true,
            lines:true,
            cascadeCheck:false // 加载的时候不启用层叠选中
        });
    })


</script>