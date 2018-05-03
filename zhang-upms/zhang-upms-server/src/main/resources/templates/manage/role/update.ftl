<div id="updateDialog">
    <form id="updateForm" method="post">
        <table class="tab3" >
            <tr>
                <td>角色ID：</td>
                <td><input type="text" name="name" id="fx_name" value="${role.name!}" class="easyui-textbox" /></td>
                <td width="10px"></td>
                <td>角色名称：</td>
                <td><input type="text" name="title" id="fx_title" value="${role.title!}" class="easyui-textbox" /></td>
            </tr>

            <tr>
                <td>描述：</td>
                <td colspan="4"><input type="text" name="description" value="${role.description}" class="easyui-textbox w400" /></td>
            </tr>
        </table>

    </form>
</div>
<script type="text/javascript">
    $(function(){

        $("#fx_title").textbox({
            required: true,
            validType: 'length[2,40]',
            missingMessage:"请输入角色名称！",
            invalidMessage:'权限ID须在2-40位之间！'
        })
        $("#fx_name").textbox({
            required: true,
            validType: 'length[2,40]',
            missingMessage:"请输入角色ID！",
            invalidMessage:'角色名称须在2-40位之间！'
        })

    })

</script>